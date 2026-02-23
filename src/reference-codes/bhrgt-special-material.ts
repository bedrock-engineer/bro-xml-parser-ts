/**
 * SpecialMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SpecialMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASpecialMaterial
 */

export const BHRGT_SPECIAL_MATERIAL_CODES: Record<string, string> = {
  asVulkanisch:
    "Natuurlijk materiaal: vulkanisch materiaal met een korrelgrootte kleiner dan 4 mm.",
  betonOngebroken:
    "Antropogeen materiaal: beton dat niet als puin wordt geclassificeerd, bijvoorbeeld een betonplaat.",
  geotextiel:
    "Antropogeen materiaal: textiel en folies die gebruikt worden in grondverbetering en meestal uit kunststof bestaan.",
  glauconietzand:
    "Natuurlijk materiaal: zand dat in hoofdzaak bestaat uit groene, groenige of bruine korrels die uit glauconiet of goethiet bestaan.",
  houtGebruikt:
    "Antropogeen materiaal: hout of houtig materiaal dat door de mens gebruikt is. Voorbeelden zijn rijsmatten, funderingspalen, beschoeiingen, scheepswrakken.",
  houtNietGespecificeerd:
    "Antropogeen of natuurlijk materiaal: omvat de IMBRO-waarden houtGebruikt en plantenrestenHoutig.",
  huisvuil: "Antropogeen materiaal: niet nader omschreven huishoudelijk afval.",
  kalkGemaakt:
    "Antropogeen materiaal: op kalk gebaseerd materiaal van menselijke makelij zoals gebluste kalk of als hulpstof herkenbare kalk.",
  kalkNatuurlijk:
    "Natuurlijk materiaal: Een vrijwel geheel uit kalk bestaand sediment dat niet als gesteente is geclassificeerd.",
  kalkNietGespecificeerd:
    "Antropogeen of natuurlijk materiaal: omvat de IMBRO-waarden kalkGemaakt en kalkNatuurlijk.",
  oer: "Natuurlijk materiaal: IJzerverkitting die op natuurlijke wijze door inspoeling is gevormd.",
  ophoogmateriaalLichtKunststof:
    "Antropogeen materiaal: ophoogmateriaal met een laag soortelijk gewicht dat vooral uit plastics en soortgelijke kunststoffen bestaat, met als voorbeeld geëxpandeerd polystyreen.",
  ophoogmateriaalLichtStenig:
    "Antropogeen materiaal: ophoogmateriaal met een laag soortelijk gewicht dat uit stenig materiaal van menselijke makelij bestaat. Voorbeelden zijn bims, geëxpandeerde kleikorrels, flugsand, schuimbeton en schuimglas.",
  plantenrestenHoutig:
    "Natuurlijk materiaal: de houtige, onverteerde resten van planten, zoals stammen en takken. ",
  plantenrestenNietHoutig:
    "Natuurlijk materiaal: de niet-houtige, onverteerde resten van planten, zoals worteltjes, rietstengels en bladeren. ",
  puin: "Antropogeen materiaal: bouw- en sloopafval, veelal een mengsel van stenige materialen die door de mens gemaakt of bewerkt zijn; soilmix, een mengsel van de grond ter plaatse met een materiaal als cement of waterglas, wordt ook hiertoe gerekend.",
  schelpmateriaal: "Natuurlijk materiaal: schelpen en resten van schelpen.",
  soilmix:
    "Antropogeen materiaal: een mengsel van de grond ter plaatse met een materiaal als cement of waterglas; wordt bijvoorbeeld als grondverbetering gebruikt voor grondkeringen.",
  stenen:
    "Antropogeen materiaal: stenen van natuurlijk materiaal die gebruikt zijn als ballast of stortsteen of het bijproduct zijn van mijnbouw.",
  verbrandingsresten:
    "Antropogeen materiaal: minerale verbrandingsresten; de diameter is niet gespecificeerd.",
  verbrandingsrestenFijn:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter vergelijkbaar met die van silt en lutum (kleiner dan 63µm), veelal vliegas genoemd.",
  verbrandingsrestenGrof:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter groter dan 2mm; veelal slakken genoemd.",
  verbrandingsrestenMiddelgrof:
    "Antropogeen materiaal: minerale verbrandingsresten met een diameter die vergelijkbaar is met zand (0,063 - 2 mm), veelal bodemas genoemd.",
  wegverhardingsmateriaal:
    "Antropogeen materiaal: materiaal dat gebruikt is voor het verharden van wegen en erven. Voorbeelden zijn asfalt, betonklinkers, klinkers, steenslag en tegels. ",
};

/**
 * Get the Dutch description for a SpecialMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSpecialMaterialDescription(code: string): string | undefined {
  return BHRGT_SPECIAL_MATERIAL_CODES[code];
}
