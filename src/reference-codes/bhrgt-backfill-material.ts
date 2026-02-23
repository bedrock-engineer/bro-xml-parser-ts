/**
 * BackfillMaterial codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:BackfillMaterial
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ABackfillMaterial
 */

export const BHRGT_BACKFILL_MATERIAL_CODES: Record<string, string> = {
  bentoniet: "Een mengsel van water en bentoniet.",
  geen: "Er is geen materiaal gebruikt. Het gat is mogelijk vanzelf volgelopen met materiaal dat uit het gat of van het maaiveld afkomstig is.",
  grind:
    "Grind dat gezeefd is en uit korrels bestaat met een grootte die tussen 2 en 6,3 mm ligt. ",
  grindZand:
    "Een mengsel van zand en grind dat gezeefd is en uit korrels bestaat met een grootte die tussen 63 µm en 6,3 mm ligt. ",
  grindZandGrof:
    "Een mengsel van zand en grind dat gezeefd is en uit korrels bestaat met een grootte die tussen 0,63 en 6,3 mm ligt. ",
  grindZandOngezeefd:
    "Een mengsel van zand en grind dat niet gezeefd is. Deze categorie omvat onder meer materiaal dat wordt aangeduid met termen als metselzand en ophoogzand. ",
  grout: "Een mengsel van cement en water zonder toeslag.",
  groutBentoniet: "Een mengsel van cement en water met als toeslag bentoniet.",
  kleiZwelklasse1:
    "Korrels die bestaan uit klei met een zwelvermogen van minimaal 80% in zout water (NaCl 10000 mg/l) en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is geen detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-B en wordt gebruikt onder omstandigheden die hoge eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasse1Detecteerbaar:
    "Korrels die bestaan uit klei met een zwelvermogen van minimaal 80% in zout water (NaCl 10000 mg/l) en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is een detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-B en wordt gebruikt onder omstandigheden die hoge eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasse2:
    "Korrels die bestaan die bestaan uit klei met een zwelvermogen van minimaal 30% in zout water (NaCl 10 000 mg/l) en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is geen detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-300 en wordt gebruikt onder omstandigheden die standaard eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasse2Detecteerbaar:
    "Korrels die bestaan uit klei met een zwelvermogen van minimaal 30% in zout water (NaCl 10 000 mg/l) en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is een detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-300 en wordt gebruikt onder omstandigheden die standaard eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasse3:
    "Korrels die bestaan uit klei met een zwelvermogen van minimaal 30% in demi water en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is geen detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-00 en wordt gebruikt onder omstandigheden die lage eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasse3Detecteerbaar:
    "Korrels die bestaan uit klei met een zwelvermogen van minimaal 30% in demi water en met een doorlatendheid die kleiner is dan 10-9 m/s. Aan dit materiaal is een detecteerbare stof toegevoegd. Het materiaal is vergelijkbaar met Mikolit-00 en wordt gebruikt onder omstandigheden die lage eisen stellen aan het waterkerend vermogen.",
  kleiZwelklasseOnbekend:
    "Korrels die bestaan uit klei met een onbekend zwelvermogen. Aan dit materiaal is geen detecteerbare stof toegevoegd. ",
  kleiZwelklasseOnbekendDetecteerbaar:
    "Korrels die bestaan uit klei met een onbekend zwelvermogen, met een toevoeging van een detecteerbare stof.",
  verwijderdMateriaal: "Het gat is opgevuld met de opgeboorde grond of de weggegraven ondergrond.",
  wegverhardingsmateriaal:
    "Materiaal dat gebruikt is voor het verharden van wegen en erven; voorbeelden zijn asfalt, betonklinkers, klinkers, steenslag en tegels.",
  zand: "Zand dat gezeefd is en uit korrels bestaat met een grootte die tussen 63 µm en 2 mm ligt. ",
  zandGrof:
    "Zand dat gezeefd is en uit korrels bestaat met een grootte die tussen 0,63 en 2 mm ligt. ",
  zandMiddelgrof:
    "Zand dat gezeefd is en uit korrels bestaat met een grootte die tussen 0,2 en 0,63 mm ligt.",
  zandMiddelgrofGrof:
    "Zand dat gezeefd is en uit korrels bestaat met een grootte die tussen 0,2 en 2 mm ligt. ",
};

/**
 * Get the Dutch description for a BackfillMaterial code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtBackfillMaterialDescription(code: string): string | undefined {
  return BHRGT_BACKFILL_MATERIAL_CODES[code];
}
