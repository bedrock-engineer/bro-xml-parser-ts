/**
 * ApertureClassDiscontinuity code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:ApertureClassDiscontinuity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AApertureClassDiscontinuity
 */

export const BHRGT_APERTURE_CLASS_DISCONTINUITY_CODES: Record<string, string> = {
  breed: 'De kortste afstand tussen de grensvlakken is groter dan 10 cm.',
  matigBreed: 'De kortste afstand tussen de grensvlakken ligt tussen 1 en 10 cm.',
  matigSmal: 'De kortste afstand tussen de grensvlakken ligt tussen 0,25 en 1 cm.',
  smal: 'De kortste afstand tussen de grensvlakken ligt tussen 0,5 en 2,5 mm.',
  uiterstSmal: 'De kortste afstand tussen de grensvlakken is kleiner dan 0,25 mm.',
  zeerSmal: 'De kortste afstand tussen de grensvlakken ligt tussen 0,25 en 0,5 mm.',
};
