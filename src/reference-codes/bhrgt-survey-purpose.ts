/**
 * SurveyPurpose codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:SurveyPurpose
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ASurveyPurpose
 */

export const BHRGT_SURVEY_PURPOSE_CODES: Record<string, string> = {
  bouwwerk:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen van de ondergrond te bepalen die voor gebouwen, kunstwerken die deel uitmaken van de wegen, waterwegen en spoorwegen en andere bouwwerken van belang zijn. Het accent ligt veelal op onderzoek voor de berekening van de fundering. ",
  controleOnderzoek:
    "Onderzoek met als doel om vast te stellen of er als het gevolg van werkzaamheden veranderingen in de ondergrond zijn opgetreden. Dit onderzoek heeft veelal een lokaal karakter. Voorafgaand aan de werkzaamheden is ook onderzoek gedaan en dat geldt als referentie. ",
  detectieObstakels:
    "Onderzoek naar de diepte en ligging van obstakels in de ondergrond (natuurlijk of door de mens gemaakt).",
  gevoeligheidsOnderzoek:
    "Onderzoek met als doel de aardbevingsgevoeligheid, trillingsgevoeligheid of erosiegevoeligheid van de ondergrond te bepalen.",
  grondwaterput:
    "Onderzoek voor de aanleg van grondwatermonitoringputten of grondwatergebruiksystemen. ",
  hydrologischeVerkenning:
    "Onderzoek met als hoofddoel de geohydrologische eigenschappen van de ondergrond te bepalen ten behoeve van bronbemaling, grondwateronttrekking, waterinfiltratie of peilbeheer.",
  infrastructuurLand:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen van de ondergrond te bepalen voor de aanleg en het onderhoud van wegen, spoorwegen, fiets- en voetpaden.",
  infrastructuurWater:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen van de ondergrond te bepalen voor de aanleg en het onderhoud van waterwegen.",
  kabelsLeidingen:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen van de ondergrond te bepalen voor de aanleg en het onderhoud van kabels en leidingen.",
  monitoring:
    "Onderzoek met als doel het beoordelen van veranderingen in de toestand van de ondergrond die het gevolg zijn van natuurlijke of door de mens in gang gezette processen of herhaaldelijk optredende gebeurtenissen; voorbeelden zijn bodemdaling, verdroging, trillingen en aardbevingen.",
  onbekend: "Het doel waarvoor het onderzoek is uitgevoerd is niet bekend.",
  ontgronding:
    "Onderzoek ten behoeve van ontgrondingen (bijvoorbeeld zandwinning, grindwinning, baggeren).",
  verkennendOnderzoek: "Verkennend geotechnisch onderzoek.",
  waterkering:
    "Onderzoek met als hoofddoel de geotechnische eigenschappen te bepalen voor de aanleg en het onderhoud alsmede beoordeling van dijken en dammen.",
};

/**
 * Get the Dutch description for a SurveyPurpose code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtSurveyPurposeDescription(code: string): string | undefined {
  return BHRGT_SURVEY_PURPOSE_CODES[code];
}
