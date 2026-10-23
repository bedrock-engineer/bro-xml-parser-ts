/**
 * InitialFunction code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:InitialFunction
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AInitialFunction
 */

export const GMW_INITIAL_FUNCTION_CODES: Record<string, string> = {
  brandput: 'De put is initiëel ingericht voor het onttrekken van bluswater.',
  kwaliteit: 'De put is initiëel ingericht voor het monitoring van de grondwatersamenstelling.',
  kwaliteitStand: 'De put is initiëel ingericht voor het monitoren van zowel de grondwaterstand als de grondwatersamenstelling.',
  onbekend: 'Het is onbekend voor welke functie de put initiëel is ingericht.',
  onttrekking: 'De put is initiëel ingericht voor grondwateronttrekking.',
  stand: 'De put is initiëel ingericht voor het monitoring van de grondwaterstand.',
};
