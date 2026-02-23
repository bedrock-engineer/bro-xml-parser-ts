/**
 * HorizontalPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:HorizontalPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AHorizontalPositioningMethod
 */

export const CPT_HORIZONTAL_POSITIONING_METHOD_CODES: Record<string, string> = {
  DGPS0tot100cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid of d.m.v. Differential Global Positioning System, afwijking kleiner dan 100 centimeter",
  DGPS100tot500cm:
    "Meting d.m.v. Global Positioning System of d.m.v. Differential Global Positioning System, afwijking tussen 100 en 500 centimeter",
  DGPS50tot200cm:
    "Meting d.m.v. Differential Global Positioning System, afwijking tussen 50 en 200 centimeter",
  GBKNOnbekend:
    "Locatie bepaald aan de hand van de grootschalige basiskaart van Nederland (tegenwoordig BGT), afwijking onbekend",
  GPS200tot1000cm:
    "Meting d.m.v. Global Positioning System, afwijking tussen 200 en 1000 centimeter",
  GPSOnbekend: "Meting d.m.v. Global Positioning System, afwijking onbekend",
  kaartGrootschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een grootschalige kaart is een kaart met een schaalgrootte niet kleiner dan 1:10.000 (bijvoorbeeld 1:500, 1:5.000 of 1:10.000)",
  kaartKleinschalig:
    "Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend. Een kleinschalige kaart is een kaart met een schaalgrootte kleiner dan 1:10.000 (bijvoorbeeld 1:25.000, 1:50.000 of 1:100.000)",
  landmetingOnbekend: "Meting d.m.v. landmeting, afwijking onbekend",
  onbekend: "Het is onbekend op welke manier de locatie bepaald is",
  RTKGPS0tot2cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 2 centimeter",
  RTKGPS10tot50cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 10 en 50 centimeter",
  RTKGPS2tot5cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 2 en 5 centimeter",
  RTKGPS5tot10cm:
    "Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 5 en 10 centimeter",
  tachymetrie0tot10cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 centimeter",
  tachymetrie10tot50cm:
    "Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 centimeter",
};

/**
 * Get the Dutch description for a HorizontalPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptHorizontalPositioningMethodDescription(code: string): string | undefined {
  return CPT_HORIZONTAL_POSITIONING_METHOD_CODES[code];
}
