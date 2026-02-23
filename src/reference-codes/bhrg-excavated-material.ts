/**
 * ExcavatedMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:ExcavatedMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AExcavatedMaterial
 */

export const BHRG_EXCAVATED_MATERIAL_CODES: Record<string, string> = {
  grind: "Natuurlijke of antropogene grond die in hoofdzaak uit grind bestaat.",
  huisvuil: "Ongedifferentieerd huishoudelijk afval.",
  klei: "Natuurlijke of antropogene grond die in hoofdzaak uit klei bestaat.",
  leem: "Natuurlijke of antropogene grond die in hoofdzaak uit leem bestaat.",
  ophoogmateriaalLicht: "Ophoogmateriaal met een laag soortelijk gewicht.",
  puin: "Bouw- en sloopafval; veelal een mengsel van stenig materiaal dat door de mens gemaakt of bewerkt",
  stenen:
    "Stenen van natuurlijk materiaal dat door de mens bewerkt is tot bouwstenen, ballastblokken, (basalt)stortsteen of een bijproduct van mijnbouw zijn.",
  veen: "Natuurlijke of antropogene grond die in hoofdzaak uit veen bestaat.",
  wegverhardingsmateriaal:
    "Materiaal dat gebruikt is voor het verharden van wegen en erven; voorbeelden zijn asfalt, betonklinkers, klinkers, steenslag en tegels.",
  zand: "Natuurlijke of antropogene grond die in hoofdzaak uit zand bestaat.",
};

/**
 * Get the Dutch description for a ExcavatedMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgExcavatedMaterialDescription(code: string): string | undefined {
  return BHRG_EXCAVATED_MATERIAL_CODES[code];
}
