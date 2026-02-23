/**
 * AnalysisProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:AnalysisProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AAnalysisProcedure
 */

export const BHRGT_ANALYSIS_PROCEDURE_CODES: Record<string, string> = {
  geen: "De boormonsteranalyse is niet volgens een praktijkrichtlijn uitgevoerd.",
  NPR2021: "De boormonsteranalyse is uitgevoerd conform de Nationale praktijkrichtlijn 2021.",
};

/**
 * Get the Dutch description for a AnalysisProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtAnalysisProcedureDescription(code: string): string | undefined {
  return BHRGT_ANALYSIS_PROCEDURE_CODES[code];
}
