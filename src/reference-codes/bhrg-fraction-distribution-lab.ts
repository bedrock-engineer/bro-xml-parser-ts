/**
 * FractionDistributionLab codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:FractionDistributionLab
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AFractionDistributionLab
 */

export const BHRG_FRACTION_DISTRIBUTION_LAB_CODES: Record<string, string> = {
  basisBeperktStandaard:
    "De fractie kleiner dan 63 μm is niet onderverdeeld, de fractie 63 μm tot 2mm is op de beperkte manier onderverdeeld en de fractie groter dan 2 mm is op de standaard manier onderverdeeld.",
  minimaalMinimaalBasis:
    "De fractie kleiner dan 63 μm is op de minimale manier onderverdeeld, de fractie 63 μm tot 2 mm is op de minimale manier onderverdeeld en de fractie groter dan 2 mm is niet onderverdeeld.",
  standaardStandaardBasis:
    "De fractie kleiner dan 63 μm is op de standaard manier onderverdeeld, de fractie 63 μm tot 2 mm is op de standaard manier onderverdeeld en de fractie groter dan 2 mm is niet onderverdeeld.",
};

/**
 * Get the Dutch description for a FractionDistributionLab code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgFractionDistributionLabDescription(code: string): string | undefined {
  return BHRG_FRACTION_DISTRIBUTION_LAB_CODES[code];
}
