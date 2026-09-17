/**
 * Shared brocom (BRO common) schema fields.
 *
 * These map the `brocom:RegistrationObject` base elements that every BRO
 * registration type (CPT, BHR-GT, BHR-G, ...) carries with identical paths and
 * meaning. Spread this into each domain schema so the common surface is defined
 * once and stays consistent - mirrors how the XSDs model these via
 * complexContent extension of `brocom:RegistrationObject`.
 *
 * `registrationHistory` is intentionally NOT here: it is a brocom structure too,
 * but its container element sits under the domain namespace (dscpt/dsbhrgt/dsbhrg)
 * and is parsed by a domain-specific resolver, so each schema binds it itself.
 */

import type { Schema } from "../types/index.js";

export const COMMON_REGISTRATION_FIELDS: Schema = {
  broId: {
    xpath: "brocom:broId",
  },
  qualityRegime: {
    xpath: "brocom:qualityRegime",
  },
  deliveryAccountableParty: {
    xpath: "brocom:deliveryAccountableParty",
  },
  objectIdAccountableParty: {
    xpath: "brocom:objectIdAccountableParty",
  },
  deliveryResponsibleParty: {
    xpath: "brocom:deliveryResponsibleParty",
  },
};
