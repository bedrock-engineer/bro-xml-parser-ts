/**
 * SaltCorrectionMethod code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:SaltCorrectionMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASaltCorrectionMethod
 */

export const BHRGT_SALT_CORRECTION_METHOD_CODES: Record<string, string> = {
  nietToegepast: 'Het watergehalte is niet gecorrigeerd voor het gehalte aan opgeloste zouten.',
  zoutgehalteAangenomen: 'Het watergehalte is gecorrigeerd voor het gehalte aan opgeloste zouten. Het zoutgehalte van het poriënwater is een aangenomen waarde.',
  zoutgehalteBepaald: 'Het watergehalte is gecorrigeerd voor het gehalte aan opgeloste zouten. Het zoutgehalte van het poriënwater is bepaald.',
};
