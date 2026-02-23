/**
 * SoilUse codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SoilUse
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASoilUse
 */

export const BHRGT_SOIL_USE_CODES: Record<string, string> = {
  akker: "Terrein in landelijk gebied in gebruik voor akkerbouw of vollegrondstuinbouw.",
  boomgaard: "Terrein in landelijk gebied in gebruik als boomgaard. ",
  boomkwekerij: "Terrein in landelijk gebied in gebruik als boomkwekerij.",
  bos: "Terrein in landelijk gebied dat bedekt is met bos.",
  gebruikInTransitie:
    "Terrein dat niet-verhard is en nog niet werkelijk in gebruik omdat men het gebruik van het terrein aan het veranderen is.",
  geenBodemgebruik: "Terrein met verhard oppervlak.",
  glastuinbouw: "Terrein in landelijk gebied in gebruik voor tuinbouw onder glas.",
  grasland:
    "Terrein of een kleiner stuk grond (grasland, wegberm, dijk) in landelijk gebied dat voor korte of lange tijd met gras begroeid is.",
  natuurGeenVegetatie:
    "Terrein in landelijk gebied dat in gebruik is als natuurterrein zonder vegetatie, bijvoorbeeld stranden, wadplaten of stuifzandgebieden.",
  natuurKorteVegetatie:
    "Terrein in landelijk gebied dat in gebruik is als natuurterrein en begroeid is met heide, riet of andere korte vegetatie.",
  nietLandelijkBomen:
    "Terrein in niet-landelijk gebied dat overwegend met bomen is begroeid (plantsoenen, singels, begraafplaatsen, volkstuinen en campings).",
  nietLandelijkGras:
    "Terrein in niet-landelijk gebied dat overwegend met gras is begroeid (bijv. parken, golfbanen, sportparken, grasstroken en een grasveld bij zwembaden).",
};

/**
 * Get the Dutch description for a SoilUse code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSoilUseDescription(code: string): string | undefined {
  return BHRGT_SOIL_USE_CODES[code];
}
