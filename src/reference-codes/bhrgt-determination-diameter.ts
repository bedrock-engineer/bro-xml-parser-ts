/**
 * DeterminationDiameter codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DeterminationDiameter
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADeterminationDiameter
 */

export const BHRGT_DETERMINATION_DIAMETER_CODES: Record<string, string> = {
  PPgroot:
    "De bepalingsdiameter van de Large Pocket Penetrometer of LPP, een zakpenetrometer met groot opzetstuk (25,4 mm).",
  PPklein:
    "De bepalingsdiameter van de Small Pocket Penetrometer of SPP, een zakpenetrometer met een klein opzetstuk (4,5 mm). ",
  PPmiddelgroot:
    "De bepalingsdiameter van de Medium Pocket Penetrometer of MPP, een zakpenetrometer met middelgroot opzetstuk (8,5 mm).",
  PPstandaard:
    "De bepalingsdiameter van de Pocket Penetrometer of PP, een zakpenetrometer zonder opzetstuk (6,3 mm).",
  PPzeerKlein:
    "De bepalingsdiameter van de Very Small Pocket Penetrometer of VSPP, een zakpenetrometer met zeer klein opzetstuk (3,2 mm). ",
  TVgroot:
    "De bepalingsdiameter van de Large Torvane of LTV een handvin met groot opzetstuk (47,8 mm). ",
  TVklein:
    "De bepalingsdiameter van de Small Torvane of STV, een handvin met klein opzetstuk (19,0 mm).",
  TVstandaard: "De bepalingsdiameter van de Torvane of TV, een handvin zonder opzetstuk (25,4 mm).",
};

/**
 * Get the Dutch description for a DeterminationDiameter code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDeterminationDiameterDescription(code: string): string | undefined {
  return BHRGT_DETERMINATION_DIAMETER_CODES[code];
}
