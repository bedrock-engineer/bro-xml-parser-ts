/**
 * CorrectionReason codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:CorrectionReason
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ACorrectionReason
 */

export const CPT_CORRECTION_REASON_CODES: Record<string, string> = {
  bronhouder:
    "De correctie die de dataleverancier op eigen initiatief aanbiedt omdat hij heeft geconstateerd dat de waarde van de bronhouder van het object in de registratie ondergrond niet juist is",
  gegevensAdministratief:
    "De correctie die de dataleverancier op eigen initiatief aanbiedt omdat hij heeft geconstateerd dat er in de registratie ondergrond een fout zit die herleid kan worden tot een fout in de administratieve gegevens in het brondocument",
  gegevensOnderzoek:
    "De correctie die de dataleverancier op eigen initiatief aanbiedt omdat hij heeft geconstateerd dat er in de registratie ondergrond een fout zit die herleid kan worden tot een fout in de onderzoekgegevens in het brondocument",
  inOnderzoek:
    "De correctie van een fout in de registratie ondergrond die wordt aangeboden in vervolg op een door de registratiebeheerder gestart onderzoek",
  kwaliteitsregime:
    "De correctie die de dataleverancier op eigen initiatief aanbiedt omdat de waarde van het kwaliteitsregime van het object in de registratie ondergrond niet juist is",
};

/**
 * Get the Dutch description for a CorrectionReason code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptCorrectionReasonDescription(code: string): string | undefined {
  return CPT_CORRECTION_REASON_CODES[code];
}
