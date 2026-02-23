/**
 * FineSoilConsistency codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:FineSoilConsistency
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AFineSoilConsistency
 */

export const BHRGT_FINE_SOIL_CONSISTENCY_CODES: Record<string, string> = {
  hardNEN5104:
    "Grond waar met een mes in kan worden gesneden. Een klasse onder de NEN 5104 procedure.",
  matigSlapNEN5104:
    "Grond die bij knijpen zeer gemakkelijk tussen de vingers door loopt. Een klasse onder de NEN 5104 procedure.",
  matigStevigNEN5104:
    "Grond die met stevig knijpen nog juist tussen de vingers door te krijgen is. Een klasse onder de NEN 5104 procedure.",
  slap: "Grond waar een vinger tot 10 mm kan worden gedrukt en die met lichte druk van de vingers kan worden verkneed.",
  slapNEN5104:
    "Grond die bij knijpen nog goed tussen de vingers door loopt. Een klasse onder de NEN 5104 procedure.",
  stevig:
    "Grond die met de duim gemakkelijk kan worden ingedrukt en niet met de vingers kan worden verkneed, maar wel tot 3 mm dikke strengen kan worden uitgerold zonder te breken of te verkruimelen.",
  stevigNEN5104:
    "Grond die niet tussen de vingers door te krijgen is. Een klasse onder de NEN 5104 procedure.",
  stijf:
    "Grond waar met de duim een ondiepe voor in kan worden gemaakt en die verkruimelt en breekt wanneer de grond tot 3 mm dikke strengen wordt uitgerold, maar nog vochtig genoeg is om weer tot een bol te worden gekneed.",
  zeerHardNEN5104:
    "Grond waar met een mes met moeite in kan worden gesneden. Een klasse onder de NEN 5104 procedure.",
  zeerSlap:
    "Grond waar een vinger gemakkelijk tot 25 mm in kan worden gedrukt en die tussen de vingers door loopt wanneer de hand wordt samengeknepen.",
  zeerSlapNEN5104:
    "Grond die zonder knijpen tussen de vingers door loopt. Een klasse onder de NEN 5104 procedure.",
  zeerStevigNEN5104:
    "Grond met de duimnagel in te drukken is. Een klasse onder de NEN 5104 procedure.",
  zeerStijf:
    "Grond waar nog net een kerf in kan worden gemaakt met de nagel van de duim. De grond kan niet meer worden vervormd en verkruimelt onder druk. Vaak is deze grond uitgedroogd. De grond heeft meestal een lichte kleur.",
};

/**
 * Get the Dutch description for a FineSoilConsistency code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtFineSoilConsistencyDescription(code: string): string | undefined {
  return BHRGT_FINE_SOIL_CONSISTENCY_CODES[code];
}
