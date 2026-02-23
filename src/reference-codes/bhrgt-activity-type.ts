/**
 * ActivityType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:ActivityType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AActivityType
 */

export const BHRGT_ACTIVITY_TYPE_CODES: Record<string, string> = {
  gecontroleerdAangebracht:
    "Opgebracht materiaal dat tot een bepaalde graad verdicht is (engineered fill).",
  geroerd:
    "De natuurlijke samenhang van de grond is door ploegen of andere vormen van omwoelen verstoord.",
  losGestort: "Opgebracht materiaal dat los gestort is.",
  nietBepaald:
    "De wijze waarop de mens in de opbouw van de ondergrond heeft ingegrepen, kon niet worden bepaald.",
  onbekend:
    "Het is niet bekend op welke wijze de mens in de opbouw van de ondergrond heeft ingegrepen.",
};

/**
 * Get the Dutch description for a ActivityType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtActivityTypeDescription(code: string): string | undefined {
  return BHRGT_ACTIVITY_TYPE_CODES[code];
}
