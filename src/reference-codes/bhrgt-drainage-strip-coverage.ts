/**
 * DrainageStripCoverage codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DrainageStripCoverage
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADrainageStripCoverage
 */

export const BHRGT_DRAINAGE_STRIP_COVERAGE_CODES: Record<string, string> = {
  "25tot30": "De drainagestroken beslaan tussen de 25 en 30 % van het oppervlak.",
  "30tot35": "De drainagestroken beslaan tussen de 30 en 35 % van het oppervlak.",
  "35tot40": "De drainagestroken beslaan tussen de 35 en 40 % van het oppervlak.",
  "40tot45": "De drainagestroken beslaan tussen de 40 en 45 % van het oppervlak.",
  "45tot50": "De drainagestroken beslaan tussen de 45 en 50 % van het oppervlak.",
};

/**
 * Get the Dutch description for a DrainageStripCoverage code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDrainageStripCoverageDescription(code: string): string | undefined {
  return BHRGT_DRAINAGE_STRIP_COVERAGE_CODES[code];
}
