/**
 * Schema presets for common extraction patterns
 *
 * These presets can be used directly or extended for custom needs. They are
 * authored with `satisfies Schema` (rather than a `: Schema` annotation) so each
 * field's literal type is preserved — that lets `parseCustom` infer a precise
 * return type from the preset instead of collapsing every field to
 * `string | null`.
 *
 * @example
 * ```typescript
 * import { BROParser, presets } from '@bedrock-engineer/bro-xml';
 *
 * const parser = new BROParser(new XMLAdapter());
 *
 * // Use a preset directly
 * const locationData = parser.parseCustom(xml, presets.CPT_LOCATION_ONLY, 'CPT');
 * locationData.deliveredLocation; // Location | null — inferred
 *
 * // Or extend a preset (keep `satisfies Schema` to preserve inference)
 * const mySchema = {
 *   ...presets.CPT_METADATA_ONLY,
 *   customField: { xpath: './my/custom/path' },
 * } satisfies Schema;
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
export const CPT_ID_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
} satisfies Schema;

/**
 * CPT: Location data only (delivered and standardized coordinates)
 */
export const CPT_LOCATION_ONLY = {
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
} satisfies Schema;

/**
 * CPT: Basic metadata without measurement data
 */
export const CPT_METADATA_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dscpt:researchReportDate",
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
} satisfies Schema;

// ============================================================================
// BHR-GT (Geotechnical Borehole) Presets
// ============================================================================

/**
 * BHR-GT: Just the BRO ID and quality regime
 */
export const BORE_ID_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
} satisfies Schema;

/**
 * BHR-GT: Location data only
 */
export const BORE_LOCATION_ONLY = {
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
} satisfies Schema;

/**
 * BHR-GT: Basic metadata without layer data
 */
export const BORE_METADATA_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dsbhrgt:reportHistory/dsbhrgt:reportStartDate",
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
} satisfies Schema;

// ============================================================================
// BHR-G (Geological Borehole) Presets
// ============================================================================

/**
 * BHR-G: Just the BRO ID and quality regime
 */
export const BHRG_ID_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
} satisfies Schema;

/**
 * BHR-G: Location data only
 */
export const BHRG_LOCATION_ONLY = {
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
} satisfies Schema;

/**
 * BHR-G: Basic metadata without layer data
 */
export const BHRG_METADATA_ONLY = {
  broId: { xpath: "brocom:broId" },
  qualityRegime: { xpath: "brocom:qualityRegime" },
  researchReportDate: {
    xpath: "./dsbhrg:researchReportDate",
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
} satisfies Schema;
