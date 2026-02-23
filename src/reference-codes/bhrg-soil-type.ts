/**
 * SoilType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SoilType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASoilType
 */

export const BHRG_SOIL_TYPE_CODES: Record<string, string> = {
  asVulkanisch:
    "Een bijzondere grond, grond die uit vulkanisch materiaal met een korrelgrootte kleiner dan 4 mm bestaat.",
  bruinkoolNietGespecificeerd:
    "Een organische grond, grond die niet veel schelpmateriaal bevat en waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat, en als die twee bestanddelen worden uitgesloten, voor meer dan 15 % van de massa uit organische stof die vezelig is en samenhang vertoont en ingekoold is bestaat.",
  detritusNietGespecificeerd:
    "Een organische grond, grond die niet veel schelpmateriaal bevat en waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat, en als die twee bestanddelen worden uitgesloten, voor meer dan 15 % van de massa uit organische stof die vezelig is en geen samenhang vertoont bestaat.",
  diatomiet:
    "Een bijzondere grond, grond die vrijwel volledig uit de kiezelskeletjes van diatomeeën bestaat, wittig en veelal dun gelaagd of gelamineerd is.",
  dy: "Een bijzondere grond, grond die vrijwel volledig uit organische stof bestaat, amorf en zwartig is en een geleiachtige consistentie heeft.",
  grindNietGespecificeerd:
    "Een grindrijke grond, grond die niet veel schelpmateriaal bevat, waarvan de minerale fractie (grind, zand, lutum, silt) voor minimaal 30 % van de massa uit grind bestaat en weinig organische stof bevat.",
  gyttjaNietGespecificeerd:
    "Een organische grond, grond die niet veel schelpmateriaal bevat en waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat, en als die twee bestanddelen worden uitgesloten, voor meer dan 15 % van de massa uit organische stof die fijnkorrelig is en samenhang vertoont bestaat.",
  ijzeroer:
    "Een bijzondere grond, grond die vrijwel volledig uit ijzeroer bestaat, geelbruin tot bruinrood is en zeer samenhangend is.",
  kalkgyttja:
    "Een bijzondere grond, grond die vrijwel volledig uit kalk bestaat, wittig tot gelig is en een pasta-achtige consistentie heeft.",
  kleiNietGespecificeerd:
    "Een grindarme minerale grond, grond die niet veel schelpmateriaal bevat, waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat en weinig organische stof bevat, en als die drie bestanddelen worden uitgesloten, voor meer dan 8 % van de massa uit lutum bestaat.",
  leemNietGespecificeerd:
    "Een grindarme minerale grond, grond die niet veel schelpmateriaal bevat, waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat en weinig organische stof bevat, en waarvan de precieze verhouding tussen de hoeveelheden zand, lutum en silt niet goed in woorden is uit te drukken.",
  onbekend: "Het soort grond is niet bekend.",
  schelpenNietGespecificeerd:
    "Een schelprijke grond, grond die voor minimaal 30 % van de massa uit schelpen en schelpfragmenten (groter dan of gelijk aan 2 mm) bestaat en niet veel grind en organische stof bevat.",
  schelpmateriaalNietGespecificeerd:
    "Een schelprijke grond, grond die voor minimaal 30 % van het volume uit schelpmateriaal bestaat en niet veel grind en organische stof bevat.",
  veenNietGespecificeerd:
    "Een organische grond, grond die niet veel schelpmateriaal bevat en waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat, en als die twee bestanddelen worden uitgesloten, voor meer dan 15 % van de massa uit organische stof die vezelig is en samenhang vertoont bestaat.",
  zandNietGespecificeerd:
    "Een grindarme minerale grond, grond die niet veel schelpmateriaal bevat, waarvan de minerale fractie (grind, zand, lutum, silt) voor minder dan 30 % van de massa uit grind bestaat en weinig organische stof bevat, en als die drie bestanddelen worden uitgesloten, voor meer dan 50 % van de massa uit zand en minder dan of gelijk aan 8% uit lutum bestaat.",
};

/**
 * Get the Dutch description for a SoilType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSoilTypeDescription(code: string): string | undefined {
  return BHRG_SOIL_TYPE_CODES[code];
}
