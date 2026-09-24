/**
 * CementType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:CementType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ACementType
 */

export const BHRGT_CEMENT_TYPE_CODES: Record<string, string> = {
  calciet: 'Tussen korrels neergeslagen kalkcement. Calciet is in zandsteen herkenbaar aan bruisen in aanraking met zoutzuuroplossing.',
  gips: 'Tussen korrels neergeslagen calciumsulfaatcement. Gips bruist niet en is zachter dan calciet, het is met een mes los te snijden.',
  ijzeroxide: 'Tussen korrels neergeslagen ijzeroxide. IJzeroxide Komt typisch voor in lagen en heeft kenmerkende rode en bruine roestkleuren.',
  kwarts: 'Tussen korrels neergeslagen siliciumoxide. Kwarts kan in kalk- of kwartszandsteen voorkomen.',
  nietBepaald: 'Het cement is niet herkenbaar.',
};
