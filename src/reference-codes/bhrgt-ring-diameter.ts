/**
 * RingDiameter codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:RingDiameter
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ARingDiameter
 */

export const BHRGT_RING_DIAMETER_CODES: Record<string, string> = {
  "50mm": "Ring met diameter 50 mm. De ringhoogte is 2 cm.",
  "63mm": "Ring met diameter 63 mm. De ringhoogte is 2 cm.",
};

/**
 * Get the Dutch description for a RingDiameter code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtRingDiameterDescription(code: string): string | undefined {
  return BHRGT_RING_DIAMETER_CODES[code];
}
