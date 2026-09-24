/**
 * `project` — a typed path-tree selector over a producer schema.
 *
 * Navigate a producer (e.g. `CPT_PRODUCER`) through a proxy that mirrors its
 * structure, naming your own output keys. The selection is compiled back into an
 * {@link ObjectProducer} that reuses the original leaf decoders, so parsing runs
 * through the same {@link SchemaParser}. No hand-written XPath strings.
 *
 * ```ts
 * const survey = project(CPT_PRODUCER, (t) => ({
 *   id:    t.broId,
 *   depth: t.finalDepth,
 *   klass: t.qualityClass,      // Coded | null
 * }));
 * parser.parseSelection(xml, survey, "CPT"); // { id, depth, klass, meta }
 * ```
 *
 * The selector type is derived from the *producer* structure, not the output
 * type: an atomic `custom`/`columns` field (whose value may look structural, like
 * `CPTMeasurement[]`) stays a leaf and is selected whole, matching what the
 * runtime can actually decompose.
 */

import { object, array } from "./producer.js";
import type { Producer, Presence, Produced, ObjectProducer } from "./producer.js";

// ===========================================================================
// Type surface
// ===========================================================================

declare const OUT: unique symbol;

/** A selection token carrying the value type `V` it will parse to. */
export interface Leaf<V> {
  readonly [OUT]?: V;
}

/** An array node: select the whole array (it is a {@link Leaf}), or `.each` a row. */
export interface ArraySel<I> extends Leaf<Array<Produced<I>>> {
  each<R>(fn: (el: SelectableProducer<I>) => R): Leaf<Array<ProjectResult<R>>>;
}

/** Intersect the `fields` maps of every `oneOf` branch (a tuple of `BranchInput`). */
type BranchFields<Br> = Br extends readonly [infer H, ...infer T]
  ? (H extends { fields: infer F } ? F : object) & BranchFields<T>
  : object;

/**
 * Mirror a producer as a navigable path tree. Array producers → {@link ArraySel};
 * object producers → descend by field; `oneOf` → descend the merged base + branch
 * fields (selecting one flattens the union); every leaf (`text`/`number`/`date`/
 * `boolean`/`code`) and atomic `custom`/`columns` → a whole-value {@link Leaf}.
 */
export type SelectableProducer<P> = P extends { kind: "array"; _item?: infer I }
  ? ArraySel<I>
  : P extends { kind: "object"; _fields?: infer F }
    ? { [K in keyof F]-?: SelectableProducer<F[K]> }
    : P extends { kind: "oneOf"; _base?: infer B; _branches?: infer Br }
      ? { [K in keyof (B & BranchFields<Br>)]-?: SelectableProducer<(B & BranchFields<Br>)[K]> }
      : P extends { readonly _out?: infer V }
        ? Leaf<V>
        : never;

/** Resolve a returned selection tree to its parsed output type. */
export type ProjectResult<S> = S extends Leaf<infer V>
  ? V
  : S extends Record<string, unknown>
    ? { [K in keyof S]: ProjectResult<S[K]> }
    : never;

// ===========================================================================
// Runtime
// ===========================================================================

const TOKEN = Symbol("bro.selectToken");

interface Token {
  [TOKEN]: "leaf" | "object" | "array" | "each";
  producer: Producer<unknown, Presence>;
  /** Composed XPath from the enclosing context (root or array item) to this node. */
  path: string;
  /** For an `each` token: the row sub-selection. */
  itemSel?: Record<string, unknown>;
}

/** Join a context path with a producer's own relative `at`. */
function joinPath(prefix: string, at: string | undefined): string {
  if (!at) {
    return prefix;
  }
  if (!prefix) {
    return at;
  }
  return `${prefix}/${at.replace(/^\.\//, "")}`;
}

type FieldMap = Record<string, Producer<unknown, Presence>>;
type AnyProducer = Producer<unknown, Presence>;

/** The structural views onto a producer's children, resolved per `kind`. */
interface ObjectNode {
  at?: string;
  fields: FieldMap;
}
interface ArrayNode {
  at?: string;
  each: string;
  item: AnyProducer;
}
interface OneOfNode {
  at?: string;
  base: FieldMap;
  branches: ReadonlyArray<{ at?: string; fields: FieldMap }>;
}

