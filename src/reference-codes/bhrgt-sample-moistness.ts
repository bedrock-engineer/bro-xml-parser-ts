/**
 * SampleMoistness codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SampleMoistness
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASampleMoistness
 */

export const BHRGT_SAMPLE_MOISTNESS_CODES: Record<string, string> = {
  onbekend: "De vochtigheidstoestand van de grondmonsters is niet bekend.",
  uitgedroogd:
    "De grond bevat vocht maar vertoont ook sporen van krimp of vlekken die erop wijzen dat een deel van het vocht verdampt is.",
  veldvochtig: "De grond is net zo vochtig als grond die direct uit het boorgat komt.",
  volledigUitgedroogd: "De grond bevat geen vocht. ",
};

/**
 * Get the Dutch description for a SampleMoistness code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSampleMoistnessDescription(code: string): string | undefined {
  return BHRGT_SAMPLE_MOISTNESS_CODES[code];
}
