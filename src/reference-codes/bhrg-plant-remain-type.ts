/**
 * PlantRemainType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:PlantRemainType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3APlantRemainType
 */

export const BHRG_PLANT_REMAIN_TYPE_CODES: Record<string, string> = {
  detritus:
    "Verspoelde of anderszins verplaatste vezels of fragmenten van planten die dermate fijn zijn dat deze niet als houtig of niet houtig ingedeeld kunnen worden.",
  galigaan:
    "Roodbruine rondvormige holle stengelbasis met een typische doorsnede van millimeters tot een enkele centimeter. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  heide:
    "Roodbruine resten van worteltjes en takjes van heide: dunne, kronkelige, houtige resten van typisch centimeters lengte. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  menyanthes:
    "Oranje-bruine, lensvormige Menyantheszaden van enkele millimeters groot. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  mos: "Zeer fijne bruinkleurige vezeltjes met een schilferig uiterlijk. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrest:
    "Onverteerde plantenresten afkomstig van planten die niet verder ingedeeld zijn: omvat de waarden plantenrestenHoutig en plantenrestenNietHoutig.",
  plantenrestenHoutig:
    "Onverteerde plantenresten afkomstig van de houtig delen (stammen, takken of houtige wortels) van planten die niet verder ingedeeld zijn. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert van millimeters tot enkele decimeters. Het materiaal kan zeer zacht tot zeer hard zijn.",
  plantenrestenHoutigBerk:
    "Onverteerde resten van de houtige delen (stammen of takken) van berken, te herkennen aan de kenmerkende witte bast. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert meestal van centimeters tot enkele decimeters. Het materiaal kan zeer zacht tot hard zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenHoutigEik:
    "Onverteerde resten van de houtige delen (stammen, takken, houtige wortels) van eiken, te herkennen aan de roodbruine tot gelige harde houtresten, of eikels. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert meestal van centimeters tot enkele decimeters. Het materiaal is meestal vrij hard. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenHoutigEls:
    "Onverteerde resten van de houtige delen (stammen, takken, houtige wortels of wortelknollen) van elzen, te herkennen aan het roodbruine spinthout zonder waarneembare kern, of eivormige elzenproppen. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert meestal van centimeters tot enkele decimeters. Het materiaal kan zeer zacht tot hard zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenHoutigGeenBerkEikElsWilg:
    "Onverteerde plantenresten afkomstig van de houtig delen (stammen, takken of houtige wortels) van planten die niet afkomstig zijn van Berk, Els, Eik of Wilg. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert van millimeters tot enkele decimeters. Het materiaal kan zeer zacht tot zeer hard zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenHoutigWilg:
    "Onverteerde resten van de houtige delen (stammen, takken of houtige wortels) van wilgen, te herkennen aan geelwitte kleur. Deze resten kunnen bestaan uit de gebroken fragmenten of uit doorsnedes van de houtige delen. De grootte varieert meestal van centimeters tot enkele decimeters. Het materiaal kan zeer zacht tot zacht zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenNietHoutig:
    "Niet-houtige, onverteerde resten van planten, zoals worteltjes, stengels, bladeren of vruchten die niet verder ingedeeld zijn.",
  plantenrestenNietHoutigBerk:
    "Onverteerde niet houtige resten van Berk, zoals bladeren of zaadjes. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenNietHoutigEik:
    "Onverteerde niet houtige resten van Eik, zoals eikels en symmetrisch gelobde bladeren. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenNietHoutigEls:
    "Onverteerde niet houtige resten van Els, zoals elzenkatjes en ovaalvormig dubbelgezaagd blad. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  plantenrestenNietHoutigWilg:
    "Onverteerde niet houtige resten van Wilg, zoals wilgenkatjes en spitse vingervormige bladeren. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  riet: "Geelkleurige resten van riet: glanzende, platte, fijne worteltjes, typisch millimeters groot en resten van bladeren, wortelstokken en stengels, typisch centimeters tot decimeters groot. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  scheuchzeria:
    "Platte, kronkelige, bruine lichtglanzende stengels met dicht op elkaar staande knopen met typisch een lengte van een of enkele centimeters. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  veenmos:
    "Gelige blaadjes en stengeltjes die typisch millimeters tot centimeters groot zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  wollegras:
    "Borstels van de basale bladscheden van eenarig wollegras: haren met typisch een lengte van een of enkele centimeters. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
  zegge:
    "Dunne worteltjes die typisch millimeters tot centimeters groot zijn, platte vooral brede bladresten die typisch millimeters tot centimeters lang zijn en licht geel tot bruin van kleur zijn. De waarde is alleen van toepassing bij de uitgebreide beschrijving.",
};

/**
 * Get the Dutch description for a PlantRemainType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgPlantRemainTypeDescription(code: string): string | undefined {
  return BHRG_PLANT_REMAIN_TYPE_CODES[code];
}
