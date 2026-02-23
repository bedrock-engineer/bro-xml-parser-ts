/**
 * EventName codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:EventName
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AEventName
 */

export const BHRGT_EVENT_NAME_CODES: Record<string, string> = {
  eindGerapporteerd:
    "Er is na de rapportage van een of meerdere deelonderzoeken een volgend deelonderzoek gerapporteerd, en dat is het rapport waarmee het onderzoek wordt gecompleteerd.",
  startGerapporteerd:
    "Het eerste deel van het onderzoek is gerapporteerd, maar daarmee is het onderzoek nog niet compleet.",
  vervolgGerapporteerd:
    "Er is na de eerste rapportage een volgend rapport overgedragen, maar dat is nog niet het rapport waarmee het onderzoek wordt gecompleteerd.",
  volledigGerapporteerd: "Het onderzoek is in een keer volledig gerapporteerd.",
};

/**
 * Get the Dutch description for a EventName code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtEventNameDescription(code: string): string | undefined {
  return BHRGT_EVENT_NAME_CODES[code];
}
