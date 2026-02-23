/**
 * PerformanceIrregularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:PerformanceIrregularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3APerformanceIrregularity
 */

export const BHRG_PERFORMANCE_IRREGULARITY_CODES: Record<string, string> = {
  massaProefstuk: "De massa van het proefstuk is kleiner dan de procedure voorschrijft.",
  materiaalVerloren:
    "Er is een correctie op de verdeling van de fractie groter dan 63 μm toegepast omdat tijdens het zeven een klein deel (niet meer dan 1 %) van het materiaal verloren is gegaan.",
  onvoldoendeDroog:
    "Het watergehalte van het proefstuk is na droging op 60 °C groter dan 3 %. Er bestaat de kans dat het materiaal bij 105 °C niet volledig droog is.",
  sequentieelUitgevoerd:
    "De bepaling is na een andere bepaling op hetzelfde materiaal uitgevoerd. Het kan zijn dat er materiaal verloren is gegaan. De bepaling is hierdoor minder nauwkeurig.",
  volumeProefstuk: "Het volume van het proefstuk is kleiner dan de procedure voorschrijft.",
  waterWeggelekt: "Er is water uit het proefstuk gelekt na verzadiging.",
};

/**
 * Get the Dutch description for a PerformanceIrregularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgPerformanceIrregularityDescription(code: string): string | undefined {
  return BHRG_PERFORMANCE_IRREGULARITY_CODES[code];
}
