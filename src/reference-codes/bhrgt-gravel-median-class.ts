/**
 * GravelMedianClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:GravelMedianClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AGravelMedianClass
 */

export const BHRGT_GRAVEL_MEDIAN_CLASS_CODES: Record<string, string> = {
  fijn: "De grindmediaan is gelijk aan of groter dan 2 mm en kleiner dan 6,3 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  fijnNEN5104:
    "De grindmediaan is gelijk aan of groter dan 2 mm en kleiner dan 5,6 mm. Een klasse onder de NEN 5104 procedure.",
  grof: "De grindmediaan is gelijk aan of groter dan 20 mm en kleiner dan 63 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  matigGrofNEN5104:
    "De grindmediaan is gelijk aan of groter dan 5,6 mm en kleiner dan 16 mm. Een klasse onder de NEN 5104 procedure.",
  middelgrof:
    "De grindmediaan is gelijk aan of groter dan 6,3 mm en kleiner dan 20 mm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  zeerGrofNEN5104:
    "De grindmediaan is gelijk aan of groter dan 16 mm en kleiner dan 63 mm. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a GravelMedianClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtGravelMedianClassDescription(code: string): string | undefined {
  return BHRGT_GRAVEL_MEDIAN_CLASS_CODES[code];
}
