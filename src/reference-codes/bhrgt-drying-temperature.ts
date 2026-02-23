/**
 * DryingTemperature codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DryingTemperature
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADryingTemperature
 */

export const BHRGT_DRYING_TEMPERATURE_CODES: Record<string, string> = {
  "105graden": "Het watergehalte is bepaald door droging van het materiaal op 105 °C .",
  "110graden": "Het watergehalte is bepaald door droging van het materiaal op 110 °C.",
  "70graden":
    "Het watergehalte is bepaald door droging van het materiaal op 70 °C. Deze temperatuur wordt gebruikt bij organisch materiaal. ",
};

/**
 * Get the Dutch description for a DryingTemperature code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDryingTemperatureDescription(code: string): string | undefined {
  return BHRGT_DRYING_TEMPERATURE_CODES[code];
}
