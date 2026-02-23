/**
 * GravelProvenance codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:GravelProvenance
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AGravelProvenance
 */

export const BHRG_GRAVEL_PROVENANCE_CODES: Record<string, string> = {
  fluviatielEridanos:
    "Grind dat aangevoerd is door het Baltisch riviersysteem (Eridanos) en voornamelijk afkomstig is uit het Oostzeegebied. Kenmerkende grindsoorten zijn: zeer groot aandeel van heldere kwarts. Zeldzame gidssoorten zijn: verkiezelde fossielen en barnsteen.",
  fluviatielMaas:
    "Grind dat aangevoerd is door het Maas riviersysteem en voornamelijk afkomstig uit de Ardennen, Noord-Frankrijk en de Vogezen. Kenmerkende grindsoorten zijn: groot aandeel witte kwarts met in mindere mate heldere kwarts, gerolde vuursteen (ook wel Maas-eitjes), conglomeraat en kalksteen. Zeldzame gidssoorten zijn: Revinienkwartsiet en Vogezengraniet.",
  fluviatielNoordDuits:
    "Grind dat aangevoerd is door het Noord-Duits riviersysteem en voornamelijk afkomstig is uit de Noord-Duitse middengebergten. Kenmerkende veel voorkomende grindsoorten zijn: porfier, lydiet, rode zandsteen, witte en heldere kwarts. Een zeldzame gidssoort is: Thüringerwoudporfier.",
  fluviatielOostelijk:
    "Grind dat aangevoerd is uit oostelijke richting door het Baltisch riviersysteem (Eridanos)  of door het Noord-Duitse riviersysteem.",
  fluviatielRijnAlpien:
    "Grind dat aangevoerd is door het Alpiene Rijnsysteem en voornamelijk afkomstig is van het Rijn-Leisteenplateau. Kenmerkende grindsoorten zijn: porfier, rode ijzerkiezel, rode en groene zandsteen, kwartsiet.",
  fluviatielRijnPreAlpien:
    "Grind dat aangevoerd is door het pre-Alpiene Rijnsysteem. Kenmerkende grindsoorten zijn: groot aandeel witte kwarts met in mindere mate heldere kwarts. Een zeldzame gidssoort is: kiezeloöliet.",
  fluviatielSchelde:
    "Grind dat aangevoerd is door het Schelde systeem, afkomstig uit Midden België. Grindsamenstelling varieert maar bestaat voor het overgrote deel uit hoekige vuursteen en witte kwarts met in mindere mate heldere kwarts.",
  fluviatielZuidelijk:
    "Grind dat aangevoerd is uit zuidelijke richting door het riviersysteem van de Rijn  of door het riviersysteem van de Maas.",
  fluviatielZuidelijkEnGlaciaal:
    "Grind dat aangevoerd is uit zuidelijke richting gemengd met grind dat is aangevoerd  door landijs. Vaak is dit grind afkomstig van geërodeerde glaciale en zuidelijke afzettingen  en gezamenlijk afgezet. Het aandeel glaciaal en zuidelijk varieert maar beide zijn  goed herkenbaar.",
  glaciaal:
    "Grind dat aangevoerd is door het landijs vanuit Zweden, Finland, Denemarken en soms uit Noorwegen. Kenmerkende veel voorkomende grindsoorten zijn: graniet, niet-gerolde vuursteen en kalksteen. Zeldzame gidssoorten zijn Rapakivigraniet en Rhombenporfier.",
  nietBepaald: "De herkomst van het grind kon niet worden bepaald.",
};

/**
 * Get the Dutch description for a GravelProvenance code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgGravelProvenanceDescription(code: string): string | undefined {
  return BHRG_GRAVEL_PROVENANCE_CODES[code];
}
