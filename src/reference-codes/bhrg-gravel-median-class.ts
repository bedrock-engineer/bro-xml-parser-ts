/**
 * GravelMedianClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:GravelMedianClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGravelMedianClass
 */

export const BHRG_GRAVEL_MEDIAN_CLASS_CODES: Record<string, string> = {
  fijn: "De grindmediaan is groter dan 2 mm en kleiner dan of gelijk aan 6,3 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  fijnNEN5104:
    "De grindmediaan is gelijk aan of groter dan 2 mm en kleiner dan 5,6 mm. Een klasse onder de NEN 5104 procedure.",
  grof: "De grindmediaan is groter dan 20 mm en kleiner dan of gelijk aan 63 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  matigGrofNEN5104:
    "De grindmediaan is gelijk aan of groter dan 5,6 mm en kleiner dan 16 mm. Een klasse onder de NEN 5104 procedure.",
  middelgrof:
    "De grindmediaan is groter dan 6,3 mm en kleiner dan of gelijk aan 20 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  onbekend: "De mediaan van de grindfractie is niet bekend.",
  zeerGrofNEN5104:
    "De grindmediaan is gelijk aan of groter dan 16 mm en kleiner dan 63 mm. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a GravelMedianClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgGravelMedianClassDescription(code: string): string | undefined {
  return BHRG_GRAVEL_MEDIAN_CLASS_CODES[code];
}
