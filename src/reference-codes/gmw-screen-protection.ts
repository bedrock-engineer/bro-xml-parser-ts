/**
 * ScreenProtection code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:ScreenProtection
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AScreenProtection
 */

export const GMW_SCREEN_PROTECTION_CODES: Record<string, string> = {
  dubbelwandigFilterMetFilterkous: 'Het filter is dubbelwandig uitgevoerd, al dan niet opgevuld met filtergrind, en voorzien van een filterkous.',
  dubbelwandigFilterZonderFilterkous: 'Het filter is dubbelwandig uitgevoerd, al dan niet opgevuld met filtergrind, en niet voorzien van een filterkous.',
  filterkousMetOpvulling: 'Het filter is voorzien van een filterkous, met filtergrind tussen filter en filterkous.',
  filterkousZonderOpvulling: 'Het filter is voorzien van een filterkous, zonder filtergrind tussen filter en filterkous.',
  geen: 'Er is geen filterbescherming toegepast.',
  onbekend: 'Het is onbekend of filterbescherming is toegepast.',
};
