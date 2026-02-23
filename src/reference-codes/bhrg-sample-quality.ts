/**
 * SampleQuality codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SampleQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASampleQuality
 */

export const BHRG_SAMPLE_QUALITY_CODES: Record<string, string> = {
  QM1: "Gelaagdheid, interne gelaagdheid (ofwel interne structuur), consistentie, veldvochtigheid (ofwel monstervochtigheid) en spanningstoestand intact (verandering door monstername reversibel).",
  QM2: "Gelaagdheid, interne gelaagdheid (ofwel interne structuur), consistentie en veldvochtigheid (ofwel monstervochtigheid) intact.",
  QM3: "Gelaagdheid, interne gelaagdheid (ofwel interne structuur) intact.",
  QM4: "Gelaagdheid intact.",
  QM5: "Gelaagdheid niet intact.",
};

/**
 * Get the Dutch description for a SampleQuality code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSampleQualityDescription(code: string): string | undefined {
  return BHRG_SAMPLE_QUALITY_CODES[code];
}
