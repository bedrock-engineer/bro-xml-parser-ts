/**
 * DescribedSamplesQuality code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:DescribedSamplesQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescribedSamplesQuality
 */

export const BHRG_DESCRIBED_SAMPLES_QUALITY_CODES: Record<string, string> = {
  deelsOngeroerd: 'Een niet nader gespecificeerd deel van de monsters is ongeroerd.',
  geroerd: 'De beschrijving is gemaakt van geroerde boormonsters.',
  onbekend: 'De beschrijving is gemaakt van boormonsters waarvan de monsterkwaliteit niet bekend is.',
  ongeroerd: 'De beschrijving is gemaakt van ongeroerde boormonsters.',
};
