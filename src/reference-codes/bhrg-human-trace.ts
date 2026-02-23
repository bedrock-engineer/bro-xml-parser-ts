/**
 * HumanTrace codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:HumanTrace
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AHumanTrace
 */

export const BHRG_HUMAN_TRACE_CODES: Record<string, string> = {
  graafSpoor: "Verstoring die wordt herkend als het gevolg van graven door de mens.",
  hoefSpoor:
    "Verstoring die wordt herkend als het gevolg van de indruk van een poot van een hoefdier, dat waarschijnlijk als vee gehouden is (komt voor in kleiige afzettingen).",
  ploegSpoor: "Verstoring die wordt herkend als het gevolg van ploegen.",
};

/**
 * Get the Dutch description for a HumanTrace code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgHumanTraceDescription(code: string): string | undefined {
  return BHRG_HUMAN_TRACE_CODES[code];
}
