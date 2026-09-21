/**
 * Browser entry point for BRO Parser
 *
 * Uses native browser DOMParser and XPath APIs (zero dependencies).
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from '@bedrock-engineer/bro-xml-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 * ```
 */

export { BROParser } from "./parser.js";

export { BrowserXMLAdapter as XMLAdapter } from "./adapters/browser-adapter.js";

export type {
  CPTData,
  CPTMeasurement,
  BHRGTData,
  Grainshape,
  BHRGData,
  BHRGLayer,
  MunsellColour,
  SandConstituent,
  SandFraction,
  ShellConstituent,
  ShellFraction,
  GravelConstituent,
  GravelFraction,
  PeatConstituent,
  PeatFraction,
  Chunk,
  FineFractionDistributionOrganicSoil,
  FineFractionDistributionShellySoil,
  FractionDistribution,
  Mottle,
  ThinStratum,
  GMWData,
  GLDData,
  BROData,
  BRORegistrationObject,
  BROFileType,
  Location,
  ParseMeta,
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
  MaximumUndrainedShearStrengthDetermination,
  ShearStressChangeDuringHorizontalDeformationDetermination,
  ConsolidationStageAtHorizontalDeformation,
  ConsolidationStepAtHorizontalDeformation,
  ShearStageAtHorizontalDeformation,
  HeightAtSpecificConsolidationTime,
  DissipationMeasurement,
  QualityRegime,
  PlasticityAtSpecificWaterContent,
  MembraneCorrection,
  DrainageStripCorrection,
  SaturationStageAtLoading,
  SaturationStageAtCompression,
  SpecimenMadeForLoading,
  ConsolidationStageAtLoading,
  LoadStage,
  RegistrationHistory,
  ReportHistory,
  IntermediateEvent,
  BoredInterval,
  SamplerDetails,
  SampledInterval,
  CoreRecovery,
  CompletedInterval,
  NotDescribedInterval,
  ExcavatedLayer,
  BoringVelocityMeasurement,
  FluidMudLayer,
  PostSedimentaryDiscontinuity,
  RockDescription,
  RockWeatheringDegree,
  SaturatedPermeabilityAtSpecificLoad,
  WaterContentDetermination,
  VolumetricMassDensityDetermination,
  OrganicMatterContentDetermination,
  CarbonateContentDetermination,
  VolumetricMassDensityOfSolidsDetermination,
} from "./types/index.js";

export { BROParseError } from "./types/index.js";

export { SUPPORTED_VERSIONS } from "./core/version-detector.js";
export type { DataType } from "./core/version-detector.js";

export { CPT_PRODUCER } from "./schemas/cpt-schema.js";
export type { DissipationTest, RemovedLayer } from "./schemas/cpt-schema.js";
export { BORE_PRODUCER } from "./schemas/bore-schema.js";
export type {
  BHRGTLayer,
  BHRGTLayerBase,
  BHRGTSoilLayer,
  BHRGTRockLayer,
} from "./schemas/bore-schema.js";
export type {
  HeightAtSpecificTime,
  StressAtSpecificSettlement,
  VolumeChangeAtSpecificTime,
  ShearStressAtSpecificStrain,
  HorizontalDeformationDataPoint,
} from "./schemas/bhrgt-analysis.js";
export type {
  GLDObservation,
  GLDObservationPoint,
  GroundwaterMonitoringTubeRef,
} from "./schemas/gld-schema.js";
export { BHRG_PRODUCER } from "./schemas/bhrg-schema.js";
export { GMW_PRODUCER } from "./schemas/gmw-schema.js";
export type {
  MonitoringTube,
  GeoOhmCable,
  Electrode,
  GMWIntermediateEvent,
} from "./schemas/gmw-schema.js";
export { GLD_PRODUCER } from "./schemas/gld-schema.js";

export { BRO_NAMESPACES, KNOWN_BRO_PREFIXES } from "./namespaces.js";

export { BRO_SOIL_COLORS, getSoilColor, isValidSoilColor, getSoilColorNames } from "./colors.js";

// The authoring surface for custom schemas (combinators + domain helpers).
export * as producers from "./producers.js";

// The producer schema types, for authoring and inferring custom schemas.
export type { Producer, NodeLens, Produced, ProducedFields } from "./core/producer.js";

// Export schema presets for common use cases
export * as presets from "./schema-presets.js";
