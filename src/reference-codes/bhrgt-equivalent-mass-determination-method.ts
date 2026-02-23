/**
 * EquivalentMassDeterminationMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:EquivalentMassDeterminationMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AEquivalentMassDeterminationMethod
 */

export const BHRGT_EQUIVALENT_MASS_DETERMINATION_METHOD_CODES: Record<string, string> = {
  massaAangenomen:
    "De volumieke massa van de fijne fractie die wordt gebruikt als rekenfactor voor de bepaling van de bezinksnelheid van de korrels in water, is gebaseerd op een aanname.",
  massaAfgeleid:
    "De volumieke massa van de fijne fractie die wordt gebruikt als rekenfactor voor de bepaling van de bezinksnelheid van de korrels in water, is afgeleid uit een meting van de volumieke massa van de vaste delen van het materiaal.",
  massaBepaald:
    "De volumieke massa van de fijne fractie die wordt gebruikt als rekenfactor voor de bepaling van de bezinksnelheid van de korrels in water, is gemeten.",
};

/**
 * Get the Dutch description for a EquivalentMassDeterminationMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtEquivalentMassDeterminationMethodDescription(
  code: string,
): string | undefined {
  return BHRGT_EQUIVALENT_MASS_DETERMINATION_METHOD_CODES[code];
}
