/**
 * SampleContainerVolume codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SampleContainerVolume
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASampleContainerVolume
 */

export const BHRGT_SAMPLE_CONTAINER_VOLUME_CODES: Record<string, string> = {
  "100ml":
    "De monsterhouder heeft een inhoud van ca. 100 ml. Deze wordt gebruikt bij materialen met een lage volumieke massa van de vaste delen, zoals veen.",
  "50ml": "De monsterhouder heeft een inhoud van ca. 50 ml.",
};

/**
 * Get the Dutch description for a SampleContainerVolume code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSampleContainerVolumeDescription(code: string): string | undefined {
  return BHRGT_SAMPLE_CONTAINER_VOLUME_CODES[code];
}
