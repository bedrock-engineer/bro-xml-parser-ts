/**
 * Variegation codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:Variegation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVariegation
 */

export const BHRG_VARIEGATION_CODES: Record<string, string> = {
  matigBont:
    "De fractie bestaat voor 90 tot 99 volumeprocent uit korrels die wit, doorschijnend of lichtgrijs zijn.",
  matigBontArchief:
    "De fractie is matig bont. Het is niet bekend hoe de bontheid is bepaald, en wat het precies betekent. De aanduiding moet beschouwd worden als indicatief.",
  nietBont:
    "De fractie bestaat voor meer dan 99 volumeprocent uit korrels die wit, doorschijnend of lichtgrijs zijn.",
  nietBontArchief:
    "De fractie is niet bont. Het is niet bekend hoe de bontheid is bepaald, en wat het precies betekent. De aanduiding moet beschouwd worden als indicatief.",
  onbekend: "Het aandeel kleurige korrels is niet bekend.",
  zeerBont:
    "De fractie bestaat voor minder dan 90 volumeprocent uit korrels die wit, doorschijnend of lichtgrijs zijn.",
  zeerBontArchief:
    "De fractie is zeer bont. Het is niet bekend hoe de bontheid is bepaald, en wat het precies betekent. De aanduiding moet beschouwd worden als indicatief.",
};

/**
 * Get the Dutch description for a Variegation code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgVariegationDescription(code: string): string | undefined {
  return BHRG_VARIEGATION_CODES[code];
}
