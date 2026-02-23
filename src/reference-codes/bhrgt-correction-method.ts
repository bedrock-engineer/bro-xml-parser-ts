/**
 * CorrectionMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:CorrectionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ACorrectionMethod
 */

export const BHRGT_CORRECTION_METHOD_CODES: Record<string, string> = {
  ASTM_D4767v2011:
    "Methode voor het corrigeren van de spanning in het proefstuk voor de invloed van het membraan en de drainagestroken volgens ASTM D4767 - 11 Standard Test Method for Consolidated Undrained Triaxial Compression Test for Cohesive Soils.",
  Greeuw2001:
    "Methode voor het corrigeren van de spanning in het proefstuk voor de invloed van het membraan en de drainagestroken volgens Greeuw et. al 2001 Reduction of axial resistance due to membrane and side drains.",
  ISO17892d8end9v2018:
    "Methode voor het corrigeren van de spanning in het proefstuk voor de invloed van het membraan en de drainagestroken volgens NEN-EN-ISO 17892, deel 8 bij een ongeconsolideerd en ongedraineerde uitvoering en deel 9 bij een geconsolideerde uitvoering.",
};

/**
 * Get the Dutch description for a CorrectionMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtCorrectionMethodDescription(code: string): string | undefined {
  return BHRGT_CORRECTION_METHOD_CODES[code];
}
