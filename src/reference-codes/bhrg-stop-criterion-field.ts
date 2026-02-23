/**
 * StopCriterionField codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:StopCriterionField
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AStopCriterionField
 */

export const BHRG_STOP_CRITERION_FIELD_CODES: Record<string, string> = {
  beperkingTechnisch:
    "De veldactiviteit is voortijdig gestopt vanwege beperkingen van het gebruikte apparaat.",
  einddoel:
    "Het vooraf gestelde doel van de veldactiviteit is bereikt; vaak is dat de beoogde einddiepte.",
  obstakel:
    "De veldactiviteit is voortijdig gestopt omdat op een niet nader omschreven obstakel is gestuit.",
  obstakelConstructie:
    "De veldactiviteit is voortijdig gestopt omdat op een deel van een constructie is gestuit; voorbeelden zijn resten van een bouwwerk, een rioolbuis.",
  obstakelGrindStenen:
    "De veldactiviteit is voortijdig gestopt omdat op grind, zeer grove grond of stenen is gestuit.",
  obstakelIJzervloer:
    "De veldactiviteit is voortijdig gestopt omdat op een ijzervloer, ofwel een laag ijzeroer, is gestuit.",
  obstakelPuin: "De veldactiviteit is voortijdig gestopt omdat op puin is gestuit.",
  obstakelVastGesteente:
    "De veldactiviteit is voortijdig gestopt omdat het vast gesteente is bereikt.",
  onbekend: "Het onderzoek is voortijdig gestopt. De reden is niet bekend.",
  risico:
    "De veldactiviteit is voortijdig gestopt omdat er niet veilig verder gewerkt kan worden vanwege een niet nader omschreven risico.",
  risicoGrondwaterdruk:
    "De veldactiviteit is voortijdig gestopt omdat de grondwaterdruk te hoog is om veilig verder te kunnen werken.",
  risicoWerkwaterverlies:
    "De veldactiviteit is voortijdig gestopt omdat het werkwater zeer snel wegstroomde.",
  storing:
    "De veldactiviteit is voortijdig gestopt omdat er een organisatorisch of technisch probleem is opgetreden.",
};

/**
 * Get the Dutch description for a StopCriterionField code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgStopCriterionFieldDescription(code: string): string | undefined {
  return BHRG_STOP_CRITERION_FIELD_CODES[code];
}
