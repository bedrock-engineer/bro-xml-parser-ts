/**
 * LayerProportionClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:LayerProportionClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ALayerProportionClass
 */

export const BHRG_LAYER_PROPORTION_CLASS_CODES: Record<string, string> = {
  aandeelOnbekend: "Laagjes zijn aanwezig, maar het aandeel in het volume is niet bekend.",
  bijnaVolledigTenminste99:
    "Er komt bijna volledig voor en dat betekent dat het aandeel in het volume minstens 99 % is.",
  grotendeels90Tot99:
    "Er komt grotendeels voor en dat betekent dat het aandeel in het volume minimaal 90 en minder dan 99 % is.",
  merendeels70Tot90:
    "Er komt mnerendeels voor en dat betekent dat het aandeel in het volume minimaal 70 en minder dan 90 % is.",
  spoorTot1:
    "Er komt een spoor voor en dat betekent dat het aandeel in het volume minder dan 1 % is.",
  uiterstVeel50Tot70:
    "Er komt uiterst veel voor en dat betekent dat het aandeel in het volume minimaal 50 en minder dan 70 % is.",
  veel10Tot30:
    "Er komt veel voor en dat betekent dat het aandeel in het volume minimaal 10 en minder dan 30 % is.",
  weinig1Tot10:
    "Er komt weinig voor en dat betekent dat het aandeel in het volume minimaal 1 en minder dan 10 % is.",
  zeerVeel30Tot50:
    "Er komt zeer veel voor en dat betekent dat het aandeel in het volume minimaal 30 en minder dan 50 % is.",
};

/**
 * Get the Dutch description for a LayerProportionClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgLayerProportionClassDescription(code: string): string | undefined {
  return BHRG_LAYER_PROPORTION_CLASS_CODES[code];
}
