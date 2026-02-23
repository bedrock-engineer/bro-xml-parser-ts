/**
 * RemovalMethodCarbonate codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:RemovalMethodCarbonate
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ARemovalMethodCarbonate
 */

export const BHRG_REMOVAL_METHOD_CARBONATE_CODES: Record<string, string> = {
  handmatig: "Koolzure kalk is handmatig verwijderd en enkel grove bestanddelen zijn verwijderd.",
  "HCL_0.5M": "Koolzure kalk is verwijderd met HCL (0,5 M).",
  nietVerwijderd: "Koolzure kalk is niet verwijderd.",
};

/**
 * Get the Dutch description for a RemovalMethodCarbonate code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgRemovalMethodCarbonateDescription(code: string): string | undefined {
  return BHRG_REMOVAL_METHOD_CARBONATE_CODES[code];
}
