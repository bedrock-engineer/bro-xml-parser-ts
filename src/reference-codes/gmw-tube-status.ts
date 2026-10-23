/**
 * TubeStatus code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:TubeStatus
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3ATubeStatus
 */

export const GMW_TUBE_STATUS_CODES: Record<string, string> = {
  gebruiksklaar: 'De buis is klaar voor grondwatermonitoring.',
  nietGebruiksklaar: 'De buis is niet klaar voor grondwatermonitoring.',
  onbekend: 'Het is onbekend wat de status van de buis is.',
  onbruikbaar: 'De buis is nooit meer bruikbaar voor grondwatermonitoring.',
};
