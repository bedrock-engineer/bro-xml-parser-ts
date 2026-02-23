/**
 * Angularity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:Angularity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AAngularity
 */

export const BHRG_ANGULARITY_CODES: Record<string, string> = {
  afgerond:
    "Oppervlak egaal met alleen enkele uithollingen of vlakke stukken of alleen gladde convexe oppervlakten.",
  afgerondZeerAfgerond:
    "Oppervlak volledig egaal, of egaal met alleen enkele uithollingen of vlakke stukken of alleen gladde convexe oppervlakten.",
  hoekig: "Weinig afgeronde hoeken of randen.",
  hoekigZeerHoekig: "Geen of weinig afgeronde hoeken of randen.",
  onbekend: "De hoekigheid van de korrels is niet bekend.",
  subhoekig: "Onregelmatig oppervlak, waarbij de primaire hoeken en randen nog zichtbaar zijn.",
  subhoekigSubrond:
    "Oppervlak onregelmatig en al dan niet egaal, waarbij de primaire hoeken en randen nog zichtbaar zijn.",
  subrond:
    "Oppervlak egaal maar onregelmatig, waarbij de primaire hoeken en randen nog zichtbaar zijn.",
  zeerAfgerond: "Oppervlak egaal.",
  zeerHoekig: "Geen afgeronde hoeken of randen.",
};

/**
 * Get the Dutch description for a Angularity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgAngularityDescription(code: string): string | undefined {
  return BHRG_ANGULARITY_CODES[code];
}
