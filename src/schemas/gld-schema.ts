/**
 * GLD schema — GENERATED from the official XSD by scripts/codegen-schema.ts.
 * Do not edit by hand. Structural warts are supplied by ./gld-curation.ts.
 *
 * @generated from https://schema.broservices.nl/xsd/dsgld/1.0/dsgld-messages.xsd
 */

import { array, boolean, code, date, integer, object, text } from "../core/producer.js";
import { OBSERVATIONS } from "./gld-curation.js";

export const GLD_PRODUCER = object({
  fields: {
    broId: text("./brocom:broId"),
    deliveryAccountableParty: text("./brocom:deliveryAccountableParty"),
    objectIdAccountableParty: text("./brocom:objectIdAccountableParty"),
    deliveryResponsibleParty: text("./brocom:deliveryResponsibleParty"),
    qualityRegime: text("./brocom:qualityRegime"),
    registrationHistory: object({ at: "./dsgld:registrationHistory", fields: {
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
    researchFirstDate: date("./dsgld:researchFirstDate"),
    researchLastDate: date("./dsgld:researchLastDate"),
    groundwaterMonitoringNet: array({ each: "./dsgld:groundwaterMonitoringNet/gldcommon:GroundwaterMonitoringNet", item: object({ fields: {
      broId: text("./gldcommon:broId"),
    } }) }),
    monitoringPoint: object({ at: "./dsgld:monitoringPoint/gldcommon:GroundwaterMonitoringTube", fields: {
      broId: text("./gldcommon:broId"),
      tubeNumber: integer("./gldcommon:tubeNumber"),
    } }),
    observation: OBSERVATIONS,
  },
});
