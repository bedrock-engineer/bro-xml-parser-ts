# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the major version is `0`, breaking changes are released as minor versions.

## [Unreleased]

### Changed

- **BREAKING: dropped the trailing underscores from three `producers` combinators.**
  `p.number_` → `p.number`, `p.boolean_` → `p.boolean`, `p.object_` → `p.object`. The
  underscores guarded against a keyword collision that the namespaced API never
  reaches, and were inconsistent with the other combinators (`text`, `date`,
  `integer`, `array`, …) and with zod/io-ts/valibot. Migration is mechanical:
  `.number_(` → `.number(`, `.boolean_(` → `.boolean(`, `.object_(` → `.object(`.

## [0.4.0] - 2026-09-21

### Added

- **GLD (Grondwaterstandonderzoek / groundwater level research)** support, modelled
  from the official `dsgld/1.0` XSD at full coverage. New `parser.parseGLD(xml)`
  (and auto-detection via `parser.parse(xml)`) returning `GLDData`. The
  monitoring-point (GMW tube) reference, monitoring-net membership, and the WaterML2
  observation time-series (`{ time, value, unit, qualifier }` points with per-series
  metadata and processing provenance) are parsed. Note: full GLD dispatch documents
  can be tens of MB (years of measurements); request a bounded observation period
  where possible.
- **GMW (Grondwatermonitoringput / groundwater monitoring well)** support, modelled
  from the official `dsgmw/1.1` XSD at full coverage. New `parser.parseGMW(xml)`
  (and auto-detection) returning `GMWData`. Well-level metadata, delivered and
  standardized location and vertical position, the monitoring-tube array (with
  flattened material / screen / insert surfaces and nested geo-ohm cables and
  electrodes), and the well-history event log are parsed.
- **`producers` authoring surface** for custom schemas: the combinators (`text`,
  `number_`, `integer`, `date`, `boolean_`, `qualityClass`, `scalar`, `object_`,
  `array`, `oneOf`, `custom`) plus domain helpers (`gmlLocation`, `columns`/`col`)
  and shared field-maps. Pass a map of these to `parser.parseCustom(...)`.
- The XSD coverage checker (`npm run check:xsd-coverage`) now emits a full
  `<domain>.leaves.md` (every distinct leaf property with cardinality, base type and
  example XPath) per domain.

### Changed

- **BREAKING: one declarative Producer DSL.** All five data types (CPT, BHR-GT,
  BHR-G, GMW, GLD) parse through a single interpreter (`SchemaParser.produce`); the
  legacy resolver-based parse path is gone.
- **BREAKING: `parseCustom(xml, fields, dataType?)`** now takes a map of
  `producers.*` field producers instead of `{ xpath, resolver }` entries; its return
  type is inferred from the map.
- **BREAKING: output types are inferred from the schema.** The five `*Data` types and
  every nested shape are derived from their producers — a single source of truth, so
  types can no longer drift from the parser. ~60 hand-written interfaces were removed.
  Nested data-shape types stay importable but are excluded from the generated API
  docs. A few previously-published shapes are corrected to match runtime output (e.g.
  time-series and measurement fields are `number | null`; fields that are absent when
  unset are optional keys).
- **BREAKING:** `BROData`, `BROFileType`, `ParseMeta["dataType"]` and the
  version-detector `DataType` now include `"GMW"` and `"GLD"`.

### Removed

- **BREAKING:** the public `resolvers` namespace and the `Schema`, `SchemaField`,
  `ResolverFunction`, `ResolverContext` and `ParsedSchema` types. Build custom
  schemas with the `producers` namespace and the `Producer` / `Produced` /
  `ProducedFields` types instead.

## [0.3.0] - 2026-09-17

### Added

- **XSD coverage checker** (`npm run check:xsd-coverage`): fetches the official
  BRO XSDs and diffs every parsed type against them, reporting missing
  properties per domain. CPT, BHR-GT and BHR-G are now verified at full coverage
  of their modelled surface.
