/**
 * StopCriterion code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:cpt:StopCriterion
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AStopCriterion
 */

export const CPT_STOP_CRITERION_CODES: Record<string, string> = {
  bezwijkrisico: 'Risico op bezwijken / knikken',
  conusweerstand: 'Maximale conusweerstand bereikt',
  einddiepte: 'Einddiepte bereikt',
  hellingshoek: 'Maximale hellingshoek bereikt',
  obstakel: 'Obstakel geraakt',
  onbekend: 'De reden is onbekend',
  storing: 'Er is een storing opgetreden',
  waterspanning: 'Maximale waterspanning bereikt',
  wegdrukkracht: 'Maximale wegdrukkracht bereikt',
  wrijvingsweerstand: 'Maximale wrijvingsweerstand bereikt',
};
