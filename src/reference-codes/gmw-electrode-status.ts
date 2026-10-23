/**
 * ElectrodeStatus code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:ElectrodeStatus
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AElectrodeStatus
 */

export const GMW_ELECTRODE_STATUS_CODES: Record<string, string> = {
  gebruiksklaar: 'De elektrode is klaar voor het doen van metingen.',
  nietGebruiksklaar: 'De elektrode is niet klaar voor het doen van metingen.',
  onbekend: 'Het is onbekend wat de status van de elektrode is.',
};
