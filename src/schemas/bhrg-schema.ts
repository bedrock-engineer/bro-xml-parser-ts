/**
 * BHR-G (Geological Borehole) schema definition
 *
 * Defines metadata fields for BHR-G data following BRO structure.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */

import type { Schema } from "../types/index.js";
import * as typeResolvers from "../resolvers/type-resolvers.js";
import * as gmlResolvers from "../resolvers/gml-resolvers.js";
import * as bhrgResolvers from "../resolvers/bhrg-resolvers.js";

export const BHRG_SCHEMA: Schema = {
  // === Core Identification ===

  broId: {
    xpath: "brocom:broId",
  },

  qualityRegime: {
    xpath: "brocom:qualityRegime",
  },

  // === Dates ===

  researchReportDate: {
    xpath: "./dsbhrg:researchReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  // === Location ===

  deliveredLocation: {
    xpath: "./dsbhrg:deliveredLocation/bhrgcom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  standardizedLocation: {
    xpath: "./dsbhrg:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  // === Vertical Position ===

  deliveredVerticalPositionOffset: {
    xpath: "./dsbhrg:deliveredVerticalPosition/bhrgcom:offset",
    resolver: typeResolvers.parseFloat,
  },

  deliveredVerticalPositionDatum: {
    xpath: "./dsbhrg:deliveredVerticalPosition/bhrgcom:verticalDatum",
    resolver: typeResolvers.lowerText,
  },

  deliveredVerticalPositionReferencePoint: {
    xpath: "./dsbhrg:deliveredVerticalPosition/bhrgcom:localVerticalReferencePoint",
    resolver: typeResolvers.lowerText,
  },

  // === Boring Metadata ===

  descriptionProcedure: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptionProcedure",
  },

  boreRockReached: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:rockReached",
    resolver: typeResolvers.parseBoolean,
  },

  finalBoreDepth: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthBoring",
    resolver: typeResolvers.parseFloat,
  },

  finalSampleDepth: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthSampling",
    resolver: typeResolvers.parseFloat,
  },

  boreHoleCompleted: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boreholeCompleted",
  },

  // === Boring Execution Details ===

  boringStartDate: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boringStartDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  boringEndDate: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boringEndDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  boringProcedure: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boringProcedure",
  },

  boringTechnique: {
    xpath:
      "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boredInterval/bhrgcom:BoredInterval/bhrgcom:boringTechnique",
  },

  trajectoryExcavated: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:trajectoryExcavated",
    resolver: typeResolvers.parseBoolean,
  },

  subsurfaceContaminated: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:subsurfaceContaminated",
    resolver: typeResolvers.parseBoolean,
  },

  stopCriterion: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:stopCriterion",
  },

  // === Sampling Details ===

  samplingProcedure: {
    xpath: "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:samplingProcedure",
  },

  samplingMethod: {
    xpath:
      "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:sampledInterval/bhrgcom:SampledInterval/bhrgcom:samplingMethod",
  },

  samplingQuality: {
    xpath:
      "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:sampledInterval/bhrgcom:SampledInterval/bhrgcom:samplingQuality",
  },

  // === Description Metadata ===

  descriptionQuality: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:descriptionQuality",
  },

  describedSamplesQuality: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:describedSamplesQuality",
  },

  descriptionLocation: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:descriptionLocation",
  },

  descriptionReportDate: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptionReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  describedMaterial: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:describedMaterial",
  },

  continuouslySampled: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:continuouslySampled",
    resolver: typeResolvers.parseBoolean,
  },

  sampleMoistness: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog/bhrgcom:sampleMoistness",
  },

  // === Layer Data ===

  data: {
    xpath:
      "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog",
    resolver: bhrgResolvers.processBHRGLayerData,
  },

  // === Boring Interval Arrays ===

  boredIntervals: {
    xpath: ".", // Use current context - resolver will find all bored intervals
    resolver: bhrgResolvers.processBHRGBoredIntervals,
  },

  sampledIntervals: {
    xpath: ".", // Use current context - resolver will find all sampled intervals
    resolver: bhrgResolvers.processBHRGSampledIntervals,
  },

  // === Administrative History ===

  registrationHistory: {
    xpath: ".", // Use current context - resolver will find registration history
    resolver: bhrgResolvers.processBHRGRegistrationHistory,
  },

  reportHistory: {
    xpath: ".", // Use current context - resolver will find report history
    resolver: bhrgResolvers.processBHRGReportHistory,
  },

  // === Additional Top-Level Metadata ===

  deliveryContext: {
    xpath: "./dsbhrg:deliveryContext",
  },

  surveyPurpose: {
    xpath: "./dsbhrg:surveyPurpose",
  },

  discipline: {
    xpath: "./dsbhrg:discipline",
  },

  surveyProcedure: {
    xpath: "./dsbhrg:surveyProcedure",
  },

  nitgCode: {
    xpath: "./dsbhrg:NITGCode",
  },
};
