/**
 * StiffnessClassMembrane codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:StiffnessClassMembrane
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStiffnessClassMembrane
 */

export const BHRGT_STIFFNESS_CLASS_MEMBRANE_CODES: Record<string, string> = {
  "1400kPa": "Membraan met een stijfheid van ca. 1400 kPa.",
  "1500kPa": "Membraan met een stijfheid van ca. 1500 kPa.",
  "1600kPa": "Membraan met een stijfheid van ca. 1600 kPa.",
  "1700kPa": "Membraan met een stijfheid van ca. 1700 kPa.",
  "1800kPa": "Membraan met een stijfheid van ca. 1800 kPa.",
};

/**
 * Get the Dutch description for a StiffnessClassMembrane code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStiffnessClassMembraneDescription(code: string): string | undefined {
  return BHRGT_STIFFNESS_CLASS_MEMBRANE_CODES[code];
}
