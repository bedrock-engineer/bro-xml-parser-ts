/**
 * DeliveryContext codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:DeliveryContext
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ADeliveryContext
 */

export const CPT_DELIVERY_CONTEXT_CODES: Record<string, string> = {
  archiefoverdracht: "De gegevens zijn aangeleverd in het kader van archiefoverdracht",
  MBW: "De gegevens zijn aangeleverd in het kader van de Mijnbouwwet",
  publiekeTaak:
    "De gegevens zijn aangeleverd in het kader van de publieke taakuitvoering, zonder nadere specificering",
  WW: "De gegevens zijn aangeleverd in het kader van de Waterwet",
};

/**
 * Get the Dutch description for a DeliveryContext code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptDeliveryContextDescription(code: string): string | undefined {
  return CPT_DELIVERY_CONTEXT_CODES[code];
}
