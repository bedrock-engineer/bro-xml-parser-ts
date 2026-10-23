/**
 * HorizontalPositioningMethod code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:HorizontalPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AHorizontalPositioningMethod
 */

export const GMW_HORIZONTAL_POSITIONING_METHOD_CODES: Record<string, string> = {
  DGPS50tot200cm: 'Meting d.m.v. Differential Global Positioning System, afwijking tussen 50 en 200 centimeter.',
  GBKNOnbekend: 'Locatie bepaald aan de hand van de grootschalige basiskaart van Nederland (tegenwoordig BGT), afwijking onbekend.',
  GPS200tot1000cm: 'Meting d.m.v. Global Positioning System, afwijking tussen 200 en 1000 centimeter.',
  GPSOnbekend: 'Meting d.m.v. Global Positioning System, afwijking onbekend.',
  kaartOnbekend: 'Locatie bepaald aan de hand van niet-digitale kaart, afwijking onbekend.',
  onbekend: 'Het is onbekend op welke manier de locatie bepaald is.',
  RTKGPS0tot2cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 2 centimeter.',
  RTKGPS10tot50cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 10 en 50 centimeter.',
  RTKGPS2tot5cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 2 en 5 centimeter.',
  RTKGPS5tot10cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 5 en 10 centimeter.',
  tachymetrie0tot10cm: 'Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 centimeter.',
  tachymetrie10tot50cm: 'Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 centimeter.',
};
