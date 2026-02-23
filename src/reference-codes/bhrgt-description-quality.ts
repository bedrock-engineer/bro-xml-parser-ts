/**
 * DescriptionQuality codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DescriptionQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADescriptionQuality
 */

export const BHRGT_DESCRIPTION_QUALITY_CODES: Record<string, string> = {
  klasse2geroerd:
    "De lagen zijn beschreven volgens de eisen die in NEN-EN-ISO 14688-1 gesteld zijn aan standaard geotechnisch booronderzoek (B2) voor het beschrijven van monsters van kwaliteitsklasse QM5. Het eventueel aanwezige gesteente is beschreven op een gelijkwaardige manier.",
  klasse2ongedifferentieerd:
    "De lagen zijn beschreven volgens de eisen die in NEN-EN-ISO 14688-1 gesteld zijn aan standaard geotechnisch booronderzoek (B2) voor handboringen waarvan alle monsters in het veld zijn beschreven, waarbij de kwaliteitsklasse van de monsters niet relevant is. Er is geen gesteente beschreven.",
  klasse2ongeroerd:
    "De lagen zijn beschreven volgens de eisen die in NEN-EN-ISO 14688-1 gesteld zijn aan standaard geotechnisch booronderzoek (B2) voor het beschrijven van monsters van minimaal kwaliteitsklasse QM4. Het eventueel aanwezige gesteente is beschreven op een gelijkwaardige manier.",
  klasse3:
    "De lagen zijn beschreven volgens de eisen die in NEN-EN-ISO 14688-1 gesteld zijn aan verkennend (hand)booronderzoek (B3). Er is geen gesteente beschreven.",
  nietGespecificeerd:
    "De lagen zijn beschreven op basis van NEN 5104 en met verschillen in monsterkwaliteit is bij de beschrijving niet consequent rekening gehouden; er is geen gesteente beschreven.",
};

/**
 * Get the Dutch description for a DescriptionQuality code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDescriptionQualityDescription(code: string): string | undefined {
  return BHRGT_DESCRIPTION_QUALITY_CODES[code];
}