- CPT: `objectIdAccountableParty`, `deliveryResponsibleParty`, `researchOperator`,
  `coordinateTransformation`, `horizontalPositioningOperator`,
  `verticalPositioningOperator`, `waterDepth`, and the registration-history
  timestamps `latestAdditionTime`, `underReviewTime`, `deregistrationTime`,
  `reregistrationTime`.
- BHR-GT: boring depths (`finalDepthPreparation`, `finalDepthExcavation`,
  `finalDepthTemporaryCasing`), `flushingAdditive`, site characteristics
  (`positionOnGroundBody`, `temporaryChange`), `researchOperator`; boring
  sub-structures (`coreRecovery`, permanent-casing fields on completed intervals,
  `excavatedLayers`, `boringVelocity`, `fluidMudLayer`); rock/discontinuity
  geology (nested `rock` description with `weatheringDegree`,
  `postSedimentaryDiscontinuities`, extra `soil` fields, `specialMaterial`); and
  BMA determination refinements (detailed >63µm particle-size fractions, min/max
  undrained shear strength, saturation-stage extras, `materialIrregularity`,
  `saturatedPermeabilityAtSpecificLoad`).
- BHR-G: vertical-position provenance (`waterDepth`, `verticalPositioningDate`,
  `verticalPositioningMethod`, `verticalPositioningOperator`), site
  characteristics (`landscapeElement`, `hydrologicalSetting`, `currentProcess`),
  `flushingAdditiveUsed`, `utensil`; and a full geological description model —
  nested soil fractions (`sandFraction`, `shellFraction`, `gravelFraction`,
  `peatFraction` with their constituents), `fractionDistribution`,
  `munsellColour`, `mottles`, `chunks`, `thinStrata`, plus many flat soil/layer
  fields. (BHR-G lab analysis, `boreholeSampleAnalysis`, is intentionally not
  modelled yet.)
- Shared `BRORegistrationObject` base interface and many newly exported types
  (e.g. `BHRGTSoilLayer`, `BHRGTRockLayer`, `CoreRecovery`, `FluidMudLayer`,
  `RockDescription`, `SandFraction`, `ShellFraction`, `FractionDistribution`,
  `Chunk`, `Mottle`, `ThinStratum`).

### Changed

- **BREAKING:** `BHRGTLayer` is now a discriminated union
  (`BHRGTSoilLayer | BHRGTRockLayer`) on a `material` field. Narrow on
  `layer.material` before accessing soil-only fields (`geotechnicalSoilName`,
  grain shape, …) or the rock-only `rock` object. This restores a non-null
  `geotechnicalSoilName` on soil layers and stops rock layers from carrying empty
  soil fields.
- **BREAKING:** `CPTData`, `BHRGTData` and `BHRGData` now extend a shared
  `BRORegistrationObject`, which adds `objectIdAccountableParty` and
  `deliveryResponsibleParty` to all three and makes `deliveryAccountableParty`
  available on BHR-G.
- **BREAKING:** `RegistrationHistory` gained `latestAdditionTime`,
  `underReviewTime`, `deregistrationTime` and `reregistrationTime`.
- **BREAKING:** the per-domain `processCPTRegistrationHistory` and
  `processBHRGRegistrationHistory` resolver exports were removed; use the single
  shared `processRegistrationHistory` (also exported from `resolvers`).
- `parseDate` documents BRO's timezone handling (mandatory `+01:00`/`+02:00`
  offsets; the calendar date is the Dutch-local date) with a link to the BRO
  guidance, reinforcing why raw ISO strings are preserved.

### Fixed

- BHR-GT rock layers were silently dropped because the layer parser required
  `geotechnicalSoilName`; rock layers are now retained.
- BHR-G never extracted `deliveryAccountableParty` even though it is present in
  the data; it is now parsed.

## [0.2.0] - 2026-09-16

### Added

