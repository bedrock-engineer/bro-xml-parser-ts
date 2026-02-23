/**
 * CorrectionReason codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:CorrectionReason
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ACorrectionReason
 */

export const BHRGT_CORRECTION_REASON_CODES: Record<string, string> = {
  bronhouder:
    "Correctie van de bronhouder die in het verzoek staat dat bij registratie starten is aangeboden.",
  eigenCorrectie: "Correctie op initiatief van de dataleverancier.",
  inOnderzoek: "Correctie naar aanleiding van een door de registratiebeheerder gestart onderzoek.",
  kwaliteitsregime: "Correctie van het kwaliteitsregime.",
  typeBrondocument:
    "Correctie van het type brondocument dat in de registratie van het object is gebruikt.",
};

/**
 * Get the Dutch description for a CorrectionReason code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtCorrectionReasonDescription(code: string): string | undefined {
  return BHRGT_CORRECTION_REASON_CODES[code];
}
