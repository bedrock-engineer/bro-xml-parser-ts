/**
 * SandMedianClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SandMedianClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASandMedianClass
 */

export const BHRG_SAND_MEDIAN_CLASS_CODES: Record<string, string> = {
  fijn105tot150um:
    "De zandmediaan is groter dan 105 μm en kleiner dan of gelijk aan 150 μm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  fijn150tot200um:
    "De zandmediaan is groter dan 150 μm en kleiner dan of gelijk aan 200 μm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  fijn63tot105um:
    "De zandmediaan is groter dan 63 μm en kleiner dan of gelijk aan 105 μm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  grof630tot2000um: "De zandmediaan is groter dan 630 μm en kleiner dan",
  matigFijnNEN5104:
    "De zandmediaan is gelijk aan of groter dan 150 μm en kleiner dan 210 µm. Een klasse onder de NEN 5104 procedure.",
  matigGrofNEN5104:
    "De zandmediaan is gelijk aan of groter dan 210 μm en kleiner dan 300 µm. Een klasse onder de NEN 5104 procedure.",
  middelgrof200tot300um:
    "De zandmediaan is groter dan 200 μm en kleiner dan of gelijk aan 300 μm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  middelgrof300tot420um:
    "De zandmediaan is groter dan 300 μm en kleiner dan of gelijk aan 420 μm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  middelgrof420tot630um:
    "De zandmediaan is groter dan 420 μm en kleiner dan of gelijk aan 630 μm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  onbekend: "De mediaan van de zandfractie is niet bekend",
  uiterstFijnNEN5104:
    "De zandmediaan is gelijk aan of groter dan 63 μm en kleiner dan 105 μm. Een klasse onder de NEN5104 procedure.",
  uiterstGrofNEN5104:
    "De zandmediaan is gelijk aan of groter dan 420 μm en kleiner dan 2000 µm. Een klasse onder de NEN 5104 procedure.",
  zeerFijnNEN5104:
    "De zandmediaan is gelijk aan of groter dan 105 μm en kleiner dan 150 µm. Een klasse onder de NEN5104 procedure.",
  zeerGrofNEN5104:
    "De zandmediaan is gelijk aan of groter dan 300 μm en kleiner dan 420 µm. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a SandMedianClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSandMedianClassDescription(code: string): string | undefined {
  return BHRG_SAND_MEDIAN_CLASS_CODES[code];
}
