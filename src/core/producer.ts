/**
 * The Producer schema DSL.
 *
 * A {@link Producer} describes how to turn one XML node into one typed value. It
 * is the single recursive unit of a schema: an object producer's fields are
 * themselves producers, an array producer's item is a producer, and so on all
 * the way down. {@link SchemaParser.produce} interprets this tree.
 *
 * Six kinds, each built by a combinator:
 *   - `scalar`  — a leaf: text (or an attribute) decoded into `T`.
 *   - `code`    — a leaf: a BRO coded value (`{ code, codeSpace }`), text + its domain.
 *   - `object`  — a fixed set of named fields, each a producer.
 *   - `array`   — a repeated subtree: `each` selects item nodes, `item` produces one.
 *   - `oneOf`   — an honest discriminated union (shared `base` + tagged `branches`).
 *   - `custom`  — the sole escape hatch, handed a narrow {@link NodeLens}.
 *
 * Absence model (see CONTEXT.md): a `required` field that is missing nulls its
 * *nearest enclosing object*; arrays *drop* null items (recording a warning);
 * only the document root throws. `required` is opt-in, so nothing cascades unless
 * a schema author asks for it.
 */

import {
  parseDate,
  parseFloat,
  parseInt,
  parseBoolean,
} from "../decoders/type-decoders.js";

/**
 * A BRO coded value: the `code` text plus the `codeSpace` domain URI that the XML
 * carries as a `codeSpace` attribute (e.g. `urn:bro:cpt:QualityClass`).
 *
 * First-class data, so the domain is never guessed from a field name — the
 * `describe` helper in the `/reference-codes` subpath resolves it correctly by
 * `codeSpace`. An absent or nil coded element parses to `null`; a present one is
 * always a full `{ code, codeSpace }`.
 */
export interface Coded {
  code: string;
  codeSpace: string;
}

/**
 * A sink for non-fatal decode messages (bad numeric text, etc.). The engine
 * passes one that appends to `meta.warnings`; direct callers may omit it.
 */
type WarnSink = (message: string) => void;

/** How a producer behaves when it finds no data. */
export type Presence =
  /** Missing → `null` (or `[]` for arrays). The default. */
  | "optional"
  /** Missing → the nearest enclosing object becomes `null` (root throws). */
  | "required"
  /** Missing → the key is omitted entirely (needs `exactOptionalPropertyTypes`). */
  | "omit";

/**
 * The narrow, relative-only surface a `CustomProducer` receives.
 *
 * A custom producer never sees the raw {@link XMLAdapter} or escapes its subtree —
 * it reads text and child nodes relative to the node it was mounted on.
 */
export interface NodeLens {
  /** Local (namespace-stripped) name of this lens' own node (`null` if none). */
  name(): string | null;
  /** Trimmed text content of this lens' own node (`null` if empty). */
  text(): string | null;
  /** Trimmed text at a relative XPath (`null` if the node is absent/empty). */
  textAt(xpath: string): string | null;
  /** Value of an attribute reached by a relative XPath ending in `/@name`. */
  attr(xpath: string): string | null;
  /** A lens per node matching a relative XPath. */
  all(xpath: string): Array<NodeLens>;
}

/**
 * Fields common to every producer kind. `presence` lives on each producer
 * interface instead (typed as the literal `P`), so its value can be recovered at
 * the type level.
 */
interface ProducerMeta {
  /** Relative XPath from the enclosing node to this producer's node. */
  at?: string;
  /** Docstring carried into generated types as `/** *\/`. */
  doc?: string;
  /** Group name carried into generated types as `@group`. */
  group?: string;
}

/**
 * A producer carries two type params: its output type `T`, and its
 * {@link Presence} `P`. `P` is the literal type of the runtime `presence` field —
 * the same value drives both parsing and {@link ProducedFields} (which reads `P`
 * to decide whether a field's key is required or `omit` → optional). One field,
 * one source of truth; no phantom to keep in sync.
 */
export interface ScalarProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "scalar";
  decode: (raw: string | null, warn?: WarnSink) => T;
  /** Absence behaviour (default `"optional"`). */
  presence?: P;
  /** Phantom output type — never present at runtime. */
  readonly _out?: T;
}

/**
 * A leaf coded value. Like {@link ScalarProducer} it is text-presence driven, but
 * its decode also receives the node's `codeSpace` attribute so it can build a
 * {@link Coded}. It is a first-class leaf (not a {@link CustomProducer}) so the
 * presence/absence model applies uniformly.
 */
