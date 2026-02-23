/**
 * AnalysisProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:AnalysisProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AAnalysisProcedure
 */

export const BHRG_ANALYSIS_PROCEDURE_CODES: Record<string, string> = {
  GDNpraktijkrichtlijnv2023:
    "De boormonsteranalyse is uitgevoerd conform de praktijkrichtlijn van de Geologische Dienst Nederland, versie 2023.",
  geen: "De boormonsteranalyse is niet volgens een praktijkrichtlijn uitgevoerd.",
};

/**
 * Get the Dutch description for a AnalysisProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgAnalysisProcedureDescription(code: string): string | undefined {
  return BHRG_ANALYSIS_PROCEDURE_CODES[code];
}
