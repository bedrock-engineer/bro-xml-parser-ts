/**
 * Discipline code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:Discipline
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADiscipline
 */

export const BHRG_DISCIPLINE_CODES: Record<string, string> = {
  geologie: 'Booronderzoek uitgevoerd vanuit specialistisch geologische expertise.',
  geologieArcheologie: 'Booronderzoek uitgevoerd vanuit specialistisch geologische expertise met ondersteuning vanuit archeologische expertise.',
  geologieArcheologieMilieukunde: 'Booronderzoek uitgevoerd vanuit specialistisch geologische expertise met ondersteuning vanuit archeologische en milieukundige expertise.',
  geologieMilieukunde: 'Booronderzoek uitgevoerd vanuit specialistisch geologische expertise met ondersteuning vanuit milieukundige expertise.',
  geotechniekArchief: 'Booronderzoek uitgevoerd vanuit geotechnische expertise.',
};
