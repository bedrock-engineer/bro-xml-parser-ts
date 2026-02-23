/**
 * TertiaryRockConstituent codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:TertiaryRockConstituent
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ATertiaryRockConstituent
 */

export const BHRGT_TERTIARY_ROCK_CONSTITUENT_CODES: Record<string, string> = {
  donkereMineralen: "Deeltjes die opaak en donker van kleur en minder hard dan kwarts zijn.",
  fosfaatconcretie: "Concretie die in belangrijke mate uit fosfaat bestaat.",
  geen: "Geen bijzondere bestanddelen.",
  glauconiet: "Groene, groenige of bruine korrels die uit glauconiet of goethiet bestaan. ",
  glimmer:
    "Gladde plaatvormige deeltjes die meestal uit de mineralen muskoviet of biotiet bestaan.",
  ijzersulfide: "Mineralen die uit ijzersulfide bestaan, vrijwel altijd pyriet of markasiet.",
  mangaanconcretie: "Concretie die uit mangaanoxide bestaat.",
  siderietconcretie: "Concretie die uit sideriet bestaat.",
  vuursteenconcretie: "Concretie die uit vrijwel amorfe kwarts bestaat.",
};

/**
 * Get the Dutch description for a TertiaryRockConstituent code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtTertiaryRockConstituentDescription(code: string): string | undefined {
  return BHRGT_TERTIARY_ROCK_CONSTITUENT_CODES[code];
}
