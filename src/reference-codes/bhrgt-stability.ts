/**
 * Stability code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:Stability
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStability
 */

export const BHRGT_STABILITY_CODES: Record<string, string> = {
  instabiel: 'Het gesteente valt uiteen in water of het oppervlak van het monster valt al uiteen bij blootstelling aan lucht.',
  matigStabiel: 'Het gesteente valt oppervlakkig uiteen in water.',
  stabiel: 'Het gesteente blijft onveranderd in water.',
};
