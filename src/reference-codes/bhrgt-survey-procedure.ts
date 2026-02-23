/**
 * SurveyProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SurveyProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASurveyProcedure
 */

export const BHRGT_SURVEY_PROCEDURE_CODES: Record<string, string> = {
  EN1997d2v2007:
    "NEN-EN 1997-2:2007 Eurocode 7 Geotechnisch ontwerp. Deel 2: Grondonderzoek en beproeving inclusief nationale bijlage. De Eurocode 7 maakt deel uit van de eurocode serie van Europese standaarden (EN) gerelateerd aan constructies. In Eurocode 7 Geotechnisch ontwerp wordt omschreven hoe geotechnische constructies worden ontworpen. Eurocode 7 is op 12 juni 2006 goed gekeurd door het Europese Comité voor Standaardisatie en verplicht in de lidstaten vanaf maart 2010.",
  ISO19901d8v2014:
    "ISO 19901-8:2014 Petroleum and natural gas industries - Specific requirements for offshore structures - Part 8: Marine soil investigations is een internationale norm overgenomen als Europese norm (EN-ISO 19901-8:2015) en als Nederlandse norm NEN-EN-ISO 19901-8:2015 Aardolie- en aardgasindustrie - Specifieke eisen voor buitengaatse constructies - Deel 8: Zeebodemonderzoeken. De procedure wordt gebruikt voor booronderzoek op zee en dat is aan de zeezijde van de UNCLOS-basislijn.",
  ISO19901d8v2015:
    "NEN-EN-ISO 19901-8:2015 Aardolie- en aardgasindustrie - Specifieke eisen voor buitengaatse constructies - Deel 8: Zeebodemonderzoeken. Een internationale norm geaccepteerd door Europa en Nederland.",
  onbekend: "Het is niet bekend binnen welke procedurele kaders het booronderzoek is uitgevoerd. ",
};

/**
 * Get the Dutch description for a SurveyProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSurveyProcedureDescription(code: string): string | undefined {
  return BHRGT_SURVEY_PROCEDURE_CODES[code];
}
