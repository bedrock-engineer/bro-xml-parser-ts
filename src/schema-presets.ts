/**
 * Schema presets for common extraction patterns.
 *
 * Each preset is a {@link project} selection over the full producer schema, so it
 * carries no hand-written XPaths — just the fields to keep, by name. Pass one to
 * {@link BROParser.parseSelection}; the return type is the projected shape plus
 * `meta`.
 *
 * @example
 * ```typescript
 * import { BROParser, presets } from '@bedrock-engineer/bro-xml-parser/node';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const location = parser.parseSelection(xml, presets.CPT_LOCATION_ONLY, 'CPT');
 * location.deliveredLocation; // Location | null — inferred
 * ```
 *
 * To extend a preset, write your own {@link project} selection over the same
 * producer (e.g. `CPT_PRODUCER`) with the extra fields.
 */

import { project } from "./core/select.js";
import { CPT_PRODUCER } from "./schemas/cpt-schema.js";
import { BORE_PRODUCER } from "./schemas/bore-schema.js";
import { BHRG_PRODUCER } from "./schemas/bhrg-schema.js";

// ============================================================================
// CPT Presets
// ============================================================================

/** CPT: just the BRO ID and quality regime. */
export const CPT_ID_ONLY = project(CPT_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
}));

/** CPT: location data only (delivered + standardized coordinates). */
export const CPT_LOCATION_ONLY = project(CPT_PRODUCER, (t) => ({
  broId: t.broId,
  deliveredLocation: t.deliveredLocation.location,
  standardizedLocation: t.standardizedLocation.location,
  deliveredVerticalPositionOffset: t.deliveredVerticalPosition.offset,
}));

/** CPT: basic metadata without measurement data. */
export const CPT_METADATA_ONLY = project(CPT_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
  researchReportDate: t.researchReportDate,
  deliveredLocation: t.deliveredLocation.location,
  cptStandard: t.cptStandard,
  qualityClass: t.conePenetrometerSurvey.qualityClass,
  finalDepth: t.conePenetrometerSurvey.trajectory.finalDepth,
}));

// ============================================================================
// BHR-GT (Geotechnical Borehole) Presets
// ============================================================================

/** BHR-GT: just the BRO ID and quality regime. */
export const BORE_ID_ONLY = project(BORE_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
}));

/** BHR-GT: location data only. */
export const BORE_LOCATION_ONLY = project(BORE_PRODUCER, (t) => ({
  broId: t.broId,
  deliveredLocation: t.deliveredLocation.location,
  standardizedLocation: t.standardizedLocation.location,
  deliveredVerticalPositionOffset: t.deliveredVerticalPosition.offset,
}));

/** BHR-GT: basic metadata without layer data. */
export const BORE_METADATA_ONLY = project(BORE_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
  researchReportDate: t.researchReportDate,
  deliveredLocation: t.deliveredLocation.location,
  descriptionProcedure: t.boreholeSampleDescription.descriptionProcedure,
  finalBoreDepth: t.boring.finalDepthBoring,
  boreRockReached: t.boring.rockReached,
}));

// ============================================================================
// BHR-G (Geological Borehole) Presets
// ============================================================================

/** BHR-G: just the BRO ID and quality regime. */
export const BHRG_ID_ONLY = project(BHRG_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
}));

/** BHR-G: location data only. */
export const BHRG_LOCATION_ONLY = project(BHRG_PRODUCER, (t) => ({
  broId: t.broId,
  deliveredLocation: t.deliveredLocation.location,
  standardizedLocation: t.standardizedLocation.location,
  deliveredVerticalPositionOffset: t.deliveredVerticalPosition.offset,
}));

/** BHR-G: basic metadata without layer data. */
export const BHRG_METADATA_ONLY = project(BHRG_PRODUCER, (t) => ({
  broId: t.broId,
  qualityRegime: t.qualityRegime,
  researchReportDate: t.researchReportDate,
  deliveredLocation: t.deliveredLocation.location,
  descriptionProcedure: t.boreholeSampleDescription.descriptionProcedure,
  finalBoreDepth: t.boring.finalDepthBoring,
  boreRockReached: t.boring.rockReached,
}));