export interface CodeProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "code";
  decode: (text: string | null, codeSpace: string | null) => T;
  presence?: P;
  readonly _out?: T;
}

export interface ObjectProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "object";
  fields: Record<string, Producer<unknown, Presence>>;
  presence?: P;
  readonly _out?: T;
}

export interface ArrayProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "array";
  /** Relative XPath selecting each item node. */
  each: string;
  item: Producer<unknown, Presence>;
  presence?: P;
  readonly _out?: T;
}

export interface CustomProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "custom";
  produce: (lens: NodeLens) => T;
  presence?: P;
  readonly _out?: T;
}

/** One tagged branch of a {@link OneOfProducer}. */
interface OneOfBranch {
  /** XPath whose existence selects this branch (first match wins). */
  when: string;
  /** Relative XPath to the branch's node (defaults to the oneOf node). */
  at?: string;
  /** Literal discriminant value written under the oneOf's `tagAs` key. */
  tag: string;
  fields: Record<string, Producer<unknown, Presence>>;
}

export interface OneOfProducer<T, P extends Presence = "optional"> extends ProducerMeta {
  kind: "oneOf";
  /** Field name that carries each branch's literal `tag`. */
  tagAs: string;
  /** Fields parsed once and merged into every branch. */
  base: Record<string, Producer<unknown, Presence>>;
  branches: ReadonlyArray<OneOfBranch>;
  presence?: P;
  readonly _out?: T;
}

export type Producer<T, P extends Presence = "optional"> =
  | ScalarProducer<T, P>
  | CodeProducer<T, P>
  | ObjectProducer<T, P>
  | ArrayProducer<T, P>
  | CustomProducer<T, P>
  | OneOfProducer<T, P>;

/** Leaf producer kinds: value-bearing, driven by text presence. */
export type LeafKind = "scalar" | "code";

/** Flatten an intersection into a single object literal for legible hovers. */
type Simplify<T> = { [K in keyof T]: T[K] } & {};

/** Recover a producer's output type. Recurses in parallel with the runtime. */
export type Produced<P> = P extends { readonly _out?: infer T } ? T : never;

/** Recover a producer's {@link Presence} (absent → the `"optional"` default). */
type PresenceOf<X> = X extends { presence?: infer P } ? (P extends Presence ? P : "optional") : "optional";

type OmitPresenceKeys<F> = { [K in keyof F]: PresenceOf<F[K]> extends "omit" ? K : never }[keyof F];

/**
 * The output type of an object built from a fields map. A field whose producer
 * has `presence: "omit"` becomes an **optional** key (`key?:`); every other
 * field is a required key. Under `exactOptionalPropertyTypes` this exactly
 * mirrors the runtime absence model.
 */
export type ProducedFields<F> = Simplify<
  { [K in Exclude<keyof F, OmitPresenceKeys<F>>]: Produced<F[K]> } & {
    [K in OmitPresenceKeys<F>]?: Produced<F[K]>;
  }
>;

// ===========================================================================
// Combinators
// ===========================================================================

/** Meta accepted by every combinator, minus `presence` (captured generically). */
interface BaseMeta { at?: string; doc?: string; group?: string }
type LeafOpts<P extends Presence = "optional"> = BaseMeta & { presence?: P };
type ScalarOpts<T, P extends Presence = "optional"> = LeafOpts<P> & {
  decode: (raw: string | null, warn?: WarnSink) => T;
};

/** A leaf producer with an explicit decoder. */
export function scalar<T, P extends Presence = "optional">(
  opts: ScalarOpts<T, P>,
): ScalarProducer<T, P> {
  return { kind: "scalar", ...opts };
}

/**
 * Build a leaf from a decoder + optional `at`, without ever writing
 * `at: undefined` (which `exactOptionalPropertyTypes` rejects).
 */
function leaf<T, P extends Presence>(
  decode: (raw: string | null, warn?: WarnSink) => T,
  at: string | undefined,
  opts: LeafOpts<P>,
): ScalarProducer<T, P> {
  return scalar<T, P>({ decode, ...(at !== undefined ? { at } : {}), ...opts });
}

/** Raw trimmed text (`string | null`). */
export function text<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): ScalarProducer<string | null, P> {
  return leaf<string | null, P>((raw) => raw, at, opts);
}

/** Precision-preserving ISO date/dateTime string (`string | null`). */
export function date<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): ScalarProducer<string | null, P> {
  return leaf<string | null, P>(parseDate, at, opts);
}

/** Decimal number (`number | null`). */
export function number<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): ScalarProducer<number | null, P> {
  return leaf<number | null, P>(parseFloat, at, opts);
}

