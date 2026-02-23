/**
 * LocalVerticalReferencePoint codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:LocalVerticalReferencePoint
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ALocalVerticalReferencePoint
 */

export const CPT_LOCAL_VERTICAL_REFERENCE_POINT_CODES: Record<string, string> = {
  maaiveld:
    "Het oppervlak van de vaste aarde, daar waar de aarde niet bedekt is met water. Het maaiveld vormt de grens tussen de ondergrond en de bovengrond",
  waterbodem:
    "De bodem van het waterlichaam. Deze vormt de grens tussen de ondergrond en de bovengrond, daar waar de aarde bedekt is met water",
};

/**
 * Get the Dutch description for a LocalVerticalReferencePoint code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptLocalVerticalReferencePointDescription(code: string): string | undefined {
  return CPT_LOCAL_VERTICAL_REFERENCE_POINT_CODES[code];
}
