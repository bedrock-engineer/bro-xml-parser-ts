/**
 * RockType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:RockType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ARockType
 */

export const BHRG_ROCK_TYPE_CODES: Record<string, string> = {
  kalksteen:
    "Het gesteente bestaat voornamelijk uit calciumcarbonaat (CaCO3, kalk). Hieronder vallen alle kalkstenen met uitzondering van mergel, dat apart onderscheiden wordt.",
  kalksteenMergel:
    "Het gesteente bestaat voornamelijk uit calciumcarbonaat (CaCO3, kalk), een soort kalksteen die vrij zacht is, grofkorrelig, brokkelig en lichtgekleurd  met veel herkenbare mariene fossielen. Staat ook wel bekend als tufkalk of krijtkalk.",
  kalksteenNietGespecificeerd:
    "Het gesteente bestaat voornamelijk uit calciumcarbonaat (CaCO3, kalk). Hieronder vallen alle kalkstenen, ook mergel.",
  kleisteenNietGespecificeerd:
    "Het gesteente bestaat voornamelijk uit siliciklastisch materiaal waarvan de korrels niet met een loep zichtbaar zijn. Het is ontstaan door de compactie en/of verkitting van klei; hieronder valt ook schalie.",
  siltsteenNietGespecificeerd:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor het grootste deel uit korrels die kleiner zijn dan 0,063 mm en die een mes krassen of tussen de tanden knarsen.",
  vuursteen:
    "Het gesteente bestaat uit microkristallijne (fijn verdeelde), opake kwarts; komt meestal voor als knollen of platen in mergels of andere kalksteen.",
  zandsteenNietGespecificeerd:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor het grootste deel uit kwartskorrels met een mediaan die tussen 0,063 en 2 mm ligt.",
};

/**
 * Get the Dutch description for a RockType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgRockTypeDescription(code: string): string | undefined {
  return BHRG_ROCK_TYPE_CODES[code];
}
