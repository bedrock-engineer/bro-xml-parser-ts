/**
 * PositionOnGroundBody codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:PositionOnGroundBody
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3APositionOnGroundBody
 */

export const BHRGT_POSITION_ON_GROUND_BODY_CODES: Record<string, string> = {
  binnenteen:
    "De binnenteen is de overgang van het talud naar het maaiveld aan de binnenzijde (bij dijken de landzijde) van het grondlichaam.",
  buitenteen:
    "De buitenteen is de overgang van het talud naar het maaiveld aan de buitenzijde (bij dijken de waterzijde) van het grondlichaam.",
  kruin: "De top of het hoogste vlak van het grondlichaam.",
  talud: "De zijwand van het grondlichaam.",
  teen: "De overgang van het talud naar het maaiveld, niet nader gespecificeerd naar binnen- of buitenkant.",
};

/**
 * Get the Dutch description for a PositionOnGroundBody code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtPositionOnGroundBodyDescription(code: string): string | undefined {
  return BHRGT_POSITION_ON_GROUND_BODY_CODES[code];
}
