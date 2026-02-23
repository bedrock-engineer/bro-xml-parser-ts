/**
 * DiscontinuityType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DiscontinuityType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADiscontinuityType
 */

export const BHRG_DISCONTINUITY_TYPE_CODES: Record<string, string> = {
  antropogeen: "Grensvlak in antropogene grond dat niet als laagscheiding kan worden beschreven.",
  breuk: "Een vlak waarlangs lagen verzet zijn.",
  ijswigInvulling:
    "De begrenzing van een (sub)verticaal wigvormig grondlichaam dat is opgebouwd uit verticaal tot subverticaal gelamineerd sediment en dat geassocieerd is met het voorkomen van een aantal trapsgewijs verlopende breukjes in het omringende materiaal.",
  krimpscheur:
    "Een smalle, (sub)verticale wigvormige discontinuïteit in fijnkorrelige grond, die met andersoortig materiaal gevuld is.",
  kryoturbatie:
    "Een discontinuïteit die uit grond bestaat dat na afzetting van het sediment, is vermengd  door herhaaldelijk bevriezen en ontdooien.",
  opbarsting:
    "Een of meer (sub)verticaal verlopende zandige aders, vingers of bolvormige structuren die dezelfde lithologie hebben als onderliggende lagen en lateraal begrensd zijn door naar boven toe convex afbuigende plooien. De structuren zijn enkele millimeters dik tot enkele centimeters in diameter.",
  zandwig:
    "De begrenzing van een (sub)verticaal wigvormig grondlichaam dat uit verticaal tot subverticaal gelamineerd zand bestaat en dat geassocieerd is met het voorkomen van naar boven toe convex afbuigende plooien in het omringende, zandige, materiaal.",
};

/**
 * Get the Dutch description for a DiscontinuityType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDiscontinuityTypeDescription(code: string): string | undefined {
  return BHRG_DISCONTINUITY_TYPE_CODES[code];
}
