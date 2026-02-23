/**
 * RemovalMethodOrganicMatter codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:RemovalMethodOrganicMatter
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ARemovalMethodOrganicMatter
 */

export const BHRG_REMOVAL_METHOD_ORGANIC_MATTER_CODES: Record<string, string> = {
  H2O2_15procent: "Organische stof is verwijderd met H2O2 (15 %).",
  handmatig: "Organische stof is handmatig verwijderd en enkel grove bestanddelen zijn verwijderd.",
  nietVerwijderd: "Organische stof is niet verwijderd.",
};

/**
 * Get the Dutch description for a RemovalMethodOrganicMatter code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgRemovalMethodOrganicMatterDescription(code: string): string | undefined {
  return BHRG_REMOVAL_METHOD_ORGANIC_MATTER_CODES[code];
}
