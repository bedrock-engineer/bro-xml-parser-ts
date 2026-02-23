/**
 * DeterminedCompositionProperties codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DeterminedCompositionProperties
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADeterminedCompositionProperties
 */

export const BHRG_DETERMINED_COMPOSITION_PROPERTIES_CODES: Record<string, string> = {
  geen: "Er zijn geen samenstellingseigenschappen bepaald.",
  standaard:
    "Van het onderzocht interval zijn de standaard samenstellingseigenschappen bepaald en dat zijn de korrelgrootteverdeling, het kalkgehalte en organische stof gehalte. Het organisch koolstofgehalte en zwavelgehalte zijn niet bepaald. In zeer uitzonderlijke gevallen kan het voorkomen dat bij de bepaling van het organische stof gehalte of kalkgehalte iets misgaat in de uitvoering en alleen in dat geval ontbreken die bepalingen. De bepaling van de standaard samenstellingseigenschappen vereist een interval met een minimum lengte van 1 cm. De monsterkwaliteit stelt geen beperkingen.",
  standaardMetChemie:
    "Van het onderzocht interval zijn de standaard samenstellingseigenschappen en chemische eigenschappen bepaald en dat zijn de korrelgrootteverdeling, het kalkgehalte, organische stof gehalte, organisch koolstofgehalte en zwavelgehalte. In zeer uitzonderlijke gevallen kan het voorkomen dat bij de bepaling van het kalkgehalte, organische stof gehalte, organisch koolstofgehalte of zwavelgehalte iets misgaat in de uitvoering en alleen in dat geval ontbreken die bepalingen. De bepaling van de standaard samenstellingseigenschappen en chemische eigenschappen vereist een interval met een minimum lengte van 1 cm. De monsterkwaliteit stelt geen beperkingen.",
  zonderKorrelverdeling:
    "Van het onderzocht interval zijn het organische stof gehalte en kalkgehalte bepaald. Het organisch koolstofgehalte en zwavelgehalte zijn niet bepaald. De bepaling van de korrelgrootteverdeling ontbreekt omdat de bepaling niet is gelukt en dat is het geval bij sterk organisch materiaal. Dit vereist een interval met een minimum lengte van 1 cm. De monsterkwaliteit stelt geen beperkingen.",
  zonderKorrelverdelingMetChemie:
    "Van het onderzocht interval zijn het organische stof gehalte, kalkgehalte, organisch koolstofgehalte en zwavelgehalte bepaald. De bepaling van de korrelgrootteverdeling ontbreekt omdat de bepaling niet is gelukt en dat is het geval bij sterk organisch materiaal. Dit vereist een interval met een minimum lengte van 1 cm. De monsterkwaliteit stelt geen beperkingen.",
};

/**
 * Get the Dutch description for a DeterminedCompositionProperties code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDeterminedCompositionPropertiesDescription(
  code: string,
): string | undefined {
  return BHRG_DETERMINED_COMPOSITION_PROPERTIES_CODES[code];
}
