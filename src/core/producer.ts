/**
 * The Producer schema DSL.
 *
 * A {@link Producer} describes how to turn one XML node into one typed value. It
 * is the single recursive unit of a schema: an object producer's fields are
 * themselves producers, an array producer's item is a producer, and so on all
 * the way down. {@link SchemaParser.produce} interprets this tree.
 *
 * Five kinds, each built by a combinator:
 *   - `scalar`  — a leaf: text (or an attribute) decoded into `T`.
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

import { parseDate, parseFloat, parseInt, parseBoolean } from "../resolvers/type-resolvers.js";

/** How a producer behaves when it finds no data. */
export type Presence =
  /** Missing → `null` (or `[]` for arrays). The default. */
  | "optional"
  /** Missing → the nearest enclosing object becomes `null` (root throws). */
  | "required"
  /** Missing → the key is omitted entirely (needs `exactOptionalPropertyTypes`). */
  | "omit";

/**
 * The narrow, relative-only surface a {@link CustomProducer} receives.
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

/** Fields common to every producer kind. */
interface ProducerMeta {
  /** Relative XPath from the enclosing node to this producer's node. */
  at?: string;
  /** Absence behaviour (default `"optional"`). */
  presence?: Presence;
  /** Docstring carried into generated types as `/** *\/`. */
  doc?: string;
  /** Group name carried into generated types as `@group`. */
  group?: string;
}

export interface ScalarProducer<T> extends ProducerMeta {
  kind: "scalar";
  decode: (raw: string | null) => T;
  /** Phantom output type — never present at runtime. */
  readonly _out?: T;
}

export interface ObjectProducer<T> extends ProducerMeta {
  kind: "object";
  fields: Record<string, Producer<unknown>>;
  readonly _out?: T;
}

export interface ArrayProducer<T> extends ProducerMeta {
  kind: "array";
  /** Relative XPath selecting each item node. */
  each: string;
  item: Producer<unknown>;
  readonly _out?: T;
}

export interface CustomProducer<T> extends ProducerMeta {
  kind: "custom";
  produce: (lens: NodeLens) => T;
  readonly _out?: T;
}

/** One tagged branch of a {@link OneOfProducer}. */
export interface OneOfBranch {
  /** XPath whose existence selects this branch (first match wins). */
  when: string;
  /** Relative XPath to the branch's node (defaults to the oneOf node). */
  at?: string;
  /** Literal discriminant value written under the oneOf's `tagAs` key. */
  tag: string;
  fields: Record<string, Producer<unknown>>;
}

export interface OneOfProducer<T> extends ProducerMeta {
  kind: "oneOf";
  /** Field name that carries each branch's literal `tag`. */
  tagAs: string;
  /** Fields parsed once and merged into every branch. */
  base: Record<string, Producer<unknown>>;
  branches: Array<OneOfBranch>;
  readonly _out?: T;
}

export type Producer<T> =
  | ScalarProducer<T>
  | ObjectProducer<T>
  | ArrayProducer<T>
  | CustomProducer<T>
  | OneOfProducer<T>;

/** Recover a producer's output type. Recurses in parallel with the runtime. */
export type Produced<P> = P extends { readonly _out?: infer T } ? T : never;

/** The output type of an object built from a fields map. */
export type ProducedFields<F> = { [K in keyof F]: Produced<F[K]> };

// ===========================================================================
// Combinators
// ===========================================================================

type ScalarOpts<T> = { at?: string; decode: (raw: string | null) => T } & Omit<
  ProducerMeta,
  "at"
>;
type LeafOpts = { at?: string } & Omit<ProducerMeta, "at">;

/** A leaf producer with an explicit decoder. */
export function scalar<T>(opts: ScalarOpts<T>): ScalarProducer<T> {
  return { kind: "scalar", ...opts };
}

/**
 * Build a leaf from a decoder + optional `at`, without ever writing
 * `at: undefined` (which `exactOptionalPropertyTypes` rejects).
 */
function leaf<T>(decode: (raw: string | null) => T, at: string | undefined, opts: LeafOpts) {
  return scalar<T>({ decode, ...(at !== undefined ? { at } : {}), ...opts });
}

/** Raw trimmed text (`string | null`). */
export function text(at?: string, opts: LeafOpts = {}): ScalarProducer<string | null> {
  return leaf<string | null>((raw) => raw, at, opts);
}

/** Precision-preserving ISO date/dateTime string (`string | null`). */
export function date(at?: string, opts: LeafOpts = {}): ScalarProducer<string | null> {
  return leaf<string | null>(parseDate, at, opts);
}

/** Decimal number (`number | null`). */
export function number_(at?: string, opts: LeafOpts = {}): ScalarProducer<number | null> {
  return leaf<number | null>(parseFloat, at, opts);
}

/** Integer (`number | null`). */
export function integer(at?: string, opts: LeafOpts = {}): ScalarProducer<number | null> {
  return leaf<number | null>(parseInt, at, opts);
}

/** Boolean (`boolean | null`), understanding BRO's `ja`/`nee`. */
export function boolean_(at?: string, opts: LeafOpts = {}): ScalarProducer<boolean | null> {
  return leaf<boolean | null>(parseBoolean, at, opts);
}

/** A fixed set of named fields. Output type is inferred from `fields`. */
export function object_<F extends Record<string, Producer<unknown>>>(
  opts: { fields: F } & ProducerMeta,
): ObjectProducer<ProducedFields<F>> {
  const { fields, ...meta } = opts;
  return { kind: "object", fields, ...meta };
}

/** A repeated subtree. `each` selects item nodes; `item` produces one value. */
export function array<E>(
  opts: { each: string; item: Producer<E> } & ProducerMeta,
): ArrayProducer<Array<E>> {
  const { each, item, ...meta } = opts;
  return { kind: "array", each, item, ...meta };
}

/** The escape hatch: a decoder handed a relative-only {@link NodeLens}. */
export function custom<T>(
  opts: { produce: (lens: NodeLens) => T } & ProducerMeta,
): CustomProducer<T> {
  const { produce, ...meta } = opts;
  return { kind: "custom", produce, ...meta };
}

/**
 * An honest discriminated union. `base` fields are parsed once; the first branch
 * whose `when` XPath exists is parsed and merged, with its literal `tag` written
 * under `tagAs`.
 *
 * The output type is left to the caller to declare (via the type argument), since
 * inferring a full discriminated union from `base`/`branches` is beyond what the
 * combinator can express cleanly. Codegen reads the same declaration.
 */
export function oneOf<T>(
  opts: { tagAs: string; base?: Record<string, Producer<unknown>>; branches: Array<OneOfBranch> } & ProducerMeta,
): OneOfProducer<T> {
  const { tagAs, base = {}, branches, ...meta } = opts;
  return { kind: "oneOf", tagAs, base, branches, ...meta };
}
