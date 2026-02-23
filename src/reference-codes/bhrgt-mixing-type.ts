/**
 * MixingType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:MixingType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AMixingType
 */

export const BHRGT_MIXING_TYPE_CODES: Record<string, string> = {
  bioturbaat:
    "De grond is, kort na afzetting van het sediment, vermengd door de activiteit van gravende en borende dierlijke organismen.",
  kryoturbaat:
    "De grond is, na afzetting van het sediment, vermengd door herhaaldelijk bevriezen en ontdooien.",
  vervloeiing:
    "De grond is, na afzetting van het sediment, vermengd door een proces dat bodemvloeiing heet.",
};

/**
 * Get the Dutch description for a MixingType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtMixingTypeDescription(code: string): string | undefined {
  return BHRGT_MIXING_TYPE_CODES[code];
}
