/**
 * FluidMudLayerPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:FluidMudLayerPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AFluidMudLayerPositioningMethod
 */

export const BHRGT_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES: Record<string, string> = {
  akoestisch:
    "Via deze technieken wordt met een hoogfrequent (210 - 700 kHz) de afstand van een zender tot de bovenzijde van de sliblaag bepaald. Dit is de laag waarop het signaal reflecteert. Lage frequenties (15 - 30 kHz) kunnen onder bepaalde omstandigheden gebruikt worden om de onderzijde van de sliblaag te definiëren.",
  elektromagnetisch:
    "Bij deze techniek worden elektromagnetische pulsen gebruikt om de waterdiepte en onderzijde van de sliblaag te bepalen. Er wordt gewerkt met een zender en ontvanger. De resolutie is afhankelijk van de geleidbaarheid van het water, grondsoort, meetfrequentie. ",
  radioactief:
    "Bij deze techniek wordt in de waterkolom de dichtheid radioactief bepaald. Op basis van dichtheidsverschillen wordt de top van de sliblaag vastgesteld.",
  ultrasoon:
    "Bij deze techniek wordt in de waterkolom de dichtheid met hoogfrequente geluidsgolven bepaald. Op basis van dichtheidsverschillen wordt de top van de sliblaag vastgesteld.",
  versnelling:
    "Bij deze techniek laat met een object in de waterkolom vallen. Door gelijktijdig de diepte en versnelling te meten kan worden afgeleid op welke diepte zich de bovenzijde van de sliblaag zich bevindt. In het slib zal de valversnelling van het instrument vertragen.",
  visueel:
    "Voor metingen aan een monsterkolom wordt een transparante holle buis (aan de onderzijde al dan niet afsluitbaar) in de grond gedrukt. Visueel wordt dan de bovenzijde van de sliblaag bepaald.",
  waterdruk:
    "Deze techniek maakt gebruik van een meetinstrument dat achter een boot voortgetrokken wordt. Hiervoor dient de dichtheid van de top van de sliblaag vooraf gedefinieerd te worden. Door het meetinstrument deze dichtheid te geven hoeft alleen de hoogte van de waterkolom boven het meetinstrument gemeten te worden met een waterdrukmeter.",
  weerstandMechanisch:
    "Bij deze techniek wordt een meetlichaam mechanisch naar beneden gedrukt. De weerstanden hierbij worden geregistreerd. Dit kan tevens in de meetkop plaatsvinden zoals bij een sondering. ",
  weerstandPeilhengel:
    "Bij toepassing van een peilhengel is een peilstok met een schijf van 10 cm diameter bevestigd aan een hengel. De hengel wordt gebruikt om de peilstok neer te laten tot deze blijft staan op een sliblaag. De diepte kan worden afgelezen (b-weerstand).",
  weerstandPeilstok:
    "Bij toepassing van een peilstok wordt gebruik gemaakt van een licht gewicht stok met een geperforeerde schijf van 10 tot 18 cm diameter om de bovenzijde van de sliblaag te bepalen op basis van gevoelde weerstand bij indrukken in de bodem (a-weerstand).",
};

/**
 * Get the Dutch description for a FluidMudLayerPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtFluidMudLayerPositioningMethodDescription(
  code: string,
): string | undefined {
  return BHRGT_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES[code];
}
