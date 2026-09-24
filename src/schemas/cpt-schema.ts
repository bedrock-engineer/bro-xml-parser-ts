/**
 * CPT schema — GENERATED from the official XSD by scripts/codegen-schema.ts.
 * Do not edit by hand. Structural warts are supplied by ./cpt-curation.ts.
 *
 * @generated from https://schema.broservices.nl/xsd/dscpt/1.1/dscpt-messages.xsd
 */

import { array, boolean, code, date, integer, number, object, text } from "../core/producer.js";
import { gmlLocation } from "./common-fields.js";
import { CONE_PENETRATION_TEST, DISSIPATION_TESTS } from "./cpt-curation.js";

export const CPT_PRODUCER = object({
  fields: {
    broId: text("./brocom:broId"),
    deliveryAccountableParty: text("./brocom:deliveryAccountableParty"),
    objectIdAccountableParty: text("./brocom:objectIdAccountableParty"),
    deliveryResponsibleParty: text("./brocom:deliveryResponsibleParty"),
    qualityRegime: text("./brocom:qualityRegime"),
    deliveryContext: code("./dscpt:deliveryContext"),
    surveyPurpose: code("./dscpt:surveyPurpose"),
    researchReportDate: date("./dscpt:researchReportDate"),
    cptStandard: code("./dscpt:cptStandard"),
    additionalInvestigationPerformed: text("./dscpt:additionalInvestigationPerformed"),
    standardizedLocation: object({ at: "./dscpt:standardizedLocation", fields: {
      location: gmlLocation("./brocom:location"),
      coordinateTransformation: code("./brocom:coordinateTransformation"),
    } }),
    researchOperator: text("./dscpt:researchOperator"),
    deliveredLocation: object({ at: "./dscpt:deliveredLocation", fields: {
      location: gmlLocation("./cptcommon:location"),
      horizontalPositioningDate: date("./cptcommon:horizontalPositioningDate"),
      horizontalPositioningMethod: code("./cptcommon:horizontalPositioningMethod"),
      horizontalPositioningOperator: text("./cptcommon:horizontalPositioningOperator"),
    } }),
    deliveredVerticalPosition: object({ at: "./dscpt:deliveredVerticalPosition", fields: {
      localVerticalReferencePoint: code("./cptcommon:localVerticalReferencePoint"),
      offset: number("./cptcommon:offset"),
      waterDepth: number("./cptcommon:waterDepth"),
      verticalDatum: code("./cptcommon:verticalDatum"),
      verticalPositioningDate: date("./cptcommon:verticalPositioningDate"),
      verticalPositioningMethod: code("./cptcommon:verticalPositioningMethod"),
      verticalPositioningOperator: text("./cptcommon:verticalPositioningOperator"),
    } }),
    additionalInvestigation: object({ at: "./dscpt:additionalInvestigation", fields: {
      investigationDate: date("./cptcommon:investigationDate"),
      conditions: text("./cptcommon:conditions"),
      surfaceDescription: text("./cptcommon:surfaceDescription"),
      groundwaterLevel: number("./cptcommon:groundwaterLevel"),
      removedLayer: array({ each: "./cptcommon:removedLayer", item: object({ fields: {
        sequenceNumber: integer("./cptcommon:sequenceNumber"),
        upperBoundary: number("./cptcommon:upperBoundary"),
        lowerBoundary: number("./cptcommon:lowerBoundary"),
        description: text("./cptcommon:description"),
      } }) }),
    } }),
    conePenetrometerSurvey: object({ at: "./dscpt:conePenetrometerSurvey", fields: {
      dissipationTestPerformed: boolean("./cptcommon:dissipationTestPerformed"),
      finalProcessingDate: date("./cptcommon:finalProcessingDate"),
      cptMethod: code("./cptcommon:cptMethod"),
      qualityClass: code("./cptcommon:qualityClass"),
      stopCriterion: code("./cptcommon:stopCriterion"),
      sensorAzimuth: number("./cptcommon:sensorAzimuth"),
      trajectory: object({ at: "./cptcommon:trajectory", fields: {
        predrilledDepth: number("./cptcommon:predrilledDepth"),
        finalDepth: number("./cptcommon:finalDepth"),
      } }),
      conePenetrometer: object({ at: "./cptcommon:conePenetrometer", fields: {
        description: text("./cptcommon:description"),
        conePenetrometerType: text("./cptcommon:conePenetrometerType"),
        coneSurfaceArea: number("./cptcommon:coneSurfaceArea"),
        coneDiameter: number("./cptcommon:coneDiameter"),
        coneSurfaceQuotient: number("./cptcommon:coneSurfaceQuotient"),
        coneToFrictionSleeveDistance: number("./cptcommon:coneToFrictionSleeveDistance"),
        frictionSleeveSurfaceArea: number("./cptcommon:frictionSleeveSurfaceArea"),
        frictionSleeveSurfaceQuotient: number("./cptcommon:frictionSleeveSurfaceQuotient"),
        zeroLoadMeasurement: object({ at: "./cptcommon:zeroLoadMeasurement", fields: {
          coneResistanceBefore: number("./cptcommon:coneResistanceBefore"),
          coneResistanceAfter: number("./cptcommon:coneResistanceAfter"),
          electricalConductivityBefore: number("./cptcommon:electricalConductivityBefore"),
          electricalConductivityAfter: number("./cptcommon:electricalConductivityAfter"),
          inclinationEWBefore: number("./cptcommon:inclinationEWBefore"),
          inclinationEWAfter: number("./cptcommon:inclinationEWAfter"),
          inclinationNSBefore: number("./cptcommon:inclinationNSBefore"),
          inclinationNSAfter: number("./cptcommon:inclinationNSAfter"),
          inclinationResultantBefore: number("./cptcommon:inclinationResultantBefore"),
          inclinationResultantAfter: number("./cptcommon:inclinationResultantAfter"),
          localFrictionBefore: number("./cptcommon:localFrictionBefore"),
          localFrictionAfter: number("./cptcommon:localFrictionAfter"),
          porePressureU1Before: number("./cptcommon:porePressureU1Before"),
          porePressureU1After: number("./cptcommon:porePressureU1After"),
          porePressureU2Before: number("./cptcommon:porePressureU2Before"),
          porePressureU2After: number("./cptcommon:porePressureU2After"),
          porePressureU3Before: number("./cptcommon:porePressureU3Before"),
          porePressureU3After: number("./cptcommon:porePressureU3After"),
        } }),
      } }),
      procedure: object({ at: "./cptcommon:procedure", fields: {
        interruptionProcessingPerformed: text("./cptcommon:interruptionProcessingPerformed"),
        expertCorrectionPerformed: text("./cptcommon:expertCorrectionPerformed"),
        signalProcessingPerformed: text("./cptcommon:signalProcessingPerformed"),
      } }),
      conePenetrationTest: CONE_PENETRATION_TEST,
      dissipationTest: DISSIPATION_TESTS,
    } }),
    registrationHistory: object({ at: "./dscpt:registrationHistory", fields: {
      objectRegistrationTime: date("./brocom:objectRegistrationTime"),
      registrationStatus: code("./brocom:registrationStatus"),
      latestAdditionTime: date("./brocom:latestAdditionTime"),
      registrationCompletionTime: date("./brocom:registrationCompletionTime"),
      corrected: boolean("./brocom:corrected"),
      latestCorrectionTime: date("./brocom:latestCorrectionTime"),
      underReview: boolean("./brocom:underReview"),
      underReviewTime: date("./brocom:underReviewTime"),
      deregistered: boolean("./brocom:deregistered"),
      deregistrationTime: date("./brocom:deregistrationTime"),
      reregistered: boolean("./brocom:reregistered"),
      reregistrationTime: date("./brocom:reregistrationTime"),
    } }),
  },
});
