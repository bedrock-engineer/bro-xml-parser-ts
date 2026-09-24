/**
 * WallFrictionCorrectionMethod code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:WallFrictionCorrectionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AWallFrictionCorrectionMethod
 */

export const BHRGT_WALL_FRICTION_CORRECTION_METHOD_CODES: Record<string, string> = {
  nietToegepast: 'De verticale spanning is niet gecorrigeerd voor wrijving in de ring.',
  wrijvingAangenomen: 'De verticale spanning is gecorrigeerd voor wrijving in de ring. De wrijving is een aangenomen waarde op basis van het Protocol laboratoriumproeven voor grondonderzoek aan waterkeringen, 2016.',
  wrijvingBepaald: 'De verticale spanning is gecorrigeerd voor wrijving in de ring. De wandwrijving is (automatisch) bepaald.',
};
