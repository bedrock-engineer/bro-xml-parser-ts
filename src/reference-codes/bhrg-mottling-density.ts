/**
 * MottlingDensity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MottlingDensity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMottlingDensity
 */

export const BHRG_MOTTLING_DENSITY_CODES: Record<string, string> = {
  aandeelOnbekend:
    "Vlekken zijn aanwezig, maar het deel dat door de vlekken van een bepaalde kleur in beslag wordt genomen is niet bekend.",
  matig2tot20: "De vlekken beslaan 2 tot 20 % van het oppervlak.",
  spoorArchief:
    "De vlekken beslaan een spoor van het oppervlak. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. Het aandeel moet beschouwd worden als indicatief.",
  spoorSBBarchief:
    "De vlekken beslaan minder dan 1 % van het oppervlak. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
  veel20tot50: "De vlekken beslaan 20 tot 50 % van het oppervlak.",
  veelArchief:
    "De vlekken beslaan veel van het oppervlak. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. Het aandeel moet beschouwd worden als indicatief.",
  veelSBBarchief:
    "De vlekken beslaan minimaal 10 tot minder dan 50 % van het oppervlak. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
  weinigArchief:
    "De vlekken beslaan weinig van het oppervlak. Het is niet bekend hoe het aandeel is bepaald, en wat het aandeel precies betekent. Het aandeel moet beschouwd worden als indicatief.",
  weinigSBBarchief:
    "De vlekken beslaan minimaal 1 tot minder dan 10 % van het oppervlak. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
  weinigTot2: "De vlekken beslaan tot 2 % van het oppervlak.",
};

/**
 * Get the Dutch description for a MottlingDensity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMottlingDensityDescription(code: string): string | undefined {
  return BHRG_MOTTLING_DENSITY_CODES[code];
}
