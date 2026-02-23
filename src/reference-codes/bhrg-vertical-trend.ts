/**
 * VerticalTrend codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:VerticalTrend
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AVerticalTrend
 */

export const BHRG_VERTICAL_TREND_CODES: Record<string, string> = {
  bovenkantAmorf:
    "De laag is aan de bovenkant amorf. Er is geen sprake van een geleidelijke overgang.",
  bovenkantGrindig:
    "De laag is aan de bovenkant grindig. Er is geen sprake van een geleidelijke overgang.",
  bovenkantGrof:
    "De laag is aan de bovenkant grof. Er is geen sprake van een geleidelijke overgang.",
  bovenkantHumeus:
    "De laag is aan de bovenkant humeus. Er is geen sprake van een geleidelijke overgang.",
  bovenkantKalkloos:
    "De laag is aan de bovenkant kalkloos. Er is geen sprake van een geleidelijke overgang.",
  bovenkantKleiig:
    "De laag is aan de bovenkant kleiig. Er is geen sprake van een geleidelijke overgang.",
  bovenkantSchelphoudend:
    "De laag is aan de bovenkant schelphoudend. Er is geen sprake van een geleidelijke overgang.",
  bovenkantSiltig:
    "De laag is aan de bovenkant siltig. Er is geen sprake van een geleidelijke overgang.",
  bovenkantZandig:
    "De laag is aan de bovenkant zandig. Er is geen sprake van een geleidelijke overgang.",
  geenTrend: "De laag vertoond geen waarneembare geleidelijke verticale verandering.",
  naarBovenFijner:
    "De laag vertoond een verticale trend waarbij deze naar boven toe fijner wordt wat zich uit in meerdere kenmerken.",
  naarBovenGrover:
    "De laag vertoond een verticale trend waarbij deze naar boven toe grover wordt wat zich uit in meerdere kenmerken.",
  naarBovenMeerGlauconiet:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel glauconiet toeneemt.",
  naarBovenMeerGlimmer:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel glimmers toeneemt.",
  naarBovenMeerGrind:
    "De laag vertoond een verticale trend waarbij naar boven toe het grindgehalte toeneemt.",
  naarBovenMeerKalk:
    "De laag vertoond een verticale trend waarbij naar boven toe het kalkgehalte toeneemt.",
  naarBovenMeerLutum:
    "De laag vertoond een verticale trend waarbij naar boven toe het lutumgehalte toeneemt.",
  naarBovenMeerOrganischMateriaal:
    "De laag vertoond een verticale trend waarbij naar boven toe het organisch stofgehalte toeneemt.",
  naarBovenMeerPlanten:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel plantenresten toeneemt.",
  naarBovenMeerSchelpen:
    "De laag vertoond een verticale trend waarbij naar boven toe het schelpenmateriaalgehalte toeneemt.",
  naarBovenMeerSilt:
    "De laag vertoond een verticale trend waarbij naar boven toe het siltgehalte toeneemt.",
  naarBovenMeerZand:
    "De laag vertoond een verticale trend waarbij naar boven toe het zandgehalte toeneemt.",
  naarBovenMinderGlauconiet:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel glauconiet afneemt.",
  naarBovenMinderGlimmer:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel glimmers afneemt.",
  naarBovenMinderGrind:
    "De laag vertoond een verticale trend waarbij naar boven toe het grindgehalte afneemt.",
  naarBovenMinderKalk:
    "De laag vertoond een verticale trend waarbij naar boven toe het kalkgehalte afneemt.",
  naarBovenMinderLutum:
    "De laag vertoond een verticale trend waarbij naar boven toe het lutumgehalte afneemt.",
  naarBovenMinderOrganischMateriaal:
    "De laag vertoond een verticale trend waarbij naar boven toe het organisch stofgehalte afneemt.",
  naarBovenMinderPlanten:
    "De laag vertoond een verticale trend waarbij naar boven toe het aandeel plantenresten afneemt.",
  naarBovenMinderSchelpen:
    "De laag vertoond een verticale trend waarbij naar boven toe het schelpmateriaalgehalte afneemt.",
  naarBovenMinderSilt:
    "De laag vertoond een verticale trend waarbij naar boven toe het siltgehalte afneemt.",
  naarBovenMinderZand:
    "De laag vertoond een verticale trend waarbij naar boven toe het zandgehalte afneemt.",
  onderkantAmorf:
    "De laag is aan de onderkant amorf. Er is geen sprake van een geleidelijke overgang.",
  onderkantGrindig:
    "De laag is aan de onderkant grindig. Er is geen sprake van een geleidelijke overgang.",
  onderkantGrof:
    "De laag is aan de onderkant grof. Er is geen sprake van een geleidelijke overgang.",
  onderkantHumeus:
    "De laag is aan de onderkant humeus. Er is geen sprake van een geleidelijke overgang.",
  onderkantKleiig:
    "De laag is aan de onderkant kleiig. Er is geen sprake van een geleidelijke overgang.",
  onderkantSchelphoudend:
    "De laag is aan de onderkant schelphoudend. Er is geen sprake van een geleidelijke overgang.",
  onderkantSiltig:
    "De laag is aan de onderkant siltig. Er is geen sprake van een geleidelijke overgang.",
  onderkantZandig:
    "De laag is aan de onderkant zandig. Er is geen sprake van een geleidelijke overgang.",
};

/**
 * Get the Dutch description for a VerticalTrend code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgVerticalTrendDescription(code: string): string | undefined {
  return BHRG_VERTICAL_TREND_CODES[code];
}
