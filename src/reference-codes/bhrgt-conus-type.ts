/**
 * ConusType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:ConusType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AConusType
 */

export const BHRGT_CONUS_TYPE_CODES: Record<string, string> = {
  engelseConus60graden:
    "De Engelse conus is een lichte brede conus van 60 gr. en met een hoek van 60�. Wordt gebruikt voor slap materiaal.",
  zweedseConus30graden:
    "De Zweedse conus is een zware scherpe conus van 80 gr. en met een hoek van 30�. Wordt standaard gebruikt.",
};

/**
 * Get the Dutch description for a ConusType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtConusTypeDescription(code: string): string | undefined {
  return BHRGT_CONUS_TYPE_CODES[code];
}
