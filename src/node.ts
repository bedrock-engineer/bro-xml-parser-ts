/**
 * Node.js entry point for BRO Parser
 *
 * Uses @xmldom/xmldom for DOM parsing and fontoxpath for XPath evaluation.
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from 'bro-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 * ```
 */

export { BROParser } from "./parser.js";

export { NodeXMLAdapter as XMLAdapter } from "./adapters/node-adapter.js";

export type {
  CPTData,
  CPTMeasurement,
  BHRGTData,
  BHRGTLayer,
  Grainshape,
  BHRGData,
  BHRGLayer,
  BROData,
  BROFileType,
  Location,
  ParseMeta,
  Schema,
  SchemaField,
  ResolverFunction,
  ResolverContext,
  Namespaces,
  BoreholeSampleAnalysis,
  InvestigatedInterval,
  ParticleSizeDistributionDetermination,
  ConsistencyLimitsDetermination,
  SettlementCharacteristicsDetermination,
  SaturatedPermeabilityDetermination,
  SaturatedPermeabilityAtSpecificDensity,
  ShearStressChangeDuringLoadingDetermination,
  SettlementDeterminationStep,
  ShearStressAtSpecificStrain,
  MaximumUndrainedShearStrengthDetermination,
  ShearStressChangeDuringHorizontalDeformationDetermination,
  ConsolidationStageAtHorizontalDeformation,
  ConsolidationStepAtHorizontalDeformation,
  ShearStageAtHorizontalDeformation,
  HorizontalDeformationDataPoint,
  HeightAtSpecificConsolidationTime,
  DissipationTest,
  DissipationMeasurement,
  QualityRegime,
  PlasticityAtSpecificWaterContent,
  HeightAtSpecificTime,
  MembraneCorrection,
  DrainageStripCorrection,
  SaturationStageAtLoading,
  VolumeChangeAtSpecificTime,
  ConsolidationStageAtLoading,
  LoadStage,
} from "./types/index.js";

export { BROParseError } from "./types/index.js";

export { SUPPORTED_VERSIONS } from "./core/version-detector.js";
export type { DataType } from "./core/version-detector.js";

export { CPT_SCHEMA } from "./schemas/cpt-schema.js";
export { BORE_SCHEMA } from "./schemas/bore-schema.js";
export { BHRG_SCHEMA } from "./schemas/bhrg-schema.js";

export { BRO_NAMESPACES, KNOWN_BRO_PREFIXES } from "./namespaces.js";

export { BRO_SOIL_COLORS, getSoilColor, isValidSoilColor, getSoilColorNames } from "./colors.js";

// Export resolvers for custom schema definitions
export * as resolvers from "./resolvers.js";

// Export schema presets for common use cases
export * as presets from "./schema-presets.js";
