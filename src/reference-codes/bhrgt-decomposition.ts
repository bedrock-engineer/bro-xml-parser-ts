/**
 * Decomposition codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Decomposition
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADecomposition
 */

export const BHRGT_DECOMPOSITION_CODES: Record<string, string> = {
  gedeeltelijkOmgezet:
    "Een deel van de mineralen is omgezet. Bijvoorbeeld veldspaten in kleimineralen.",
  nietOmgezet: "Geen zichtbare omzetting van gesteentemateriaal.",
  volledigOmgezet: "Alle mineralen zijn omgezet.",
};

/**
 * Get the Dutch description for a Decomposition code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDecompositionDescription(code: string): string | undefined {
  return BHRGT_DECOMPOSITION_CODES[code];
}
