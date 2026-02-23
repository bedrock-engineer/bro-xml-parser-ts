/**
 * DepositionalCharacteristic codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DepositionalCharacteristic
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADepositionalCharacteristic
 */

export const BHRGT_DEPOSITIONAL_CHARACTERISTIC_CODES: Record<string, string> = {
  basisveen:
    "De onderste holocene veenlaag liggend op pleistocene afzettingen. Door compactie als gevolg van bedekking met sediment meestal steviger dan bovenliggende veenlagen, zoals van het Hollandveen Laagpakket.",
  basisveenOnbelast:
    "De onderste holocene veenlaag liggend op pleistocene afzettingen. Niet op grond van consistentie te onderscheiden van het Hollandveen laagpakket.",
  dekzand:
    "Meestal fijn, uniform, afgerond zand, door de wind over grote gebieden afgezet in de ijstijden. In Oost- en Zuid Nederland aan de oppervlakte, elders scherpe bovengrens met holocene veen- of kleilagen. Formatie van Boxtel, Laagpakket van Wierden.",
  duinKust: "Fijn, uniform zand in oppervlakkige en begraven stuifzandruggen langs de kust.",
  duinRivier: "Stuifzand in de vorm van duinen langs/naast de rivieren.",
  fluviatielBeek:
    "Siltige of kleiige afzetting van met slibrijk water overstroomde rivier- en beekdalen.",
  fluviatielKomklei: "Klei afgezet in overloopgebied van een rivier.",
  glaciaalKeileem:
    "Sterk zandige tot uiterst siltige vaste veelal grijze klei met grove tot zeer grove secundaire fractie, grondmorene gevormd onder de ijskap van de voorlaatste ijstijd (Saalien). Formatie van Drente, Laagpakket van Gieten.",
  glaciaalPotklei:
    "Zwak tot matig siltig of zandige, stevig tot (zeer) harde, veelal kalkrijke en glimmerhoudende, licht- tot donkergrijze, of donkerbruine tot zwarte, nabij het maaiveld door oxidatie soms rode klei. Formatie van Peelo, Laagpakket van Nieuwolda. Sedimenten die afgezet zijn in diepe sub-glaciale smeltwatergeulen, direct na het afsmelten van het Elsterien landijs. Hoge tot zeer hoge lutum percentages zijn kenmerkend, in enkele gevallen oplopend tot 60 %. Kenmerkend voor de Formatie van Peelo is de sterke wisseling in dikte over korte afstanden. Klei soms gelamineerd in warven.",
  glaciaalWarvenklei:
    "Zeer regelmatig gelamineerde opeenvolging ontstaan door seizoensinvloed op afzetting in glaciaal meer, bijvoorbeeld potklei en glaciale klei in Bekken van Amsterdam (Laag van Oosterdok, Formatie van Drente). Warven tonen een afwisseling in zomerlagen (licht) en winterlagen (donker).",
  katteklei:
    "Zure klei ontstaan door oxidatie van sulfiderijke klei; vaak gele en of rode verkleuring (vlekken). Katteklei komt voornamelijk voor in droogmakerijen.",
  kwelderklei:
    "Klei die op een kwelder is afgezet. De klei wordt gekenmerkt door een hoog gehalte aan kleimineralen; degelijke kleien worden vaak aangeduid als knikklei of knipklei.",
  loess:
    "Grond die door de wind is afgezet en in het algemeen voor meer dan 75% bestaat uit kwartskorrels met een korrelgrootte tussen 2 en 63 µm (Formatie van Boxtel, Laagpakket van Schimmert). Komt vooral voor in Zuid-Limburg en ligt vaak rechtstreeks op grindlagen die door de Maas zijn afgezet.",
  marienLagunair: "Grond die in een waddenmilieu is afgezet.",
  nietBepaald: "De typering van het sediment waaruit de grond bestaat is niet bepaald.",
  verweerdGesteente:
    "Grond die het product is van verwerking van onderliggend intact gesteente. Gekenmerkt door naast elkaar voorkomen van brokken onverweerd gesteente en volledig verweerd materiaal, dat als klei, silt of zand wordt beschreven.",
};

/**
 * Get the Dutch description for a DepositionalCharacteristic code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDepositionalCharacteristicDescription(code: string): string | undefined {
  return BHRGT_DEPOSITIONAL_CHARACTERISTIC_CODES[code];
}
