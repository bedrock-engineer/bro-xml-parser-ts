/**
 * CalculationValueOrigin codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:CalculationValueOrigin
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ACalculationValueOrigin
 */

export const BHRG_CALCULATION_VALUE_ORIGIN_CODES: Record<string, string> = {
  massaAangenomen:
    "De volumieke massa (ρ) van de korrels die is gebruikt als rekenwaarde bij de toepassing van de Wet van Stokes is gebaseerd op een aanname.",
  massaAfgeleid:
    "De volumieke massa (ρ) van de korrels die is gebruikt als rekenwaarde bij de toepassing van de Wet van Stokes is afgeleid uit de bepaling van de volumieke massa van de vaste delen van het materiaal.",
  massaBepaald:
    "De volumieke massa (ρ) van de korrels die is gebruikt als rekenwaarde bij de toepassing van de Wet van Stokes is nauwkeurig bepaald.",
};

/**
 * Get the Dutch description for a CalculationValueOrigin code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgCalculationValueOriginDescription(code: string): string | undefined {
  return BHRG_CALCULATION_VALUE_ORIGIN_CODES[code];
}
