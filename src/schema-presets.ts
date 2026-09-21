/**
 * Schema presets for common extraction patterns.
 *
 * Each preset is a bare map of field name → {@link Producer}, built from the
 * `producers` authoring surface. Pass one to {@link BROParser.parseCustom}; the
 * return type is inferred from the map (each field's producer output type, plus
 * `meta`). Presets can be used directly or spread into a larger custom map.
 *
 * @example
 * ```typescript
 * import { BROParser, presets, producers as p } from '@bedrock-engineer/bro-xml';
 *
 * const parser = new BROParser(new XMLAdapter());
 *
 * // Use a preset directly
 * const locationData = parser.parseCustom(xml, presets.CPT_LOCATION_ONLY, 'CPT');
 * locationData.deliveredLocation; // Location | null — inferred
 *
 * // Or extend a preset
 * const result = parser.parseCustom(xml, {
 *   ...presets.CPT_METADATA_ONLY,
 *   customField: p.text('./my/custom/path'),
 * }, 'CPT');
 * ```
 */

import { text, number_, date, boolean_, qualityClass } from "./core/producer.js";
import { gmlLocation } from "./schemas/common-fields.js";

// ============================================================================
// CPT Presets
// ============================================================================

/**
 * CPT: Just the BRO ID and quality regime
 */
export const CPT_ID_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
};

/**
 * CPT: Location data only (delivered and standardized coordinates)
 */
export const CPT_LOCATION_ONLY = {
  broId: text("brocom:broId"),
  deliveredLocation: gmlLocation("./dscpt:deliveredLocation/cptcommon:location"),
  standardizedLocation: gmlLocation("./dscpt:standardizedLocation/brocom:location"),
  deliveredVerticalPositionOffset: number_("./dscpt:deliveredVerticalPosition/cptcommon:offset"),
};

/**
 * CPT: Basic metadata without measurement data
 */
export const CPT_METADATA_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
  researchReportDate: date("./dscpt:researchReportDate"),
  deliveredLocation: gmlLocation("./dscpt:deliveredLocation/cptcommon:location"),
  cptStandard: text("./dscpt:cptStandard"),
  qualityClass: qualityClass("./dscpt:conePenetrometerSurvey/cptcommon:qualityClass"),
  finalDepth: number_("./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth"),
};

// ============================================================================
// BHR-GT (Geotechnical Borehole) Presets
// ============================================================================

/**
 * BHR-GT: Just the BRO ID and quality regime
 */
export const BORE_ID_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
};

/**
 * BHR-GT: Location data only
 */
export const BORE_LOCATION_ONLY = {
  broId: text("brocom:broId"),
  deliveredLocation: gmlLocation("./dsbhrgt:deliveredLocation/bhrgtcom:location"),
  standardizedLocation: gmlLocation("./dsbhrgt:standardizedLocation/brocom:location"),
  deliveredVerticalPositionOffset: number_("./dsbhrgt:deliveredVerticalPosition/bhrgtcom:offset"),
};

/**
 * BHR-GT: Basic metadata without layer data
 */
export const BORE_METADATA_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
  researchReportDate: date("./dsbhrgt:reportHistory/dsbhrgt:reportStartDate"),
  deliveredLocation: gmlLocation("./dsbhrgt:deliveredLocation/bhrgtcom:location"),
  descriptionProcedure: text("./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptionProcedure"),
  finalBoreDepth: number_("./dsbhrgt:boring/bhrgtcom:finalDepthBoring"),
  boreRockReached: boolean_("./dsbhrgt:boring/bhrgtcom:rockReached"),
};

// ============================================================================
// BHR-G (Geological Borehole) Presets
// ============================================================================

/**
 * BHR-G: Just the BRO ID and quality regime
 */
export const BHRG_ID_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
};

/**
 * BHR-G: Location data only
 */
export const BHRG_LOCATION_ONLY = {
  broId: text("brocom:broId"),
  deliveredLocation: gmlLocation("./dsbhrg:deliveredLocation/bhrgcom:location"),
  standardizedLocation: gmlLocation("./dsbhrg:standardizedLocation/brocom:location"),
  deliveredVerticalPositionOffset: number_("./dsbhrg:deliveredVerticalPosition/bhrgcom:offset"),
};

/**
 * BHR-G: Basic metadata without layer data
 */
export const BHRG_METADATA_ONLY = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
  researchReportDate: date("./dsbhrg:researchReportDate"),
  deliveredLocation: gmlLocation("./dsbhrg:deliveredLocation/bhrgcom:location"),
  descriptionProcedure: text(
    "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptionProcedure",
  ),
  finalBoreDepth: number_("./dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthBoring"),
  boreRockReached: boolean_("./dsbhrg:boring/bhrgcom:Boring/bhrgcom:rockReached"),
};
