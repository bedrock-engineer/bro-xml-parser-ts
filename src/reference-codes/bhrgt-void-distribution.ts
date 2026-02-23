/**
 * VoidDistribution codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:VoidDistribution
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AVoidDistribution
 */

export const BHRGT_VOID_DISTRIBUTION_CODES: Record<string, string> = {
  gelijkmatig: "Holtes komen in alle doorsnedes van een kern gelijkmatig verdeeld voor.",
  ongelijkmatig: "Holtes komen niet in alle doorsnedes van een kern gelijkmatig verdeeld voor.",
};

/**
 * Get the Dutch description for a VoidDistribution code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtVoidDistributionDescription(code: string): string | undefined {
  return BHRGT_VOID_DISTRIBUTION_CODES[code];
}
