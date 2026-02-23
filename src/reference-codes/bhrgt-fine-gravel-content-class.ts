/**
 * FineGravelContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:FineGravelContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AFineGravelContentClass
 */

export const BHRGT_FINE_GRAVEL_CONTENT_CLASS_CODES: Record<string, string> = {
  spoorTot1: "De fractie 2-5,6 mm maakt minder dan 1 procent van de massa van de grindfractie uit.",
  uiterstVeelMinstens75:
    "De fractie 2-5,6 mm maakt minstens 75 procent van de massa van de grindfractie uit.",
  veel25tot50:
    "De fractie 2-5,6 mm maakt tussen 25 en 50 procent van de massa van de grindfractie uit.",
  weinig1tot25:
    "De fractie 2-5,6 mm maakt tussen 1 en 25 procent van de massa van de grindfractie uit.",
  zeerVeel50tot75:
    "De fractie 2-5,6 mm maakt tussen 50 en 75 procent van de massa van de grindfractie uit.",
};

/**
 * Get the Dutch description for a FineGravelContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtFineGravelContentClassDescription(code: string): string | undefined {
  return BHRGT_FINE_GRAVEL_CONTENT_CLASS_CODES[code];
}
