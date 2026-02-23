/**
 * SandSorting codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SandSorting
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASandSorting
 */

export const BHRG_SAND_SORTING_CODES: Record<string, string> = {
  matigGroot:
    "Zand waarvan meer dan 90 % van de korrels binnen drie aansluitende zandmediaanklassen valt en de zandmediaan in de middelste van de drie zandmediaanklassen ligt.",
  matigGrootNEN5104:
    "Zand met een matig grote variatie in grootte van de zandkorrels. De gelijkmatigheidscoefficient D60/D10 (de verhouding tussen de korrelgrootten waarbij respectievelijk 60 % en 10 % van de massa van de zandfractie kleiner is) is groter dan of gelijk aan 2,2 en kleiner dan 3,0.",
  matigKlein:
    "Zand waarvan meer dan 90 % van de korrels binnen twee aansluitende zandmediaanklassen valt.",
  matigKleinNEN5104:
    "Zand met een matig kleine variatie in grootte van de zandkorrels. De gelijkmatigheidscoefficient D60/D10 (de verhouding tussen de korrelgrootten waarbij respectievelijk 60 % en 10 % van de massa van de zandfractie kleiner is) is groter dan of gelijk aan 1,8 en kleiner dan 2,2.",
  matigNEN5104:
    "Zand met een matige variatie in grootte van de zandkorrels: omvat de waarden matigKleinNEN5104 en matigGrootNEN5104. De gelijkmatigheidscoefficient D60/D10 (de verhouding tussen de korrelgrootten waarbij respectievelijk 60 % en 10 % van de massa van de zandfractie kleiner is) is groter dan of gelijk aan 1,8 en kleiner dan 3,0.",
  onbekend: "De spreiding van de korrelgrootte van de zandfractie is niet bekend.",
  tweetoppig:
    "Zand waarvan de korrels tot twee populaties horen die meestal niet in aaneensluitende zandmediaanklassen liggen.",
  zeerGroot:
    "Zand waarvan minder dan 90 % van de korrels binnen drie aansluitende zandmediaanklassen valt en de zandmediaan niet in de middelste van de drie zandmediaanklassen ligt.",
  zeerGrootNEN5104:
    "Zand met een zeer grote variatie in grootte van de zandkorrels. De gelijkmatigheidscoefficient D60/D10 (de verhouding tussen de korrelgrootten waarbij respectievelijk 60 % en 10 % van de massa van de zandfractie kleiner is) groter is dan of gelijk aan 3,0.",
  zeerKlein: "Zand waarvan meer dan 90 % van de korrels binnen dezelfde zandmediaanklasse valt.",
  zeerKleinNEN5104:
    "Zand met een matig kleine variatie in grootte van de zandkorrels. De gelijkmatigheidscoefficient D60/D10 (de verhouding tussen de korrelgrootten waarbij respectievelijk 60 % en 10 % van de massa van de zandfractie kleiner is) is groter dan of gelijk aan 1,0 en kleiner dan 1,8.",
};

/**
 * Get the Dutch description for a SandSorting code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSandSortingDescription(code: string): string | undefined {
  return BHRG_SAND_SORTING_CODES[code];
}
