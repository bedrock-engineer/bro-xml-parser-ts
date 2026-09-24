/**
 * Discolouration code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:Discolouration
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADiscolouration
 */

export const BHRGT_DISCOLOURATION_CODES: Record<string, string> = {
  gedeeltelijkVerkleurd: 'Het materiaal is verkleurd, maar niet door en door. ',
  nietVerkleurd: 'Geen zichtbare verkleuring van gesteentemateriaal, eventueel met lichte verkleuring op discontinuïteitsvlakken.',
  volledigVerkleurd: 'Het materiaal is door en door verkleurd.',
};
