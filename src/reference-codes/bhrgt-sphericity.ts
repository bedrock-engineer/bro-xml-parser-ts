/**
 * Sphericity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Sphericity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASphericity
 */

export const BHRGT_SPHERICITY_CODES: Record<string, string> = {
  bol: "De gemiddelde korrel is in alle richtingen ongeveer even lang.",
  langwerpig:
    "De gemiddelde korrel is in twee van de drie richtingen ongeveer even lang, maar in de derde veel langer.",
  plat: "De gemiddelde korrel is in twee van de drie richtingen ongeveer even lang, maar in de derde veel korter.",
};

/**
 * Get the Dutch description for a Sphericity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSphericityDescription(code: string): string | undefined {
  return BHRGT_SPHERICITY_CODES[code];
}
