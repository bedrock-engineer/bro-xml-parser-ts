/**
 * MunsellValue codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MunsellValue
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMunsellValue
 */

export const BHRG_MUNSELL_VALUE_CODES: Record<string, string> = {
  "1": "De waarde van de witheid is 1.",
  "2": "De waarde van de witheid is 2.",
  "2.5": "De waarde van de witheid is 2,5.",
  "3": "De waarde van de witheid is 3.",
  "4": "De waarde van de witheid is 4.",
  "5": "De waarde van de witheid is 5.",
  "6": "De waarde van de witheid is 6.",
  "7": "De waarde van de witheid is 7.",
  "8": "De waarde van de witheid is 8.",
  "8.5": "De waarde van de witheid is 8,5.",
  "9": "De waarde van de witheid is 9.",
  "9.5": "De waarde van de witheid is 9,5.",
};

/**
 * Get the Dutch description for a MunsellValue code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMunsellValueDescription(code: string): string | undefined {
  return BHRG_MUNSELL_VALUE_CODES[code];
}
