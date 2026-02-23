/**
 * HorizonCode codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:HorizonCode
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AHorizonCode
 */

export const BHRG_HORIZON_CODE_CODES: Record<string, string> = {
  A: "Een horizont waarin de organische stof geheel of vrijwel geheel is omgezet (niet meer herkenbaar als resten van planten en dieren). Kenmerken niet nader gespecificeerd.",
  AB: "Geleidelijke overgang van een A- naar een B-horizont, van minerale samenstelling, waarin de organische stof geheel of vrijwel geheel is omgezet. Kenmerken niet nader gespecificeerd.",
  AC: "Geleidelijke overgang van een A- naar een C-horizont, met een minerale of moerige samenstelling. Kenmerken niet nader gespecificeerd.",
  AE: "Geleidelijke overgang van een A- naar een E-horizont, van minerale samenstelling, waarin de organische stof geheel of vrijwel geheel is omgezet en door het verticaal (soms lateraal) uitspoelen is verarmd aan kleimineralen en/of sesquioxyden. Kenmerken niet nader gespecificeerd.",
  B: "Een minerale (soms moerige) inspoelingshorizont. Kenmerken niet nader gespecificeerd.",
  BC: "Geleidelijke overgang van een B- naar een C-horizont, met minerale samenstelling. Kenmerken niet nader gespecificeerd.",
  C: "Een moerige of minerale laag (vast gesteente uitgezonderd), die weinig of niet is veranderd door bodemvormende processen die een O-, A-, E- en B-horizont zouden kunnen doen ontstaan. Kenmerken niet nader gespecificeerd.",
  E: "Een minerale horizont die door het verticaal (soms lateraal) uitspoelen is verarmd aan kleimineralen en/of sesquioxyden. Meestal heeft de E-horizont een lager humusgehalte dan de erboven liggende horizont. Deze eluviale horizont (vandaar de E) heet ook wel uitspoelingshorizont. Kenmerken niet nader gespecificeerd.",
  EB: "Geleidelijke overgang van een E- naar een B-horizont, met een minerale samenstelling, deels verarmd door uitspoeling van kleimineralen en/of sesquioxyden. Kenmerken niet nader gespecificeerd.",
  O: "Een moerige horizont, die boven een A- of een E-horizont ligt en die bestaat uit in een aeroob milieu opgehoopte resten van voornamelijk bovengrondse plantendelen in verschillende stadia van omzetting (strooisellaag). Kenmerken niet nader gespecificeerd.",
};

/**
 * Get the Dutch description for a HorizonCode code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgHorizonCodeDescription(code: string): string | undefined {
  return BHRG_HORIZON_CODE_CODES[code];
}
