/**
 * DrainageStripOrientation codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DrainageStripOrientation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADrainageStripOrientation
 */

export const BHRGT_DRAINAGE_STRIP_ORIENTATION_CODES: Record<string, string> = {
  diagonaal35tot60graden:
    "De drainagestroken zijn diagonaal in een hoek tussen 35 en 60 graden rondom het proefstuk geplaatst.",
  diagonaal60tot80graden:
    "De drainagestroken zijn diagonaal in een hoek tussen 60 en 80 graden rondom het proefstuk geplaatst.",
  verticaal: "De drainagestroken zijn verticaal aan de buitenkant van het proefstuk geplaatst.  ",
};

/**
 * Get the Dutch description for a DrainageStripOrientation code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDrainageStripOrientationDescription(code: string): string | undefined {
  return BHRGT_DRAINAGE_STRIP_ORIENTATION_CODES[code];
}
