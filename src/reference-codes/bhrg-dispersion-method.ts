/**
 * DispersionMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DispersionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADispersionMethod
 */

export const BHRG_DISPERSION_METHOD_CODES: Record<string, string> = {
  metUltrasoonbad:
    "Samenklonterende korrels zijn losgemaakt door het materiaal in een ultrasoonbad gevuld met water en een dispersiemiddel los te trillen.",
  roeren:
    "Samenklonterende korrels zijn losgemaakt door het materiaal in water zonder een dispersiemiddel los te roeren.",
  roerenDispersiemiddel:
    "Samenklonterende korrels zijn losgemaakt door het materiaal in water met een dispersiemiddel los te roeren.",
};

/**
 * Get the Dutch description for a DispersionMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDispersionMethodDescription(code: string): string | undefined {
  return BHRG_DISPERSION_METHOD_CODES[code];
}
