/**
 * EventName code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:EventName
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AEventName
 */

export const GMW_EVENT_NAME_CODES: Record<string, string> = {
  beschermconstructieVeranderd: 'Het aanbrengen van een beschermconstructie of het vervangen van de bestaande door een ander type.',
  buisdeelIngeplaatst: 'Het repareren van één of meer monitoringbuizen door het inplaatsen van een stijgbuisdeel met een kleinere diameter.',
  buisIngekort: 'De lengte van het stijgbuisdeel van één of meer monitoringbuizen is gewijzigd door het inkorten ervan, eventueel in combinatie met het aanbrengen van een beschermconstructie of het vervangen van de bestaande door een ander type.',
  buisOpgelengd: 'De lengte van het stijgbuisdeel van één of meer monitoringbuizen is gewijzigd door het oplengen ervan, eventueel in combinatie met het aanbrengen van een beschermconstructie of het vervangen van de bestaande door een ander type.',
  buisstatusVeranderd: 'Van één of meer buizen in een grondwatermonitoringput is vastgesteld dat de (fysieke) status veranderd is.',
  eigenaarVeranderd: 'De eigenaar van de grondwatermonitoringput is veranderd.',
  elektrodestatusVeranderd: 'Van één of meer elektrodes is vastgesteld dat de (fysieke) status veranderd is.',
  maaiveldVerlegd: 'Het maaiveld bij de put is gewijzigd door ophoging of afgraving, en is daarom opnieuw vastgesteld.',
  nieuweBepalingMaaiveld: 'De maaiveldpositie bij de put is mogelijk veranderd door een natuurlijk proces en is daarom opnieuw vastgesteld.',
  nieuweBepalingPosities: 'De posities van de put en het maaiveld zijn mogelijk veranderd door een natuurlijk proces en zijn daarom opnieuw vastgesteld.',
  nieuweInmetingMaaiveld: 'Wanneer gegevens uit een meetronde niet passen onder de overige 11 tussentijdse gebeurtenissen dan blijft deze gebeurtenis over als "rest optie" wanneer alleen de maaiveldpositie opnieuw is gemeten.',
  nieuweInmetingPosities: 'Wanneer gegevens uit een meetronde niet passen onder de overige 11 tussentijdse gebeurtenissen dan blijft deze gebeurtenis over als "rest optie" wanneer de hoogte bovenkantbuis opnieuw is gemeten en optioneel ook de maaiveldpositie.',
  onderhouderVeranderd: 'De onderhoudende instantie van de grondwatermonitoringput is gewijzigd.',
  verkenningenAchterafRegistreren: 'Deze gebeurtenis maakt het mogelijk om achteraf een/meerdere verkenning(en) \'toe te voegen\' aan de grondwatermonitoringput.',
};
