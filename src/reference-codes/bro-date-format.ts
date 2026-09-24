/**
 * DateFormat code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:DateFormat
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3ADateFormat
 */

export const BRO_DATE_FORMAT_CODES: Record<string, string> = {
  JJJJ: 'Tot op het jaar nauwkeurig.',
  'JJJJ-MM': 'Tot op de maand nauwkeurig.',
  'JJJJ-MM-DD': 'Tot op de dag nauwkeurig.',
  'JJJJ-MM-DDTUU:MM:SS+UU:MM': 'Tot op de seconde nauwkeurig.',
  onbekend: 'Onbekend.',
};
