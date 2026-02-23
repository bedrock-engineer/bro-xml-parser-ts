/**
 * DescribedMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DescribedMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADescribedMaterial
 */

export const BHRGT_DESCRIBED_MATERIAL_CODES: Record<string, string> = {
  gesteente: "Het boorprofiel omvat alleen lagen die beschreven zijn als gesteente.",
  grond: "Het boorprofiel omvat alleen lagen die beschreven zijn als grond of bijzonder materiaal.",
  grondGesteente:
    "Het boorprofiel omvat lagen die beschreven zijn als grond of bijzonder materiaal zowel als lagen die beschreven zijn als gesteente. ",
};

/**
 * Get the Dutch description for a DescribedMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDescribedMaterialDescription(code: string): string | undefined {
  return BHRGT_DESCRIBED_MATERIAL_CODES[code];
}
