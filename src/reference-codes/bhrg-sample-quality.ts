/**
 * SampleQuality code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:SampleQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASampleQuality
 */

export const BHRG_SAMPLE_QUALITY_CODES: Record<string, string> = {
  QM1: 'Gelaagdheid, interne gelaagdheid (ofwel interne structuur), consistentie, veldvochtigheid (ofwel monstervochtigheid) en spanningstoestand intact (verandering door monstername reversibel).',
  QM2: 'Gelaagdheid, interne gelaagdheid (ofwel interne structuur), consistentie en veldvochtigheid (ofwel monstervochtigheid) intact.',
  QM3: 'Gelaagdheid, interne gelaagdheid (ofwel interne structuur) intact.',
  QM4: 'Gelaagdheid intact.',
  QM5: 'Gelaagdheid niet intact.',
};
