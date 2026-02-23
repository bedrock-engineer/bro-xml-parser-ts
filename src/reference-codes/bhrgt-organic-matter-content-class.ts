/**
 * OrganicMatterContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:OrganicMatterContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AOrganicMatterContentClass
 */

export const BHRGT_ORGANIC_MATTER_CONTENT_CLASS_CODES: Record<string, string> = {
  nietOrganisch: "Organische stof is niet aanwezig.",
  sterkOrganisch:
    "Organische stof is waarneembaar aanwezig en heeft voelbaar geen invloed op het gedrag van de grond.",
  zwakOrganisch:
    "Organische stof is waarneembaar aanwezig en heeft voelbaar geen invloed op het gedrag van de grond.",
};

/**
 * Get the Dutch description for a OrganicMatterContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtOrganicMatterContentClassDescription(code: string): string | undefined {
  return BHRGT_ORGANIC_MATTER_CONTENT_CLASS_CODES[code];
}
