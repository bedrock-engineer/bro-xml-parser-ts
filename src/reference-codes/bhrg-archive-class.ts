/**
 * ArchiveClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:ArchiveClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AArchiveClass
 */

export const BHRG_ARCHIVE_CLASS_CODES: Record<string, string> = {
  aandeelOnbekend: "Het bestanddeel is aanwezig, maar het aandeel is niet bekend.",
  bijnaVolledigArchief:
    "Het bestanddeel komt bijna volledig voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  geen: "Het bestanddeel komt niet voor.",
  grotendeelsArchief:
    "Het bestanddeel komt grotendeels voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  merendeelsArchief:
    "Het bestanddeel komt merendeels voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  onbekend: "Het is niet bekend of het bestanddeel aanwezig is.",
  spoorArchief:
    "Er komt een spoor van het bestanddeel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  uiterstVeelArchief:
    "Het bestanddeel komt uiterst veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  veelArchief:
    "Het bestanddeel komt veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  weinigArchief:
    "Het bestanddeel komt weinig voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  zeerVeelArchief:
    "Het bestanddeel komt zeer veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
};

/**
 * Get the Dutch description for a ArchiveClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgArchiveClassDescription(code: string): string | undefined {
  return BHRG_ARCHIVE_CLASS_CODES[code];
}
