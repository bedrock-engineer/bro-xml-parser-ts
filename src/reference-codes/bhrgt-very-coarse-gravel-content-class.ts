/**
 * VeryCoarseGravelContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:VeryCoarseGravelContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AVeryCoarseGravelContentClass
 */

export const BHRGT_VERY_COARSE_GRAVEL_CONTENT_CLASS_CODES: Record<string, string> = {
  spoorTot1: "De fractie 16-63 mm maakt minder dan 1 procent van de massa van de grindfractie uit.",
  uiterstVeelMinstens75:
    "De fractie 16-63 mm maakt minstens 75 procent van de massa van de grindfractie uit.",
  veel25tot50:
    "De fractie 16-63 mm maakt tussen 25 en 50 procent van de massa van de grindfractie uit.",
  weinig1tot25:
    "De fractie 16-63 mm maakt tussen 1 en 25 procent van de massa van de grindfractie uit.",
  zeerVeel50tot75:
    "De fractie 16-63 mm maakt tussen 50 en 75 procent van de massa van de grindfractie uit.",
};

/**
 * Get the Dutch description for a VeryCoarseGravelContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtVeryCoarseGravelContentClassDescription(code: string): string | undefined {
  return BHRGT_VERY_COARSE_GRAVEL_CONTENT_CLASS_CODES[code];
}
