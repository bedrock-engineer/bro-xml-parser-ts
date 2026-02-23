/**
 * CPT (Cone Penetration Test) schema definition
 *
 * Defines 42 metadata fields for CPT data.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */

import type { Schema } from "../types/index.js";
import * as typeResolvers from "../resolvers/type-resolvers.js";
import * as gmlResolvers from "../resolvers/gml-resolvers.js";
import * as measurementResolvers from "../resolvers/measurement-resolver.js";

export const CPT_SCHEMA: Schema = {
  // === Core Identification ===

  broId: {
    xpath: "brocom:broId",
  },

  qualityRegime: {
    xpath: "brocom:qualityRegime",
  },

  researchReportDate: {
    xpath: "./dscpt:researchReportDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  cptStandard: {
    xpath: "./dscpt:cptStandard",
  },

  // === Location ===

  deliveredLocation: {
    xpath: "./dscpt:deliveredLocation/cptcommon:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  standardizedLocation: {
    xpath: "./dscpt:standardizedLocation/brocom:location",
    resolver: gmlResolvers.parseGMLLocation,
  },

  // === Vertical Position ===

  deliveredVerticalPositionOffset: {
    xpath: "./dscpt:deliveredVerticalPosition/cptcommon:offset",
    resolver: typeResolvers.parseFloat,
  },

  deliveredVerticalPositionDatum: {
    xpath: "./dscpt:deliveredVerticalPosition/cptcommon:verticalDatum",
    resolver: typeResolvers.lowerText,
  },

  deliveredVerticalPositionReferencePoint: {
    xpath: "./dscpt:deliveredVerticalPosition/cptcommon:localVerticalReferencePoint",
    resolver: typeResolvers.lowerText,
  },

  // === Test Metadata ===

  cptMethod: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:cptMethod",
  },

  stopCriterion: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:stopCriterion",
  },

  dissipationtestPerformed: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:dissipationTestPerformed",
    resolver: typeResolvers.parseBoolean,
  },

  qualityClass: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:qualityClass",
    resolver: typeResolvers.parseQualityClass,
  },

  groundwaterLevel: {
    xpath: "./dscpt:additionalInvestigation/cptcommon:groundwaterLevel",
    resolver: typeResolvers.parseFloat,
  },

  predrilledDepth: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:predrilledDepth",
    resolver: typeResolvers.parseFloat,
  },

  finalDepth: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth",
    resolver: typeResolvers.parseFloat,
  },

  // === Processing Flags ===

  finalProcessingDate: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:finalProcessingDate/brocom:date",
    resolver: typeResolvers.parseDate,
  },

  signalProcessingPerformed: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:procedure/cptcommon:signalProcessingPerformed",
    resolver: typeResolvers.parseBoolean,
  },

  interruptionProcessingPerformed: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:procedure/cptcommon:interruptionProcessingPerformed",
    resolver: typeResolvers.parseBoolean,
  },

  expertCorrectionPerformed: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:procedure/cptcommon:expertCorrectionPerformed",
    resolver: typeResolvers.parseBoolean,
  },

  // === Equipment Specifications ===

  cptDescription: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:description",
  },

  cptType: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:conePenetrometerType",
  },

  coneSurfaceArea: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneSurfaceArea",
    resolver: typeResolvers.parseInt,
  },

  coneDiameter: {
    xpath: "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneDiameter",
    resolver: typeResolvers.parseInt,
  },

  coneSurfaceQuotient: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneSurfaceQuotient",
    resolver: typeResolvers.parseFloat,
  },

  coneToFrictionSleeveDistance: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:coneToFrictionSleeveDistance",
    resolver: typeResolvers.parseInt,
  },

  coneToFrictionSleeveSurfaceArea: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:frictionSleeveSurfaceArea",
    resolver: typeResolvers.parseInt,
  },

  coneToFrictionSleeveSurfaceQuotient: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:frictionSleeveSurfaceQuotient",
    resolver: typeResolvers.parseFloat,
  },

  // === Zero-Load Measurements (Equipment Calibration) ===

  // Cone Resistance
  zlmConeResistanceBefore: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:coneResistanceBefore",
    resolver: typeResolvers.parseFloat,
  },

  zlmConeResistanceAfter: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:coneResistanceAfter",
    resolver: typeResolvers.parseFloat,
  },

  // Inclination East-West
  zlmInclinationEwBefore: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationEWBefore",
    resolver: typeResolvers.parseInt,
  },

  zlmInclinationEwAfter: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationEWAfter",
    resolver: typeResolvers.parseInt,
  },

  // Inclination North-South
  zlmInclinationNsBefore: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationNSBefore",
    resolver: typeResolvers.parseInt,
  },

  zlmInclinationNsAfter: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationNSAfter",
    resolver: typeResolvers.parseInt,
  },

  // Inclination Resultant
  zlmInclinationResultantBefore: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationResultantBefore",
    resolver: typeResolvers.parseInt,
  },

  zlmInclinationResultantAfter: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:inclinationResultantAfter",
    resolver: typeResolvers.parseInt,
  },

  // Local Friction
  zlmLocalFrictionBefore: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:localFrictionBefore",
    resolver: typeResolvers.parseFloat,
  },

  zlmLocalFrictionAfter: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:localFrictionAfter",
    resolver: typeResolvers.parseFloat,
  },

  // Pore Pressure U1
  zlmPorePressureU1Before: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU1Before",
    resolver: typeResolvers.parseFloat,
  },

  zlmPorePressureU1After: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU1After",
    resolver: typeResolvers.parseFloat,
  },

  // Pore Pressure U2
  zlmPorePressureU2Before: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU2Before",
    resolver: typeResolvers.parseFloat,
  },

  zlmPorePressureU2After: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU2After",
    resolver: typeResolvers.parseFloat,
  },

  // Pore Pressure U3
  zlmPorePressureU3Before: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU3Before",
    resolver: typeResolvers.parseFloat,
  },

  zlmPorePressureU3After: {
    xpath:
      "./dscpt:conePenetrometerSurvey/cptcommon:conePenetrometer/cptcommon:zeroLoadMeasurement/cptcommon:porePressureU3After",
    resolver: typeResolvers.parseFloat,
  },

  // === Measurement Data ===

  data: {
    xpath: "./dscpt:conePenetrometerSurvey",
    resolver: measurementResolvers.processCPTResult,
  },

  // === Dissipation Tests ===

  dissipationTests: {
    xpath: "./dscpt:conePenetrometerSurvey",
    resolver: measurementResolvers.processDissipationTests,
  },
};
