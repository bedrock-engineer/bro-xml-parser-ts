/**
 * Stability codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Stability
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStability
 */

export const BHRGT_STABILITY_CODES: Record<string, string> = {
  instabiel:
    "Het gesteente valt uiteen in water of het oppervlak van het monster valt al uiteen bij blootstelling aan lucht.",
  matigStabiel: "Het gesteente valt oppervlakkig uiteen in water.",
  stabiel: "Het gesteente blijft onveranderd in water.",
};

/**
 * Get the Dutch description for a Stability code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStabilityDescription(code: string): string | undefined {
  return BHRGT_STABILITY_CODES[code];
}
