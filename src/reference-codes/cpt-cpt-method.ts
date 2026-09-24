/**
 * CPTMethod code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:cpt:CPTMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ACPTMethod
 */

export const CPT_CPT_METHOD_CODES: Record<string, string> = {
  elektrisch: 'Elektrische meting, continuiteit van de uitvoering onbekend',
  elektrischContinu: 'Elektrisch continue meting',
  elektrischDiscontinu: 'Elektrisch discontinue meting',
  mechanisch: 'Mechanische meting, continuiteit van de uitvoering onbekend',
  mechanischContinu: 'Mechanisch continue meting',
  mechanischDiscontinu: 'Mechanisch discontinue meting',
  onbekend: 'Methode onbekend',
};
