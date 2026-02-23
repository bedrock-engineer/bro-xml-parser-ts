/**
 * MakingMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:MakingMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AMakingMethod
 */

export const BHRGT_MAKING_METHOD_CODES: Record<string, string> = {
  kneden:
    "Methode voor cohesief materiaal. Het materiaal wordt met een menger gekneed tot een homogeen geheel. Eventueel wordt water toegevoegd of verwijderd. Deze methode komt maar weinig voor en wordt voornamelijk gebruikt bij klei.",
  knedenEnStampen:
    "Methode voor cohesief materiaal. Het materiaal wordt met een menger gekneed tot een homogeen geheel. Eventueel wordt water toegevoegd of verwijderd. Vervolgens wordt het materiaal aangestampt in een proctormal en wordt een cilinder uitgestoken. Deze methode komt maar weinig voor en wordt voornamelijk gebruikt bij klei.",
  samenstellenStampenDroog:
    "Methode voor niet-cohesief materiaal. Het droge materiaal wordt laagje voor laagje in de mal aangebracht en met de hand aangestampt met een stampertje. De laagjes worden op steeds dezelfde dichtheid aangestampt. Droog aanstampen is geschikt om tot een middelhoge dichtheid te komen.",
  samenstellenStampenVochtig:
    "Methode voor niet-cohesief materiaal. Het materiaal wordt licht bevochtigd met 2 tot 3 % water en laagje voor laagje in de mal aangebracht en met de hand aangestampt met een stampertje. De laagjes worden op steeds dezelfde dichtheid aangestampt. Vochtig stampen is geschikt om tot een lage dichtheid te komen.",
  samenstellenStampenVochtigOnderCompactie:
    "Methode voor niet-cohesief materiaal. Het materiaal wordt licht bevochtigd met 2 tot 3 % water. Een afgewogen deel van het licht vochtige materiaal wordt laagje voor laagje in de mal aangebracht en met de hand aangestampt met een stampertje. De laagjes worden van onder naar boven met een steeds hogere dichtheid aangestampt. Vochtig stampen is geschikt om tot een lage dichtheid te komen.",
  samenstellenStrooienDroog:
    "Methode voor niet-cohesief materiaal. Het droge materiaal wordt met een continu stroom via een trechter en slangetje in een mal gestrooid. Het slangetje komt op de bovenkant van het proefstuk uit en wordt langzaam omhoog getrokken zodat de korrels soepel over het oppervlak van het proefstuk heen geleiden en niet vallen en sorteren. Tegelijkertijd wordt tegen de mal getikt om de dichtheid te verhogen. Droog strooien is geschikt om tot een middellage dichtheid te komen.",
  samenstellenStrooienOnderWater:
    "Methode voor niet-cohesief materiaal. Het droge materiaal wordt met een continu stroom via een trechter en slangetje in een vooraf met een laagje water gevulde mal gestrooid. Het slangetje komt op de bovenkant van het proefstuk uit en wordt langzaam omhoog getrokken zodat de korrels soepel over het oppervlak van het proefstuk heen geleiden en niet vallen en sorteren. Tegelijkertijd wordt tegen de mal getikt om de dichtheid te verhogen. Strooien onder water is geschikt om tot een middelhoge dichtheid te komen.",
  stampenProctor:
    "Methode voor cohesief materiaal. Het materiaal wordt laagje voor laagje gestampt in een grote proctormal. Eventueel wordt water toegevoegd of verwijderd. Na het aanbrengen van een laagje valt de stamper van steeds dezelfde hoogte een bepaald aantal keer op het materiaal, op steeds een ander plek. Deze methode is geschikt om tot een hoge dichtheid te komen.",
};

/**
 * Get the Dutch description for a MakingMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtMakingMethodDescription(code: string): string | undefined {
  return BHRGT_MAKING_METHOD_CODES[code];
}
