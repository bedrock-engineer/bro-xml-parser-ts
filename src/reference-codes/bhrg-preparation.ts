/**
 * Preparation codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:Preparation
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3APreparation
 */

export const BHRG_PREPARATION_CODES: Record<string, string> = {
  bevriezing:
    "De uitvoerder heeft voordat met boren is begonnen de ondergrond tot op een bepaalde diepte bevroren.",
  geen: "De uitvoerder heeft geen voorbereidende werkzaamheden uitgevoerd.",
  injectieDragendVermogen:
    "De uitvoerder heeft voordat met boren is begonnen de ondergrond tot op een bepaalde diepte geïnjecteerd met materiaal om het dragend vermogen te vergroten.",
  injectieWaterdoorlatendheid:
    "De uitvoerder heeft voordat met boren is begonnen de ondergrond tot op een bepaalde diepte geïnjecteerd met materiaal om de waterdoorlatendheid te verkleinen.",
  tijdelijkeVerbuizingVooraf:
    "De uitvoerder heeft voordat met boren is begonnen tot op een bepaalde diepte in de ondergrond een buis aangebracht.",
  vacuumconsolidatie:
    "De uitvoerder heeft voordat met boren is begonnen tot op een bepaalde diepte in de ondergrond vacuümconsolidatie toegepast.",
  verticaleDrainage:
    "De uitvoerder heeft voordat met boren is begonnen de ondergrond tot op een bepaalde diepte verticaal gedraineerd (strips, grindpalen, etc.).",
};

/**
 * Get the Dutch description for a Preparation code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgPreparationDescription(code: string): string | undefined {
  return BHRG_PREPARATION_CODES[code];
}
