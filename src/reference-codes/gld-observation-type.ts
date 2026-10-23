/**
 * ObservationType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:ObservationType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3AObservationType
 */

export const GLD_OBSERVATION_TYPE_CODES: Record<string, string> = {
  controlemeting: 'De observatie heeft geleid tot een onafhankelijke, veelal handmatige meting, eventueel een reeks metingen, die gebruikt wordt om de reguliere (sensor) metingen te controleren.',
  reguliereMeting: 'De observatie heeft geleid tot een (reeks) sensorische of handmatige meting(en) die zijn gedaan conform het doel van de monitoring.',
};
