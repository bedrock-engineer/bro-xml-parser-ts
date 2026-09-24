/**
 * SampleMoistness code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:SampleMoistness
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASampleMoistness
 */

export const BHRG_SAMPLE_MOISTNESS_CODES: Record<string, string> = {
  onbekend: 'De vochtigheidstoestand van het materiaal is niet bekend.',
  uitgedroogd: 'Het materiaal bevat vocht maar vertoont ook sporen van krimp of vlekken die erop wijzen dat een deel van het vocht verdampt is.',
  veldvochtig: 'Het materiaal is net zo vochtig als het materiaal dat direct uit het boorgat komt.',
  volledigUitgedroogd: 'Het materiaal bevat geen vocht.',
};
