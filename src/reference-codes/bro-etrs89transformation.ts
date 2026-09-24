/**
 * Etrs89Transformation code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:Etrs89Transformation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3AEtrs89Transformation
 */

export const BRO_ETRS89TRANSFORMATION_CODES: Record<string, string> = {
  '7parameterTransformatie': '7 parameter transformatie.',
  '7parameterTransformatie1989': '7 parameter transformatie zonder datum.',
  nietGetransformeerd: 'De gegevens zijn aangeleverd in ETRS89; transformatie was niet nodig.',
  RDNAPTRANS2008: 'RDNAPTRANS2008.',
  RDNAPTRANS2008MV0: 'RDNAPTRANS2008 zonder maaiveldhoogte.',
};
