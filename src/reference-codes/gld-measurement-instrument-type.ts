/**
 * MeasurementInstrumentType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:MeasurementInstrumentType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3AMeasurementInstrumentType
 */

export const GLD_MEASUREMENT_INSTRUMENT_TYPE_CODES: Record<string, string> = {
  akoestischeSensor: 'Sensor die de waterstand bepaalt aan de hand van de reflectietijd van een akoestisch signaal.',
  akoestischHandapparaat: 'Handapparaat met geïntegreerde akoestische sensor, die de waterstand bepaalt aan de hand van de reflectietijd van het akoestisch signaal.',
  analoogPeilklokje: 'Meetlint met een analoog dompelklokje, dat geluid maakt bij het raken van het water.',
  druksensor: 'Sensor die in het water in de monitoringbuis hangt en de plaatselijke druk meet. Bij dit type meetinstrument moet het type luchtdrukcompensatie worden vermeld.',
  elektronischPeilklokje: 'Meetlint met elektronisch dompelklokje, dat een licht- en/of geluidssignaal afgeeft bij het raken van water.',
  handmatigLengtemeetgereedschap: 'Lengtemeetgereedschap (zoals een duimstok of rolmaat) om een hoge waterstand vlak onder de buisrand handmatig af te lezen.',
  manometer: 'Meter waarmee de waterstand bij artesisch grondwater handmatig wordt vastgesteld in monitoringbuizen met een drukdop.',
  onbekend: 'Het is onbekend met welk meetinstrument de meting gedaan is (IMBRO/A kwaliteitsregime).',
  onbekendPeilklokje: 'Meetlint met dompelklokje maar het is onbekend of een analoog of een electronisch dompelklokje is gebruikt (IMBRO/A kwaliteitsregime).',
  opzetStuk: 'Opzetstuk inclusief afleesbare schaalverdeling dat in geval van artesisch grondwater op de bovenkant van de monitoringbuis wordt geplaatst.',
  radarsensor: 'Sensor die de waterstand bepaalt aan de hand van de reflectietijd van een radarsignaal.',
  stereoDruksensor: 'Apparaat of opstelling met twee druksensoren die de druk in tweevoud bepalen, en combineren tot een enkele meetreeks met verhoogde betrouwbaarheid. Bij dit type meetinstrument moet het type luchtdrukcompensatie worden vermeld.',
};
