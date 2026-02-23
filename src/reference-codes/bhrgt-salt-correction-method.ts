/**
 * SaltCorrectionMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SaltCorrectionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASaltCorrectionMethod
 */

export const BHRGT_SALT_CORRECTION_METHOD_CODES: Record<string, string> = {
  nietToegepast: "Het watergehalte is niet gecorrigeerd voor het gehalte aan opgeloste zouten.",
  zoutgehalteAangenomen:
    "Het watergehalte is gecorrigeerd voor het gehalte aan opgeloste zouten. Het zoutgehalte van het poriënwater is een aangenomen waarde.",
  zoutgehalteBepaald:
    "Het watergehalte is gecorrigeerd voor het gehalte aan opgeloste zouten. Het zoutgehalte van het poriënwater is bepaald.",
};

/**
 * Get the Dutch description for a SaltCorrectionMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSaltCorrectionMethodDescription(code: string): string | undefined {
  return BHRGT_SALT_CORRECTION_METHOD_CODES[code];
}
