/**
 * BHR-GT (Geotechnical Borehole) schema definition
 *
 * Defines metadata fields for BHR-GT data following BRO structure.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */

import type { Schema } from "../types/index.js";
import * as typeResolvers from "../resolvers/type-resolvers.js";
import * as gmlResolvers from "../resolvers/gml-resolvers.js";
import * as boreResolvers from "../resolvers/bore-resolvers.js";

export const BORE_SCHEMA: Schema = {
  // === Core Identification ===

  broId: {
    xpath: "brocom:broId",
  },

  qualityRegime: {
    xpath: "brocom:qualityRegime",
  },

  // === Dates ===

  researchReportDate: {
    xpath: "./dsbhrgt:reportHistory/dsbhrgt:reportStartDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  // === Location ===

  deliveredLocation: {
    xpath: "./dsbhrgt:deliveredLocation/bhrgtcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  standardizedLocation: {
    xpath: "./dsbhrgt:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  // === Vertical Position ===

  deliveredVerticalPositionOffset: {
    xpath: "./dsbhrgt:deliveredVerticalPosition/bhrgtcom:offset",
    resolver: typeResolvers.parseFloat,
  },

  deliveredVerticalPositionDatum: {
    xpath: "./dsbhrgt:deliveredVerticalPosition/bhrgtcom:verticalDatum",
    resolver: typeResolvers.lowerText,
  },

  deliveredVerticalPositionReferencePoint: {
    xpath: "./dsbhrgt:deliveredVerticalPosition/bhrgtcom:localVerticalReferencePoint",
    resolver: typeResolvers.lowerText,
  },

  // === Boring Metadata ===

  descriptionProcedure: {
    xpath: "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptionProcedure",
  },

  groundwaterLevel: {
    xpath: "./dsbhrgt:boring/bhrgtcom:groundwaterLevel",
    resolver: typeResolvers.parseFloat,
  },

  boreRockReached: {
    xpath: "./dsbhrgt:boring/bhrgtcom:rockReached",
    resolver: typeResolvers.parseBoolean,
  },

  finalBoreDepth: {
    xpath: "./dsbhrgt:boring/bhrgtcom:finalDepthBoring",
    resolver: typeResolvers.parseFloat,
  },

  finalSampleDepth: {
    xpath: "./dsbhrgt:boring/bhrgtcom:finalDepthSampling",
    resolver: typeResolvers.parseFloat,
  },

  boreHoleCompleted: {
    xpath: "./dsbhrgt:boring/bhrgtcom:boreholeCompleted",
    resolver: typeResolvers.parseBoolean,
  },

  // === Boring Execution Details ===

  boringStartDate: {
    xpath: "./dsbhrgt:boring/bhrgtcom:boringStartDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  boringEndDate: {
    xpath: "./dsbhrgt:boring/bhrgtcom:boringEndDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  boringProcedure: {
    xpath: "./dsbhrgt:boring/bhrgtcom:boringProcedure",
  },

  boringTechnique: {
    xpath: "./dsbhrgt:boring/bhrgtcom:boredInterval/bhrgtcom:boringTechnique",
  },

  trajectoryExcavated: {
    xpath: "./dsbhrgt:boring/bhrgtcom:trajectoryExcavated",
    resolver: typeResolvers.parseBoolean,
  },

  subsurfaceContaminated: {
    xpath: "./dsbhrgt:boring/bhrgtcom:subsurfaceContaminated",
    resolver: typeResolvers.parseBoolean,
  },

  stopCriterion: {
    xpath: "./dsbhrgt:boring/bhrgtcom:stopCriterion",
  },

  // === Sampler Details ===

  samplerType: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:samplerType",
  },

  samplingProcedure: {
    xpath: "./dsbhrgt:boring/bhrgtcom:samplingProcedure",
  },

  samplingMethod: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:samplingMethod",
  },

  samplingQuality: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:samplingQuality",
  },

  orientatedSampled: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:orientatedSampled",
    resolver: typeResolvers.parseBoolean,
  },

  // === Sample Container ===

  sampleContainerDiameter: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:sampleContainerDiameter",
    resolver: typeResolvers.parseFloat,
  },

  sampleContainerLength: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:sampleContainerLength",
    resolver: typeResolvers.parseFloat,
  },

  // === Sampler Equipment Details ===

  pistonPresent: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:pistonPresent",
    resolver: typeResolvers.parseBoolean,
  },

  coreCatcherPresent: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:coreCatcherPresent",
    resolver: typeResolvers.parseBoolean,
  },

  stockingUsed: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:stockingUsed",
    resolver: typeResolvers.parseBoolean,
  },

  lubricationFluidUsed: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:lubricationFluidUsed",
    resolver: typeResolvers.parseBoolean,
  },

  rightAngledCuttingShoe: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:rightAngledCuttingShoe",
    resolver: typeResolvers.parseBoolean,
  },

  cuttingShoeInsideDiameter: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:cuttingShoeInsideDiameter",
    resolver: typeResolvers.parseFloat,
  },

  cuttingShoeOutsideDiameter: {
    xpath:
      "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:cuttingShoeOutsideDiameter",
    resolver: typeResolvers.parseFloat,
  },

  taperAngle: {
    xpath: "./dsbhrgt:boring/bhrgtcom:sampledInterval/bhrgtcom:sampler/bhrgtcom:taperAngle",
    resolver: typeResolvers.parseFloat,
  },

  // === Description Metadata ===

  boreholeLogChecked: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:boreholeLogChecked",
    resolver: typeResolvers.parseBoolean,
  },

  descriptionQuality: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:descriptionQuality",
  },

  descriptionLocation: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:descriptionLocation",
  },

  descriptionReportDate: {
    xpath: "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptionReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  describedMaterial: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:describedMaterial",
  },

  continuouslySampled: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:continuouslySampled",
    resolver: typeResolvers.parseBoolean,
  },

  sampleMoistness: {
    xpath:
      "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:sampleMoistness",
  },

  // === Layer Data ===

  data: {
    xpath: "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog",
    resolver: boreResolvers.processBHRGTLayerData,
  },

  // === Laboratory Analysis (BHR-GT-BMA) ===

  analysis: {
    xpath: ".", // Use current context (BHR_GT_O element) - resolver will find boreholeSampleAnalysis
    resolver: boreResolvers.processBoreholeSampleAnalysis,
  },

  // === Boring Interval Arrays ===

  boredIntervals: {
    xpath: ".", // Use current context - resolver will find all bored intervals
    resolver: boreResolvers.processBoredIntervals,
  },

  sampledIntervals: {
    xpath: ".", // Use current context - resolver will find all sampled intervals
    resolver: boreResolvers.processSampledIntervals,
  },

  completedIntervals: {
    xpath: ".", // Use current context - resolver will find all completed intervals
    resolver: boreResolvers.processCompletedIntervals,
  },

  notDescribedIntervals: {
    xpath: ".", // Use current context - resolver will find all not described intervals
    resolver: boreResolvers.processNotDescribedIntervals,
  },

  // === Administrative History ===

  registrationHistory: {
    xpath: ".", // Use current context - resolver will find registration history
    resolver: boreResolvers.processRegistrationHistory,
  },

  reportHistory: {
    xpath: ".", // Use current context - resolver will find report history
    resolver: boreResolvers.processReportHistory,
  },

  // === Additional Top-Level Metadata ===

  deliveryContext: {
    xpath: "./dsbhrgt:deliveryContext",
  },

  surveyPurpose: {
    xpath: "./dsbhrgt:surveyPurpose",
  },

  discipline: {
    xpath: "./dsbhrgt:discipline",
  },

  surveyProcedure: {
    xpath: "./dsbhrgt:surveyProcedure",
  },

  siteCharacteristicDetermined: {
    xpath: "./dsbhrgt:siteCharacteristicDetermined",
    resolver: typeResolvers.parseBoolean,
  },
};
