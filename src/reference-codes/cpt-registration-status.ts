/**
 * RegistrationStatus codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:RegistrationStatus
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ARegistrationStatus
 */

export const CPT_REGISTRATION_STATUS_CODES: Record<string, string> = {
  voltooid:
    "Het registeren van de gegevens van het object is voltooid. Alle gegevens zijn in de registratie ondergrond vastgelegd en er kunnen geen nieuwe gegevens meer worden geregistreerd",
};

/**
 * Get the Dutch description for a RegistrationStatus code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptRegistrationStatusDescription(code: string): string | undefined {
  return CPT_REGISTRATION_STATUS_CODES[code];
}
