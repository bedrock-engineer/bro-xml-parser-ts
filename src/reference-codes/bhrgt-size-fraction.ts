/**
 * SizeFraction codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SizeFraction
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASizeFraction
 */

export const BHRGT_SIZE_FRACTION_CODES: Record<string, string> = {
  grind: "De fractie met een korrelgrootte van 2 tot 63 mm.",
  keien: "De fractie met een korrelgrootte van 200 tot 630 mm.",
  keitjes: "De fractie met een korrelgrootte van 63 tot 200 mm.",
  zand: "De fractie met een korrelgrootte van 0,063 tot 2 mm.",
};

/**
 * Get the Dutch description for a SizeFraction code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSizeFractionDescription(code: string): string | undefined {
  return BHRGT_SIZE_FRACTION_CODES[code];
}
