/**
 * StatusQualityControl code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:StatusQualityControl
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3AStatusQualityControl
 */

export const GLD_STATUS_QUALITY_CONTROL_CODES: Record<string, string> = {
  afgekeurd: 'Er is reden om dit gegeven als onjuist te beschouwen op basis van de gehanteerde beoordelingsprocedure. De werkelijke waarde kan niet achterhaald worden.',
  goedgekeurd: 'Er is geen reden om aan de juistheid van dit gegeven te twijfelen op basis is van de gehanteerde beoordelingsprocedure.',
  nogNietBeoordeeld: 'Er is nog geen beoordeling gedaan van de kwaliteit. De beoordeling zal later plaats vinden.',
  onbekend: 'Er is geen beoordeling gedaan van de kwaliteit, of het is onbekend of er een beoordeling is gedaan (IMBRO/A kwaliteitsregime).',
  onbeslist: 'Er zijn twijfels over de juistheid van dit gegeven, maar uitsluitsel kon niet gegeven worden op basis van de gehanteerde beoordelingsprocedure.',
};
