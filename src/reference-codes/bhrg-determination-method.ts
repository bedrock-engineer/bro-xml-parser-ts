/**
 * DeterminationMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DeterminationMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADeterminationMethod
 */

export const BHRG_DETERMINATION_METHOD_CODES: Record<string, string> = {
  drogenOven:
    "Methode voor het bepalen van het watergehalte. Het materiaal wordt gedroogd in een oven waardoor het water verdampt. Uit het massaverlies wordt het watergehalte berekend.",
  drogenOvenVolumeVoorbepaald:
    "Methode voor het bepalen van de droge volumieke massa. Het materiaal is met een ring uit een monster gestoken en dat is vervolgens geheel pas gemaakt. Massa en inhoud van de steekring zijn heel nauwkeurig bekend. Vervolgens is het materiaal gedroogd in een oven waardoor het water verdampt, en is de massa van de volle steekring met een balans bepaald. Uit de massa en het bekend volume is de droge volumieke massa berekend.",
  droogZeven:
    "Methode voor het bepalen van de korrelgrootteverdeling. Voor het bepalen van de verdeling van de fractie groter dan 63 μm is droge zeving gebruikt. Deze methode wordt gebruikt wanneer het materiaal uit het onderzocht interval uit grind of grover materiaal bestaat.",
  droogZevenLaser:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is droog gezeefd over de 2mm-zeef. De verdeling van de korrels kleiner dan 2 mm is bepaald door middel van laserdiffractie. De korrels groter dan 2 mm zijn niet nader onderverdeeld.",
  fallingHead:
    "Methode voor het bepalen van de waterdoorlatendheid van verzadigde cohesieve grond. Het proefstuk wordt onder een bepaalde druk in de opstelling geplaatst en van onderaf verzadigd. Er wordt een hydraulische gradiënt aangelegd tussen de bovenkant van het proefstuk en de onderkant en die neemt tijdens de proef af. De tijd die nodig is om een bepaald volume water door het monster te laten stromen wordt gemeten. De verzadigde waterdoorlatendheid wordt berekend met de wet van Darcy.",
  fallingHeadOnvoldoendeCohesief:
    "Methode voor het bepalen van de waterdoorlatendheid van verzadigde onvoldoende cohesieve grond. Het proefstuk wordt volledig verzadigd. Er wordt een hydraulische gradiënt aangelegd tussen de bovenkant van het proefstuk en de onderkant en die neemt tijdens de proef af. De tijd die nodig is om een bepaald volume water door het monster te laten stromen wordt gemeten. Tijdens de meting wordt de opstelling afgedekt zodat er geen verdamping kan optreden. De verzadigde waterdoorlatendheid wordt berekend met de wet van Darcy.",
  getraptVerhitten550:
    "Methode voor het bepalen van het organischestofgehalte. Het materiaal wordt getrapt verhit van 105 °C naar 450 °C en vervolgens naar 550 °C, waardoor de organische stof verbrandt. Uit het massaverlies is het gehalte berekend.",
  getraptVerhitten800:
    "Methode voor het bepalen van het kalkgehalte. Het materiaal wordt getrapt verhit van 550 °C naar 800 °C waardoor de koolzure kalk wordt omgezet in calciumoxide. Uit het massaverlies is het gehalte berekend. Vervolgens wordt er nog verhit naar 1000 °C.",
  natDroogZevenPipet:
    "Methode voor het bepalen van de korrelgrootteverdeling. Het materiaal is nat gezeefd over de 63 μm-zeef. De verdeling van de korrels kleiner dan 63 μm is bepaald door middel van pipetteren. De verdeling van de korrels groter dan 63 μm is bepaald door middel van droge zeving.",
  pyknometerVloeistof:
    "Methode voor het bepalen van de volumieke massa vaste delen. De volumieke massa van de vaste delen is bepaald met een met vloeistof gevulde pyknometer. De massa is bepaald met een balans. Het volume is berekend uit het volumeverschil van de vloeistof in de pyknometer.",
  verhittenCO2indirectMeten:
    "Methode voor het bepalen van het organische koolstofgehalte. Het materiaal wordt in tweeën gedeeld. Het eerste deel wordt bij een temperatuur van ten minste 500 °C verhit waarbij de aanwezige organische koolstof wordt omgezet in CO2. Vervolgens wordt het materiaal bij een temperatuur van ten minste 1400 °C verhit waarbij het anorganische koolstof wordt omgezet in CO2. Het tweede proefstuk wordt direct verhit bij een temperatuur van 1400 °C, waarbij al het koolstof wordt omgezet in CO2. De hoeveelheid CO2 wordt gemeten en daaruit wordt het gehalte aan koolstof en anorganisch koolstof berekend. Uit het verschil van deze beide gehaltes wordt het aandeel organische koolstof berekend.",
  verhittenSO2meten:
    "Methode voor het bepalen van het zwavelgehalte. Het materiaal wordt bij een temperatuur van 1400°C verhit waarbij het aanwezige zwavel wordt omgezet in SO2. De hoeveelheid SO2 wordt gemeten en daaruit wordt het gehalte aan zwavel berekend.",
  volumeVoorbepaald:
    "Methode voor het bepalen van de volumieke massa. De volumieke massa is bepaald van het materiaal dat met een ring uit een monster is gestoken en dat vervolgens geheel pas is gemaakt. Massa en inhoud van de steekring zijn heel nauwkeurig bekend. De massa van de volle steekring is met een balans bepaald.",
};

/**
 * Get the Dutch description for a DeterminationMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDeterminationMethodDescription(code: string): string | undefined {
  return BHRG_DETERMINATION_METHOD_CODES[code];
}
