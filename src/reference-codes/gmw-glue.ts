/**
 * Glue code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:Glue
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AGlue
 */

export const GMW_GLUE_CODES: Record<string, string> = {
  geen: 'De buis is niet verlijmd.',
  onbekend: 'Het is onbekend of de buis verlijmd is.',
  ongespecificeerd: 'De buis is verlijmd, maar de gebruikte lijmsoort is niet gespecificeerd.',
};
