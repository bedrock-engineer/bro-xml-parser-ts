/**
 * ActivityType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:ActivityType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AActivityType
 */

export const BHRG_ACTIVITY_TYPE_CODES: Record<string, string> = {
  gecontroleerdAangebracht:
    "Opgebracht materiaal dat tot een bepaalde graad verdicht is (engineered fill).",
  geroerd:
    "De natuurlijke samenhang van de grond is door ploegen of andere vormen van omwoelen verstoord.",
  losGestort: "Opgebracht materiaal dat los gestort is.",
  nietBepaald:
    "De wijze waarop de mens in de opbouw van de ondergrond heeft ingegrepen, kon niet worden bepaald.",
};

/**
 * Get the Dutch description for a ActivityType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgActivityTypeDescription(code: string): string | undefined {
  return BHRG_ACTIVITY_TYPE_CODES[code];
}
