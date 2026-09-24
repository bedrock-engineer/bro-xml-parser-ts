/**
 * GMW schema — GENERATED from the official XSD by scripts/codegen-schema.ts.
 * Do not edit by hand. Structural warts are supplied by ./gmw-curation.ts.
 *
 * @generated from https://schema.broservices.nl/xsd/dsgmw/1.1/dsgmw-messages.xsd
 */

import { array, boolean, code, date, integer, number, object, text } from "../core/producer.js";
import { gmlLocation } from "./common-fields.js";


export const GMW_PRODUCER = object({
  fields: {
    broId: text("./brocom:broId"),
    deliveryAccountableParty: text("./brocom:deliveryAccountableParty"),
    objectIdAccountableParty: text("./brocom:objectIdAccountableParty"),
    deliveryResponsibleParty: text("./brocom:deliveryResponsibleParty"),
    qualityRegime: text("./brocom:qualityRegime"),
    withPrehistory: boolean("./dsgmw:withPrehistory"),
    deliveryContext: code("./dsgmw:deliveryContext"),
    constructionStandard: code("./dsgmw:constructionStandard"),
    initialFunction: code("./dsgmw:initialFunction"),
    removed: boolean("./dsgmw:removed"),
    numberOfMonitoringTubes: integer("./dsgmw:numberOfMonitoringTubes"),
    groundLevelStable: text("./dsgmw:groundLevelStable"),
    wellStability: code("./dsgmw:wellStability"),
    nitgCode: text("./dsgmw:nitgCode"),
    wellCode: text("./dsgmw:wellCode"),
    owner: text("./dsgmw:owner"),
    maintenanceResponsibleParty: text("./dsgmw:maintenanceResponsibleParty"),
    wellHeadProtector: code("./dsgmw:wellHeadProtector"),
    deliveredLocation: object({ at: "./dsgmw:deliveredLocation", fields: {
      location: gmlLocation("./gmwcommon:location"),
      horizontalPositioningMethod: code("./gmwcommon:horizontalPositioningMethod"),
    } }),
    deliveredVerticalPosition: object({ at: "./dsgmw:deliveredVerticalPosition", fields: {
      localVerticalReferencePoint: code("./gmwcommon:localVerticalReferencePoint"),
      offset: number("./gmwcommon:offset"),
      verticalDatum: code("./gmwcommon:verticalDatum"),
      groundLevelPosition: number("./gmwcommon:groundLevelPosition"),
      groundLevelPositioningMethod: code("./gmwcommon:groundLevelPositioningMethod"),
    } }),
    standardizedLocation: object({ at: "./dsgmw:standardizedLocation", fields: {
      location: gmlLocation("./brocom:location"),
      coordinateTransformation: code("./brocom:coordinateTransformation"),
    } }),
    registrationHistory: object({ at: "./dsgmw:registrationHistory", fields: {
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
    wellHistory: object({ at: "./dsgmw:wellHistory", fields: {
      wellConstructionDate: date("./dsgmw:wellConstructionDate"),
      wellRemovalDate: date("./dsgmw:wellRemovalDate"),
      intermediateEvent: array({ each: "./dsgmw:intermediateEvent", item: object({ fields: {
        eventName: code("./dsgmw:eventName"),
        eventDate: date("./dsgmw:eventDate"),
        eventData: object({ at: "./dsgmw:eventData", fields: {
          tubeData: array({ each: "./dsgmw:tubeData", item: object({ fields: {
            tubeNumber: integer("./dsgmw:tubeNumber"),
            tubeTopDiameter: number("./dsgmw:tubeTopDiameter"),
            variableDiameter: boolean("./dsgmw:variableDiameter"),
            tubeStatus: code("./dsgmw:tubeStatus"),
            tubeTopPosition: number("./dsgmw:tubeTopPosition"),
            tubeTopPositioningMethod: code("./dsgmw:tubeTopPositioningMethod"),
            tubePartInserted: boolean("./dsgmw:tubePartInserted"),
            tubeMaterial: code("./dsgmw:tubeMaterial"),
            glue: code("./dsgmw:glue"),
            screenTopPosition: number("./dsgmw:screenTopPosition"),
            screenBottomPosition: number("./dsgmw:screenBottomPosition"),
            plainTubePartLength: number("./dsgmw:plainTubePartLength"),
            insertedPartLength: number("./dsgmw:insertedPartLength"),
            insertedPartDiameter: number("./dsgmw:insertedPartDiameter"),
            insertedPartMaterial: code("./dsgmw:insertedPartMaterial"),
          } }) }),
          electrodeData: array({ each: "./dsgmw:electrodeData", item: object({ fields: {
            tubeNumber: integer("./dsgmw:tubeNumber"),
            cableNumber: integer("./dsgmw:cableNumber"),
            electrodeNumber: integer("./dsgmw:electrodeNumber"),
            electrodeStatus: code("./dsgmw:electrodeStatus"),
            electrodePosition: number("./dsgmw:electrodePosition"),
          } }) }),
          wellData: object({ at: "./dsgmw:wellData", fields: {
            owner: text("./dsgmw:owner"),
            maintenanceResponsibleParty: text("./dsgmw:maintenanceResponsibleParty"),
            groundLevelPosition: number("./dsgmw:groundLevelPosition"),
            groundLevelPositioningMethod: code("./dsgmw:groundLevelPositioningMethod"),
            wellHeadProtector: code("./dsgmw:wellHeadProtector"),
          } }),
          survey: array({ each: "./dsgmw:survey/dsgmw:Survey", item: object({ fields: {
            geotechnicalCPTSurveyData: object({ at: "./dsgmw:GeotechnicalCPTSurveyData", fields: {
              broId: text("./dsgmw:broId"),
            } }),
            boreholeResearchData: object({ at: "./dsgmw:BoreholeResearchData", fields: {
              broId: text("./dsgmw:broId"),
            } }),
          } }) }),
        } }),
      } }) }),
    } }),
    monitoringTube: array({ each: "./dsgmw:monitoringTube", item: object({ fields: {
      tubeNumber: integer("./dsgmw:tubeNumber"),
      tubeType: code("./dsgmw:tubeType"),
      artesianWellCapPresent: text("./dsgmw:artesianWellCapPresent"),
      sedimentSumpPresent: text("./dsgmw:sedimentSumpPresent"),
      numberOfGeoOhmCables: integer("./dsgmw:numberOfGeoOhmCables"),
      tubeTopDiameter: number("./dsgmw:tubeTopDiameter"),
      variableDiameter: text("./dsgmw:variableDiameter"),
      tubeStatus: code("./dsgmw:tubeStatus"),
      tubeTopPosition: number("./dsgmw:tubeTopPosition"),
      tubeTopPositioningMethod: code("./dsgmw:tubeTopPositioningMethod"),
      tubePartInserted: boolean("./dsgmw:tubePartInserted"),
      tubeInUse: text("./dsgmw:tubeInUse"),
      materialUsed: object({ at: "./dsgmw:materialUsed", fields: {
        tubePackingMaterial: code("./gmwcommon:tubePackingMaterial"),
        tubeMaterial: code("./gmwcommon:tubeMaterial"),
        glue: code("./gmwcommon:glue"),
      } }),
      screen: object({ at: "./dsgmw:screen", fields: {
        screenLength: number("./dsgmw:screenLength"),
        screenProtection: code("./dsgmw:screenProtection"),
        sockMaterial: code("./dsgmw:sockMaterial"),
        screenTopPosition: number("./dsgmw:screenTopPosition"),
        screenBottomPosition: number("./dsgmw:screenBottomPosition"),
      } }),
      plainTubePart: object({ at: "./dsgmw:plainTubePart", fields: {
        plainTubePartLength: number("./gmwcommon:plainTubePartLength"),
      } }),
      sedimentSump: object({ at: "./dsgmw:sedimentSump", fields: {
        sedimentSumpLength: number("./gmwcommon:sedimentSumpLength"),
      } }),
      insertedPart: object({ at: "./dsgmw:insertedPart", fields: {
        insertedPartLength: number("./gmwcommon:insertedPartLength"),
        insertedPartDiameter: number("./gmwcommon:insertedPartDiameter"),
        insertedPartMaterial: code("./gmwcommon:insertedPartMaterial"),
      } }),
      geoOhmCable: array({ each: "./dsgmw:geoOhmCable", item: object({ fields: {
        cableNumber: integer("./dsgmw:cableNumber"),
        cableInUse: text("./dsgmw:cableInUse"),
        electrode: array({ each: "./dsgmw:electrode", item: object({ fields: {
          electrodeNumber: integer("./gmwcommon:electrodeNumber"),
          electrodePackingMaterial: code("./gmwcommon:electrodePackingMaterial"),
          electrodeStatus: code("./gmwcommon:electrodeStatus"),
          electrodePosition: number("./gmwcommon:electrodePosition"),
        } }) }),
      } }) }),
    } }) }),
    isAbroad: boolean("./dsgmw:isAbroad"),
    geometricDataPubliclyAvailable: boolean("./dsgmw:geometricDataPubliclyAvailable"),
    survey: array({ each: "./dsgmw:survey/gmwcommon:Survey", item: object({ fields: {
      boreholeResearch: object({ at: "./gmwcommon:BoreholeResearch", fields: {
        broId: text("./gmwcommon:broId"),
      } }),
      geotechnicalCPTSurvey: object({ at: "./gmwcommon:GeotechnicalCPTSurvey", fields: {
        broId: text("./gmwcommon:broId"),
      } }),
    } }) }),
  },
});
