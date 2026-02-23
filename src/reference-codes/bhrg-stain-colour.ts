/**
 * StainColour codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:StainColour
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AStainColour
 */

export const BHRG_STAIN_COLOUR_CODES: Record<string, string> = {
  blauw: "Blauw zoals gebruikt voor archiefgegevens.",
  bruin: "Bruin zoals gebruikt voor archiefgegevens.",
  bruinTotBijnaZwart: "De vlekken zijn bruin tot bijna zwart.",
  donkerbruinTotPaars: "De vlekken zijn donkerbruin tot paars.",
  donkergeelTotOkergeel: "De vlekken zijn donkergeel tot okergeel.",
  geel: "Geel zoals gebruikt voor archiefgegevens.",
  geelTotLichtgeel: "De vlekken zijn geel tot lichtgeel.",
  grijs: "De vlekken zijn grijs.",
  groen: "Groen zoals gebruikt voor archiefgegevens.",
  onbekend: "De vlekkleur is niet bekend.",
  oranje: "Oranje zoals gebruikt voor archiefgegevens.",
  oranjeroodTotRoodbruin: "De vlekken zijn oranjerood tot roodbruin, roestkleurig.",
  rood: "Rood zoals gebruikt voor archiefgegevens.",
  wit: "Wit zoals gebruikt voor archiefgegevens.",
  zwart: "Zwart zoals gebruikt voor archiefgegevens.",
};

/**
 * Get the Dutch description for a StainColour code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgStainColourDescription(code: string): string | undefined {
  return BHRG_STAIN_COLOUR_CODES[code];
}
