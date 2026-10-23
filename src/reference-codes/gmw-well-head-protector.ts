/**
 * WellHeadProtector code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:WellHeadProtector
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3AWellHeadProtector
 */

export const GMW_WELL_HEAD_PROTECTOR_CODES: Record<string, string> = {
  geen: 'De put is niet voorzien van een beschermconstructie.',
  koker: 'De put is voorzien van een beschermkoker, waarbij onbekend is of deze van metaal is of niet.',
  kokerDeelsMetaal: 'De put is voorzien van een uitstekende beschermkoker die deels van metaal is. De mogelijkheid tot het gebruik van telemetrie zonder externe antennes is afhankelijk van de opbouw van de koker.',
  kokerMetaal: 'De put is voorzien van een uitstekende beschermkoker die van metaal is. Het gebruik van telemetrie zonder externe antennes is niet mogelijk.',
  kokerNietMetaal: 'De put is voorzien van een uitstekende beschermkoker die niet van metaal is. Het gebruik van telemetrie is mogelijk zonder externe antennes.',
  onbekend: 'Het is onbekend of de put voorzien is van een beschermconstructie.',
  pot: 'De put is voorzien van een vlakke beschermconstructie die nagenoeg samenvalt met het maaiveld, waarbij onbekend is of deze waterdicht is of niet.',
  potNietWaterdicht: 'De put is voorzien van een vlakke beschermconstructie die nagenoeg samenvalt met het maaiveld en die niet water- of algemener gesteld vloeistofdicht is.',
  potWaterdicht: 'De put is voorzien van een vlakke beschermconstructie die nagenoeg samenvalt met het maaiveld en die water- of algemener gesteld vloeistofdicht is.',
  stoeptegel: 'De put is voorzien van een stoeptegel.',
};
