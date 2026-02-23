/**
 * PerformanceIrregularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:PerformanceIrregularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3APerformanceIrregularity
 */

export const BHRGT_PERFORMANCE_IRREGULARITY_CODES: Record<string, string> = {
  drukplaatScheef:
    "Tijdens het belasten is de drukplaat scheef gezakt en is mogelijk gaan aanlopen.",
  gatOpgevuld:
    "Een gat in het proefstuk onstaan door een verwijderd insluitsel is opgevuld, is opgevuld met hetzelfde materiaal.",
  massaProefstuk: "De massa van het proefstuk is kleiner dan de procedure voorschrijft.",
  massaProefstukUitrolgrens:
    "De massa van het materiaal gebruikt voor de bepaling van de uitrolgrens is kleiner dan de procedure voorschrijft.",
  massaProefstukVloeigrens:
    "De massa van het materiaal gebruikt voor de bepaling van de vloeigrens is kleiner dan de procedure voorschrijft.",
  materiaalVerloren:
    "Er is een correctie op de verdeling van de fractie groter dan 63 �m toegepast omdat tijdens het zeven een klein deel (niet meer dan 1 %) van het materiaal verloren is gegaan.",
  membraanOpgerekt:
    "Tijdens het belasten is een schuifvlak ontstaan waardoor het membraan lokaal extreem wordt opgerekt.",
  nazakkenConus:
    "De conus is na de bepaling van de indringingsdiepte dieper in het materiaal gezakt.",
  onvoldoendeVerzadigd:
    "Het is niet gelukt om het proefstuk vooraf voldoende te verzadigen waardoor een toename in celdruk niet snel genoeg wordt opgenomen door de waterspanning.",
  poreuzeSteenGebroken:
    "Na afloop van het bepaling is geconstateerd dat een van de poreuze stenen is gebroken.",
  ringenstapelScheef: "Tijdens de uitvoering van de bepaling is de ringenstapel scheef gegaan.",
  sequentieelUitgevoerd:
    "Het organischestofgehalte, kalkgehalte en de korrelgrootteverdeling zijn achter elkaar op hetzelfde materiaal uitgevoerd. De bepalingen kunnen minder nauwkeurig zijn doordat er materiaal kan zijn weggespoeld.",
  volumeProefstuk: "Het volume van het proefstuk is kleiner dan de procedure voorschrijft.",
  waterspanningsratio:
    "Het quoti�nt van de verschilwaterspanning en verticale spanning (Ru) voldoet gedurende de hele bepaling niet aan de eisen van de procedure.",
};

/**
 * Get the Dutch description for a PerformanceIrregularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtPerformanceIrregularityDescription(code: string): string | undefined {
  return BHRGT_PERFORMANCE_IRREGULARITY_CODES[code];
}
