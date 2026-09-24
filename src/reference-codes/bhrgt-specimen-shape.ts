/**
 * SpecimenShape code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:SpecimenShape
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASpecimenShape
 */

export const BHRGT_SPECIMEN_SHAPE_CODES: Record<string, string> = {
  onveranderd: 'Het proefstuk is niet bezweken, er zijn geen schuifvlakken. De vorm van het proefstuk is in laterale richting niet verandert.',
  schuifvlakEnkel: 'Het proefstuk is tijdens de bepaling bezweken en in het proefstuk is een schuifvlak ontstaan.',
  schuifvlakMeervoudig: 'Het proefstuk is tijdens de bepaling bezweken en in het proefstuk zijn meerdere schuifvlakken ontstaan.',
  veranderdGeenTon: 'Het proefstuk is niet bezweken. De vorm van het proefstuk is in laterale richting veranderd, maar het is geen tonvorm geworden.',
  veranderdTonvorm: 'Het proefstuk is niet bezweken. De vorm van het proefstuk is in laterale richting veranderd van recht naar bol. Het proefstuk heeft een tonvorm gekregen.',
};
