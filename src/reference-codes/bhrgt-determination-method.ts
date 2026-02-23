/**
 * DeterminationMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DeterminationMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADeterminationMethod
 */

export const BHRGT_DETERMINATION_METHOD_CODES: Record<string, string> = {
  belastenGeconsolideerdGedraineerd:
    "Methode voor het bepalen van het verloop van de schuifspanning in grond als gevolg van vervorming onder belasting door het uitvoeren van de triaxiaalproef. Gedurende een bepaalde tijd wordt het geconsolideerde proefstuk met een constante snelheid samengedrukt en is het proefstuk vrij om in horizontale richting te vervormen. Het schuifspanningsverloop wordt bepaald in gedraineerde toestand.",
  belastenGeconsolideerdOngedraineerd:
    "Methode voor het bepalen van het verloop van de schuifspanning in grond als gevolg van vervorming onder belasting door het uitvoeren van de triaxiaalproef. Gedurende een bepaalde tijd wordt het geconsolideerde proefstuk met een constante snelheid samengedrukt en is het proefstuk vrij om in horizontale richting te vervormen. Het schuifspanningsverloop wordt bepaald in ongedraineerde toestand.",
  belastenOngeconsolideerdOngedraineerd:
    "Methode voor het bepalen van het verloop van de schuifspanning in grond als gevolg van vervorming onder belasting door het uitvoeren van de triaxiaalproef. Gedurende een bepaalde tijd wordt het proefstuk met een constante snelheid samengedrukt en is het proefstuk vrij om in horizontale richting te vervormen. Het schuifspanningsverloop wordt bepaald van een onverzadigd, ongeconsolideerd proefstuk in ongedraineerde toestand.",
  berekenenWatergehalte:
    "Methode voor het bepalen van het watergehalte. De hoeveelheid water in het materiaal is voorafgaand aan de bepaling door uitpersing veranderd. Het materiaal wordt alsnog gedroogd in een oven waardoor het water verdampt. Uit het massaverlies dat het gevolg is van de verdamping van het water en de hoeveelheid uitgeperst water wordt het watergehalte berekend.",
  casagrandeKleistaaf:
    "Methode voor het bepalen van de consistentiegrenzen. De vloeigrens is bepaald met behulp van de Casagrandemethode. Een bakje wordt met het materiaal gevuld en met een recht groefmes wordt er een groef in gesneden. Eventueel wordt bij zandige grond eerst een krom groefmes gebruikt. Vervolgens laat men het bakje een aantal keer van 10 mm hoogte op een rubber blok vallen tot 10 mm van de lengte van de groef is dichtgevloeid. Er wordt geteld hoe vaak het bakje is gevallen en het watergehalte wordt bepaald op de standaardmanier door drogen. Dit wordt een aantal keer herhaald bij een oplopend watergehalte en uit het verloop wordt de vloeigrens afgeleid. De uitrolgrens is bepaald door van het materiaal zes staafjes met een diameter van 3 mm te maken en die heen en weer te rollen tot ze uiteenvallen. Van het materiaal van drie gerolde staafjes samen wordt het watergehalte bepaald. Het gemiddelde van de twee bepalingen van het watergehalte is de uitrolgrens.",
  constantHead:
    "Methode voor het bepalen van de waterdoorlatendheid van verzadigde grond. Er wordt een hydraulische gradi�nt aangelegd tussen de bovenkant van het proefstuk en de onderkant en die wordt tijdens de proef constant gehouden. Zodra het debiet niet meer verandert, wordt de meting uitgevoerd. De verzadigde waterdoorlatendheid wordt berekend met de wet van Darcy.",
  drogen:
    "Methode voor het bepalen van het watergehalte. Het materiaal wordt gedroogd in een oven waardoor het water verdampt. Uit het massaverlies wordt het watergehalte berekend.",
  droogZeven:
    "Methode voor het bepalen van de korrelgrootteverdeling. Voor het bepalen van de verdeling van de fractie groter dan 63 �m is droge zeving gebruikt. Deze methode wordt gebruikt wanneer men ervan uitgaat dat er geen fractie kleiner dan 63 �m aanwezig is.",
  fallingHead:
    "Methode voor het bepalen van de waterdoorlatendheid van verzadigde grond. Het monster wordt onder een bepaalde druk in de opstelling geplaatst en van onderaf verzadigd. Er wordt een hydraulische gradi�nt aangelegd tussen de bovenkant van het proefstuk en de onderkant en die neemt tijdens de proef af. De tijd die nodig is om een bepaald volume water door het monster te laten stromen wordt gemeten. De verzadigde waterdoorlatendheid wordt berekend met de wet van Darcy.",
  getrimdVolumeMeten:
    "Methode voor het bepalen van de volumieke massa. De volumieke massa is bepaald van een helemaal glad gemaakt proefstuk. De afmetingen ervan zijn nauwkeurig gemeten en de�massa is met een balans bepaald.",
  handvinDraaien:
    "Methode voor het bepalen van de ongedraineerde schuifsterkte. De handvin wordt in het monster gedrukt en met de hand met constante snelheid gedraaid tot het materiaal bezwijkt en dat is het punt waarop de vin doorschiet.",
  horizontaalVervormenHoogtegestuurd:
    "Methode voor het bepalen van het verloop van de schuifspanning in de grond als gevolg van horizontale vervorming onder druk door het uitvoeren van de direct simple shear (DSS) proef. Gedurende een bepaalde tijd wordt met een bepaalde constante snelheid de boven en onderkant van het proefstuk uit elkaar getrokken en de schuifspanning in het proefstuk wordt bepaald. Tijdens de bepaling wordt het proefstuk op gelijke hoogte gehouden.",
  natDroogZeven:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63 �m-zeef. De verdeling van de korrels groter dan 63 �m is bepaald door middel van droge zeving.",
  natDroogZevenHydrometer:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63�m-zeef. De verdeling van de korrels kleiner dan 63 �m is bepaald met een hydrometer. Wanneer de verdeling van de korrels groter dan 63 �m is bepaald is dit gebeurd door middel van droge zeving.",
  natDroogZevenLaser:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 2mm-zeef. De verdeling van de korrels kleiner dan 2 mm is bepaald door middel van laserdiffractie. De verdeling van de korrels groter dan 2 mm is bepaald door middel van droge zeving.",
  natDroogZevenPipet:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63 �m-zeef. De verdeling van de korrels kleiner dan 63 �m is bepaald door middel van pipetteren. Wanneer de verdeling van de korrels groter dan 63 �m is bepaald is dit gebeurd door middel van droge zeving.",
  natDroogZevenRoentgen:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63 �m-zeef. De verdeling van de korrels kleiner dan 63 �m is bepaald met behulp van r�ntgenstraling. Wanneer de verdeling van de korrels groter dan 63 �m is bepaald is dit gebeurd door middel van droge zeving.",
  natOxideren:
    "Methode voor het bepalen van het organischestofgehalte. De organische stof is verwijderd met H2O2 (30 %). Uit het massaverlies is het gehalte berekend.",
  natZeven:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63 �m-zeef.",
  ongetrimdVolumeMeten:
    "Methode voor het bepalen van de volumieke massa. De volumieke massa is bepaald terwijl het materiaal nog in de monstercontainer zit. Dit gebeurt in het veld. Massa en inhoud van de container zijn bekend. De afmetingen van het met materiaal gevulde deel zijn zo goed mogelijk gemeten. De massa van de container met monster is bepaald met een unster.",
  oplossen:
    "Methode voor het bepalen van het kalkgehalte. De koolzure kalk is verwijderd met HCl (0,1 M). Uit het massaverlies is het gehalte berekend.",
  pyknometerGas:
    "Methode voor het bepalen van de volumieke massa vaste delen. De volumieke massa van de vaste delen is bepaald met een met gas gevulde pyknometer. De massa is bepaald met een balans en het volume is berekend uit het drukverschil in de pyknometer (op basis van de wet van Boyle Gay-Lussac).",
  pyknometerVloeistof:
    "Methode voor het bepalen van de volumieke massa vaste delen. De volumieke massa van de vaste delen is bepaald met een met vloeistof gevulde pyknometer. De massa is bepaald met een balans. Het volume is berekend uit het volumeverschil van de vloeistof in de pyknometer.",
  samendrukkenBelastinggestuurd:
    "Methode voor het bepalen van het zettingsverloop van grond door het uitvoeren van de samendrukkingsproef. De proef kent een aantal stappen, waarin gedurende een bepaalde tijd een bepaalde druk wordt uitgeoefend op een proefstuk en gemeten hoe snel de hoogte van het proefstuk verandert.",
  samendrukkenSnelheidgestuurd:
    "Methode voor het bepalen van het spanningsverloop in de grond als gevolg van zetting door het uitvoeren van de constant rate of strain (CRS) proef. De proef kent een aantal stappen waarin een proefstuk gedurende een bepaalde tijd een bepaalde snelheid van vervormen wordt opgelegd en de verandering van de spanning in het proefstuk wordt gemeten.",
  valconusKleistaaf:
    "Methode voor het bepalen van de consistentiegrenzen. De vloeigrens is bepaald met behulp van de valconus. Een bakje wordt met het materiaal gevuld en de valconus wordt op het materiaal geplaatst. De punt van de conus raakt daarbij het oppervlak van het materiaal. Vervolgens wordt de conus ca. 5 seconden losgelaten. De indringingsdiepte van de conus wordt gemeten en het watergehalte wordt bepaald op de standaardmanier door drogen. Dit wordt een aantal keer herhaald bij een oplopend watergehalte en uit het verloop wordt de vloeigrens afgeleid. De uitrolgrens is bepaald door van het materiaal zes staafjes met een diameter van 3 mm te maken en die heen en weer te rollen tot ze uiteenvallen. Van het materiaal van drie gerolde staafjes samen wordt het watergehalte bepaald. Het gemiddelde van de twee bepalingen van het watergehalte is de uitrolgrens.",
  verhitten500:
    "Methode voor het bepalen van het organischestofgehalte. Het materiaal wordt verhit tot 500 �C, waardoor de organische stof verbrandt. Uit het massaverlies wordt het gehalte berekend.",
  verhitten900:
    "Methode voor het bepalen van het kalkgehalte. Het materiaal wordt verhit van 500 tot 900 �C waardoor de koolzure kalk wordt omgezet in calciumoxide. Uit het massaverlies is het gehalte berekend.",
  volumeVoorbepaald:
    "Methode voor het bepalen van de volumieke massa. De volumieke massa is bepaald van het materiaal dat met een ring uit een monster is gestoken en dat vervolgens geheel pas is gemaakt. Massa en inhoud van de steekring zijn heel nauwkeurig bekend. De massa van de volle steekring is met een balans bepaald.",
  zakpenetrometerDrukken:
    "Methode voor het bepalen van de ongedraineerde schuifsterkte. De zakpenetrometer wordt met de hand met gelijkmatige krachttoename 5 mm in het materiaal gedrukt. Uit de drukkracht wordt de schuifspanning berekend.",
};

/**
 * Get the Dutch description for a DeterminationMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDeterminationMethodDescription(code: string): string | undefined {
  return BHRGT_DETERMINATION_METHOD_CODES[code];
}
