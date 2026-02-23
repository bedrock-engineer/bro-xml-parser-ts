/**
 * DescribedMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DescribedMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescribedMaterial
 */

export const BHRG_DESCRIBED_MATERIAL_CODES: Record<string, string> = {
  grond: "Het boorprofiel omvat alleen lagen die beschreven zijn als grond of bijzonder materiaal.",
};

/**
 * Get the Dutch description for a DescribedMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDescribedMaterialDescription(code: string): string | undefined {
  return BHRG_DESCRIBED_MATERIAL_CODES[code];
}
