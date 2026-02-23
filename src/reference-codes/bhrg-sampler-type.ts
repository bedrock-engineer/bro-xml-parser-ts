/**
 * SamplerType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:SamplerType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ASamplerType
 */

export const BHRG_SAMPLER_TYPE_CODES: Record<string, string> = {
  corebarrelDoubleTube:
    "Een apparaat dat bestaat uit een buitenbuis en een binnenbuis. De buitenbuis is direct met de boorbeitel verbonden en aan de bovenzijde open. De binnenbuis is stationair en dient om het monster op te vangen; de binnenbuis is aan de bovenzijde open en aan de onderzijde voorzien van een kernvanger.",
  corebarrelSingleTube:
    "Een apparaat dat bestaat uit een enkele buis die direct met de boorbeitel verbonden is. De buis dient om het monster op te vangen en is aan de bovenzijde open en aan de onderzijde voorzien van een kernvanger.",
  corebarrelTripleTube:
    "Een apparaat dat bestaat uit een buitenbuis met twee binnenbuizen. De buitenbuis is direct met de boorbeitel verbonden en aan de bovenzijde open. De binnenbuizen zijn stationair en dienen om het monster op te vangen. De buitenste van de twee is aan de bovenzijde open en aan de onderzijde voorzien van een kernvanger en dient ter bescherming van de binnenste buis waarin het monster werkelijk wordt opgevangen.",
  guts: "Een apparaat dat bestaat uit een buis om het monster op te vangen die aan bovenzijde open is en aan de onderzijde voorzien is van een steekmond en die in de langsrichting gedeeltelijk open is.",
  sherbrooke:
    "Een apparaat dat bestaat uit een open constructie van buizen en ringen met een grote diameter die aan de onderzijde voorzien is van messen die bij monstername het monster afsnijden en daarna voorkomen dat het monster eruit valt.",
  steekbus:
    "Een apparaat dat bestaat uit een holle buis die aan de bovenzijde open is en aan de onderzijde voorzien is van een steekmond; de buis dient om het monster op te vangen en is in de lengterichting dicht; de steekmond kan voorzien zijn van een kernvanger, maar heeft nooit messen die het monster afsnijden.",
  steekbusDLDS:
    "Een apparaat dat bestaat uit een holle buis met een grote diameter die aan de bovenzijde open is en aan de onderzijde voorzien is van een steekmond; de buis dient om het monster op te vangen en is in de lengterichting dicht; de steekmond is van messen voorzien die bij monstername het monster afsnijden en daarna voorkomen dat het monster eruit valt.",
  steekbusMetLiner:
    "Een apparaat dat bestaat uit twee precies in elkaar passende buizen die aan de bovenzijde open in de lengterichting dicht zijn. De binnenbuis (liner) dient om het monster op te vangen. De buitenbuis is de onderzijde voorzien van een steekmond; de steekmond kan voorzien zijn van een kernvanger, maar heeft nooit messen die het monster afsnijden.",
};

/**
 * Get the Dutch description for a SamplerType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgSamplerTypeDescription(code: string): string | undefined {
  return BHRG_SAMPLER_TYPE_CODES[code];
}
