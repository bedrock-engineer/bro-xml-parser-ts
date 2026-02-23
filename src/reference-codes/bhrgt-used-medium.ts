/**
 * UsedMedium codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:UsedMedium
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AUsedMedium
 */

export const BHRGT_USED_MEDIUM_CODES: Record<string, string> = {
  butanol:
    "De vloeistofpyknometer is met butanol gevuld. Butanol is vooral geschikt voor organisch materiaal.",
  gezuiverdWater:
    "In de bepaling is leidingwater gebruikt dat door destillatie, demineralisatie of ionisatie gezuiverd is van alle zouten en mineralen.",
  grondwaterLokaal: "In de bepaling is grondwater gebruikt. Het grondwater komt uit het boorgat.",
  helium:
    "De gaspyknometer is met helium (99,5%) gevuld. Helium is een licht, niet adsorberend gas waarmee kleine poriën worden bereikt en daarmee een grote nauwkeurigheid in de bepaling van het volume. ",
  hexaan:
    "De vloeistofpyknometer is met hexaan gevuld. Hexaan is vooral geschikt voor organisch materiaal.",
  leidingwater:
    "In de bepaling is water gebruikt dat bestemd is voor menselijke consumptie en via leidingen wordt getransporteerd.",
  oppervlaktewaterLokaal:
    "In de bepaling is oppervlaktewater gebruikt. Het water komt uit de nabijheid van de locatie van het onderzoek.",
  spiritus:
    "De vloeistofpyknometer is met spiritus gevuld. Spiritus is vooral geschikt voor organisch materiaal.",
  stikstof: "In de bepaling is stikstof (N2) gebruikt.",
  zoutwater10000tot25000:
    "In de bepaling is zoutwater gebruikt met een elektrische geleidbaarheid die ligt tussen 10.000 en 25.000 �S/cm. De geleidbaarheid is een maat voor het zoutgehalte.",
  zoutwater1000tot10000:
    "In de bepaling is zoutwater gebruikt met een elektrische geleidbaarheid die ligt tussen 1.000 en 10.000 �S/cm. De geleidbaarheid is een maat voor het zoutgehalte.",
  zoutwater25000tot50000:
    "In de bepaling is zoutwater gebruikt met een elektrische geleidbaarheid die ligt tussen 25.000 en 50.000 �S/cm. De geleidbaarheid is een maat voor het zoutgehalte.",
  zoutwaterMinstens50000:
    "In de bepaling is zoutwater gebruikt met een elektrische geleidbaarheid groter dan 50.000 �S/cm. De geleidbaarheid is een maat voor het zoutgehalte.",
};

/**
 * Get the Dutch description for a UsedMedium code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtUsedMediumDescription(code: string): string | undefined {
  return BHRGT_USED_MEDIUM_CODES[code];
}
