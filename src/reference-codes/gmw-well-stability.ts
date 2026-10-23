/**
 * WellStability code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:WellStability
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AWellStability
 */

export const GMW_WELL_STABILITY_CODES: Record<string, string> = {
  instabiel: 'De put beweegt in gelijke of ongelijke mate mee met het maaiveld.',
  onbekend: 'Of en hoe de put beweegt met een verandering van de maaiveldpositie is onbekend.',
  stabielNAP: 'De put beweegt niet mee met een veranderend maaiveld.',
};
