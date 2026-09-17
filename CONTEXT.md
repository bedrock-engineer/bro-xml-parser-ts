# CONTEXT — design vocabulary

Shared language for this codebase, using the deep-module vocabulary (module, interface,
implementation, depth, seam, adapter, leverage, locality). Some entries describe the **target
design** of the schema-DSL deepening (candidate 1), not all of it is implemented yet — those are
marked _(target)_.

## Architecture

- **SchemaParser** — the deep module at the core. Interprets a declarative schema and produces
  typed output. Today it handles only flat top-level fields; the deepening makes it recurse.
  (`src/core/schema-parser.ts`)
- **XMLAdapter** — the injected seam for all XML node access (`parseXML`, `evaluateXPath`,
  `evaluateXPathAll`). Two adapters justify it: `NodeXMLAdapter` (fontoxpath) and
  `BrowserXMLAdapter` (native `document.evaluate`). All node access funnels through here; nothing
  bypasses it. (`src/adapters/`)

## Schema DSL _(target)_

- **Producer** `Producer<T>` — the single recursive unit of the schema: a node → value description.
  One of five kinds, each built by a combinator (`scalar`, `object_`, `array`, `oneOf`, `custom`).
  `ParsedSchema<S>` recurses in exact parallel to infer output types from a `const` schema.
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
  replaces today's leaky `(value, {node, element, adapter, namespaces})`.
- **custom** — the sole escape hatch, for irreducibly non-declarative extraction (CSV time-series,
  detailed-vs-standard fraction fallback). Declares its output type so codegen never emits
  `unknown`.

## Types & codegen _(target)_

- **A-codegen** — the schema is the single source of truth for types. A `codegen:types` script
  walks the schema statically and emits committed, documented `interface` declarations under
  `src/schemas/generated/`, carrying per-field `doc` → `/** */` and `group` → `@group`. CI fails on
  staleness. Sets up candidate 4 (generate the schema itself from the XSDs).

## Domain

- **BRO data types** — CPT, BHR-GT, BHR-G, GMW, GLD. Each has a schema + a version/namespace.
- **temporal values** — BRO date/time fields are precision-preserving ISO strings, not `Date`
  (deliberate; see memory `temporal-values-as-iso-strings`).
