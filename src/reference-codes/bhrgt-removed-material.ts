/**
 * RemovedMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:RemovedMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ARemovedMaterial
 */

export const BHRGT_REMOVED_MATERIAL_CODES: Record<string, string> = {
  antropogeenStenigBestanddeel:
    "Voorafgaand aan de bepaling is stenig antropogeen materiaal verwijderd en dat is licht stenig ophoogmateriaal, puin, stenen, verbrandingsresten en wegverhardingsmateriaal.",
  geen: "Er is voorafgaand aan de bepaling geen materiaal verwijderd.",
  grind: "Voorafgaand aan de bepaling is grind en grover materiaal verwijderd.",
  houtskool:
    "Voorafgaand aan de bepaling zijn door verbranding verkoolde resten van hout verwijderd.",
  kalkconcreties:
    "Voorafgaand aan de bepaling zijn concreties die door carbonaat tot een geheel zijn verkit verwijderd.",
  koolzureKalk:
    "Voorafgaand aan de bepaling van de korrelgrootteverdeling is de koolzure kalk verwijderd met HCl (0,2 M) en is het gehalte van de verwijderde kalk bepaald (Bepaling kalkgehalte).",
  organischeStof:
    "Voorafgaand aan de bepaling van de korrelgrootteverdeling is het organische stof verwijderd met H2O2 (20%) en is het gehalte van het verwijderde organische stof bepaald (Bepaling organischestofgehalte).",
  plantenrestenHoutig:
    "Voorafgaand aan de bepaling zijn houtige, onverteerde resten van planten, zoals stammen en takken verwijderd.",
  plantenrestenNietHoutig:
    "Voorafgaand aan de bepaling zijn niet-houtige, onverteerde resten van planten, zoals worteltjes, rietstengels en bladeren verwijderd.",
  schelpmateriaal: "Voorafgaand aan de bepaling zijn schelpen en resten van schelpen verwijderd.",
};

/**
 * Get the Dutch description for a RemovedMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtRemovedMaterialDescription(code: string): string | undefined {
  return BHRGT_REMOVED_MATERIAL_CODES[code];
}
