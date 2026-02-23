/**
 * Discolouration codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Discolouration
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADiscolouration
 */

export const BHRGT_DISCOLOURATION_CODES: Record<string, string> = {
  gedeeltelijkVerkleurd: "Het materiaal is verkleurd, maar niet door en door. ",
  nietVerkleurd:
    "Geen zichtbare verkleuring van gesteentemateriaal, eventueel met lichte verkleuring op discontinuïteitsvlakken.",
  volledigVerkleurd: "Het materiaal is door en door verkleurd.",
};

/**
 * Get the Dutch description for a Discolouration code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDiscolourationDescription(code: string): string | undefined {
  return BHRGT_DISCOLOURATION_CODES[code];
}
