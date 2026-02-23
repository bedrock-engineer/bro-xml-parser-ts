/**
 * StepType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:StepType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStepType
 */

export const BHRGT_STEP_TYPE_CODES: Record<string, string> = {
  belastingstap: "Het doel van de stap is het proefstuk te vervormen door het te belasten.",
  ontlastingstap: "Het doel van de stap is het proefstuk te vervormen door het te ontlasten.",
  relaxatiestap:
    "Het doel van de stap is de spanning in het proefstuk in in evenwicht te laten komen met de belasting door de hoogte constant te houden. Deze stap wordt alleen uitgevoerd bij snelheidgestuurd samendrukken.",
};

/**
 * Get the Dutch description for a StepType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStepTypeDescription(code: string): string | undefined {
  return BHRGT_STEP_TYPE_CODES[code];
}
