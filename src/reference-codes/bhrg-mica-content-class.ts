/**
 * MicaContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MicaContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMicaContentClass
 */

export const BHRG_MICA_CONTENT_CLASS_CODES: Record<string, string> = {
  glimmersGeen:
    "Glimmers - dunne, plaatvormige sedimentdeeltjes met een goed herkenbaar glimmend oppervlak - komen niet voor.",
  glimmerSpoor:
    "Glimmers - dunne, plaatvormige sedimentdeeltjes met een goed herkenbaar glimmend oppervlak - zijn aanwezig en maken tot 0,1 % van het volume uit.",
  glimmerVeel:
    "Glimmers - dunne, plaatvormige sedimentdeeltjes met een goed herkenbaar glimmend oppervlak - maken 1 % of meer van het volume uit.",
  glimmerWeinig:
    "Glimmers - dunne, plaatvormige sedimentdeeltjes met een goed herkenbaar glimmend oppervlak - maken tussen 0,1 en 1 % van het volume uit.",
  onbekend: "Het is niet bekend of glimmers aanwezig zijn.",
};

/**
 * Get the Dutch description for a MicaContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMicaContentClassDescription(code: string): string | undefined {
  return BHRG_MICA_CONTENT_CLASS_CODES[code];
}
