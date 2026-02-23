/**
 * SandMedianClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SandMedianClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASandMedianClass
 */

export const BHRGT_SAND_MEDIAN_CLASS_CODES: Record<string, string> = {
  fijn: "De zandmediaan ligt tussen 63 en 200 µm en is niet verder onderverdeeld. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  fijn105tot150um:
    "De zandmediaan ligt tussen 105 en 150 µm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  fijn150tot200um:
    "De zandmediaan ligt tussen 150 en 200 µm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  fijn63tot105um:
    "De zandmediaan ligt tussen 63 en 105 µm. Een klasse binnen de categorie fijn onder de NEN-EN-ISO 14688 procedure.",
  grof: "De zandmediaan ligt tussen 630 en 2000 µm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  matigFijnNEN5104:
    "De zandmediaan ligt tussen 150 en 210 µm. Een klasse onder de NEN 5104 procedure.",
  matigGrofNEN5104:
    "De zandmediaan ligt tussen 210 en 300 µm. Een klasse onder de NEN 5104 procedure.",
  middelgrof:
    "De zandmediaan ligt tussen 200 en 630 µm. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  middelgrof200tot300um:
    "De zandmediaan ligt tussen 200 en 300 µm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  middelgrof300tot420um:
    "De zandmediaan ligt tussen 300 en 420 µm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  middelgrof420tot630um:
    "De zandmediaan ligt tussen 420 en 630 µm. Een klasse binnen de categorie middelgrof onder de NEN-EN-ISO 14688 procedure.",
  uiterstFijnNEN5104:
    "De zandmediaan ligt tussen 63 en 105 µm. Een klasse onder de NEN5104 procedure.",
  uiterstGrofNEN5104:
    "De zandmediaan ligt tussen 420 en 2000 µm. Een klasse onder de NEN 5104 procedure.",
  zeerFijnNEN5104:
    "De zandmediaan ligt tussen 105 en 150 µm. Een klasse onder de NEN5104 procedure.",
  zeerGrofNEN5104:
    "De zandmediaan ligt tussen 300 en 420 µm. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a SandMedianClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSandMedianClassDescription(code: string): string | undefined {
  return BHRGT_SAND_MEDIAN_CLASS_CODES[code];
}
