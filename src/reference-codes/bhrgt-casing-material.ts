/**
 * CasingMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:CasingMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ACasingMaterial
 */

export const BHRGT_CASING_MATERIAL_CODES: Record<string, string> = {
  pe: "De buis bestaat uit polyethyleen, waarbij onbekend is of het high density of low density polyethyleen betreft.",
  peHighDensity: "De buis bestaat uit high density polyethyleen.",
  peLowDensity: "De buis bestaat uit low density polyethyleen.",
  pePvc:
    "De buis bestaat uit polyethyleen en pvc, waarbij onbekend is of het high density of low density polyethyleen betreft.",
  staal: "De buis bestaat uit staal, waarbij onbekend is welk type staal het betreft.",
  staalGegalvaniseerd: "De buis bestaat uit gegalvaniseerd staal.",
  staalRoestvrij: "De buis bestaat uit roestvrij staal.",
};

/**
 * Get the Dutch description for a CasingMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtCasingMaterialDescription(code: string): string | undefined {
  return BHRGT_CASING_MATERIAL_CODES[code];
}
