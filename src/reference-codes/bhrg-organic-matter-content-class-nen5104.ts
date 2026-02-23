/**
 * OrganicMatterContentClassNEN5104 codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:OrganicMatterContentClassNEN5104
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AOrganicMatterContentClassNEN5104
 */

export const BHRG_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES: Record<string, string> = {
  humeus: "Organisch materiaal is aanwezig, maar het aandeel in de massa is niet bekend.",
  matigHumeus:
    "Organische stof maakt tussen 2,5 en 8 % van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 16 % bedragen.",
  nietHumeus: "Organische stof is niet aanwezig.",
  onbekend: "Het is niet bekend of organisch materiaal aanwezig is.",
  sterkHumeus:
    "Organische stof maakt tussen 8 en 16 % van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 30 % bedragen.",
  zwakHumeus:
    "Organische stof is aanwezig en maakt minder dan 2,5 % van de massa uit, tenzij de grond als een klei is benoemd dan kan het aandeel tot 5 % bedragen.",
};

/**
 * Get the Dutch description for a OrganicMatterContentClassNEN5104 code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgOrganicMatterContentClassNEN5104Description(
  code: string,
): string | undefined {
  return BHRG_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES[code];
}
