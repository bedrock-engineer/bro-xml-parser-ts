/**
 * Roughness codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Roughness
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ARoughness
 */

export const BHRGT_ROUGHNESS_CODES: Record<string, string> = {
  glad: "De oppervlakte van de korrel is glad.",
  ruw: "De oppervlakte van de korrel is ruw.",
};

/**
 * Get the Dutch description for a Roughness code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtRoughnessDescription(code: string): string | undefined {
  return BHRGT_ROUGHNESS_CODES[code];
}
