/**
 * VolumePercentageClass code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:VolumePercentageClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVolumePercentageClass
 */

export const BHRG_VOLUME_PERCENTAGE_CLASS_CODES: Record<string, string> = {
  aandeelOnbekend: 'Het bestanddeel is aanwezig, maar het aandeel in het volume is niet bekend.',
  geen: 'Het bestanddeel komt niet voor.',
  onbekend: 'Het is niet bekend of het bestanddeel aanwezig is.',
  spoorTot1: 'Er komt een spoor voor en dat betekent dat het aandeel in het volume minder dan 1 procent is.',
  uiterstVeelMinstens50: 'Er komt uiterst veel voor en dat betekent dat het aandeel in het volume minimaal 50 procent is.',
  veel10tot30: 'Er komt veel voor en dat betekent dat het aandeel in het volume minimaal 10 en minder dan 30 procent is.',
  weinig1tot10: 'Er komt weinig voor en dat betekent dat het aandeel in het volume minimaal 1 en minder dan 10 procent is.',
  zeerVeel30tot50: 'Er komt zeer veel voor en dat betekent dat het aandeel in het volume minimaal 30 en minder dan 50 procent ligt.',
  zeerVeelTotUiterstVeelMinstens30: 'Er komt zeer veel tot uiterst veel voor en dat betekent dat het aandeel in het volume minstens 30 % is.',
};
