/**
 * PreTreatment code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:PreTreatment
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3APreTreatment
 */

export const BHRGT_PRE_TREATMENT_CODES: Record<string, string> = {
  bevriezing: 'De uitvoerder heeft het interval tijdens het boren bevroren.',
  geen: 'Er heeft tijdens het boren geen voorbehandeling plaatsgevonden.',
  injectieDragendVermogen: 'De uitvoerder heeft het interval tijdens het boren geïnjecteerd met materiaal om het dragend vermogen te vergroten.',
  injectieWaterdoorlatendheid: 'De uitvoerder heeft het interval tijdens het boren geïnjecteerd met materiaal om de waterdoorlatendheid te verkleinen.',
  onbekend: 'Het is onbekend of er tijdens het boren voorbehandeling heeft plaatsgevonden.',
};
