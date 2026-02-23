/**
 * ApertureClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:ApertureClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AApertureClass
 */

export const BHRGT_APERTURE_CLASS_CODES: Record<string, string> = {
  breed: "De kortste afstand tussen de grensvlakken is groter dan 10 cm.",
  matigBreed: "De kortste afstand tussen de grensvlakken ligt tussen 1 en 10 cm.",
  matigSmal: "De kortste afstand tussen de grensvlakken ligt tussen 0,25 en 1 cm.",
  smal: "De kortste afstand tussen de grensvlakken ligt tussen 0,5 en 2,5 mm.",
  uiterstSmal: "De kortste afstand tussen de grensvlakken is kleiner dan 0,25 mm.",
  zeerSmal: "De kortste afstand tussen de grensvlakken ligt tussen 0,25 en 0,5 mm.",
};

/**
 * Get the Dutch description for a ApertureClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtApertureClassDescription(code: string): string | undefined {
  return BHRGT_APERTURE_CLASS_CODES[code];
}
