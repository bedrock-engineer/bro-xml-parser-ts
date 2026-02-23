/**
 * DiscontinuityType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DiscontinuityType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADiscontinuityType
 */

export const BHRGT_DISCONTINUITY_TYPE_CODES: Record<string, string> = {
  antropogeen: "Grensvlak in antropogene grond dat niet als laagscheiding kan worden beschreven.",
  krimpscheur:
    "Een meestal verticale opening in kleilagen ontstaan door rijpingsproces. Kunnen in grond van recente tot prepleistocene ouderdom voorkomen.",
  schuifvlak:
    "Een door afschuiving ontstaan vlak. Kan parallel aan gelaagdheid en door gelaagdheid heen voorkomen. Voorbeelden zijn schuifvlakken in de buurt van een wiel (dijkdoorbraak) en schuifvlakken in glaciaal belaste klei.",
  vorstwig:
    "Een met ingevallen grond gevulde ruimte die ontstaan is door smelten van in de ijstijd gegroeide ijslenzen en –wiggen.",
};

/**
 * Get the Dutch description for a DiscontinuityType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDiscontinuityTypeDescription(code: string): string | undefined {
  return BHRGT_DISCONTINUITY_TYPE_CODES[code];
}
