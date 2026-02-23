/**
 * PeatTensileStrength codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:PeatTensileStrength
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3APeatTensileStrength
 */

export const BHRGT_PEAT_TENSILE_STRENGTH_CODES: Record<string, string> = {
  geen: "De vezels grijpen niet in elkaar. Monsters zonder treksterkte geven geen weerstand bij het uit elkaar trekken, de vezels zijn te klein of afwezig om in elkaar te haken.",
  hoog: "De vezels grijpen sterk in elkaar. Bij monsters met een hoge treksterkte wordt veel weerstand gevoeld bij het uit elkaar trekken. De vezels vormen een netwerk of mat. Bij het uit elkaar trekken breken of knappen vezels.",
  laag: "De vezels grijpen iets in elkaar. Bij monsters met een lage treksterkte glijden de vezels langs elkaar zonder veel weerstand. Dit komt voor bij monster die veel kleine vezels hebben en enkele grote vezels.",
  matig:
    "De vezels grijpen in elkaar. Bij monsters met een matige treksterkte wordt weerstand gevoeld bij het uit elkaar trekken van de grond. De vezels blijven aan elkaar haken en vormen een netwerk dat de grond ondersteunt",
};

/**
 * Get the Dutch description for a PeatTensileStrength code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtPeatTensileStrengthDescription(code: string): string | undefined {
  return BHRGT_PEAT_TENSILE_STRENGTH_CODES[code];
}
