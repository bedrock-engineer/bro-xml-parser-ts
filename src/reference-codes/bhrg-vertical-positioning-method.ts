/**
 * VerticalPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:VerticalPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVerticalPositioningMethod
 */

export const BHRG_VERTICAL_POSITIONING_METHOD_CODES: Record<string, string> = {
  AHN1: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 1 van 1996-2003.",
  AHN2: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 2 van 2007-2012.",
  AHN2_50cmRaster:
    "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 2 ingewonnen tussen 2007 en 2012. Voor de bepaling van de verticale positie is het rasterbestand van 50 x 50 cm gebruikt. De uitvoerder heeft met kennis van zaken gebruik gemaakt van het ruwe rasterbestand of het gefilterde rasterbestand, het zogenaamde maaiveldraster is gefilterd voor elementen die op het maaiveld staan zoals begroeiing en bebouwing.",
  AHN3: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 3 van 2014-2019.",
  AHN3_50cmRaster:
    "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 3, ingewonnen tussen 2014 en 2019. Voor de bepaling van de verticale positie is het rasterbestand van 50 x 50 cm gebruikt. De uitvoerder heeft met kennis van zaken gebruik gemaakt van het ruwe rasterbestand of het gefilterde rasterbestand, het zogenaamde maaiveldraster is gefilterd voor elementen die op het maaiveld staan zoals begroeiing en bebouwing.",
  AHN4_50cmRaster:
    "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 4, ingewonnen tussen  2020 en 2022. Voor de bepaling van de verticale positie is het rasterbestand van 50  x 50 cm gebruikt. De uitvoerder heeft met kennis van zaken gebruik gemaakt van het  ruwe rasterbestand of het gefilterde rasterbestand, het zogenaamde maaiveldraster  is gefilterd voor elementen die op het maaiveld staan zoals begroeiing en bebouwing.",
  AHNonbekend: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie onbekend.",
  DGPS0tot10cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 10 centimeter.",
  geen: "Er is geen positie bepaald.",
  GPSonbekend: "Meting d.m.v. Global Positioning System, afwijking onbekend.",
  kaartGrootschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een grootschalige kaart is een kaart met een schaalgrootte niet kleiner dan 1:10.000 (bijvoorbeeld 1:500, 1:5.000 of 1:10.000).",
  kaartKleinschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een kleinschalige kaart is een kaart met een schaalgrootte kleiner dan 1:10.000 (bijvoorbeeld 1:25.000, 1:50.000 of 1:100.000).",
  kaartOnbekend: "Positie bepaald aan de hand van niet-digitale kaart, afwijking onbekend.",
  landmetingOnbekend: "Meting d.m.v. landmeting, afwijking onbekend.",
  onbekend: "Het is niet bekend op welke manier de verticale positie is bepaald.",
  PPPGPS0tot4cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking kleiner dan 4 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS10tot20cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 10 en 20 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS20tot100cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 20 en 100 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd in korte tijd zonder Ambiguity Resolution. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  PPPGPS4tot10cm:
    "Meting d.m.v. PPP (Precise Point Positioning) satellietnavigatie, afwijking tussen 4 en 10 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (PPP-AR) of bij een lange meettijd. PPP maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS0tot4cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking kleiner dan 4 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS10tot20cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 10 en 20 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS20tot100cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 20 en 100 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd zonder Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  RTKGPS4tot10cm:
    "Meting d.m.v. RTK (Real Time Kinematic) satellietnavigatie, in het dagelijks gebruik ook wel aangeduid als DGPS, afwijking tussen 4 en 10 cm. De nauwkeurigheid wordt bereikt wanneer de meting is uitgevoerd met Ambiguity Resolution (ook wel fix). RTK maakt gebruik van een wereldwijd satellietnavigatiesysteem, Global Navigation Satellite System (GNSS). GNSS wordt in het dagelijks gebruik vaak aangeduid met GPS als verzamelnaam voor de 4 systemen GPS, Glonass, Galileo en Beidou.",
  tachymetrie0tot10cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 cm.",
  tachymetrie10tot50cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 cm.",
  waterpassing0tot2cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking kleiner dan 2 cm.",
  waterpassing2tot4cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 2 en 4 cm.",
  waterpassing4tot10cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 4 en 10 cm.",
};

/**
 * Get the Dutch description for a VerticalPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgVerticalPositioningMethodDescription(code: string): string | undefined {
  return BHRG_VERTICAL_POSITIONING_METHOD_CODES[code];
}
