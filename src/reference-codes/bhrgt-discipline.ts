/**
 * Discipline code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrgt:Discipline
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADiscipline
 */

export const BHRGT_DISCIPLINE_CODES: Record<string, string> = {
  geotechniek: 'Booronderzoek uitgevoerd vanuit geotechnische expertise.',
  geotechniekArcheologie: 'Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit archeologische expertise.',
  geotechniekArcheologieMilieukunde: 'Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit archeologische en milieukundige expertise.',
  geotechniekMilieukunde: 'Booronderzoek uitgevoerd vanuit geotechnische expertise met ondersteuning vanuit milieukundige expertise.',
};
