/**
 * SedimentaryPhenomenon codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SedimentaryPhenomenon
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASedimentaryPhenomenon
 */

export const BHRG_SEDIMENTARY_PHENOMENON_CODES: Record<string, string> = {
  dropClast:
    "Een geïsoleerde klast bestaande uit klei of leem die de laag eronder heeft ingedrukt.",
  dropStone:
    "Een geïsoleerde klast variërend in grootte van grind tot keitje in meer fijnkorrelige grond, die de laag eronder heeft ingedrukt.",
};

/**
 * Get the Dutch description for a SedimentaryPhenomenon code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSedimentaryPhenomenonDescription(code: string): string | undefined {
  return BHRG_SEDIMENTARY_PHENOMENON_CODES[code];
}