/** Integer (`number | null`). */
export function integer<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): ScalarProducer<number | null, P> {
  return leaf<number | null, P>(parseInt, at, opts);
}

/** Boolean (`boolean | null`), understanding BRO's `ja`/`nee`. */
export function boolean<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): ScalarProducer<boolean | null, P> {
  return leaf<boolean | null, P>(parseBoolean, at, opts);
}

/**
 * A BRO coded value (`{ code, codeSpace } | null`). Reads the element's text and
 * its `codeSpace` attribute; absent/nil (no text) → `null`. A first-class leaf, so
 * presence (`optional`/`required`/`omit`) and array-item handling apply as they do
 * to {@link text} / {@link number}.
 */
export function code<P extends Presence = "optional">(
  at?: string,
  opts: LeafOpts<P> = {},
): CodeProducer<Coded | null, P> {
  return {
    kind: "code",
    decode: (text, codeSpace) =>
      text === null || codeSpace === null ? null : { code: text, codeSpace },
    ...(at !== undefined ? { at } : {}),
    ...opts,
  };
}

/**
 * A fixed set of named fields. Output type is inferred from `fields`.
 *
 * The concrete `fields` map type is also carried in the phantom `_fields`, so the
 * `project` selector can mirror the producer's structure at the type level (an
 * atomic `custom` field stays a leaf even when its value type looks structural).
 */
export function object<
  F extends Record<string, Producer<unknown, Presence>>,
  P extends Presence = "optional",
>(
  opts: { fields: F; presence?: P } & BaseMeta,
): ObjectProducer<ProducedFields<F>, P> & { readonly _fields?: F } {
  const { fields, ...meta } = opts;
  return { kind: "object", fields, ...meta };
}

/**
 * A repeated subtree. `each` selects item nodes; `item` produces one value. The
 * item producer's type is carried in the phantom `_item` (see {@link object}).
 */
export function array<
  I extends Producer<unknown, Presence>,
  P extends Presence = "optional",
>(
  opts: { each: string; item: I; presence?: P } & BaseMeta,
): ArrayProducer<Array<Produced<I>>, P> & { readonly _item?: I } {
  const { each, item, ...meta } = opts;
  return { kind: "array", each, item, ...meta };
}

/** The escape hatch: a decoder handed a relative-only {@link NodeLens}. */
export function custom<T, P extends Presence = "optional">(
  opts: { produce: (lens: NodeLens) => T; presence?: P } & BaseMeta,
): CustomProducer<T, P> {
  const { produce, ...meta } = opts;
  return { kind: "custom", produce, ...meta };
}

/** A branch as written at the `oneOf` call site (captured for type inference). */
interface BranchInput<
  Tag extends string = string,
  F extends Record<string, Producer<unknown, Presence>> = Record<string, Producer<unknown, Presence>>,
> { when: string; at?: string; tag: Tag; fields: F }

/** Output type of one branch: shared base ∪ branch fields ∪ the tag literal. */
type BranchOut<TagKey extends string, Base, B> = B extends {
  tag: infer Tag extends string;
  fields: infer F;
}
  ? Simplify<ProducedFields<Base> & ProducedFields<F> & Record<TagKey, Tag>>
  : never;

/** The discriminated union over all branches (mapped tuple → indexed union). */
type OneOfOut<TagKey extends string, Base, Branches extends ReadonlyArray<unknown>> = {
  [I in keyof Branches]: BranchOut<TagKey, Base, Branches[I]>;
}[number];

/**
 * An honest discriminated union. `base` fields are parsed once; the first branch
 * whose `when` XPath exists is parsed and merged, with its literal `tag` written
 * under `tagAs`.
 *
 * The output type is **inferred**: a discriminated union keyed on `tagAs`, each
 * member being the shared `base` fields plus that branch's `fields` plus the
 * literal `tag`. Presence is honoured throughout (`omit` → optional key).
 */
export function oneOf<
  TagKey extends string,
  const Base extends Record<string, Producer<unknown, Presence>>,
  const Branches extends ReadonlyArray<BranchInput>,
  P extends Presence = "optional",
>(
  opts: { tagAs: TagKey; base?: Base; branches: Branches; presence?: P } & BaseMeta,
): OneOfProducer<OneOfOut<TagKey, Base, Branches>, P> & {
  readonly _base?: Base;
  readonly _branches?: Branches;
} {
  const { tagAs, base = {}, branches, ...meta } = opts;
  return { kind: "oneOf", tagAs, base, branches, ...meta };
}
