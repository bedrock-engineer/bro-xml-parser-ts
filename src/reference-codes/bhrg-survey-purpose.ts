/**
 * SurveyPurpose codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SurveyPurpose
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASurveyPurpose
 */

export const BHRG_SURVEY_PURPOSE_CODES: Record<string, string> = {
  BROModel:
    "Onderzoek uitgevoerd voor het maken en onderhouden van een geologisch model in de basisregistratie ondergrond.",
  gebiedsmodelBeheerGrondwater:
    "Onderzoek uitgevoerd voor het maken van een model van de hydrogeologische opbouw van de ondergrond van een bepaald gebied ten behoeve van het grondwaterbeheer.",
  gebiedsmodelGebruikGrondwater:
    "Onderzoek uitgevoerd voor het maken van een model van de hydrogeologische opbouw van de ondergrond van een bepaald gebied ten behoeve van grondwatergebruik.",
  gebiedsmodelGebruikOndergrond:
    "Onderzoek uitgevoerd voor het maken van een model van de geologische opbouw van de ondergrond van een bepaald gebied ten behoeve van het gebruik van de ondergrond anders dan voor grondwatergebruik.",
  gebiedsmodelOntgronding:
    "Onderzoek uitgevoerd voor het maken van een model van de geologische opbouw van de ondergrond van een bepaald gebied ten behoeve van ontgronding.",
  gebiedsmodelOrdeningOndergrond:
    "Onderzoek uitgevoerd voor het maken van een model van de (hydro)geologische opbouw van de ondergrond van een bepaald gebied ten behoeve van ordeningsvraagstukken.",
  geotechnischOnderzoek:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen en gedrag van de ondergrond te bepalen. Waarbij ook aspecten ten behoeve van de (hydro)geologische opbouw van de ondergrond zijn bepaald.",
  grondwaterMonitoringGebruik:
    "Onderzoek uitgevoerd voor het bepalen van de (hydro)geologische opbouw van de ondergrond ten behoeve van de aanleg van een grondwatermonitoringput, een grondwaterontrekkingsput, een infiltratieput of een gesloten of open WKO-installatie: omvat de IMBRO-waarden gebiedsmodelGebruikGrondwater, locatieModelGebruikGrondwater en locatieModelMonitoringGrondwater.",
  locatieModelGebruikGrondwater:
    "Onderzoek uitgevoerd voor het bepalen van de (hydro)geologische opbouw van de ondergrond op een bepaalde locatie en ten behoeve van de aanleg van een grondwaterontrekkingsput, een infiltratieput of een gesloten of open WKO-installatie.",
  locatieModelGebruikOndergrond:
    "Onderzoek uitgevoerd voor het bepalen van de geologische opbouw van de ondergrond op een bepaalde locatie en ten behoeve van de aanleg van constructies voor het gebruik van de ondergrond dat zich niet beperkt tot het grondwater.",
  locatieModelMonitoringGrondwater:
    "Onderzoek uitgevoerd voor het bepalen van de (hydro)geologische opbouw van de ondergrond op een bepaalde locatie en ten behoeve van de aanleg van een grondwatermonitoringput.",
  onbekend: "Het is niet bekend voor welk doel het onderzoek is uitgevoerd.",
  specialistischOnderzoek:
    "Onderzoek uitgevoerd om gegevens in te winnen in het kader van wetenschappelijk onderzoek.",
};

/**
 * Get the Dutch description for a SurveyPurpose code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSurveyPurposeDescription(code: string): string | undefined {
  return BHRG_SURVEY_PURPOSE_CODES[code];
}
