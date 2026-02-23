/**
 * MaterialIrregularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:MaterialIrregularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AMaterialIrregularity
 */

export const BHRGT_MATERIAL_IRREGULARITY_CODES: Record<string, string> = {
  desintegratie:
    "Het onderzochte materiaal blijkt na droging in de oven op 105 of 110 °C gedesintegreerd. Dit kan wijzen op een bijzondere samenstelling van het materiaal. ",
  gelaagd: "Het onderzochte materiaal blijkt gelaagd. Dit kan van invloed zijn op het resultaat.",
  insluiting:
    "In het onderzochte materiaal blijken 1 of meer insluitingen voor te komen, bijvoorbeeld een grindkorrel, schelp, een stukje puin of hout.  ",
  scheur: "Het onderzochte materiaal blijkt gescheurd. Dit kan van invloed zijn op het resultaat. ",
  verkleuring:
    "Het onderzochte materiaal blijkt na droging in de oven op 105 of 110 °C van kleur veranderd. Dit kan wijzen op een bijzondere samenstelling van het materiaal. ",
  wortelgang: "In het onderzochte materiaal blijken 1 of meer wortelgangen voor te komen.",
};

/**
 * Get the Dutch description for a MaterialIrregularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtMaterialIrregularityDescription(code: string): string | undefined {
  return BHRGT_MATERIAL_IRREGULARITY_CODES[code];
}
