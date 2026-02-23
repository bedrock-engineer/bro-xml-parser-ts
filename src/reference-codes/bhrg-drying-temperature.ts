/**
 * DryingTemperature codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DryingTemperature
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADryingTemperature
 */

export const BHRG_DRYING_TEMPERATURE_CODES: Record<string, string> = {
  "105graden": "Het materiaal is gedroogd bij een temperatuur van 105 °C.",
  "110graden": "Het materiaal is gedroogd bij een temperatuur van 110 °C.",
};

/**
 * Get the Dutch description for a DryingTemperature code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDryingTemperatureDescription(code: string): string | undefined {
  return BHRG_DRYING_TEMPERATURE_CODES[code];
}
