/**
 * SandSortingNEN5104 codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SandSortingNEN5104
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASandSortingNEN5104
 */

export const BHRGT_SAND_SORTING_NEN5104_CODES: Record<string, string> = {
  matigGroot:
    "Zand waarvan meer dan 90% van de korrels binnen drie aansluitende zandmediaanklasses valt en de zandmediaan in de middelste van de drie zandmediaanklassen ligt.",
  matigKlein:
    "Zand waarvan meer dan 90% van de korrels binnen twee aansluitende zandmediaanklasses valt",
  tweetoppig:
    "Zand waarvan de korrels tot twee populaties horen die meestal niet in aaneensluitende zandmediaanklassen liggen.",
  zeerGroot:
    "Zand waarvan minder dan 90% van de korrels binnen drie aansluitende zandmediaanklasses valt en de zandmediaan niet in de middelste van de drie zandmediaanklassen ligt.",
  zeerKlein: "Zand waarvan meer dan 90% van de korrels binnen dezelfde zandmediaanklasse valt",
};

/**
 * Get the Dutch description for a SandSortingNEN5104 code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSandSortingNEN5104Description(code: string): string | undefined {
  return BHRGT_SAND_SORTING_NEN5104_CODES[code];
}
