/**
 * MaterialShape codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MaterialShape
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMaterialShape
 */

export const BHRG_MATERIAL_SHAPE_CODES: Record<string, string> = {
  brokjesErgKlein: "Brokjes met een lengte minder dan 2 mm.",
  brokjesGroot: "Brokjes met een lengte tussen 60 en 200 mm.",
  brokjesKlein: "Brokjes met een lengte tussen 2 en 6 mm.",
  brokjesVrijGroot: "Brokjes met een lengte tussen 20 en 60 mm.",
  brokjesVrijKlein: "Brokjes met een lengte tussen 6 en 20 mm.",
  laagjesDikGelamineerd: "Een of meer laagjes met een dikte tussen 6 en 20 mm.",
  laagjesDunGelaagd: "Een of meer laagjes met een dikte tussen 60 en 200 mm.",
  laagjesDunGelamineerd: "Een of meer laagjes met een dikte tussen 2 en 6 mm.",
  laagjesErgDunGelaagd: "Een of meer laagjes met een dikte tussen 20 en 60 mm.",
  laagjesErgDunGelamineerd: "Een of meer laagjes met een dikte kleiner dan 2 mm.",
  sedimentlenzen:
    "Een of meer geïsoleerde, duidelijk begrensde, lensvormige voorkomens die herkend worden als in deeltjes afgezet.",
};

/**
 * Get the Dutch description for a MaterialShape code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMaterialShapeDescription(code: string): string | undefined {
  return BHRG_MATERIAL_SHAPE_CODES[code];
}
