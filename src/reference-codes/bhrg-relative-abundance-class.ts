/**
 * RelativeAbundanceClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:RelativeAbundanceClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ARelativeAbundanceClass
 */

export const BHRG_RELATIVE_ABUNDANCE_CLASS_CODES: Record<string, string> = {
  aandeelOnbekend: "Het bestanddeel is aanwezig, maar het aandeel in de associatie is niet bekend.",
  spoorTot1:
    "Er komt een spoor van het bestanddeel voor, en dat betekent dat het aandeel in de associatie minder dan 1 % is.",
  uiterstVeelMinstens75:
    "Het bestanddeel komt weinig voor, en dat betekent dat het aandeel in de associatie minstens 75 % is.",
  veel25tot50:
    "Het bestanddeel komt weinig voor, en dat betekent dat het aandeel in de associatie minimaal 25 en minder dan 50 % is.",
  weinig1tot25:
    "Het bestanddeel komt weinig voor, en dat betekent dat het aandeel in de associatie minimaal 1 en minder dan 25 % is.",
  zeerVeel50tot75:
    "Het bestanddeel komt weinig voor, en dat betekent dat het aandeel in de associatie minimaal 50 en minder dan 75 % is.",
};

/**
 * Get the Dutch description for a RelativeAbundanceClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgRelativeAbundanceClassDescription(code: string): string | undefined {
  return BHRG_RELATIVE_ABUNDANCE_CLASS_CODES[code];
}
