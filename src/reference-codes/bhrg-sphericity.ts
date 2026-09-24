/**
 * Sphericity code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:Sphericity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASphericity
 */

export const BHRG_SPHERICITY_CODES: Record<string, string> = {
  bol: 'De gemiddelde korrel is in alle richtingen ongeveer even lang.',
  langwerpig: 'De gemiddelde korrel is in twee van de drie richtingen ongeveer even lang, maar in de derde veel langer',
  plat: 'De gemiddelde korrel is in twee van de drie richtingen ongeveer even lang, maar in de derde veel korter.',
};
