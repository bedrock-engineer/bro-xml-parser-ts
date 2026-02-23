/**
 * DryingPeriod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DryingPeriod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADryingPeriod
 */

export const BHRG_DRYING_PERIOD_CODES: Record<string, string> = {
  "16tot24uur": "Het materiaal is tussen de 16 en 24 uur gedroogd.",
  "24uurEnLanger": "Het materiaal is langer dan 24 uur gedroogd.",
  stabieleMassa1uur:
    "Het materiaal is gedroogd tot het materiaal een stabiele massa heeft en dat is wanneer de massa van het materiaal niet meer dan 0,1 % veranderd na 1 uur drogen.",
  stabieleMassa5minuten:
    "Het materiaal is gedroogd tot het materiaal een stabiele massa heeft en dat is wanneer de massa van het materiaal niet meer dan 0,5 % veranderd na 5 minuten drogen.",
};

/**
 * Get the Dutch description for a DryingPeriod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDryingPeriodDescription(code: string): string | undefined {
  return BHRG_DRYING_PERIOD_CODES[code];
}
