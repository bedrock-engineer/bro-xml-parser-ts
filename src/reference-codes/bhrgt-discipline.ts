/**
 * Discipline codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:Discipline
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADiscipline
 */

export const BHRGT_DISCIPLINE_CODES: Record<string, string> = {
  geotechniek: "Booronderzoek uitgevoerd vanuit geotechnische expertise.",
  geotechniekArcheologie:
    "Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit archeologische expertise.",
  geotechniekArcheologieMilieukunde:
    "Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit archeologische en milieukundige expertise.",
  geotechniekMilieukunde:
    "Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit milieukundige expertise.",
};

/**
 * Get the Dutch description for a Discipline code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDisciplineDescription(code: string): string | undefined {
  return BHRGT_DISCIPLINE_CODES[code];
}
