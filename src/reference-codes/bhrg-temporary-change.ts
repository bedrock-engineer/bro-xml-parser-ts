/**
 * TemporaryChange codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:TemporaryChange
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ATemporaryChange
 */

export const BHRG_TEMPORARY_CHANGE_CODES: Record<string, string> = {
  bevriezing:
    "Voor de start van het onderzoek was de ondergrond ten behoeve van andere werkzaamheden bevroren.",
  bouwput:
    "Voor de start van het onderzoek was de ondergrond ten behoeve van bouwwerkzaamheden uitgegraven.",
  bronbemaling:
    "Voor de start van het onderzoek was de grondwaterstand verlaagd ten behoeve van andere werkzaamheden.",
  injectie:
    "Voor de start van het onderzoek was er materiaal in de ondergrond geïnjecteerd ten behoeve van andere werkzaamheden.",
  vacuumconsolidatie:
    "Voor de start van het onderzoek was er in de ondergrond vacuümconsolidatie toegepast ten behoeve van andere werkzaamheden.",
  verticaleDrainage:
    "Voor de start van het onderzoek was de ondergrond tot op enige diepte verticaal gedraineerd (met strips, grindpalen, etc.) ten behoeve van andere werkzaamheden.",
  voorbelasting:
    "Voor de start van het onderzoek was de ondergrond voorbelast ten behoeve van andere werkzaamheden.",
};

/**
 * Get the Dutch description for a TemporaryChange code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgTemporaryChangeDescription(code: string): string | undefined {
  return BHRG_TEMPORARY_CHANGE_CODES[code];
}
