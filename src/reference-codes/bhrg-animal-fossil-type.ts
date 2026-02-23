/**
 * AnimalFossilType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:AnimalFossilType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AAnimalFossilType
 */

export const BHRG_ANIMAL_FOSSIL_TYPE_CODES: Record<string, string> = {
  balanus:
    "Resten van zeepokken, een groep van sedentair levende kreeftachtigen die met name in getijdengebieden leven en een kegelvormige, uit kalkplaatjes opgebouwde schaal vormen.",
  bryozoa:
    "Resten van bryozoa of mosdiertjes, een groep van sedentair levende, kolonievormende ongewervelde dieren die in brak- en zoutwater voorkomen. De individuen zijn typisch 0,5 mm groot en vormen een kalkig of hoornachtig skelet in de vorm van een bekertje of buisje.",
  ditrupa:
    "Fossiele resten van de schaal van een mariene borstelworm. De buisvormige schalen lopen enigszins spits toe en zijn licht gebogen. Vertonen een sterke gelijkenis met een slagtand van een olifant, vandaar de in de volksmond gehanteerde naam Olifantstandjes.",
  foraminifeer:
    "Resten van foraminiferen, eencellige mariene organismen die een veelal kalkig schaaltje vormen dat typisch in grootte varieert tussen 0,1 en 5 mm.",
  haaientand: "Haaientanden of de herkenbare resten daarvan, al dan niet gefossiliseerd.",
  lingula:
    "Schelpen of schelpresten van Lingula, een levend fossiel dat al sinds het Siluur of mogelijk ouder bestaat. Lingula komt tegenwoordig specifiek voor in brak water. De schelpen kunnen herkend worden aan de vorm en het ontbreken van groeven of tanden op de schalen die het sluiten van de schelphelften ondersteunen.",
  ostracode:
    "Schildjes van ostracoden, ook wel mosselkreeftjes, zijn gemaakt van chitine en meestal verkalkt. Variëren sterk in vorm en versiering met een grootte van meestal 0,1 tot 2 mm.",
  visrest:
    "Resten van wervels, graten of andere delen van vissen. Vaak donkerbruin tot zwart van kleur, relatief licht van gewicht (veel lichter dan bot).",
  zeeEgelEchinocardium:
    "Schalen of fragmenten van een soort uit het genus Echinocardium, een zee-egelgroep die veel voorkomt als gravende zee-egel. Een van de soorten is de Echinocardium cordatum, bekend als de zeeklit. Deze kan tot ongeveer 6 cm groot worden.",
  zeeEgelEchinocyamus:
    "Schalen of fragmenten van Echinocyamus pusillus, ook wel het zeeboontje genaamd, een vrij platte zee-egel uit de Noordzee met een maximale grootte van ongeveer 1 cm.",
  zeeEgelNietGespecificeerd:
    "Zee-egelschalen of fragmenten daarvan, niet toe te wijzen aan een specifieke soort.",
  zeeEgelStekel: "Zee-egelstekels of fragmenten daarvan.",
  zoogdiertand:
    "Fossiele of recente tanden of kiezen van zoogdieren, bijvoorbeeld muizen, koeien of mammoeten.",
};

/**
 * Get the Dutch description for a AnimalFossilType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgAnimalFossilTypeDescription(code: string): string | undefined {
  return BHRG_ANIMAL_FOSSIL_TYPE_CODES[code];
}
