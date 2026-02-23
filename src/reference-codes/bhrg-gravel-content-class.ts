/**
 * GravelContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:GravelContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGravelContentClass
 */

export const BHRG_GRAVEL_CONTENT_CLASS_CODES: Record<string, string> = {
  grindig: "Grind is aanwezig, maar het aandeel in de massa is niet bekend.",
  matigGrindig: "Grind maakt tussen 5 en 15 % van de massa uit.",
  nietGrindig: "Grind is niet aanwezig.",
  onbekend: "Het is niet bekend of grind aanwezig is.",
  sterkGrindig: "Grind maakt tussen 15 en 30 % van de massa uit.",
  zwakGrindig: "Grind is aanwezig en maakt minder dan 5 % van de massa uit.",
};

/**
 * Get the Dutch description for a GravelContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgGravelContentClassDescription(code: string): string | undefined {
  return BHRG_GRAVEL_CONTENT_CLASS_CODES[code];
}
