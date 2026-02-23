/**
 * VerticalPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:VerticalPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AVerticalPositioningMethod
 */

export const CPT_VERTICAL_POSITIONING_METHOD_CODES: Record<string, string> = {
  AHN1: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 1 van 1996-2003",
  AHN2: "Positie bepaald d.m.v. Actueel Hoogtebestand Nederland, versie 2 van 2007-2012",
  AHN3: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 3 van 2014-2019",
  AHNOnbekend: "Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie onbekend",
  DGPS0tot10cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 10 centimeter",
  geen: "Er is geen positie bepaald",
  GPSOnbekend: "Meting d.m.v. Global Positioning System, afwijking onbekend",
  kaartGrootschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een grootschalige kaart is een kaart met een schaalgrootte niet kleiner dan 1:10.000 (bijvoorbeeld 1:500, 1:5.000 of 1:10.000)",
  kaartKleinschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een kleinschalige kaart is een kaart met een schaalgrootte kleiner dan 1:10.000 (bijvoorbeeld 1:25.000, 1:50.000 of 1:100.000)",
  kaartOnbekend: "Positie bepaald aan de hand van niet-digitale kaart, afwijking onbekend",
  landmetingOnbekend: "Meting d.m.v. landmeting, afwijking onbekend",
  onbekend: "Het is onbekend op welke manier de verticale positie bepaald is",
  RTKGPS0tot4cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 4 centimeter",
  RTKGPS10tot20cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 10 en 20 centimeter",
  RTKGPS20tot100cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 20 en 100 centimeter",
  RTKGPS4tot10cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 4 en 10 centimeter",
  tachymetrie0tot10cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 centimeter",
  tachymetrie10tot50cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 centimeter",
  waterpassing0tot2cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking kleiner dan 2 centimeter",
  waterpassing2tot4cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 2 en 4 centimeter",
  waterpassing4tot10cm:
    "Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 4 en 10 centimeter",
};

/**
 * Get the Dutch description for a VerticalPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptVerticalPositioningMethodDescription(code: string): string | undefined {
  return CPT_VERTICAL_POSITIONING_METHOD_CODES[code];
}
