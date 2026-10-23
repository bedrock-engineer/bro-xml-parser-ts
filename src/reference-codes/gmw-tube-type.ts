/**
 * TubeType code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:gmw:TubeType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Agmw%3ATubeType
 */

export const GMW_TUBE_TYPE_CODES: Record<string, string> = {
  filterlozeBuis: 'De monitoringbuis is in zijn geheel een stijgbuisdeel, met een open onderkant.',
  minifilter: 'De monitoringbuis bestaat uit een zeer kort filterdeel en een stijgbuisdeel dat uit een flexibele slang bestaat. Het minifilter is daarom uitsluitend geschikt voor grondwatersamenstellingsonderzoek.',
  standaardbuis: 'De monitoringbuis heeft de standaardopbouw van stijgbuisdeel, filterdeel en eventueel een zandvang.',
  volledigFilter: 'De monitoringbuis is in zijn geheel een filter.',
};
