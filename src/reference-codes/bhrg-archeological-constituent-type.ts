/**
 * ArcheologicalConstituentType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:ArcheologicalConstituentType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AArcheologicalConstituentType
 */

export const BHRG_ARCHEOLOGICAL_CONSTITUENT_TYPE_CODES: Record<string, string> = {
  aardewerk: "Aardewerk en fragmenten van aardewerk, bijvoorbeeld potscherven of pijpenkoppen.",
  baksteen: "Baksteen en fragmenten van baksteen.",
  botOnverbrand: "Bot en fragmenten van bot die niet verbrand en al dan niet bewerkt zijn.",
  botVerbrand: "Bot en fragmenten van bot die verbrand en al dan niet bewerkt zijn.",
  gebrokenKwarts:
    "Gebroken, hoekig gesteentegruis, enkele millimeters groot, dat herkend wordt als gebruikt voor de verschraling van klei voor het vervaardigen van keramische objecten, bijvoorbeeld potten.",
  glas: "Glas en glasscherven.",
  houtskoolBrokken: "Houtskoolresten die groter zijn dan 2 mm.",
  houtskoolSpikkels: "Houtskoolresten die kleiner zijn dan 2 mm.",
  metaal: "Metaalresten en metalen gebruiksvoorwerpen.",
  natuursteen:
    "Steen die herkend wordt als een door de mens behandeld of verwerkte brok gesteente.",
  verbrandeLeem: "Leem of klei die door blootstelling aan hitte geblakerd of gebakken is.",
  verbrandingsresten:
    "Minerale verbrandingsresten en amorfe bijproducten van verbranding of verbranding of verhitting die niet uit leem bestaan.",
  visrest: "Delen van vissen die door de mens gebruikt zijn als voedsel.",
  vuursteenBewerkt: "Vuursteenfragmenten die herkend worden als het product van bewerking.",
};

/**
 * Get the Dutch description for a ArcheologicalConstituentType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgArcheologicalConstituentTypeDescription(code: string): string | undefined {
  return BHRG_ARCHEOLOGICAL_CONSTITUENT_TYPE_CODES[code];
}
