/**
 * VerticalDatum codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:VerticalDatum
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AVerticalDatum
 */

export const BHRGT_VERTICAL_DATUM_CODES: Record<string, string> = {
  LAT: "Laagst mogelijke waterstand gebaseerd op de stand van zon en maan (Lowest Astronomical Tide).",
  MSL: "Gemiddeld zeeniveau (Mean Sea Level).",
  NAP: "Normaal Amsterdams Peil.",
};

/**
 * Get the Dutch description for a VerticalDatum code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtVerticalDatumDescription(code: string): string | undefined {
  return BHRGT_VERTICAL_DATUM_CODES[code];
}
