/**
 * MassPercentageClass code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:MassPercentageClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AMassPercentageClass
 */

export const BHRGT_MASS_PERCENTAGE_CLASS_CODES: Record<string, string> = {
  spoorTot1: 'Er komt een spoor voor en dat betekent dat het aandeel in de massa minder dan 1 % is.',
  uiterstVeelMinstens75: 'Er komt uiterst veel voor en dat betekent dat het aandeel in de massa minstens 75 % is.',
  veel25tot50: 'Er komt veel voor en dat betekent dat het aandeel in de massa tussen 25 en 50 % is.',
  weinig1tot25: 'Er komt weinig voor en dat betekent dat het aandeel in de massa tussen 1 en 25 % is.',
  zeerVeel50tot75: 'Er komt zeer veel voor en dat betekent dat het aandeel in de massa tussen 50 en 75 % is.',
};
