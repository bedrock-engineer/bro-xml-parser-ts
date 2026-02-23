/**
 * SampleMoistness codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SampleMoistness
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASampleMoistness
 */

export const BHRG_SAMPLE_MOISTNESS_CODES: Record<string, string> = {
  onbekend: "De vochtigheidstoestand van het materiaal is niet bekend.",
  uitgedroogd:
    "Het materiaal bevat vocht maar vertoont ook sporen van krimp of vlekken die erop wijzen dat een deel van het vocht verdampt is.",
  veldvochtig: "Het materiaal is net zo vochtig als het materiaal dat direct uit het boorgat komt.",
  volledigUitgedroogd: "Het materiaal bevat geen vocht.",
};

/**
 * Get the Dutch description for a SampleMoistness code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSampleMoistnessDescription(code: string): string | undefined {
  return BHRG_SAMPLE_MOISTNESS_CODES[code];
}
