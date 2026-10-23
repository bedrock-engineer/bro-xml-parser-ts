/**
 * TubeTopPositioningMethod code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:TubeTopPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3ATubeTopPositioningMethod
 */

export const GMW_TUBE_TOP_POSITIONING_METHOD_CODES: Record<string, string> = {
  afgeleidSbl: 'De positie bovenkant buis is afgeleid van de lengtewijziging van het stijgbuisdeel.',
  AHN1: 'Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 1 van 1996-2003.',
  AHN2: 'Positie bepaald d.m.v. Actueel Hoogtebestand Nederland, versie 2 van 2007-2012.',
  AHN3: 'Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 3 van 2014-2019.',
  AHN4: 'Positie bepaald m.b.v. Actueel Hoogtebestand Nederland, versie 4 van 2020-2022, in combinatie met de hoogte bovenkant buis ten opzichte van maaiveld.',
  GPSOnbekend: 'Meting d.m.v. Global Positioning System, afwijking onbekend.',
  kaartOnbekend: 'Positie bepaald aan de hand van niet-digitale kaart, afwijking onbekend.',
  onbekend: 'Het is onbekend op welke manier de positie bovenkant buis bepaald is.',
  RTKGPS0tot4cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking kleiner dan 4 centimeter.',
  RTKGPS10tot20cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 10 en 20 centimeter.',
  RTKGPS20tot100cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, zonder fix, afwijking tussen 20 en 100 centimeter.',
  RTKGPS4tot10cm: 'Meting d.m.v. Real Time Kinematic GPS, ook wel als DGPS aangeduid, afwijking tussen 4 en 10 centimeter.',
  tachymetrie0tot10cm: 'Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking kleiner dan 10 centimeter.',
  tachymetrie10tot50cm: 'Meting d.m.v. tachymetrie, ook wel als landmeting of Total Station aangeduid, vanaf een referentiepunt dat geen NAP-peilmerk is, afwijking tussen 10 en 50 centimeter.',
  waterpassing0tot2cm: 'Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking kleiner dan 2 centimeter.',
  waterpassing2tot4cm: 'Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 2 en 4 centimeter.',
  waterpassing4tot10cm: 'Meting d.m.v. waterpassing vanaf een NAP-peilmerk, afwijking tussen 4 en 10 centimeter.',
};
