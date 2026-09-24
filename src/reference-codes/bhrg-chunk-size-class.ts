/**
 * ChunkSizeClass code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:ChunkSizeClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AChunkSizeClass
 */

export const BHRG_CHUNK_SIZE_CLASS_CODES: Record<string, string> = {
  ergKlein: 'De grootte is kleiner dan of gelijk aan 2 mm.',
  groot: 'De grootte is groter dan 63 en kleiner dan of gelijk aan 200 mm.',
  klein: 'De grootte is groter dan 2 en kleiner dan of gelijk aan 6,3 mm.',
  vrijGroot: 'De grootte is groter dan 20 en kleiner dan of gelijk aan 63 mm.',
  vrijKlein: 'De grootte is groter dan 6,3 en kleiner dan of gelijk aan 20 mm.',
  zeerGroot: 'De grootte is groter dan 200 mm.',
};
