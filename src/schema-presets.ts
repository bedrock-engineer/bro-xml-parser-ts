/**
 * Schema presets for common extraction patterns
 *
 * These presets can be used directly or extended for custom needs.
 *
 * @example
 * ```typescript
 * import { BROParser, presets } from '@bedrock-engineer/bro-xml';
 *
 * const parser = new BROParser(new XMLAdapter());
 *
 * // Use a preset directly
 * const locationData = parser.parseCustom(xml, presets.CPT_LOCATION_ONLY, 'CPT');
 *
 * // Or extend a preset
 * const mySchema = {
 *   ...presets.CPT_METADATA_ONLY,
 *   customField: { xpath: './my/custom/path' }
 * };
 * ```
 */

import type { Schema } from "./types/index.js";
import * as typeResolvers from "./resolvers/type-resolvers.js";
import * as gmlResolvers from "./resolvers/gml-resolvers.js";

// ============================================================================
// CPT Presets
// ============================================================================

/**
 * CPT: Just the BRO ID and quality regime
 */
export const CPT_ID_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
};

/**
 * CPT: Location data only (delivered and standardized coordinates)
 */
export const CPT_LOCATION_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  deliveredLocation: {
    xpath: "./dscpt:deliveredLocation/cptcommon:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  standardizedLocation: {
    xpath: "./dscpt:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  deliveredVerticalPositionOffset: {
    xpath: "./dscpt:deliveredVerticalPosition/cptcommon:offset",
    resolver: typeResolvers.parseFloat,
  },
};

/**
 * CPT: Basic metadata without measurement data
 */
export const CPT_METADATA_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dscpt:researchReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },
  deliveredLocation: {
    xpath: "./dscpt:deliveredLocation/cptcommon:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  cptStandard: { xpath: "./dscpt:cptStandard" },
  qualityClass: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:qualityClass",
    resolver: typeResolvers.parseQualityClass,
  },
  finalDepth: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth",
    resolver: typeResolvers.parseFloat,
  },
};

// ============================================================================
// BHR-GT (Geotechnical Borehole) Presets
// ============================================================================

/**
 * BHR-GT: Just the BRO ID and quality regime
 */
export const BORE_ID_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
};

/**
 * BHR-GT: Location data only
 */
export const BORE_LOCATION_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  deliveredLocation: {
    xpath: "./dsbhrgt:deliveredLocation/bhrgtcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  standardizedLocation: {
    xpath: "./dsbhrgt:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  deliveredVerticalPositionOffset: {
    xpath: "./dsbhrgt:deliveredVerticalPosition/bhrgtcom:offset",
    resolver: typeResolvers.parseFloat,
  },
};

/**
 * BHR-GT: Basic metadata without layer data
 */
export const BORE_METADATA_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dsbhrgt:reportHistory/dsbhrgt:reportStartDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },
  deliveredLocation: {
    xpath: "./dsbhrgt:deliveredLocation/bhrgtcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  descriptionProcedure: {
    xpath: "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptionProcedure",
  },
  finalBoreDepth: {
    xpath: "./dsbhrgt:boring/bhrgtcom:finalDepthBoring",
    resolver: typeResolvers.parseFloat,
  },
  boreRockReached: {
    xpath: "./dsbhrgt:boring/bhrgtcom:rockReached",
    resolver: typeResolvers.parseBoolean,
  },
};

// ============================================================================
// BHR-G (Geological Borehole) Presets
// ============================================================================

/**
 * BHR-G: Just the BRO ID and quality regime
 */
export const BHRG_ID_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
};

/**
 * BHR-G: Location data only
 */
export const BHRG_LOCATION_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  deliveredLocation: {
    xpath: "./dsbhrg:deliveredLocation/bhrgcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  standardizedLocation: {
    xpath: "./dsbhrg:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  deliveredVerticalPositionOffset: {
    xpath: "./dsbhrg:deliveredVerticalPosition/bhrgcom:offset",
    resolver: typeResolvers.parseFloat,
  },
};

/**
 * BHR-G: Basic metadata without layer data
 */
export const BHRG_METADATA_ONLY: Schema = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dsbhrg:researchReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },
  deliveredLocation: {
    xpath: "./dsbhrg:deliveredLocation/bhrgcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },
  descriptionProcedure: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptionProcedure",
  },
  finalBoreDepth: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthBoring",
    resolver: typeResolvers.parseFloat,
  },
  boreRockReached: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:rockReached",
    resolver: typeResolvers.parseBoolean,
  },
};
