# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the major version is `0`, breaking changes are released as minor versions.

## [Unreleased]

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

[Unreleased]: https://github.com/bedrock-engineer/bro-xml-parser-ts/compare/v0.1.7...HEAD
