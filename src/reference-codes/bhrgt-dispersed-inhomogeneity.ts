/**
 * DispersedInhomogeneity codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DispersedInhomogeneity
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADispersedInhomogeneity
 */

export const BHRGT_DISPERSED_INHOMOGENEITY_CODES: Record<string, string> = {
  dolomietbrokjesVeel: "Dolomietbrokjes maken 25 tot 50% van het volume uit.",
  dolomietbrokjesWeinig: "Dolomietbrokjes maken 5 tot 25% van het volume uit.",
  geen: "Geen disperse inhomogeniteiten.",
  gipsbrokjesVeel: "Gipsbrokjes maken 25 tot 50% van het volume uit.",
  gipsbrokjesWeinig: "Gipsbrokjes maken 5 tot 25% van het volume uit.",
  grindlensjesVeel: "Grindlensjes maken 25 tot 50% van het volume uit.",
  grindlensjesWeinig: "Grindlensjes maken 5 tot 25% van het volume uit.",
  kalksteenbrokjesVeel: "Kalksteenbrokjes maken 25 tot 50% van het volume uit.",
  kalksteenbrokjesWeinig: "Kalksteenbrokjes maken 5 tot 25% van het volume uit.",
  kleibrokjesVeel: "Kleibrokjes maken 25 tot 50% van het volume uit.",
  kleibrokjesWeinig: "Kleibrokjes maken 5 tot 25% van het volume uit.",
  kleilensjesVeel: "Kleilensjes maken 25 tot 50% van het volume uit.",
  kleilensjesWeinig: "Kleilensjes maken 5 tot 25% van het volume uit.",
  kleisteenbrokjesVeel: "Kleisteenbrokjes maken 25 tot 50% van het volume uit.",
  kleisteenbrokjesWeinig: "Kleisteenbrokjes maken 5 tot 25% van het volume uit.",
  siltbrokjesVeel: "Siltbrokjes maken 25 tot 50% van het volume uit.",
  siltbrokjesWeinig: "Siltbrokjes maken 5 tot 25% van het volume uit.",
  siltlensjesVeel: "Siltlensjes maken 25 tot 50% van het volume uit.",
  siltlensjesWeinig: "Siltlensjes maken 5 tot 25% van het volume uit.",
  siltsteenbrokjesVeel: "Siltsteenbrokjes maken 25 tot 50% van het volume uit.",
  siltsteenbrokjesWeinig: "Siltsteenbrokjes maken 5 tot 25% van het volume uit.",
  steenkoolbrokjesVeel: "Steenkoolbrokjes maken 25 tot 50% van het volume uit.",
  steenkoolbrokjesWeinig: "Steenkoolbrokjes maken 5 tot 25% van het volume uit.",
  steenzoutbrokjesVeel: "Steenzoutbrokjes maken 25 tot 50% van het volume uit.",
  steenzoutbrokjesWeinig: "Steenzoutbrokjes maken 5 tot 25% van het volume uit.",
  veenbrokjesVeel: "Veenbrokjes maken 25 tot 50% van het volume uit.",
  veenbrokjesWeinig: "Veenbrokjes maken 5 tot 25% van het volume uit.",
  zandlensjesVeel: "Zandlensjes maken 25 tot 50% van het volume uit.",
  zandlensjesWeinig: "Zandlensjes maken 5 tot 25% van het volume uit.",
  zandsteenlensjesVeel: "Zandsteenlensjes maken 25 tot 50% van het volume uit.",
  zandsteenlensjesWeinig: "Zandsteenlensjes maken 5 tot 25% van het volume uit.",
};

/**
 * Get the Dutch description for a DispersedInhomogeneity code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDispersedInhomogeneityDescription(code: string): string | undefined {
  return BHRGT_DISPERSED_INHOMOGENEITY_CODES[code];
}
