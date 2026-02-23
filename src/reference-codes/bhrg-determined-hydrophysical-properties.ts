/**
 * DeterminedHydrophysicalProperties codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DeterminedHydrophysicalProperties
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADeterminedHydrophysicalProperties
 */

export const BHRG_DETERMINED_HYDROPHYSICAL_PROPERTIES_CODES: Record<string, string> = {
  geen: "Er zijn geen hydrofysische eigenschappen bepaald.",
  standaard:
    "De verzadigde waterdoorlatendheid, de droge volumieke massa en de volumieke massa zijn bepaald, en de volumieke massa vaste delen is niet bepaald. Dit vereist een interval met een minimum lengte van 2 cm. De vereiste monsterkwaliteit is QM1, QM2 of QM3.",
  uitgebreid:
    "De verzadigde waterdoorlatendheid, de droge volumieke massa en de volumieke massa vaste delen zijn bepaald. Dit vereist een interval met een minimum lengte van 2 cm. De vereiste monsterkwaliteit is QM1, QM2 of QM3.",
  waterdoorlatendheidMislukt:
    "De bepaling van de verzadigde waterdoorlatendheid is niet geslaagd. De droge volumieke massa, de volumieke massa en/of de volumieke massa vaste delen is bepaald. Dit vereist een interval met een minimum lengte van 2 cm. De monsterkwaliteit is gelijk aan QM1, QM2 of QM3.",
};

/**
 * Get the Dutch description for a DeterminedHydrophysicalProperties code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDeterminedHydrophysicalPropertiesDescription(
  code: string,
): string | undefined {
  return BHRG_DETERMINED_HYDROPHYSICAL_PROPERTIES_CODES[code];
}
