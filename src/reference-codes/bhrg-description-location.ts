/**
 * DescriptionLocation codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DescriptionLocation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescriptionLocation
 */

export const BHRG_DESCRIPTION_LOCATION_CODES: Record<string, string> = {
  lab: "De monsters zijn beschreven in een beschrijfruimte.",
  onbekend: "De plek waar de monsters zijn beschreven is niet bekend.",
  veld: "De monsters zijn beschreven in het veld, direct na monstername.",
  veldlab:
    "De monsters zijn beschreven in een container aan boord van een schip of een daarmee vergelijkbare ruimte, direct na monstername.",
};

/**
 * Get the Dutch description for a DescriptionLocation code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDescriptionLocationDescription(code: string): string | undefined {
  return BHRG_DESCRIPTION_LOCATION_CODES[code];
}
