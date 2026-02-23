/**
 * FineSoilConsistency codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:FineSoilConsistency
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AFineSoilConsistency
 */

export const BHRG_FINE_SOIL_CONSISTENCY_CODES: Record<string, string> = {
  hardNEN5104:
    "Grond waar met een mes in kan worden gesneden. Een klasse uit de indeling van Karim en de Ruyter (1993), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  matigSlapNEN5104:
    "Grond die bij knijpen nog goed tussen de vingers door loopt. Een klasse uit de indeling van De Bakker en Schelling (1966), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  matigStevigNEN5104:
    "Grond die met stevig knijpen nog juist tussen de vingers door te krijgen is. Een klasse uit de indeling van De Bakker en Schelling (1966), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  slap: "Grond waar een vinger tot 10 mm kan worden gedrukt en die met lichte druk van de vingers kan worden verkneed. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  slapNEN5104:
    "Grond die bij knijpen zeer gemakkelijk tussen de vingers door loopt. Een klasse uit de indeling van De Bakker en Schelling (1966), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  stevig:
    "Grond die met de duim gemakkelijk kan worden ingedrukt en niet met de vingers kan worden verkneed, maar wel tot 3 mm dikke strengen kan worden uitgerold zonder te breken of te verkruimelen. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  stevigNEN5104:
    "Grond die niet tussen de vingers door te krijgen is. Een klasse uit de indeling van De Bakker en Schelling (1966), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  stijf:
    "Grond waar met de duim een ondiepe voor in kan worden gemaakt en die verkruimelt en breekt wanneer de grond tot 3 mm dikke strengen wordt uitgerold, maar nog vochtig genoeg is om weer tot een bol te worden gekneed. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  zeerHardNEN5104:
    "Grond waar met een mes met moeite in kan worden gesneden. Een klasse uit de indeling van Karim en de Ruyter (1993), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  zeerSlap:
    "Grond waar een vinger gemakkelijk tot 25 mm in kan worden gedrukt en die tussen de vingers door loopt wanneer de hand wordt samengeknepen. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  zeerSlapNEN5104:
    "Grond die zonder knijpen tussen de vingers door loopt. Een klasse uit de indeling van De Bakker en Schelling (1966), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  zeerStevigNEN5104:
    "Grond met de duimnagel in te drukken is. Een klasse uit de indeling van Karim en de Ruyter (1993), gebruikt onder de Standaard Boor Beschrijvingsmethode tot en met versie 5.3.",
  zeerStijf:
    "Grond waar nog net een kerf in kan worden gemaakt met de nagel van de duim. De grond kan niet meer worden vervormd en verkruimelt onder druk. Vaak is deze grond uitgedroogd. De grond heeft meestal een lichte kleur. Een klasse onder de NEN-EN-ISO 14688 procedure.",
};

/**
 * Get the Dutch description for a FineSoilConsistency code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgFineSoilConsistencyDescription(code: string): string | undefined {
  return BHRG_FINE_SOIL_CONSISTENCY_CODES[code];
}
