/**
 * StratumThicknessClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:StratumThicknessClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AStratumThicknessClass
 */

export const BHRG_STRATUM_THICKNESS_CLASS_CODES: Record<string, string> = {
  dikGelamineerd: "De dikte van de laagjes ligt tussen 6 en 20 mm.",
  dikSBBarchief:
    "De dikte van de laagjes is groter dan 100 mm. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
  dunGelaagd: "De dikte van de laagjes ligt tussen 60 en 200 mm.",
  dunGelamineerd: "De dikte van de laagjes ligt tussen 2 en 6 mm.",
  dunSBBarchief:
    "De dikte van de laagjes ligt tussen 10 en 100 mm. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
  ergDunGelaagd: "De dikte van de laagjes ligt tussen 20 en 60 mm.",
  ergDunGelamineerd: "De dikte van de laagjes is kleiner dan 2 mm.",
  onbekend: "De dikte van de laagjes is niet bekend.",
  wisselend: "De dikte van de laagjes varieert.",
  zeerDunSBBarchief:
    "De dikte van de laagjes is kleiner dan 10 mm. Een klasse gebruikt onder de Standaard Boor Beschrijvingsmethode tot versie 6.",
};

/**
 * Get the Dutch description for a StratumThicknessClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgStratumThicknessClassDescription(code: string): string | undefined {
  return BHRG_STRATUM_THICKNESS_CLASS_CODES[code];
}
