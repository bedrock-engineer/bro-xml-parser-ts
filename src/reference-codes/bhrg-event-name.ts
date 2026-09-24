/**
 * EventName code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:EventName
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AEventName
 */

export const BHRG_EVENT_NAME_CODES: Record<string, string> = {
  eindGerapporteerd: 'Er is na de rapportage van een of meerdere deelonderzoeken een volgend deelonderzoek gerapporteerd, en dat is het rapport waarmee het onderzoek wordt gecompleteerd.',
  startGerapporteerd: 'Het eerste deel van het onderzoek is gerapporteerd, maar daarmee is het onderzoek nog niet compleet.',
  volledigGerapporteerd: 'Het onderzoek is in een keer volledig gerapporteerd.',
};
