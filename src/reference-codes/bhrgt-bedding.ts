/**
 * Bedding codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Bedding
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ABedding
 */

export const BHRGT_BEDDING_CODES: Record<string, string> = {
  cmGelaagd:
    "De laag is opgebouwd uit laagjes met een dikte die van een of enkele centimeters. Een klasse onder de NEN 5104 procedure.",
  dikGelamineerd: "De laag is opgebouwd uit laagjes met een dikte die tussen 6 en 20 mm ligt.",
  dmGelaagd:
    "De laag is opgebouwd uit laagjes met een dikte die van een of enkele decimeters. Een klasse onder de NEN 5104 procedure.",
  dunGelaagd: "De laag is opgebouwd uit laagjes met een dikte die die tussen 60 en 200 mm ligt. ",
  dunGelamineerd: "De laag is opgebouwd uit laagjes met een dikte die kleiner is dan 6 mm.",
  ergDunGelaagd: "De laag is opgebouwd uit laagjes met een dikte die tussen 20 en 60 mm ligt.",
  mmGelaagd:
    "De laag is opgebouwd uit laagjes met een dikte die van een of enkele millimeters. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a Bedding code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtBeddingDescription(code: string): string | undefined {
  return BHRGT_BEDDING_CODES[code];
}
