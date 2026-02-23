/**
 * GravelContentClassNEN5104 codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:GravelContentClassNEN5104
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AGravelContentClassNEN5104
 */

export const BHRGT_GRAVEL_CONTENT_CLASS_NEN5104_CODES: Record<string, string> = {
  matigGrindig: "Grind maakt tussen 5 en 15 procent van de massa uit.",
  nietGrindig: "Grind is niet aanwezig.",
  sterkGrindig: "Grind maakt tussen 15 en 30 procent van de massa uit.",
  zwakGrindig: "Grind is aanwezig en maakt minder dan 5 procent van de massa uit.",
};

/**
 * Get the Dutch description for a GravelContentClassNEN5104 code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtGravelContentClassNEN5104Description(code: string): string | undefined {
  return BHRGT_GRAVEL_CONTENT_CLASS_NEN5104_CODES[code];
}
