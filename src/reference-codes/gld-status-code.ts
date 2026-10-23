/**
 * StatusCode code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gld:StatusCode
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agld%3AStatusCode
 */

export const GLD_STATUS_CODE_CODES: Record<string, string> = {
  onbekend: 'Het is onbekend of de tijd-meetwaardereeks van deze observatie een beoordeling heeft ondergaan (IMBRO/A kwaliteitsregime).',
  volledigBeoordeeld: 'De tijd-meetwaardereeks van deze observatie heeft de volledige beoordeling ondergaan zoals beschreven in de gebruikte beoordelingsprocedure.',
  voorlopig: 'De tijd-meetwaardereeks van deze observatie heeft geen of een voorlopige beoordeling ondergaan zoals beschreven in de gebruikte beoordelingsprocedure.',
};
