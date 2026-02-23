/**
 * BoringProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:BoringProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ABoringProcedure
 */

export const BHRGT_BORING_PROCEDURE_CODES: Record<string, string> = {
  ISO19901d8v2014:
    "ISO 19901-8:2014 Petroleum and natural gas industries - Specific requirements for offshore structures - Part 8: Marine soil investigations is een internationale norm overgenomen als Europese norm (EN-ISO 19901-8:2015) en als Nederlandse norm NEN-EN-ISO 19901-8:2015 Aardolie- en aardgasindustrie - Specifieke eisen voor buitengaatse constructies - Deel 8: Zeebodemonderzoeken. De procedure wordt gebruikt voor booronderzoek op zee en dat is aan de zeezijde van de UNCLOS-basislijn.",
  onbekend: "Het is niet bekend onder welke afspraken het boren is uitgevoerd.",
  "SIKB2001vanafV6.0":
    "SIKB protocol 2001 Plaatsen van handboringen en peilbuizen, maken van boorbeschrijvingen, nemen van grondmonsters en waterpassen. Versie 6.0 en opvolgende versies die geen relevante wijzigingen voor (de gegevens van) het booronderzoek bevatten.",
  "SIKB2101vanafV3.3":
    "SIKB protocol 2101 Mechanisch boren. Versie 3.3 en opvolgende versies die geen relevante wijzigingen voor (de gegevens van) het booronderzoek bevatten.",
};

/**
 * Get the Dutch description for a BoringProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtBoringProcedureDescription(code: string): string | undefined {
  return BHRGT_BORING_PROCEDURE_CODES[code];
}
