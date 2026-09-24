/**
 * GravelContentClass code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:GravelContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGravelContentClass
 */

export const BHRG_GRAVEL_CONTENT_CLASS_CODES: Record<string, string> = {
  grindig: 'Grind is aanwezig, maar het aandeel in de massa is niet bekend.',
  matigGrindig: 'Grind maakt tussen 5 en 15 % van de massa uit.',
  nietGrindig: 'Grind is niet aanwezig.',
  onbekend: 'Het is niet bekend of grind aanwezig is.',
  sterkGrindig: 'Grind maakt tussen 15 en 30 % van de massa uit.',
  zwakGrindig: 'Grind is aanwezig en maakt minder dan 5 % van de massa uit.',
};
