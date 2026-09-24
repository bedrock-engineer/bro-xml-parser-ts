/**
 * DeliveryContext code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:DeliveryContext
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADeliveryContext
 */

export const BHRG_DELIVERY_CONTEXT_CODES: Record<string, string> = {
  archiefoverdracht: 'De gegevens zijn aangeleverd in het kader van archiefoverdracht.',
  MBW: 'De gegevens zijn aangeleverd in het kader van de Mijnbouwwet.',
  ONW: 'De gegevens zijn aangeleverd in het kader van de Ontgrondingenwet.',
  OW: 'De gegevens zijn aangeleverd in het kader van de omgevingswet.',
  publiekeTaak: 'De gegevens zijn aangeleverd in het kader van de publieke taakuitvoering, zonder nadere specificering.',
  RO: 'De gegevens zijn aangeleverd in het kader van de wet ruimtelijke ordening.',
  WABO: 'De gegevens zijn aangeleverd in het kader van de Wet algemene bepalingen omgevingsrecht',
  WW: 'De gegevens zijn aangeleverd in het kader van de Waterwet.',
};
