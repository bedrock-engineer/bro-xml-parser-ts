/**
 * GrainColour codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:GrainColour
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGrainColour
 */

export const BHRG_GRAIN_COLOUR_CODES: Record<string, string> = {
  grijzeKorrels: "De zandkorrels zijn licht- tot donkergrijs en niet transparant.",
  groeneKorrels: "De zandkorrels zijn licht- tot donkergroen en niet transparant.",
  rozeKorrels: "De zandkorrels zijn lichtrood of roze en niet transparant.",
  transparanteKorrels: "De zandkorrels zijn lichtgrijs tot kleurloos en enigszins transparant.",
  witteKorrels: "De zandkorrels zijn wit en niet transparant.",
  zwarteKorrels:
    "De zandkorrels zijn zwart, niet tot iets transparant en vaak dof. De korrelvorm is vergelijkbaar met de vorm van andere zandkorrels.",
};

/**
 * Get the Dutch description for a GrainColour code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgGrainColourDescription(code: string): string | undefined {
  return BHRG_GRAIN_COLOUR_CODES[code];
}
