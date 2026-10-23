/**
 * AirPressureCompensationType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:AirPressureCompensationType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3AAirPressureCompensationType
 */

export const GLD_AIR_PRESSURE_COMPENSATION_TYPE_CODES: Record<string, string> = {
  capillair: 'Fysieke compensatie voor luchtdruk via een capillair waardoor de sensor uitsluitend de waterdruk meet.',
  gecorrigeerdLokaleMeting: 'Rekenkundige compensatie, waarbij lokale luchtdrukmetingen gecorrigeerd worden aan de hand van luchtdrukmetingen van het KNMI.',
  KNMImeting: 'Rekenkundige compensatie, met behulp van luchtdrukmetingen van het KNMI.',
  monitoringnetmeting: 'Rekenkundige compensatie, met behulp van een in het monitoringnet aanwezige druksensor die de luchtdruk meet.',
  onbekend: 'Het is onbekend volgens welke methode de luchtdrukcompensatie heeft plaatsgevonden (IMBRO/A kwaliteitsregime).',
  putlocatiemeting: 'Rekenkundige compensatie, met behulp van een op de putlocatie aanwezige druksensor die de luchtdruk meet. Deze luchtdruksensor kan geïntegreerd zijn in één apparaat met de druksensor, maar dit hoeft niet.',
};
