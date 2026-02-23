/**
 * StopCriterion codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:StopCriterion
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AStopCriterion
 */

export const CPT_STOP_CRITERION_CODES: Record<string, string> = {
  bezwijkrisico: "Risico op bezwijken / knikken",
  conusweerstand: "Maximale conusweerstand bereikt",
  einddiepte: "Einddiepte bereikt",
  hellingshoek: "Maximale hellingshoek bereikt",
  obstakel: "Obstakel geraakt",
  onbekend: "De reden is onbekend",
  storing: "Er is een storing opgetreden",
  waterspanning: "Maximale waterspanning bereikt",
  wegdrukkracht: "Maximale wegdrukkracht bereikt",
  wrijvingsweerstand: "Maximale wrijvingsweerstand bereikt",
};

/**
 * Get the Dutch description for a StopCriterion code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptStopCriterionDescription(code: string): string | undefined {
  return CPT_STOP_CRITERION_CODES[code];
}
