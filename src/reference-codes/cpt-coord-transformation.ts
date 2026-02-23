/**
 * CoordTransformation codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:CoordTransformation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3ACoordTransformation
 */

export const CPT_COORD_TRANSFORMATION_CODES: Record<string, string> = {
  "7parameterTransformatie":
    "De gegevens zijn getransformeerd van WGS84 naar ETRS89, gebruikmakend van de 7-parameter transformatie. De transformatieparameters zijn afkomstig van de Dienst der Hydrografie en zijn tijdsafhankelijk. Voor elk jaar is een parameterset beschikbaar voor de berekening van coördinaten in ETRS89 in Nederland, waarna een transformatieprocedure naar de juiste dag volgt",
  "7parameterTransformatie1989":
    "De gegevens zijn getransformeerd van WGS84 naar ETRS89, gebruikmakend van de 7-parameter transformatie. De transformatieparameters zijn afkomstig van de Dienst der Hydrografie en zijn tijdsafhankelijk. Bij transformatie is gebruik gemaakt van de parameterset 1989.0",
  nietGetransformeerd: "De gegevens zijn aangeleverd in ETRS89; transformatie was niet nodig.",
  RDNAPTRANS2008:
    "De gegevens zijn getransformeerd van RD naar ETRS89, gebruikmakend van de transformatie RDNAPTRANS™, versie 2008. RDNAPTRANS™ is de officiële transformatie tussen RD/NAP en ETRS89 afkomstig van het Kadaster",
  RDNAPTRANS2008MV0:
    "De gegevens zijn getransformeerd van RD naar ETRS89, gebruikmakend van de transformatie RDNAPTRANS™, versie 2008. De positie van het aardoppervlak is onbekend, bij transformatie is uitgegaan van 0 m NAP. RDNAPTRANS™ is de officiële transformatie tussen RD/NAP en ETRS89 afkomstig van het Kadaster",
};

/**
 * Get the Dutch description for a CoordTransformation code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptCoordTransformationDescription(code: string): string | undefined {
  return CPT_COORD_TRANSFORMATION_CODES[code];
}
