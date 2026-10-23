/**
 * CorrectionReason code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:CorrectionReason
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3ACorrectionReason
 */

export const GMW_CORRECTION_REASON_CODES: Record<string, string> = {
  bronhouder: 'Correctie van de bronhouder die in het verzoek staat dat bij registratie starten is aangeboden ',
  eigenCorrectie: 'Correctie op initiatief van de dataleverancier',
  inOnderzoek: 'Correctie naar aanleiding van een door de registratiebeheerder gestart onderzoek',
  kwaliteitsregime: 'Correctie van het kwaliteitsregime',
};
