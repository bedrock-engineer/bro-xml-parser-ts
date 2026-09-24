/**
 * SampleQuality code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:SampleQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASampleQuality
 */

export const BHRGT_SAMPLE_QUALITY_CODES: Record<string, string> = {
  QM1: 'Gelaagdheid, interne structuur, consistentie en spanningstoestand intact (verandering door monstername reversibel). ',
  QM2: 'Gelaagdheid, interne structuur en consistentie intact. ',
  QM3: 'Gelaagdheid, interne structuur intact. ',
  QM4: 'Gelaagdheid intact. ',
  QM5: 'Gelaagdheid niet intact. ',
};
