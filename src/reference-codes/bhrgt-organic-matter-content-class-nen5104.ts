/**
 * OrganicMatterContentClassNEN5104 codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:OrganicMatterContentClassNEN5104
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AOrganicMatterContentClassNEN5104
 */

export const BHRGT_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES: Record<string, string> = {
  matigHumeus:
    "Organische stof maakt tussen 2,5 en 8 procent van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 16 procent bedragen.",
  nietHumeus: "Organische stof is niet aanwezig.",
  sterkHumeus:
    "Organische stof maakt tussen 8 en 16 procent van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 30 procent bedragen.",
  zwakHumeus:
    "Organische stof is aanwezig en maakt minder dan 2,5 procent van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 5 procent bedragen.",
};

/**
 * Get the Dutch description for a OrganicMatterContentClassNEN5104 code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtOrganicMatterContentClassNEN5104Description(
  code: string,
): string | undefined {
  return BHRGT_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES[code];
}
