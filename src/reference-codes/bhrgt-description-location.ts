/**
 * DescriptionLocation code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:DescriptionLocation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADescriptionLocation
 */

export const BHRGT_DESCRIPTION_LOCATION_CODES: Record<string, string> = {
  lab: 'De monsters zijn beschreven in een beschrijfruimte. ',
  onbekend: 'De plek waar de monsters zijn beschreven is niet bekend.',
  veld: 'De monsters zijn beschreven in het veld, direct na monstername. ',
  veldlab: 'De monsters zijn beschreven in een container aan boord van een schip of een daarmee vergelijkbare ruimte, direct na monstername.',
};
