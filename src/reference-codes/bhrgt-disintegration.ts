/**
 * Disintegration codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Disintegration
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADisintegration
 */

export const BHRGT_DISINTEGRATION_CODES: Record<string, string> = {
  gedeeltelijkUiteengevallen:
    "Het gesteentemateriaal is gedeeltelijk bros geworden en kan met de hand in losse brokken worden gebroken.",
  nietUiteengevallen: "Geen zichtbare desintegratie van gesteentemateriaal.",
  volledigUiteengevallen:
    "Het gesteentemateriaal is volledig bros geworden en valt onder druk met de hand in de samenstellende korrels uiteen. Gedraagt zich als grond.",
};

/**
 * Get the Dutch description for a Disintegration code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDisintegrationDescription(code: string): string | undefined {
  return BHRGT_DISINTEGRATION_CODES[code];
}
