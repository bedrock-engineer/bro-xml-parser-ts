/**
 * DescriptionQuality codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DescriptionQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescriptionQuality
 */

export const BHRG_DESCRIPTION_QUALITY_CODES: Record<string, string> = {
  archeologischStandaardArchief:
    "De grond is op een standaard manier beschreven volgens de Archeologische Standaard Boorbeschrijvingsmethode (ASB) tot en met versie 1.1, voor zowel geroerde als ongeroerde boormonsters.",
  geologischNEN5104Archief:
    "De grond is beschreven op basis van NEN 5104, met eventueel extra aspecten die geen onderdeel uitmaken van de procedure. Met verschillen in monsterkwaliteit is bij de beschrijving niet consequent rekening gehouden. GeologischNEN5104Archief beslaat een breed spectrum in de mate van detail.",
  geologischStandaardArchief:
    "De grond is op een standaard manier beschreven volgens de Standaard Boor Beschrijvingsmethode (SBB) tot en met versie 5.3, voor zowel geroerde als ongeroerde boormonsters.",
  geologischStandaardGeroerd:
    "De grond is beschreven volgens de eisen in SBB6:2020 gesteld aan een standaard geologische beschrijving van geroerde boormonsters.",
  geologischStandaardOngeroerd:
    "De grond is beschreven volgens de eisen in SBB6:2020 gesteld aan een standaard geologische beschrijving die is gemaakt van ongeroerde boormonsters.",
  geologischUitgebreidArchief:
    "De grond is op een uitgebreide manier beschreven volgens de Standaard Boor Beschrijvingsmethode (SBB) tot en met versie 5.3, voor zowel geroerde als ongeroerde boormonsters.",
  geologischUitgebreidGeroerd:
    "De grond is beschreven volgens de eisen in SBB6:2020 gesteld aan een uitgebreide geologische beschrijving van geroerde boormonsters.",
  geologischUitgebreidOngeroerd:
    "De grond is beschreven volgens de eisen in SBB6:2020 gesteld aan een uitgebreide geologische beschrijving die is gemaakt van ongeroerde boormonsters.",
};

/**
 * Get the Dutch description for a DescriptionQuality code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDescriptionQualityDescription(code: string): string | undefined {
  return BHRG_DESCRIPTION_QUALITY_CODES[code];
}
