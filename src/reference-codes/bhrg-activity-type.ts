/**
 * ActivityType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:ActivityType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AActivityType
 */

export const BHRG_ACTIVITY_TYPE_CODES: Record<string, string> = {
  gecontroleerdAangebracht: 'Opgebracht materiaal dat tot een bepaalde graad verdicht is (engineered fill).',
  geroerd: 'De natuurlijke samenhang van de grond is door ploegen of andere vormen van omwoelen verstoord.',
  losGestort: 'Opgebracht materiaal dat los gestort is.',
  nietBepaald: 'De wijze waarop de mens in de opbouw van de ondergrond heeft ingegrepen, kon niet worden bepaald.',
};
