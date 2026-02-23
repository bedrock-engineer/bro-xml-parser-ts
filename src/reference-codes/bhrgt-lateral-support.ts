/**
 * LateralSupport codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:LateralSupport
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ALateralSupport
 */

export const BHRGT_LATERAL_SUPPORT_CODES: Record<string, string> = {
  draadversteviging: "Het membraan is intern verstevigd met ijzerdraad in spiraalvorm.",
  ringenstapel: "Rondom het membraan is een stapel ringen aangebracht.",
};

/**
 * Get the Dutch description for a LateralSupport code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtLateralSupportDescription(code: string): string | undefined {
  return BHRGT_LATERAL_SUPPORT_CODES[code];
}
