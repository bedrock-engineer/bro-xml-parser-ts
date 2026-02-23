/**
 * SaturationMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SaturationMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASaturationMethod
 */

export const BHRG_SATURATION_METHOD_CODES: Record<string, string> = {
  onderBelasting:
    "Methode voor het vooraf verzadigen van het proefstuk. Het proefstuk wordt tussen twee poreuze stenen in het apparaat geplaatst onder druk en krijgt eerst de gelegenheid om zich aan te passen aan de nieuwe druk (het proefstuk is geconsolideerd). Dit duurt 24 uur. Vervolgens krijgt het proefstuk de gelegenheid om water vanaf de onderkant op te nemen. Dit duurt circa 1 tot 3 dagen.",
  waterverzadigen:
    "Methode voor het vooraf verzadigen van het proefstuk. Het proefstuk in de ring wordt met behulp van een monsterhouder in een waterbad met deksel geplaatst. Het proefstuk wordt uiterst langzaam van onderaf verzadigd. Dit duurt ca. 4 tot 10 dagen. Na verzadiging wordt aan de bovenkant van het proefstuk eenmalig 25 mm water afgezogen.",
};

/**
 * Get the Dutch description for a SaturationMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSaturationMethodDescription(code: string): string | undefined {
  return BHRG_SATURATION_METHOD_CODES[code];
}
