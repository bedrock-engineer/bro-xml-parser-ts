/**
 * CensoredReason code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:CensoredReason
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3ACensoredReason
 */

export const GLD_CENSORED_REASON_CODES: Record<string, string> = {
  groterDanLimietwaarde: 'De meetwaarde is gecensureerd omdat de limietwaarde is overschreden. De waterstand is > limietwaarde.',
  kleinerDanLimietwaarde: 'De meetwaarde is gecensureerd omdat de limietwaarde is onderschreden. De waterstand is < limietwaarde.',
  onbekend: 'Het is onbekend wat de reden is van het censureren van de waarde van het attribuut waterstand. Het is daarmee ook onbekend of de waterstand groter dan of kleiner dan een limietwaarde is (IMBRO/A kwaliteitsregime).',
};
