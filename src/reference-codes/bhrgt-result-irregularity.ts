/**
 * ResultIrregularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:ResultIrregularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AResultIrregularity
 */

export const BHRGT_RESULT_IRREGULARITY_CODES: Record<string, string> = {
  nietVerwachtVerloop: "Het verloop van het resultaat is anders dan verwacht.",
};

/**
 * Get the Dutch description for a ResultIrregularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtResultIrregularityDescription(code: string): string | undefined {
  return BHRGT_RESULT_IRREGULARITY_CODES[code];
}
