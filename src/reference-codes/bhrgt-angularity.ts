/**
 * Angularity code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:Angularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AAngularity
 */

export const BHRGT_ANGULARITY_CODES: Record<string, string> = {
  afgerond: 'Oppervlak egaal met alleen enkele uithollingen of vlakke stukken of alleen gladde convexe oppervlakten.',
  afgerondZeerAfgerond: 'Oppervlak volledig egaal, of egaal met alleen enkele uithollingen of vlakke stukken of alleen gladde convexe oppervlakten. ',
  hoekig: 'Weinig afgeronde hoeken of randen.',
  hoekigZeerHoekig: 'Geen of weinig afgeronde hoeken of randen.',
  subhoekig: 'Onregelmatig oppervlak, waarbij de primaire hoeken en randen nog zichtbaar zijn.',
  subhoekigSubrond: 'Oppervlak onregelmatig en al dan niet egaal, waarbij de primaire hoeken en randen nog zichtbaar zijn.',
  subrond: 'Oppervlak egaal maar onregelmatig, waarbij de primaire hoeken en randen nog zichtbaar zijn.',
  zeerAfgerond: 'Oppervlak egaal.',
  zeerHoekig: 'Geen afgeronde hoeken of randen.',
};
