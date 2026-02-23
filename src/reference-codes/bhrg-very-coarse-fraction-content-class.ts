/**
 * VeryCoarseFractionContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:VeryCoarseFractionContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVeryCoarseFractionContentClass
 */

export const BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_CODES: Record<string, string> = {
  geenZeerGroveFractie: "De grond bevat geen zeer grove korrels.",
  keienWeinigTotVeel:
    "De grond bestaat voor tussen 1 en 30 % van de massa uit zeer grove korrels en dat zijn vooral keien.",
  keienZeerVeel:
    "De grond bestaat voor tussen 30 en 50 % van de massa uit zeer grove korrels en dat zijn vooral keien.",
  keitjesWeinigTotVeel:
    "De grond bestaat voor tussen 1 en 30 % van de massa uit zeer grove korrels en dat zijn vooral keitjes.",
  keitjesZeerVeel:
    "De grond bestaat voor tussen 30 en 50 % van de massa uit zeer grove korrels en dat zijn vooral keitjes.",
  onbekend: "Het is niet bekend of de grond zeer grove korrels bevat.",
};

/**
 * Get the Dutch description for a VeryCoarseFractionContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgVeryCoarseFractionContentClassDescription(code: string): string | undefined {
  return BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_CODES[code];
}
