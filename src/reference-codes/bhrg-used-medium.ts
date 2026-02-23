/**
 * UsedMedium codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:UsedMedium
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AUsedMedium
 */

export const BHRG_USED_MEDIUM_CODES: Record<string, string> = {
  butanol: "In de bepaling is de vloeistof butanol gebruikt.",
  gezuiverdWater:
    "In de bepaling is leidingwater gebruikt dat door destillatie, demineralisatie of ionisatie gezuiverd is van alle zouten en mineralen.",
  hexaan: "In de bepaling is de vloeistof hexaan gebruikt.",
  leidingwater:
    "In de bepaling is water gebruikt dat bestemd is voor menselijke consumptie en via leidingen wordt getransporteerd.",

  SAR13water:
    "In de bepaling is zogenaamd SAR-water gebruikt met SAR waarde (sodium adsorption ratio) 13. De SAR waarde geeft de verhouding tussen natrium en calcium plus magnesium.",
  spiritus: "In de bepaling is de vloeistof spiritus gebruikt.",
};

/**
 * Get the Dutch description for a UsedMedium code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgUsedMediumDescription(code: string): string | undefined {
  return BHRG_USED_MEDIUM_CODES[code];
}
