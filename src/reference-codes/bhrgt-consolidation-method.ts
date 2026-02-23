/**
 * ConsolidationMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:ConsolidationMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AConsolidationMethod
 */

export const BHRGT_CONSOLIDATION_METHOD_CODES: Record<string, string> = {
  anisotroopSpanningsgestuurd:
    "Het proefstuk wordt geconsolideerd door de celdruk en de verticale belasting geleidelijk in een vaste verhouding te verhogen. Om tot de gewenste verhouding te komen wordt eerst de celdruk een klein beetje verhoogd (met ca. 5 kPa).",
  anisotroopVervormingsgestuurd:
    "Het proefstuk wordt geconsolideerd door de celdruk en de verticale belasting tegelijk te verhogen. De celdruk wordt geleidelijk verhoogd en de extra verticale druk wordt zodanig gestuurd dat de diameter van het proefstuk gelijk blijft. Eerst wordt de celdruk een klein beetje verhoogd (met ca. 5 kPa).",
  isotroop:
    "Het proefstuk wordt geconsolideerd door de celdruk in 1 keer te verhogen en die voor de duur van de consolidatiefase constant te houden en het proefstuk de gelegenheid te geven in evenwicht te komen.",
  isotroopAnisotroop:
    "Het proefstuk wordt geconsolideerd door eerst de celdruk in 1 keer te verhogen en die voor een bepaalde duur constant te houden. Vervolgens wordt het proefstuk verder geconsolideerd door de verticale belasting voor een bepaalde duur geleidelijk te verhogen.",
};

/**
 * Get the Dutch description for a ConsolidationMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtConsolidationMethodDescription(code: string): string | undefined {
  return BHRGT_CONSOLIDATION_METHOD_CODES[code];
}
