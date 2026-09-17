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

import type { Location } from "../types/index.js";
import { text, date, boolean_, object_, custom } from "../core/producer.js";
import type { CustomProducer } from "../core/producer.js";

/**
 * The shared `brocom:RegistrationObject` base fields, as producers. Spread this
 * into a domain's object producer so the common surface is defined once.
 */
export const COMMON_REGISTRATION_PRODUCERS = {
  broId: text("brocom:broId"),
  qualityRegime: text("brocom:qualityRegime"),
  deliveryAccountableParty: text("brocom:deliveryAccountableParty"),
  objectIdAccountableParty: text("brocom:objectIdAccountableParty"),
  deliveryResponsibleParty: text("brocom:deliveryResponsibleParty"),
};

/**
 * The BRO registration history, as an object producer.
 *
 * The container sits under the domain namespace but its children are all
 * `brocom:*` and identical across domains, so it is matched with a
 * namespace-agnostic `local-name()`. Absent container → `null` (optional).
 */
export const REGISTRATION_HISTORY = object_({
  at: "./*[local-name()='registrationHistory']",
  fields: {
    objectRegistrationTime: date("./brocom:objectRegistrationTime"),
    registrationStatus: text("./brocom:registrationStatus"),
    registrationCompletionTime: date("./brocom:registrationCompletionTime"),
    latestCorrectionTime: date("./brocom:latestCorrectionTime"),
    latestAdditionTime: date("./brocom:latestAdditionTime"),
    underReviewTime: date("./brocom:underReviewTime"),
    deregistrationTime: date("./brocom:deregistrationTime"),
    reregistrationTime: date("./brocom:reregistrationTime"),
    corrected: boolean_("./brocom:corrected"),
    underReview: boolean_("./brocom:underReview"),
    deregistered: boolean_("./brocom:deregistered"),
    reregistered: boolean_("./brocom:reregistered"),
  },
});

/**
 * A GML `Point` location → {@link Location}, as a custom producer.
 *
 * Reads the EPSG code from the `srsName` attribute (on the location element or a
 * nested `gml:Point`) and the `gml:pos` coordinates. Returns `null` when the CRS
 * or coordinates are absent/unparseable. `at` is the relative XPath to the
 * location element (differs per domain).
 */
export function gmlLocation(at: string): CustomProducer<Location | null> {
  return custom<Location | null>({
    at,
    produce: (lens) => {
      const srsName = lens.attr("./@srsName") ?? lens.attr(".//gml:Point/@srsName");
      if (!srsName) {
        return null;
      }
      const epsgMatch = /EPSG::?(\d+)/i.exec(srsName);
      const epsg = epsgMatch?.[1] ? `EPSG:${epsgMatch[1]}` : srsName;

      const posText = lens.textAt(".//gml:pos");
      if (!posText) {
        return null;
      }
      const coords = posText.split(/\s+/).map(Number);
      const [x, y] = coords;
      if (x === undefined || y === undefined || isNaN(x) || isNaN(y)) {
        return null;
      }
      return { x, y, epsg };
    },
  });
}
