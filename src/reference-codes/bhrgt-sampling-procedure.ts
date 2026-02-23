/**
 * SamplingProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SamplingProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASamplingProcedure
 */

export const BHRGT_SAMPLING_PROCEDURE_CODES: Record<string, string> = {
  ISO19901d8v2014:
    "ISO 19901-8:2014 Petroleum and natural gas industries - Specific requirements for offshore structures - Part 8: Marine soil investigations is een internationale norm overgenomen als Europese norm (EN-ISO 19901-8:2015) en als Nederlandse norm NEN-EN-ISO 19901-8:2015 Aardolie- en aardgasindustrie - Specifieke eisen voor buitengaatse constructies - Deel 8: Zeebodemonderzoeken. De procedure wordt gebruikt voor booronderzoek op zee en dat is aan de zeezijde van de UNCLOS-basislijn.",
  ISO22475d1v2006:
    "NEN-EN-ISO 22475-1:2006 Methoden voor monsterneming en grondwatermeting - Deel 1: Technische grondslagen voor de uitvoering. Een internationale norm geaccepteerd door Nederland en Europa.",
  ISO22475d1v2019:
    "NEN-EN-ISO 22475-1:2019 Methoden voor monsterneming en grondwatermeting - Deel 1: Technische grondslagen voor de uitvoering. Een internationale norm geaccepteerd door Nederland en Europa.",
  ISO22475d1v2021:
    "NEN-EN-ISO 22475-1:2021 Methoden voor monsterneming en grondwatermeting - Deel 1: Technische grondslagen voor de uitvoering. Een internationale norm geaccepteerd door Nederland en Europa.",
  NEN5119:
    "NEN 5119:1991 Geotechniek- boren en monsternemen in grond. Een Nederlandse norm. De norm is vervangen door NEN-EN-ISO 22475-1: 2006.",
  onbekend: "Het is niet bekend onder welke afspraken het bemonsteren is uitgevoerd.",
};

/**
 * Get the Dutch description for a SamplingProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSamplingProcedureDescription(code: string): string | undefined {
  return BHRGT_SAMPLING_PROCEDURE_CODES[code];
}
