/**
 * WallFrictionCorrectionMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:WallFrictionCorrectionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AWallFrictionCorrectionMethod
 */

export const BHRGT_WALL_FRICTION_CORRECTION_METHOD_CODES: Record<string, string> = {
  nietToegepast: "De verticale spanning is niet gecorrigeerd voor wrijving in de ring.",
  wrijvingAangenomen:
    "De verticale spanning is gecorrigeerd voor wrijving in de ring. De wrijving is een aangenomen waarde op basis van het Protocol laboratoriumproeven voor grondonderzoek aan waterkeringen, 2016.",
  wrijvingBepaald:
    "De verticale spanning is gecorrigeerd voor wrijving in de ring. De wandwrijving is (automatisch) bepaald.",
};

/**
 * Get the Dutch description for a WallFrictionCorrectionMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtWallFrictionCorrectionMethodDescription(code: string): string | undefined {
  return BHRGT_WALL_FRICTION_CORRECTION_METHOD_CODES[code];
}
