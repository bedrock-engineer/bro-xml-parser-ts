/**
 * WeatheringDegree codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:WeatheringDegree
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AWeatheringDegree
 */

export const BHRG_WEATHERING_DEGREE_CODES: Record<string, string> = {
  matigVerweerd: "Het schelpmateriaal is enigermate chemisch verweerd.",
  nietVerweerd: "Het schelpmateriaal vertoont geen sporen van chemische verwering.",
  sterkVerweerd: "Het schelpmateriaal is verregaand chemisch verweerd.",
  verweerd: "Het schelpmateriaal is chemisch verweerd, maar de mate waarin is niet bekend.",
};

/**
 * Get the Dutch description for a WeatheringDegree code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgWeatheringDegreeDescription(code: string): string | undefined {
  return BHRG_WEATHERING_DEGREE_CODES[code];
}
