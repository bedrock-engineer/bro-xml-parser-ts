/**
 * DeliveryContext code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:cpt:DeliveryContext
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ADeliveryContext
 */

export const CPT_DELIVERY_CONTEXT_CODES: Record<string, string> = {
  archiefoverdracht: 'De gegevens zijn aangeleverd in het kader van archiefoverdracht',
  MBW: 'De gegevens zijn aangeleverd in het kader van de Mijnbouwwet',
  publiekeTaak: 'De gegevens zijn aangeleverd in het kader van de publieke taakuitvoering, zonder nadere specificering',
  WW: 'De gegevens zijn aangeleverd in het kader van de Waterwet',
};
