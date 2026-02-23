/**
 * SurveyProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SurveyProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASurveyProcedure
 */

export const BHRG_SURVEY_PROCEDURE_CODES: Record<string, string> = {
  EN1997d2v2007:
    "NEN-EN 1997-2:2007 Eurocode 7 Geotechnisch ontwerp. Deel 2: Grondonderzoek en beproeving inclusief nationale bijlage. De Eurocode 7 maakt deel uit van de eurocode serie van Europese standaarden (EN) gerelateerd aan constructies. In Eurocode 7 Geotechnisch ontwerp wordt omschreven hoe geotechnische constructies worden ontworpen. Eurocode 7 is op 12 juni 2006 goed gekeurd door het Europese Comité voor Standaardisatie en verplicht in de lidstaten vanaf maart 2010.",
  geen: "Er is geen kaderstellende procedure van toepassing.",
};

/**
 * Get the Dutch description for a SurveyProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSurveyProcedureDescription(code: string): string | undefined {
  return BHRG_SURVEY_PROCEDURE_CODES[code];
}
