/**
 * FlushingAdditive codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:FlushingAdditive
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AFlushingAdditive
 */

export const BHRGT_FLUSHING_ADDITIVE_CODES: Record<string, string> = {
  bentoniet:
    "Water met toevoeging van bentoniet om de viscositeit te verhogen en circulatieverlies te verminderen.",
  bentonietBariet:
    "Water met toevoeging van bentoniet en bariumsulfaat om het soortelijk gewicht te verhogen.",
  bentonietMicrodolomiet:
    "Water met toevoeging van bentoniet en microdolomiet om het soortelijk gewicht te verhogen.",
  geen: "Water zonder toevoeging.",
  onbekend: "Het is niet bekend welk materiaal als spoeling is gebruikt. ",
  polymeren:
    "Water met toevoeging van (biologisch afbreekbare) polymeren als CMC om de viscositeit te verhogen en circulatieverlies te verminderen.",
};

/**
 * Get the Dutch description for a FlushingAdditive code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtFlushingAdditiveDescription(code: string): string | undefined {
  return BHRGT_FLUSHING_ADDITIVE_CODES[code];
}
