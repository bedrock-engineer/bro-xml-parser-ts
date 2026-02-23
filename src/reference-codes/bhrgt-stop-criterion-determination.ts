/**
 * StopCriterionDetermination codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:StopCriterionDetermination
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStopCriterionDetermination
 */

export const BHRGT_STOP_CRITERION_DETERMINATION_CODES: Record<string, string> = {
  beperkingTechnisch:
    "De bepaling is voortijdig gestopt vanwege de beperkingen van het gebruikte apparaat.",
  einddoel: "Het vooraf gestelde doel van de bepaling is bereikt.",
  membraanLek:
    "De bepaling is voortijdig gestopt omdat het membraan tijdens de bepaling lek raakte.",
};

/**
 * Get the Dutch description for a StopCriterionDetermination code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStopCriterionDeterminationDescription(code: string): string | undefined {
  return BHRGT_STOP_CRITERION_DETERMINATION_CODES[code];
}
