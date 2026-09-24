/**
 * HydrologicalSetting code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:HydrologicalSetting
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AHydrologicalSetting
 */

export const BHRG_HYDROLOGICAL_SETTING_CODES: Record<string, string> = {
  inundatieRivierwater: 'Het terrein is zo gelegen dat het periodiek onder water komt te staan door het binnendringen van rivierwater.',
  inundatieZeewater: 'Het terrein is zo gelegen dat het periodiek onder water komt te staan door het binnendringen van zeewater.',
  kwelGeenWijst: 'Het terrein is zo gelegen dat grondwater via kwel de wortelzone kan bereiken, maar het omhoogkomen van het grondwater is niet direct geassocieerd met een breuk in de ondergrond.',
  kwelWijst: 'Het terrein is zo gelegen dat grondwater via kwel de wortelzone kan bereiken. Het omhoogkomen van zoet grondwater is direct geassocieerd met een breuk in de ondergrond.',
};
