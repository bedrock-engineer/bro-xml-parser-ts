/**
 * DeterminationProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DeterminationProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADeterminationProcedure
 */

export const BHRG_DETERMINATION_PROCEDURE_CODES: Record<string, string> = {
  EN15936v2012:
    "NEN-EN 15936:2012 Slib, behandeld biologisch afval, bodem en afval – Bepaling van de totale organische koolstof (TOC) door droge verbranding beschrijft de procedure voor het bepalen van het organisch koolstofgehalte. Een Europese norm geaccepteerd door Nederland.",
  GDNpraktijkrichtlijnv2023_waterdoorlatendheid:
    "Praktijkrichtlijn Geologische Dienst Nederland, versie 2023 beschrijft in het deel waterdoorlatendheid de procedure voor het bepalen van de verzadigde waterdoorlatendheid.",
  ISO13320v2009:
    "NEN-ISO 13320:2009 Analyse van de deeltjesgrootteverdeling - Methoden met laserdiffractie beschrijft de procedure voor het bepalen van de korrelgrootteverdeling door middel van laserdiffractie. Een internationale norm geaccepteerd door Nederland.",
  ISO14688d2v2019NEN8990v2020:
    "NEN-EN-ISO 14688-2:2019+NEN 8990:2020 Geotechnisch onderzoek en beproeving - Identificatie en classificatie van grond - Deel 2: Grondslagen voor een classificatie + NEN 8991:2020 Geotechnisch onderzoek en beproeving – Identificatie en classificatie van grond – Nederlandse aanvulling op NEN-EN-ISO 14688-2 beschrijft de zogenaamde classificatieproeven. De uitwerking van de bepaling van het organischestofgehalte en het kalkgehalte zijn in de Nederlandse bijlage opgenomen.",
  ISO15178v2000:
    "ISO 15178:2000 Soil quality - Determination of total sulfur by dry combustion beschrijft de procedure voor het bepalen van het zwavelgehalte.",
  ISO17892d11v2019:
    "NEN-EN 15936:2012 Slib, behandeld biologisch afval, bodem en afval - Bepaling van de totale organische koolstof door droge verbranding en beschrijft de procedure voor het bepalen van het organische koolstofgehalte.",
  ISO17892d1v2014:
    "NEN-EN-ISO 17892-1:2014 Geotechnisch onderzoek en beproeving - Beproeving van grond in het laboratorium - Deel 1: Bepaling van het watergehalte beschrijft de procedure voor het bepalen van het watergehalte door middel van drogen. Een internationale norm geaccepteerd door Europa en Nederland.",
  ISO17892d2v2014:
    "NEN-EN-ISO 17892-2:2014 Geotechnisch onderzoek en beproeving - Beproeving van grond in het laboratorium - Deel 2: Bepaling van de dichtheid van fijn korrelige grond beschrijft de procedure voor het bepalen van de volumieke massa en de droge volumieke massa. Een internationale norm geaccepteerd door Europa en Nederland.",
  ISO17892d3v2016:
    "NEN-EN-ISO 17892-3:2016 Geotechnisch onderzoek en beproeving - Beproeving van grond in het laboratorium - Deel 3: Bepaling van de dichtheid van gronddeeltjes beschrijft de procedure voor het bepalen van volumieke massa van de vaste delen met de gas- en vloeistofpyknometer. Een internationale norm geaccepteerd door Europa en Nederland.",
  ISO17892d4v2016:
    "NEN-EN-ISO 17892-4:2016 Geotechnisch onderzoek en beproeving - Beproeving van grond in het laboratorium - Deel 4: Bepaling van de korrelgrootte verdeling beschrijft de procedure voor het bepalen van de korrelgrootteverdeling van fracties door middel van natte zeving over de 63μm-zeef, droge zeving voor fracties groter dan 63 μm en voor de fracties kleiner dan 63 μm met de hydrometer en de pipetmethode. Een internationale norm geaccepteerd door Europa en Nederland.",
};

/**
 * Get the Dutch description for a DeterminationProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDeterminationProcedureDescription(code: string): string | undefined {
  return BHRG_DETERMINATION_PROCEDURE_CODES[code];
}
