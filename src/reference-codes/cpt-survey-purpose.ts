/**
 * SurveyPurpose codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:SurveyPurpose
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ASurveyPurpose
 */

export const CPT_SURVEY_PURPOSE_CODES: Record<string, string> = {
  bouwwerkConstructie:
    "Onderzoek met als doel eigenschappen van de ondergrond rondom bouwwerken en constructies te verkennen",
  controleOnderzoek:
    "Onderzoek met als doel om veranderingen in de ondergrond t.g.v. werkzaamheden te verkennen. Betreffend onderzoek heeft veelal een lokaal karakter. Vaak is voorafgaand aan de werkzaamheden al in een ander kader informatie ingewonnen om de verandering te kunnen beoordelen",
  infrastructuurLand:
    "Onderzoek met als doel eigenschappen van de ondergrond rondom wegen, spoorwegen, fiets- en voetpaden te verkennen",
  infrastructuurWater:
    "Onderzoek met als doel eigenschappen van de ondergrond in waterwegen te verkennen",
  milieuonderzoek:
    "Onderzoek met als doel eigenschappen van de ondergrond te verkennen met een milieu hygiënische (natuurlijke of niet natuurlijke) achtergrond",
  onbekend: "Het doel waarvoor het onderzoek is uitgevoerd is niet bekend",
  overigOnderzoek: "Onderzoeken niet behorend tot bovengenoemde categorieën",
  vergunning: "Onderzoek met als doel een vergunning te onderbouwen",
  waterkering:
    "Onderzoek met als doel eigenschappen van de ondergrond rondom waterkeringen te verkennen",
};

/**
 * Get the Dutch description for a SurveyPurpose code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptSurveyPurposeDescription(code: string): string | undefined {
  return CPT_SURVEY_PURPOSE_CODES[code];
}
