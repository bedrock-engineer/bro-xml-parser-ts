/**
 * OrganicSoilConsistency codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:OrganicSoilConsistency
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AOrganicSoilConsistency
 */

export const BHRG_ORGANIC_SOIL_CONSISTENCY_CODES: Record<string, string> = {
  matigSlap: "De grond loopt met knijpen nog goed tussen de vingers door.",
  matigStevig: "De grond is met stevig knijpen nog juist tussen de vingers door te krijgen.",
  slap: "De grond loopt met knijpen zeer gemakkelijk tussen de vingers door.",
  stevig: "De grond is ook met stevig knijpen niet tussen de vingers door te krijgen.",
  vast: "De grond is nog met de nagel in te drukken.",
  zeerSlap: "De grond loopt zonder knijpen tussen de vingers door.",
};

/**
 * Get the Dutch description for a OrganicSoilConsistency code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgOrganicSoilConsistencyDescription(code: string): string | undefined {
  return BHRG_ORGANIC_SOIL_CONSISTENCY_CODES[code];
}
