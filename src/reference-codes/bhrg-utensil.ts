/**
 * Utensil codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:Utensil
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AUtensil
 */

export const BHRG_UTENSIL_CODES: Record<string, string> = {
  beeldanalyseapparaat:
    "Voor het bepalen van de grootte en de vorm van zandkorrels is een beeldanalyseapparaat (image analyser) gebruikt.",
  binoculair: "Voor het bepalen van de kleur van zandkorrels is een binoculair gebruikt.",
  binoculairBeeldanalyseapparaat:
    "Voor het bepalen van de kleur van zandkorrels is een binoculair gebruikt en voor het bepalen van de grootte en de vorm van zandkorrels is een beeldanalyseapparaat (image analyser) gebruikt.",
  binoculairVergelijkingsmicroscoop:
    "Voor het bepalen van de kleur van zandkorrels is een binoculair gebruikt en voor het bepalen van de grootte en de vorm van zandkorrels is een vergelijkingsmicroscoop gebruikt.",
  binoculairVergelijkingsmicroscoopBeeldanalyseapparaat:
    "Voor het bepalen van de kleur van zandkorrels is een binoculair gebruikt en voor het bepalen van de grootte en de vorm van zandkorrels is een vergelijkingsmicroscoop en een beeldanalyseapparaat (image analyser) gebruikt.",
  vergelijkingsmicroscoop:
    "Voor het bepalen van de grootte en de vorm van zandkorrels is een vergelijkingsmicroscoop gebruikt.",
  vergelijkingsmicroscoopBeeldanalyseapparaat:
    "Voor het bepalen van de grootte en de vorm van zandkorrels is een vergelijkingsmicroscoop en een beeldanalyseapparaat (image analyser) gebruikt.",
};

/**
 * Get the Dutch description for a Utensil code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgUtensilDescription(code: string): string | undefined {
  return BHRG_UTENSIL_CODES[code];
}
