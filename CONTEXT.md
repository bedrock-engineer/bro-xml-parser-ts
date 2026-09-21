# CONTEXT — design vocabulary

Shared language for this codebase, using the deep-module vocabulary (module, interface,
implementation, depth, seam, adapter, leverage, locality). Some entries describe the **target
design** of the schema-DSL deepening (candidate 1), not all of it is implemented yet — those are
marked _(target)_.

## Architecture

- **SchemaParser** — the deep module at the core. Interprets a {@link Producer} schema and
  produces typed output, recursing through nested objects, arrays, unions and custom decoders.
  `produce()` is the *only* interpreter — the legacy `parse()`/`extractField()` path and its
  `Schema`/`SchemaField`/`ResolverContext` types are deleted. (`src/core/schema-parser.ts`)
- **XMLAdapter** — the injected seam for all XML node access (`parseXML`, `evaluateXPath`,
  `evaluateXPathAll`). Two adapters justify it: `NodeXMLAdapter` (fontoxpath) and
  `BrowserXMLAdapter` (native `document.evaluate`). All node access funnels through here; nothing
  bypasses it. (`src/adapters/`)

## Schema DSL

- **Producer** `Producer<T>` — the single recursive unit of the schema: a node → value description.
  One of five kinds, each built by a combinator (`scalar`, `object_`, `array`, `oneOf`, `custom`).
  `Produced<P>` / `ProducedFields<F>` recurse in exact parallel to infer output types from a
  `const` schema.
- **producers** — the public authoring barrel (`src/producers.ts`, exported as the `producers`
  namespace). One import carrying every building block the library uses internally: the combinators
  (`text`, `date`, `number_`, `integer`, `boolean_`, `qualityClass`, `scalar`, `object_`, `array`,
  `custom`, `oneOf`), the domain helpers (`gmlLocation`, `columns`/`col`), and the shared field-maps
  (`REGISTRATION_HISTORY`, `COMMON_REGISTRATION_PRODUCERS`). `BROParser.parseCustom` takes a bare
  fields map built from these; its return type is `ProducedFields<F> & { meta }`.
- **presence** — one knob per field: `"optional"` (default; missing → `null`), `"required"`
  (missing → failure, see absence model), `"omit"` (missing → key absent; needs
  `exactOptionalPropertyTypes`).
- **absence model** — a `required` failure nulls its **nearest enclosing object**; **arrays drop
  null items** (with a warning into `meta.warnings`); **only the document root throws**
  (`MISSING_REQUIRED_FIELD`). `required` is opt-in, so nothing cascades unless authored.
- **oneOf** — honest discriminated union: shared `base` fields parsed once, plus `branches` each
  with a `when` (xpath existence test), an `at`, and a literal `tag` (e.g. BHR-GT layer soil/rock).
- **NodeLens** — the narrow surface a `custom` producer receives: `text / attr / textAt / all`,
  relative reads only, no raw adapter and no escaping the subtree. This is the testable seam that
  *replaced* the leaky `(value, {node, element, adapter, namespaces})` resolver context — now the
  only escape hatch on the public custom-schema surface.
- **custom** — the sole escape hatch, for irreducibly non-declarative extraction (CSV time-series,
  detailed-vs-standard fraction fallback). Declares its output type (a checked contract), so
  inference never yields `unknown`.

## Types

- **The schema is the single source of truth for types.** No output type is hand-written. Every
  public data/nested type is *inferred* from its producer: `Produced<typeof PRODUCER>` for named
  producers, one-level indexed access (`Parent["field"][number]`, `NonNullable<Parent["field"]>`)
  for inline sub-shapes. Derived aliases live next to their producer in `src/schemas/*.ts` and are
  re-exported from `node.ts`/`browser.ts`; `src/types/index.ts` holds only the ~15 genuinely
  hand-written surfaces (adapters, `ParseMeta`, `Location`, `QualityRegime`, the `custom` contracts
  `CPTMeasurement`/`DissipationMeasurement`, the five `*Data` aliases, unions, error class).
- **presence-aware inference** — producers carry `Producer<T, P extends Presence>`; `P` is the
  literal type of the runtime `presence` field (no phantom). `ProducedFields` reads `P` to map
  `omit → optional` key, so inferred types match the runtime absence model exactly under
  `exactOptionalPropertyTypes`.
- **oneOf / columns inference** — `oneOf` infers an honest discriminated union from `base` +
  `const` `branches`; `columns` infers a row type from a `const` `ColumnSpec` tuple (`RowOf`). Both
  removed the last hand-written types. Type-level behaviour is locked by `--typecheck` tests.

## Codegen _(future — v0.4.0)_

- **A-codegen** — inference gives zero-drift types but anonymous hovers and no per-field docs. The
  next step emits committed, *documented* `interface` declarations from the schema (per-field `doc`
  → `/** */`, `group` → `@group`), superseding the inferred aliases for the public surface. Sets up
  candidate 4 (generate the schema itself from the XSDs).

## Domain

- **BRO data types** — CPT, BHR-GT, BHR-G, GMW, GLD. Each has a schema + a version/namespace.
- **temporal values** — BRO date/time fields are precision-preserving ISO strings, not `Date`
  (deliberate; see memory `temporal-values-as-iso-strings`).