- BHR-GT: additional layer and document-level fields, including NEN 5104 soil
  description fields (`soilNameNEN5104`, `gravelContentClassNEN5104`,
  `organicMatterContentClassNEN5104`) as a fallback on IMBRO/A archive data
  where `geotechnicalSoilName` is nil; layer detail fields (`gravelMedianClass`,
  `activityType`, `geotechnicalDepositionalCharacteristic`, `interbedding`,
  `bedding`, `compositeLayer`); and document-level fields
  (`deliveryAccountableParty`, `soilUse`, `meanHighestGroundwaterLevel`,
  `meanLowestGroundwaterLevel`, `temporaryCasingUsed`, `flushingMediumUsed`,
  `preparation`).
- BHR-GT-BMA: newly parsed lab-determination fields, including `conusType`
  (consistency limits), `penetrationDepth` (plasticity), `lutumCorrectionApplied`
  (organic matter), `sampleContainerVolume` (density of solids), the nested
  `madeSpecimenForLoading` (triaxial) and `saturationStageAtCompression`
  (oedometer) containers, the `stressChangeDuringSettlement` time-series, and the
  <63µm particle-size distribution fields (e.g. `fraction2to32um`).
- Exported types `SaturationStageAtCompression`, `SpecimenMadeForLoading`, and
  `StressAtSpecificSettlement`.

### Changed

- **BREAKING:** All date and dateTime fields are now `string | null` (the raw
  ISO 8601 lexical value) instead of `Date`. This applies to every temporal
  field across CPT, BHR-G and BHR-GT results, including registration/report
  timestamps, event dates and measurement times. Construct a `Date` (or
  `Temporal`) value yourself when needed, e.g. `new Date(value)`.
- **BREAKING:** `deliveredVerticalPositionDatum` and
  `deliveredVerticalPositionReferencePoint` are no longer lowercased; the
  original BRO code-list casing is preserved (e.g. `"NAP"` instead of `"nap"`).

### Fixed

- Partial dates are no longer silently dropped. BRO date elements are a choice
  of full date (`YYYY-MM-DD`), year-month (`YYYY-MM`), year (`YYYY`) or
  `voidReason`; date xpaths now read the wrapper element, so year-month and year
  values are parsed at their original precision instead of becoming `null`. A
  `voidReason` (e.g. `onbekend`) still yields `null`.
- Removed the UTC-midnight off-by-one hazard: date-only values were parsed via
  `new Date("YYYY-MM-DD")` (interpreted as UTC midnight), which could report the
  previous day for consumers reading local date components. Values are now
  returned as-is.
- `parseGMLLocation` now reads `srsName` from a nested `gml:Point` when it is not
  present on the location element itself, so BHR-GT `deliveredLocation`
  coordinates and EPSG code are parsed correctly.
- `parseFloat` and `parseInt` now treat the literal `"NaN"` as `null` instead of
  logging a `Failed to parse float value` warning for every occurrence. BRO uses
  `"NaN"` as the missing-value marker in the BHR-GT-BMA lab value tables
  (settlement/consolidation time-series), whereas CPT uses the `-999999`
  sentinel.

### Removed

- **BREAKING:** Removed the exported `lowerText` resolver. Its only uses were the
  vertical-position fields above, which no longer need normalization.
- Removed the internal `parseJaNee` resolver; use `parseBoolean`, which already
  handles `ja`/`nee` (and `true`/`false`/`1`/`0`).

### Internal

- Centralized all date parsing on the single `parseDate` resolver. Several nested
  structures previously parsed dates inline with `new Date()`, duplicating logic
  and carrying the same bugs; these now route through `parseDate`.

[Unreleased]: https://github.com/bedrock-engineer/bro-xml-parser-ts/compare/v0.4.0...HEAD

[0.4.0]: https://github.com/bedrock-engineer/bro-xml-parser-ts/compare/v0.3.0...v0.4.0

[0.3.0]: https://github.com/bedrock-engineer/bro-xml-parser-ts/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/bedrock-engineer/bro-xml-parser-ts/compare/v0.1.7...v0.2.0
