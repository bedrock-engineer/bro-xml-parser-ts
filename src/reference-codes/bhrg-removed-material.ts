/**
 * RemovedMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:RemovedMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ARemovedMaterial
 */

export const BHRG_REMOVED_MATERIAL_CODES: Record<string, string> = {
  antropogeenNietStenigBestanddeel:
    "Voorafgaand aan de bepaling is niet-stenig antropogeen materiaal verwijderd.",
  antropogeenStenigBestanddeel:
    "Voorafgaand aan de bepaling is stenig antropogeen materiaal verwijderd en dat is licht stenig ophoogmateriaal, puin, stenen, verbrandingsresten en wegverhardingsmateriaal.",
  botresten:
    "Er is voorafgaand aan de bepaling zijn botten, of resten daarvan, afkomstig van gewervelde dieren of mensen verwijderd.",
  geen: "Er is voorafgaand aan de bepaling geen materiaal verwijderd.",
  grind: "Voorafgaand aan de bepaling is grind en grover materiaal verwijderd.",
  houtskool:
    "Voorafgaand aan de bepaling zijn door verbranding verkoolde resten van hout verwijderd.",
  ijzerconcreties:
    "Voorafgaand aan de bepaling zijn korrels of brokken samengesteld materiaal van neergeslagen ijzerverbindingen in een matrix van zand en/of grind, klei of silt, verwijderd.",
  kalkconcreties:
    "Voorafgaand aan de bepaling zijn concreties die door carbonaat tot een geheel zijn verkit verwijderd.",
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
export function getBhrgRemovedMaterialDescription(code: string): string | undefined {
  return BHRG_REMOVED_MATERIAL_CODES[code];
}
