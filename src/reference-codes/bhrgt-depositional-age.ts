/**
 * DepositionalAge codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DepositionalAge
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADepositionalAge
 */

export const BHRGT_DEPOSITIONAL_AGE_CODES: Record<string, string> = {
  holoceen: "Het deel van de ondergrond dat in het Pleistoceen is afgezet.",
  pleistoceen: "Het deel van de ondergrond dat in het Holoceen is afgezet.",
  prePleistoceenBoom:
    "Het deel van de ondergrond dat voor het Pleistoceen is afgezet en uit klei bestaat die deel uitmaakt van het Laagpakket van Boom van de Rupel Formatie; deze klei wordt gekenmerkt door hoge stijfheid, homogeniteit en kan grote kalkconcreties (septarien) bevatten.",
  prePleistoceenGeenBoom:
    "Het deel van de ondergrond dat voor het Pleistoceen is afgezet en niet uit klei bestaat die deel uitmaakt van het Laagpakket van Boom van de Rupel Formatie.",
};

/**
 * Get the Dutch description for a DepositionalAge code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDepositionalAgeDescription(code: string): string | undefined {
  return BHRGT_DEPOSITIONAL_AGE_CODES[code];
}
