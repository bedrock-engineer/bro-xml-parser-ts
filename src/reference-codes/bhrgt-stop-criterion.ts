/**
 * StopCriterion codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:StopCriterion
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStopCriterion
 */

export const BHRGT_STOP_CRITERION_CODES: Record<string, string> = {
  beperkingTechnisch:
    "Het boren is voortijdig gestopt vanwege de beperkingen van het gebruikte apparaat.",
  einddoel:
    "Het vooraf gestelde doel van het onderzoek is bereikt; vaak is dat de beoogde einddiepte.",
  obstakelConstructie:
    "Het onderzoek is voortijdig gestopt omdat de boor op een deel van een constructie is gestuit; voorbeelden zijn resten van een bouwwerk, een rioolbuis. ",
  obstakelGrindStenen:
    "Het onderzoek is voortijdig gestopt omdat op grind, zeer grove grond of stenen is gestuit.",
  obstakelIJzervloer:
    "Het onderzoek is voortijdig gestopt omdat op een ijzervloer, ofwel een laag ijzeroer, is gestuit.",
  obstakelOnbekend:
    "Het onderzoek is voortijdig gestopt omdat op een niet nader omschreven obstakel is gestuit.",
  obstakelPuin: "Het onderzoek is voortijdig gestopt omdat op puin is gestuit.",
  obstakelVastGesteente: "Het onderzoek is voortijdig gestopt omdat het vast gesteente is bereikt.",
  onbekend: "Het onderzoek is voortijdig gestopt. De reden is niet bekend.",
  risico:
    "Het onderzoek is voortijdig gestopt omdat er niet veilig verder geboord kan worden vanwege een niet nader omschreven risico.",
  risicoGrondwaterdruk:
    "Het onderzoek is voortijdig gestopt omdat de grondwaterdruk te hoog is om veilig verder te kunnen boren.",
  storingOrganisatorisch:
    "Het onderzoek is voortijdig gestopt omdat er een organisatorisch probleem is opgetreden. ",
  storingTechnisch:
    "Het onderzoek is voortijdig gestopt omdat er een technisch probleem is opgetreden.",
  werkwaterverlies:
    "Het onderzoek is voortijdig gestopt omdat het werkwater zeer snel wegstroomde.",
};

/**
 * Get the Dutch description for a StopCriterion code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStopCriterionDescription(code: string): string | undefined {
  return BHRGT_STOP_CRITERION_CODES[code];
}
