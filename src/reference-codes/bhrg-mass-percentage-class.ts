/**
 * MassPercentageClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MassPercentageClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMassPercentageClass
 */

export const BHRG_MASS_PERCENTAGE_CLASS_CODES: Record<string, string> = {
  aandeelOnbekend: "Het bestanddeel is aanwezig, maar het aandeel in de massa is niet bekend.",
  onbekend: "Het is niet bekend of het bestanddeel aanwezig is.",
  spoorTot1:
    "Er komt een spoor voor en dat betekent dat het aandeel in de massa minder dan 1 % is.",
  uiterstVeelMinstens75:
    "Er komt uiterst veel voor en dat betekent dat het aandeel in de massa minstens 75 % is.",
  veel25tot50:
    "Er komt veel voor en dat betekent dat het aandeel in de massa tussen 25 en 50 % is.",
  weinig1tot25:
    "Er komt weinig voor en dat betekent dat het aandeel in de massa tussen 1 en 25 % is.",
  zeerVeel50tot75:
    "Er komt zeer veel voor en dat betekent dat het aandeel in de massa tussen 50 en 75 % is.",
};

/**
 * Get the Dutch description for a MassPercentageClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMassPercentageClassDescription(code: string): string | undefined {
  return BHRG_MASS_PERCENTAGE_CLASS_CODES[code];
}
