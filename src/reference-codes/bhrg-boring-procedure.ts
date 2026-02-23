/**
 * BoringProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:BoringProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ABoringProcedure
 */

export const BHRG_BORING_PROCEDURE_CODES: Record<string, string> = {
  bedrijfSpecifiek:
    "Er is een door de uitvoerder van de boring voor het eigen bedrijf opgestelde procedure gevolgd.",
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
export function getBhrgBoringProcedureDescription(code: string): string | undefined {
  return BHRG_BORING_PROCEDURE_CODES[code];
}
