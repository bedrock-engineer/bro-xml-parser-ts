/**
 * AppliedOpticalModel codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:AppliedOpticalModel
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AAppliedOpticalModel
 */

export const BHRG_APPLIED_OPTICAL_MODEL_CODES: Record<string, string> = {
  Fraunhofer:
    "Het meetresultaat van de laserdiffractie is met behulp van het Fraunhofermodel op basis van lichtverstrooiing omgerekend naar de korrelgrootteverdeling. Het Fraunhofermodel is met name geschikt voor materiaal met grote korrels.",

  Mie: "Het meetresultaat van de laserdiffractie is met behulp van het model van Mie op basis van lichtbuiging (refractie) omgerekend naar de korrelgrootteverdeling. Het model van Mie is met name geschikt voor fijne korrels.",
};

/**
 * Get the Dutch description for a AppliedOpticalModel code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgAppliedOpticalModelDescription(code: string): string | undefined {
  return BHRG_APPLIED_OPTICAL_MODEL_CODES[code];
}
