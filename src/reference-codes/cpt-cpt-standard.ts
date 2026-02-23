/**
 * CPTStandard codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:CPTStandard
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ACPTStandard
 */

export const CPT_CPT_STANDARD_CODES: Record<string, string> = {
  ISO19901d8v2014:
    "ISO 19901-8:2014 Petroleum and natural gas industries - Specific requirements for offshore structures - Part 8: Marine soil investigations is een internationale norm overgenomen als Europese norm (EN-ISO 19901-8:2015) en als Nederlandse norm NEN-EN-ISO 19901-8:2015 Aardolie- en aardgasindustrie - Specifieke eisen voor buitengaatse constructies - Deel 8: Zeebodemonderzoeken. De procedure wordt gebruikt voor booronderzoek op zee en dat is aan de zeezijde van de UNCLOS-basislijn.",
  ISO22476D1: "NEN-EN-ISO 22476 deel 1",
  ISO22476D12: "NEN-EN-ISO 22476 deel 12",
  NEN3680: "NEN 3680",
  NEN5140: "NEN 5140",
  onbekend: "Sondeernorm onbekend",
};

/**
 * Get the Dutch description for a CPTStandard code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptCPTStandardDescription(code: string): string | undefined {
  return CPT_CPT_STANDARD_CODES[code];
}
