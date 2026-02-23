/**
 * SamplingProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SamplingProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASamplingProcedure
 */

export const BHRG_SAMPLING_PROCEDURE_CODES: Record<string, string> = {
  ISO22475d1v2006:
    "NEN-EN-ISO 22475-1:2006 Methoden voor monsterneming en grondwatermeting - Deel 1: Technische grondslagen voor de uitvoering. Een internationale norm geaccepteerd door Nederland en Europa.",
  ISO22475d1v2021:
    "NEN-EN-ISO 22475-1:2021 Methoden voor monsterneming en grondwatermeting - Deel 1: Technische grondslagen voor de uitvoering. Een internationale norm geaccepteerd door Nederland en Europa.",
  onbekend: "Het is niet bekend onder welke afspraken het bemonsteren is uitgevoerd.",
};

/**
 * Get the Dutch description for a SamplingProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSamplingProcedureDescription(code: string): string | undefined {
  return BHRG_SAMPLING_PROCEDURE_CODES[code];
}
