/**
 * HorizontalCrs codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:HorizontalCrs
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AHorizontalCrs
 */

export const CPT_HORIZONTAL_CRS_CODES: Record<string, string> = {
  ETRS89: "European Terrestrial Reference System 1989 (EPSG 4258)",
  RD: "Rijks Driehoeksmeting - Amersfoort RD New (EPSG 28992)",
  WGS84: "World Geodetic System 1984 (EPSG 4326)",
};

/**
 * Get the Dutch description for a HorizontalCrs code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptHorizontalCrsDescription(code: string): string | undefined {
  return CPT_HORIZONTAL_CRS_CODES[code];
}
