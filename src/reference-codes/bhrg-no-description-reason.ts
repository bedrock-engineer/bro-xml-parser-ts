/**
 * NoDescriptionReason codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:NoDescriptionReason
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ANoDescriptionReason
 */

export const BHRG_NO_DESCRIPTION_REASON_CODES: Record<string, string> = {
  antropogeenVerstoord:
    "Het interval is niet beschreven omdat de laagopbouw verstoord is door de mens. Het interval bestaat uit materiaal dat door de mens is neergelegd of uit natuurlijke grond waarvan de samenhang door de mens volledig is verstoord.",
  beschrijvingOnvoldoende:
    "Het interval is zeer summier beschreven en voldoet niet aan de eisen van de beschrijfkwaliteit van het boorprofiel.",
  geenMonster: "Het interval is niet beschreven omdat de monsters niet meer voorhanden waren.",
  geenOpbrengst:
    "Het interval is niet beschreven omdat de monstercontainer voor een deel leeg was (of omdat een deel van interval dat continu gestoken had moeten worden, niet helemaal bemonsterd kon worden). Het ?lege? deel wordt altijd vastgelegd als diepste deel van een interval.",
  geenOpdracht: "Het interval is niet beschreven omdat het was uitgesloten van de opdracht.",
  geenVasteOndergrond:
    "Het interval is niet beschreven omdat er een holte in de ondergrond was (al dan niet opgevuld met water).",
  mechanischVerstoord:
    "Het interval is niet beschreven omdat de laagopbouw ernstig verstoord is door een post-sedimentaire discontinuïteit.",
  naval: "Het interval is niet beschreven omdat het aanwezige materiaal als naval is beschouwd.",
  onbekend: "De reden waarom het interval niet is beschreven is niet bekend.",
  proefstukUitgenomen:
    "Het interval is niet beschreven omdat een proefstuk is uitgenomen voor boormonsteranalyse dat de volledige doorsnede van het monster beslaat en er onvoldoende materiaal was om het op de juiste wijze te beschrijven.",
};

/**
 * Get the Dutch description for a NoDescriptionReason code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgNoDescriptionReasonDescription(code: string): string | undefined {
  return BHRG_NO_DESCRIPTION_REASON_CODES[code];
}
