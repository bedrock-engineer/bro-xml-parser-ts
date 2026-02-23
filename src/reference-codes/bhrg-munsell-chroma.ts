/**
 * MunsellChroma codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MunsellChroma
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMunsellChroma
 */

export const BHRG_MUNSELL_CHROMA_CODES: Record<string, string> = {
  "1": "De waarde van de zuiverheid is 1.",
  "2": "De waarde van de zuiverheid is 2.",
  "3": "De waarde van de zuiverheid is 3.",
  "4": "De waarde van de zuiverheid is 4.",
  "6": "De waarde van de zuiverheid is 6.",
  "8": "De waarde van de zuiverheid is 8.",
};

/**
 * Get the Dutch description for a MunsellChroma code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMunsellChromaDescription(code: string): string | undefined {
  return BHRG_MUNSELL_CHROMA_CODES[code];
}