function readOwn(target: object, key: string | symbol): unknown {
  return Reflect.get(target, key);
}

/** Build a navigation proxy (or terminal token) for `producer` reached at `path`. */
function proxyFor(producer: AnyProducer, path: string): unknown {
  if (producer.kind === "object") {
    const node = producer as unknown as ObjectNode;
    const token: Token = { [TOKEN]: "object", producer, path };
    return new Proxy(token, {
      get(target, key) {
        if (typeof key === "symbol" || Reflect.has(target, key)) {
          return readOwn(target, key);
        }
        const child = node.fields[key];
        if (!child) {
          throw new Error(`project: unknown field '${key}'`);
        }
        return proxyFor(child, joinPath(path, child.at));
      },
    });
  }

  if (producer.kind === "array") {
    const node = producer as unknown as ArrayNode;
    const token: Token = { [TOKEN]: "array", producer, path };
    return new Proxy(token, {
      get(target, key) {
        if (key === "each") {
          return (fn: (el: unknown) => Record<string, unknown>) => {
            const itemSel = fn(proxyFor(node.item, ""));
            return { [TOKEN]: "each", producer, path, itemSel } satisfies Token;
          };
        }
        if (typeof key === "symbol" || Reflect.has(target, key)) {
          return readOwn(target, key);
        }
        throw new Error("project: use .each() to select array elements");
      },
    });
  }

  if (producer.kind === "oneOf") {
    // Navigate the merged base + branch fields; selecting one flattens the union.
    const node = producer as unknown as OneOfNode;
    const token: Token = { [TOKEN]: "leaf", producer, path };
    return new Proxy(token, {
      get(target, key) {
        if (typeof key === "symbol" || Reflect.has(target, key)) {
          return readOwn(target, key);
        }
        const baseField = node.base[key];
        if (baseField) {
          return proxyFor(baseField, joinPath(path, baseField.at));
        }
        for (const branch of node.branches) {
          const bf = branch.fields[key];
          if (bf) {
            return proxyFor(bf, joinPath(joinPath(path, branch.at), bf.at));
          }
        }
        throw new Error(`project: unknown field '${key}' on union`);
      },
    });
  }

  // Leaf kinds (scalar, code, custom): a terminal token, selected whole.
  return { [TOKEN]: "leaf", producer, path } satisfies Token;
}

function isToken(v: unknown): v is Token {
  return typeof v === "object" && v !== null && TOKEN in v;
}

/** Compile one selection value into a producer. */
function buildProducer(value: unknown): Producer<unknown, Presence> {
  if (isToken(value)) {
    const { producer, path } = value;
    if (value[TOKEN] === "each") {
      const node = producer as unknown as ArrayNode;
      return array({
        ...(path ? { at: path } : {}),
        each: node.each,
        item: object({ fields: buildFields(value.itemSel ?? {}) }),
      });
    }
    // Leaf / whole-object / whole-array: reuse the producer, retarget its `at`.
    return { ...producer, ...(path ? { at: path } : {}) };
  }
  // A plain nested record the caller assembled by hand.
  return object({ fields: buildFields(value as Record<string, unknown>) });
}

function buildFields(sel: Record<string, unknown>): FieldMap {
  const fields: FieldMap = {};
  for (const [key, value] of Object.entries(sel)) {
    fields[key] = buildProducer(value);
  }
  return fields;
}

/**
 * Compile a selection over `root` into an {@link ObjectProducer}. The result
 * parses through {@link SchemaParser} like any producer (e.g. via
 * `BROParser.parseSelection`).
 */
export function project<P extends ObjectProducer<unknown, Presence>, S>(
  root: P,
  select: (t: SelectableProducer<P>) => S,
): ObjectProducer<ProjectResult<S>> {
  const start = root.at ?? "";
  const selection = select(proxyFor(root, start) as SelectableProducer<P>);
  return object({
    fields: buildFields(selection as Record<string, unknown>),
  }) as unknown as ObjectProducer<ProjectResult<S>>;
}
