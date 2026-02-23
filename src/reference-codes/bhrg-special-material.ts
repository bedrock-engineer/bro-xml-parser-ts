/**
 * SpecialMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SpecialMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASpecialMaterial
 */

export const BHRG_SPECIAL_MATERIAL_CODES: Record<string, string> = {
  betonOngebroken:
    "Antropogeen materiaal: beton dat niet als puin wordt geclassificeerd, bijvoorbeeld een betonplaat.",
  breuksteen:
    "Antropogeen materiaal: stenen van natuurlijk materiaal die gebruikt zijn als ballast of stortsteen.",
  geotextiel:
    "Antropogeen materiaal: textiel en folies die gebruikt worden in grondverbetering en meestal uit kunststof bestaan.",
  houtGebruikt:
    "Antropogeen materiaal: hout of houtig materiaal dat door de mens gebruikt is. Voorbeelden zijn rijsmatten, funderingspalen, beschoeiingen, scheepswrakken.",
  houtskool:
    "Antropogeen materiaal: door verbranding verkoolde resten van hout, meestal gebroken stukjes.",
  huisvuil: "Antropogeen materiaal: niet nader omschreven huishoudelijk afval.",
  kalkGemaakt:
    "Antropogeen materiaal: op kalk gebaseerd materiaal van menselijke makelij zoals gebluste kalk of als hulpstof herkenbare kalk.",
  mijnsteen:
    "Antropogeen materiaal: stenen van natuurlijk materiaal die het bijproduct zijn van  mijnbouw.",
  ophoogmateriaalLichtKunststof:
    "Antropogeen materiaal: ophoogmateriaal met een laag soortelijk gewicht dat vooral uit plastics en soortgelijke kunststoffen bestaat, met als voorbeeld geëxpandeerd polystyreen.",
  ophoogmateriaalLichtStenig:
    "Antropogeen materiaal: ophoogmateriaal met een laag soortelijk gewicht dat uit stenig materiaal van menselijke makelij bestaat. Voorbeelden zijn bims, geëxpandeerde kleikorrels, flugsand, schuimbeton en schuimglas.",
  plantenresten:
    "Natuurlijk materiaal: de onverteerde resten van planten, zoals stammen, takken, wortels, rietstengels en bladeren.",
  plantenrestenHoutig:
    "Natuurlijk materiaal: de houtige, onverteerde resten van planten, zoals stammen, takken en houtige wortels.",
  plantenrestenNietHoutig:
    "Natuurlijk materiaal: de niet-houtige, onverteerde resten van planten, zoals worteltjes, rietstengels en bladeren.",
  puin: "Antropogeen materiaal: bouw- en sloopafval, veelal een mengsel van stenige materialen die door de mens gemaakt of bewerkt zijn; soilmix, een mengsel van de grond ter plaatse met een materiaal als cement of waterglas, wordt ook hiertoe gerekend.",
  soilmix:
    "Antropogeen materiaal: een mengsel van de grond ter plaatse met een materiaal als cement of waterglas; wordt bijvoorbeeld als grondverbetering gebruikt voor grondkeringen.",
  verbrandingsresten:
    "Antropogeen bestanddeel: minerale verbrandingsresten met een diameter die varieert van kleiner dan 63 μm tot groter dan 2 mm.",
  verbrandingsrestenFijn:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter vergelijkbaar met die van silt en lutum (kleiner dan 63 μm).",
  verbrandingsrestenGrof:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter groter dan 2 mm.",
  verbrandingsrestenMiddelgrof:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter vergelijkbaar met die zand (0,063 tot 2 mm).",
  wegverhardingsmateriaal:
    "Antropogeen materiaal: materiaal dat gebruikt is voor het verharden van wegen en erven. Voorbeelden zijn asfalt, betonklinkers, klinkers, steenslag en tegels.",
  zwerfkeiVerweerd:
    "Natuurlijk materiaal: een zo verweerde zwerfkei dat het materiaal volledig vergruisd is en doorboord kan worden.",
};

/**
 * Get the Dutch description for a SpecialMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSpecialMaterialDescription(code: string): string | undefined {
  return BHRG_SPECIAL_MATERIAL_CODES[code];
}
