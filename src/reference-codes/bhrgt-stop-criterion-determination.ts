/**
 * StopCriterionDetermination code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:StopCriterionDetermination
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStopCriterionDetermination
 */

export const BHRGT_STOP_CRITERION_DETERMINATION_CODES: Record<string, string> = {
  beperkingTechnisch: 'De bepaling is voortijdig gestopt vanwege de beperkingen van het gebruikte apparaat.',
  einddoel: 'Het vooraf gestelde doel van de bepaling is bereikt.',
  membraanLek: 'De bepaling is voortijdig gestopt omdat het membraan tijdens de bepaling lek raakte.',
};
