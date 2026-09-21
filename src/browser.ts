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
  DissipationMeasurement,
  BHRGTData,
  BHRGData,
  GMWData,
  GLDData,
  BROData,
  BROFileType,
  Location,
  ParseMeta,
  Namespaces,
  QualityRegime,
} from "./types/index.js";
export type { RegistrationHistory } from "./schemas/common-fields.js";

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
  RockDescription,
  RockWeatheringDegree,
  Grainshape,
  BoredInterval,
  SampledInterval,
  SamplerDetails,
  CoreRecovery,
  CompletedInterval,
  PostSedimentaryDiscontinuity,
  ExcavatedLayer,
  BoringVelocityMeasurement,
  NotDescribedInterval,
  FluidMudLayer,
} from "./schemas/bore-schema.js";
export type {
  HeightAtSpecificTime,
  StressAtSpecificSettlement,
  VolumeChangeAtSpecificTime,
  ShearStressAtSpecificStrain,
  HorizontalDeformationDataPoint,
  BoreholeSampleAnalysis,
  InvestigatedInterval,
  WaterContentDetermination,
  VolumetricMassDensityDetermination,
  OrganicMatterContentDetermination,
  CarbonateContentDetermination,
  VolumetricMassDensityOfSolidsDetermination,
  MaximumUndrainedShearStrengthDetermination,
  ParticleSizeDistributionDetermination,
  ConsistencyLimitsDetermination,
  SettlementCharacteristicsDetermination,
  SettlementDeterminationStep,
  SaturationStageAtCompression,
  SaturatedPermeabilityDetermination,
  ShearStressChangeDuringLoadingDetermination,
  ConsolidationStepAtHorizontalDeformation,
  ShearStressChangeDuringHorizontalDeformationDetermination,
  PlasticityAtSpecificWaterContent,
  SaturatedPermeabilityAtSpecificDensity,
  SaturatedPermeabilityAtSpecificLoad,
  MembraneCorrection,
  DrainageStripCorrection,
  SpecimenMadeForLoading,
  SaturationStageAtLoading,
  ConsolidationStageAtLoading,
  LoadStage,
  ConsolidationStageAtHorizontalDeformation,
  ShearStageAtHorizontalDeformation,
} from "./schemas/bhrgt-analysis.js";
export type {
  GLDObservation,
  GLDObservationPoint,
  GroundwaterMonitoringTubeRef,
} from "./schemas/gld-schema.js";
export { BHRG_PRODUCER } from "./schemas/bhrg-schema.js";
export type {
  BHRGLayer,
  MunsellColour,
  SandFraction,
  SandConstituent,
  ShellFraction,
  ShellConstituent,
  GravelFraction,
  GravelConstituent,
  PeatFraction,
  PeatConstituent,
  Chunk,
  FractionDistribution,
  FineFractionDistributionOrganicSoil,
  FineFractionDistributionShellySoil,
  Mottle,
  ThinStratum,
  ReportHistory,
  IntermediateEvent,
} from "./schemas/bhrg-schema.js";
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
