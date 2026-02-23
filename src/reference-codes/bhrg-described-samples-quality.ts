/**
 * DescribedSamplesQuality codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DescribedSamplesQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescribedSamplesQuality
 */

export const BHRG_DESCRIBED_SAMPLES_QUALITY_CODES: Record<string, string> = {
  deelsOngeroerd: "Een niet nader gespecificeerd deel van de monsters is ongeroerd.",
  geroerd: "De beschrijving is gemaakt van geroerde boormonsters.",
  onbekend:
    "De beschrijving is gemaakt van boormonsters waarvan de monsterkwaliteit niet bekend is.",
  ongeroerd: "De beschrijving is gemaakt van ongeroerde boormonsters.",
};

/**
 * Get the Dutch description for a DescribedSamplesQuality code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDescribedSamplesQualityDescription(code: string): string | undefined {
  return BHRG_DESCRIBED_SAMPLES_QUALITY_CODES[code];
}
