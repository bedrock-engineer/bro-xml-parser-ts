/**
 * FractionDistribution codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:FractionDistribution
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AFractionDistribution
 */

export const BHRGT_FRACTION_DISTRIBUTION_CODES: Record<string, string> = {
  basisBasis:
    "De fractie kleiner dan  63µm is niet onderverdeeld; de fractie groter dan  63µm is niet onderverdeeld.",
  basisStandaard:
    "De fractie kleiner dan  63µm is niet onderverdeeld; de fractie groter dan 63µm is op de standaardmanier onderverdeeld (in de fracties 63-90µm, 90-125µm, 125-180µm, 180-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-8mm, 8-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
  basisUitgebreid:
    "De fractie kleiner dan  63µm is niet onderverdeeld; de fractie groter dan 63µm is op de uitgebreide manier onderverdeeld en dat betekent dat de standaardverdeling is uitgebreid met 1 tot 6 extra fracties (bij volledige uitbreiding in de fracties 63-75µm, 75-90µm, 90-106µm, 106-125µm, 125-150µm, 150-180µm, 180-212µm, 212-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-5,6mm, 5,6-8mm, 8-11,2mm, 11,2-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
  standaardBasis:
    "De fractie kleiner dan  63µm is op de standaardmanier onderverdeeld (in de fracties 0-2µm, 2-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is niet onderverdeeld.",
  standaardStandaard:
    "De fractie kleiner dan  63µm is op de standaardmanier onderverdeeld (in de fracties 0-2µm, 2-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is op de standaardmanier onderverdeeld (in de fracties 63-90µm, 90-125µm, 125-180µm, 180-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-8mm, 8-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
  standaardUitgebreid:
    "De fractie kleiner dan  63µm is op de standaardmanier onderverdeeld (in de fracties 0-2µm, 2-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is op de uitgebreide manier onderverdeeld en dat betekent dat de standaardverdeling is uitgebreid met 1 tot 6 extra fracties (bij volledige uitbreiding in de fracties 63-75µm, 75-90µm, 90-106µm, 106-125µm, 125-150µm, 150-180µm, 180-212µm, 212-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-5,6mm, 5,6-8mm, 8-11,2mm, 11,2-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
  uitgebreidBasis:
    "De fractie  kleiner dan  63µm is op de uitgebreide manier onderverdeeld (in de fracties 0-2µm, 2-4µm, 4-8µm, 8-16µm, 16-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is niet onderverdeeld.",
  uitgebreidStandaard:
    "De fractie kleiner dan  63µm is op de uitgebreide manier onderverdeeld (in de fracties 0-2µm, 2-4µm, 4-8µm, 8-16µm, 16-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is op de standaardmanier onderverdeeld (in de fracties 63-90µm, 90-125µm, 125-180µm, 180-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-8mm, 8-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
  uitgebreidUitgebreid:
    "De fractie kleiner dan  63µm is op de uitgebreide manier onderverdeeld (in de fracties 0-2µm, 2-4µm, 4-8µm, 8-16µm, 16-32µm, 32-50µm, 50-63µm); de fractie groter dan 63µm is op de uitgebreide manier onderverdeeld en dat betekent dat de standaardverdeling is uitgebreid met 1 tot 6 extra fracties (bij volledige uitbreiding in de fracties 63-75µm, 75-90µm, 90-106µm, 106-125µm, 125-150µm, 150-180µm, 180-212µm, 212-250µm, 250-355µm, 355-500µm, 500-710µm, 710-1000µm, 1000-1400µm, 1400µm-2mm, 2-4mm, 4-5,6mm, 5,6-8mm, 8-11,2mm, 11,2-16mm, 16-31,5mm, 31,5mm-63mm, groter dan 63mm).",
};

/**
 * Get the Dutch description for a FractionDistribution code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtFractionDistributionDescription(code: string): string | undefined {
  return BHRGT_FRACTION_DISTRIBUTION_CODES[code];
}
