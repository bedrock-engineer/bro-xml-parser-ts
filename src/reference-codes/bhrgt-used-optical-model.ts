/**
 * UsedOpticalModel codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:UsedOpticalModel
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AUsedOpticalModel
 */

export const BHRGT_USED_OPTICAL_MODEL_CODES: Record<string, string> = {
  Fraunhofer:
    "Het meetresultaat van de laserdiffractie is met behulp van het Fraunhofermodel op basis van lichtverstrooiing omgerekend naar de korrelgrootteverdeling. Het Fraunhofermodel is met name geschikt voor materiaal met grote korrels.",
  Mie: "Het meetresultaat van de laserdiffractie is met behulp van het Miemodel op basis van lichtbuiging (refractie) omgerekend naar de korrelgrootteverdeling. Het Miemodel is met name geschikt voor fijne korrels.",
};

/**
 * Get the Dutch description for a UsedOpticalModel code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtUsedOpticalModelDescription(code: string): string | undefined {
  return BHRGT_USED_OPTICAL_MODEL_CODES[code];
}
