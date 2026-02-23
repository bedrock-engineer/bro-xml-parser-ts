/**
 * SamplingQuality codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SamplingQuality
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASamplingQuality
 */

export const BHRGT_SAMPLING_QUALITY_CODES: Record<string, string> = {
  deelsOngeroerd:
    "Een niet nader gespecificeerd deel van de monsters is ongeroerd. Dat houdt in dat de kwaliteit daarvan tenminste vergelijkbaar is met klasse D onder IMBRO.",
  geroerd:
    "De monsters zijn geroerd. Dat houdt in dat de kwaliteit vergelijkbaar is met klasse E onder IMBRO.",
  klasseA:
    "De bemonstering is erop gericht ongestoorde monsters te verkrijgen en irreversibele veranderingen in de spanningstoestand te voorkomen. Direct na bemonstering zijn de monsters luchtdicht verpakt om oxidatie zo veel mogelijk te voorkomen. De monsters zijn opgeslagen en getransporteerd in afgesloten monstercontainers van voldoende sterkte om beschadiging en vochtverlies te voorkomen. De monstercontainers zijn op locatie, tijdens transport en in het laboratorium opgeslagen in een omgeving waar de temperatuur tussen 8 en 12 graden C mag variï¿½ren en de luchtvochtigheid minimaal 90% bedraagt. De monstercontainers zijn tijdens transport beschermd tegen trillingen en schokken.",
  klasseB:
    "De bemonstering is erop gericht ongestoorde monsters te verkrijgen waarbij verandering in de spanningstoestand wordt geaccepteerd. Direct na bemonstering zijn de monsters luchtdicht verpakt om oxidatie zo veel mogelijk te voorkomen. De monsters zijn opgeslagen en getransporteerd in afgesloten monstercontainers van voldoende sterkte om beschadiging en vochtverlies te voorkomen. De monstercontainers zijn beschermd tegen trillingen en schokken en extreme temperatuur.",
  klasseC:
    "De bemonstering is erop gericht monsters te verkrijgen waarin de gelaagdheid en de interne structuur behouden blijft. Direct na bemonstering zijn de monsters luchtdicht verpakt om oxidatie zo veel mogelijk te voorkomen. De monsters zijn opgeslagen en getransporteerd in afgesloten monstercontainers van voldoende sterkte om beschadiging en vochtverlies te voorkomen.",
  klasseD:
    "De bemonstering is erop gericht monsters te verkrijgen waarin de gelaagdheid behouden blijft. Direct na bemonstering zijn de monsters luchtdicht verpakt om oxidatie zo veel mogelijk te voorkomen. De monsters kunnen in PVC of metalen monstercontainers e.d. zijn verzameld en opgeslagen.",
  klasseE:
    "De bemonstering is erop gericht een goede indruk te krijgen van de samenstelling van de ondergrond. Er gelden geen bijzondere eisen. De monsters kunnen in monsterbakken, zakken, potten e.d. verzameld en opgeslagen zijn.",
  onbekend: "De bemonsteringskwaliteit is niet bekend.",
  ongeroerd:
    "De monsters zijn ongeroerd. Dat houdt in dat de kwaliteit tenminste vergelijkbaar is met klasse D onder IMBRO.",
};

/**
 * Get the Dutch description for a SamplingQuality code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSamplingQualityDescription(code: string): string | undefined {
  return BHRGT_SAMPLING_QUALITY_CODES[code];
}
