/**
 * HorizontalPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:HorizontalPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AHorizontalPositioningMethod
 */

export const BHRGT_HORIZONTAL_POSITIONING_METHOD_CODES: Record<string, string> = {
  DGPS0tot100cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid of d.m.v. Differential Global Positioning System, afwijking kleiner dan 100 centimeter.",
  DGPS100tot500cm:
    "Meting d.m.v. Global Positioning System of d.m.v. Differential Global Positioning System, afwijking tussen 100 en 500 centimeter.",
  DGPS50tot200cm:
    "Meting d.m.v. satellietnavigatie met differentiaalcorrectie, in het dagelijks gebruik aangeduid als DGPS. Afwijking tussen 50 en 200 centimeter. DGPS maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  GBKNonbekend:
    "Locatie bepaald aan de hand van de grootschalige basiskaart van Nederland (tegenwoordig BGT), afwijking onbekend.",
  GPS200tot1000cm:
    "Meting d.m.v. satellietnavigatie zonder correctie, SPP (Single Point Positioning), in het dagelijks gebruik aangeduid als GPS. Afwijking tussen 200 en 1000 centimeter. SPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  GPSonbekend: "Meting d.m.v. Global Positioning System, afwijking onbekend.",
  kaartGrootschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een grootschalige kaart is een kaart met een schaalgrootte niet kleiner dan 1:10.000 (bijvoorbeeld 1:500, 1:5.000 of 1:10.000).",
  kaartKleinschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een kleinschalige kaart is een kaart met een schaalgrootte kleiner dan 1:10.000 (bijvoorbeeld 1:25.000, 1:50.000 of 1:100.000).",
  landmetingOnbekend: "Meting d.m.v. landmeting, afwijking onbekend.",
  onbekend: "Het is niet bekend op welke manier de locatie is bepaald.",
  PPPGPS0tot2cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking kleiner dan 2 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS10tot50cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 10 en 50 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd in korte tijd zonder Ambiguity Resolution. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS2tot5cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 2 en 5 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS5tot10cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 5 en 10 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS0tot2cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking kleiner dan 2 centimeter. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS10tot50cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 10 en 50 centimeter. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd zonder Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS2tot5cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 2 en 5 centimeter. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS5tot10cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 5 en 10 centimeter. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  tachymetrie0tot10cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 centimeter.",
  tachymetrie10tot50cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 centimeter.",
};

/**
 * Get the Dutch description for a HorizontalPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtHorizontalPositioningMethodDescription(code: string): string | undefined {
  return BHRGT_HORIZONTAL_POSITIONING_METHOD_CODES[code];
}
