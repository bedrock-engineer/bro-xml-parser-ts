/**
 * MaterialIrregularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MaterialIrregularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMaterialIrregularity
 */

export const BHRG_MATERIAL_IRREGULARITY_CODES: Record<string, string> = {
  aggregatie:
    "Het onderzochte materiaal is nadat het uit de ondergrond is genomen, bijvoorbeeld door droging, enigszins geaggregeerd (verkit). Er zijn brokjes aanwezig die meestal, maar niet altijd eenvoudig verpulverd kunnen worden.",
  desintegratie:
    "Het onderzochte materiaal is na droging in de oven op 105 of 110 °C gedesintegreerd. Dit kan wijzen op een bijzondere samenstelling van het materiaal.",
  gelaagd: "Het onderzochte materiaal is gelaagd.",
  gescheurd: "Het onderzochte materiaal is gescheurd.",
  insluiting:
    "In het onderzochte materiaal komen 1 of meer insluitingen voor, bijvoorbeeld een grindkorrel, schelp, een stukje puin, hout of een klei- of leemkluit.",
  verkleuring:
    "Het onderzochte materiaal is na droging in de oven op 105 of 110 °C van kleur veranderd. Dit kan wijzen op een bijzondere samenstelling van het materiaal.",
  wormgat: "In het onderzochte materiaal komen 1 of meer wormgaten voor.",
  wortelgang: "In het onderzochte materiaal komen 1 of meer wortelgangen voor.",
};

/**
 * Get the Dutch description for a MaterialIrregularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMaterialIrregularityDescription(code: string): string | undefined {
  return BHRG_MATERIAL_IRREGULARITY_CODES[code];
}
