/**
 * Structure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:Structure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AStructure
 */

export const BHRG_STRUCTURE_CODES: Record<string, string> = {
  geenStructuur: "De laag heeft geen sedimentaire of post-sedimentaire structuur.",
  gelaagdheidFlaser:
    "Sedimentaire structuur: de laag bestaat uit een afwisseling van zand en fijnkorrelige grond; het zand vormt golvende laagjes, het fijne materiaal vormt ook golvende laagjes of het komt voor in lenzen.",
  gelaagdheidLinsen:
    "Sedimentaire structuur: de laag bestaat uit een afwisseling van fijnkorrelige grond en zand; de fijnkorrelige grond vormt golvende laagjes, het zand vormt ook golvende laagjes of het komt voor in lenzen.",
  gelaagdheidParallel:
    "Sedimentaire structuur: de laag is een opeenvolging van horizontale of subhorizontale laagjes die uit eenzelfde grondsoort bestaan",
  heterogeenGelaagd:
    "Sedimentaire structuur: de laag is een min of meer regelmatige afwisseling van verschillende grondsoorten.",
  involutie:
    "Post-sedimentaire structuur: de laag is een opeenvolging van onregelmatig ondulerende homogene gedeelten op cm tot m-schaal (plooien, zakvormen) zonder duidelijk onderling verband en wordt toegeschreven aan post-sedimentaire processen die in de bodem kunnen optreden boven een permafrostniveau.",
  mozaiekStructuur:
    "Post-sedimentaire structuur: de laag heeft zijn oorspronkelijke structuur grotendeels verloren; de grond is verbroken tot een mozaïek van brokjes met een grootte van enkele millimeters tot enkele centimeters. Komt voor in fijnkorrelige lagen. In individuele brokjes kan de oorspronkelijke structuur (deels) behouden zijn.",
  onregelmatigVervormd:
    "Post- of synsedimentaire structuur : de laag bestaat uit onregelmatig vervormde grondlichamen van twee of meer grondsoorten. De grondlichamen zijn meestal scherp begrensd en zijn vervormd door verkneding, breukwerking, vervloeiing, opbarsting, of een combinatie hiervan. Soms zijn in de delen resten van de oorspronkelijke gelaagdheid zichtbaar.",
  ribbelsAsymmetrisch:
    "Sedimentaire structuur: de laag is opgebouwd uit ribbels met een steile en een minder steile flank.",
  ribbelsKlimmend:
    "Sedimentaire structuur: de laag is opgebouwd uit ribbels die elkaar verticaal opvolgen.",
  ribbelsSymmetrisch:
    "Sedimentaire structuur: de laag is opgebouwd uit ribbels met even steile flanken.",
  scheveGelaagdheidLaaghoekig:
    "Sedimentaire structuur: de laag bestaat uit scheefstaande laagjes; de laagjes zijn goed zichtbaar en de hoek van scheefstelling is niet meer dan enkele graden.",
  scheveGelaagdheidNormaal:
    "Sedimentaire structuur: de laag bestaat uit scheefstaande laagjes; de laagjes zijn goed zichtbaar en de hoek van scheefstelling is minimaal enkele graden.",
  scheveGelaagdheidOnduidelijk:
    "Sedimentaire structuur: de laag bestaat uit scheefstaande laagjes; de laagjes zijn slecht zichtbaar doordat ze uiterst dun zijn of uit goed gesorteerd sediment bestaan.",
  scheveGelaagdheidVisgraat:
    "Sedimentaire structuur: de laag bestaat uit verticale eenheden die zijn opgebouwd uit scheefstaande laagjes; de helling van de scheefstaande laagjes is in aangrenzende eenheden tegengesteld.",
  zettingStructuur:
    "Post-sedimentaire structuur: de laag heeft zijn oorspronkelijke structuur enigszins verloren door natuurlijke belasting en vertoont een patroon van kleine (sub)verticale, scherp gedefinieerde vlakjes waarlangs het sediment op mm- tot cm-schaal verzet is.",
};

/**
 * Get the Dutch description for a Structure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgStructureDescription(code: string): string | undefined {
  return BHRG_STRUCTURE_CODES[code];
}
