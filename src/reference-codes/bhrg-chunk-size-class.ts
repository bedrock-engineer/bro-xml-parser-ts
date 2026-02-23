/**
 * ChunkSizeClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:ChunkSizeClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AChunkSizeClass
 */

export const BHRG_CHUNK_SIZE_CLASS_CODES: Record<string, string> = {
  ergKlein: "De grootte is kleiner dan of gelijk aan 2 mm.",
  groot: "De grootte is groter dan 63 en kleiner dan of gelijk aan 200 mm.",
  klein: "De grootte is groter dan 2 en kleiner dan of gelijk aan 6,3 mm.",
  vrijGroot: "De grootte is groter dan 20 en kleiner dan of gelijk aan 63 mm.",
  vrijKlein: "De grootte is groter dan 6,3 en kleiner dan of gelijk aan 20 mm.",
  zeerGroot: "De grootte is groter dan 200 mm.",
};

/**
 * Get the Dutch description for a ChunkSizeClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgChunkSizeClassDescription(code: string): string | undefined {
  return BHRG_CHUNK_SIZE_CLASS_CODES[code];
}
