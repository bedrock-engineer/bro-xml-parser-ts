/**
 * VeryCoarseFractionContentClassArchive codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:VeryCoarseFractionContentClassArchive
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVeryCoarseFractionContentClassArchive
 */

export const BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_ARCHIVE_CODES: Record<string, string> = {
  geen: "De grond bevat geen zeer grove korrels.",
  keienAandeelOnbekend: "Keien zijn aanwezig, maar het aandeel is niet bekend.",
  keienWeinigTotVeelArchief:
    "Keien komen weinig tot veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  keienZeerVeelArchief:
    "Keien komen zeer veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  keitjesAandeelOnbekend: "Keitjes zijn aanwezig, maar het aandeel is niet bekend.",
  keitjesWeinigTotVeelArchief:
    "Keitje komen weinig tot veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
  keitjesZeerVeelArchief:
    "Keitjes komen zeer veel voor. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. De hoeveelheid moet beschouwd worden als indicatief.",
};

/**
 * Get the Dutch description for a VeryCoarseFractionContentClassArchive code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgVeryCoarseFractionContentClassArchiveDescription(
  code: string,
): string | undefined {
  return BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_ARCHIVE_CODES[code];
}
