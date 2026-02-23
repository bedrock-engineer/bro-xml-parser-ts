/**
 * InfillMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:InfillMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AInfillMaterial
 */

export const BHRGT_INFILL_MATERIAL_CODES: Record<string, string> = {
  calciet: "Vast materiaal: neergeslagen koolzure kalk.",
  gips: "Vast materiaal: neergeslagen calciumsulfaat.",
  ijzeroxide: "Vast materiaal: neergeslagen ijzeroxide.",
  kalk: "Los materiaal: ingespoelde kalk.",
  klei: "Los materiaal: ingespoelde klei. Onbekend of het een zwellend vermogen heeft.",
  kleiZwellend: "Los materiaal: ingespoelde klei met smectiet (kleimineraal).",
  kwarts: "Vast materiaal: neergeslagen siliciumoxide.",
  zand: "Los materiaal: kwartskorrels met een grootte die tussen 63 µm en 2 mm ligt.",
};

/**
 * Get the Dutch description for a InfillMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtInfillMaterialDescription(code: string): string | undefined {
  return BHRGT_INFILL_MATERIAL_CODES[code];
}
