/**
 * GeologicalOrigin codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:GeologicalOrigin
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGeologicalOrigin
 */

export const BHRG_GEOLOGICAL_ORIGIN_CODES: Record<string, string> = {
  begravenBodem:
    "Een bodem die na vorming begraven is geraakt door sedimentatie. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  bekkenopvulling:
    "Regelmatig parallel gelaagde opeenvolging afgezet in een meer. Opeenvolging bestaat  meestal uit een afwisseling van klei en leem, of fijn en grof zand, soms met fijn  grind. Omvat ook warven. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  deflatieNiveau:
    "Een laag uiterst grof zand, grind, keitjes of keien met door de wind gefacetteerde en gepolijste zijden die de top vormt van een minder grove laag.",
  dekzand:
    "Meestal fijn, goed gesorteerd, afgerond zand, door de wind over grote gebieden afgezet in de koude, droge omstandigheden aan het eind van de laatste ijstijd, al dan niet lokaal verspoeld. Komt in heel Nederland voor: in Oost- en Zuid-Nederland aan de oppervlakte, elders onder holocene veen- of kleilagen.",
  geulbasis:
    "Slecht gesorteerd, heterogeen en grofkorrelig laagje dat een scherpe ondergrens heeft en naar boven toe geleidelijk overgaat in fijnkorreliger materiaal. Kan ook ander grover materiaal bevatten, zoals klei- en leembrokken, houtresten en schelpfragmenten.",
  gliede:
    "Een laag die uit doppleriet bestaat en die op een zandpakket ligt. Doppleriet heeft de consistentie en structuur van zwarte schoensmeer en ontstaat wanneer veen oxideert en de humuszuren als stroperige zwarte brij naar beneden sijpelen en samenklonteren. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  hellingmateriaal:
    "Grond die door hellingprocessen verplaatst is en bestaat uit een mengsel van lokaal hoger gelegen grond en grond die al deel uitmaakte van de helling. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  ingestovenZand: "Dunne laag (meestal minder dan 1 cm) zwak siltig zand in een veenpakket.",
  keileem:
    "Sterk zandige leem of klei, vaak met grind. Samenstelling buitengewoon heterogeen met een vrij groot aandeel van alle korrelgroottefracties (lutum, silt, zand en grind). De zandfractie is zeer slecht gesorteerd en bevat korrels uit de hele zandfractie. Kleur (donker) bruingrijs, groengrijs of roestbruin. Kalkloos tot kalkrijk, bevat soms ingewalste zandlenzen en/of opgenomen ouder materiaal (bijvoorbeeld potkleibandjes of brokjes). In Oost-Nederland kan het glauconiet en/of glauconiethoudende leem- of kleibrokjes bevatten door opgenomen Tertiair materiaal. Grindassociatie glaciaal. Komt voor in Noord- en Midden-Nederland. Meestal afgezet onder het landijs in het Saalien, al zijn er voorbeelden uit het Elsterien bekend; in dat geval is de grindassociatie niet duidelijk glaciaal.",
  keizand:
    "Zwak tot uiterst siltig zand, meestal met grind. Samenstelling buitengewoon heterogeen met een groter aandeel van alle korrelgroottefracties (lutum, silt, zand en grind). De zandfractie is zeer slecht gesorteerd en bevat korrels uit de hele zandfractie. Kleur beige/geel of roestbruin; als er meer fijne fractie aanwezig is ook bruin- of groengrijs. Kalkloos tot kalkrijk, bevat soms ingewalste zandlenzen en/of opgenomen ouder materiaal (bijvoorbeeld potkleibandjes of brokjes). Grindassociatie glaciaal. Komt voor in Noord- en Midden-Nederland. Meestal afgezet onder het landijs in het Saalien of als uitspoelingsrest van keileem. Er zijn voorbeelden bekend uit het Elsterien, die bestaan uit zeer slecht gesorteerd zwak siltig grof zand, meestal met grind; in dit geval is de grindassociatie niet duidelijk glaciaal. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  laklaag:
    "Een donkergrijs tot zwart niveau in lichtgrijze fluviatiele komklei die het resultaat is van terrestrische of subaquatische neerslag van organische zuren. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  loess:
    "Leem die door de wind is afgezet en in het algemeen voor meer dan 75 % bestaat uit kwartskorrels uit de siltfractie (korrelgrootte tussen 2 en 63 μm). Komt vooral voor in Zuid-Limburg en ligt vaak rechtstreeks op grindlagen die door de Maas zijn afgezet. Kan verspoeld voorkomen en grote diktes bereiken in dolines en als hellingmateriaal.",
  meerbodem:
    "Fijn en overwegend organisch sediment dat afgezet is in een kalme meest fluviatiele  setting, bijvoorbeeld in een meer, verlaten rivierarm of pingoruïne.",
  mudDrape: "Fijnkorrelig laagje dat de morfologie van het onderliggende laagje volgt",
  oplichtingsLaag:
    "Ingespoelde laag afgezet bij het horizontaal inscheuren van een veenpakket bij vloed of overstroming wat leidt tot het oplichten van het bovenste veenpakket. Dit ingespoelde materiaal wordt tussen de twee veenlagen afgezet, de grens met het boven- en onderliggende veenpakket is zeer scherp. Het materiaal kan zandig of kleiig zijn; in het laatste geval wordt er wel gesproken over klapklei. Diktes variëren van enkele millimeters tot meer dan 10 cm.",
  potklei:
    "Zwak tot matig siltig of zandige klei, stevig tot (zeer) hard, veelal kalkrijk en glimmerhoudend. Kleur licht- tot donkergrijs, of donkerbruin tot zwart. Sedimenten die afgezet zijn in diepe sub-glaciale smeltwatergeulen, direct na het afsmelten van het Elsterien landijs. Hoge tot zeer hoge lutum percentages zijn kenmerkend, in enkele gevallen oplopend tot 60 %. Kenmerkend is de sterke wisseling in dikte over korte afstanden. Komt alleen in Noord-Nederland voor.",
  verweerdGesteente:
    "Grond die het product is van verwering van onderliggend intact gesteente. Gekenmerkt door naast elkaar voorkomen van brokken onverweerd gesteente en volledig verweerd materiaal, dat als klei, silt, zand of grind wordt beschreven. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
};

/**
 * Get the Dutch description for a GeologicalOrigin code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgGeologicalOriginDescription(code: string): string | undefined {
  return BHRG_GEOLOGICAL_ORIGIN_CODES[code];
}
