/**
 * BRO Soil Color Utilities
 *
 * Maps Dutch BRO soil color names to hex color values.
 * Colors are based on Munsell soil color chart conversions.
 *
 * Color naming convention:
 * - licht* (light), standaard* (standard), donker* (dark)
 * - Base colors: Blauw, Bruin, Geel, Grijs, Groen, Olijf, Oranje, Rood
 * - Special: wit (white), zwart (black)
 *
 * @example
 * ```typescript
 * import { BRO_SOIL_COLORS, getSoilColor } from '@bedrock-engineer/bro-xml-parser';
 *
 * // Direct lookup
 * const hex = BRO_SOIL_COLORS['lichtBruin']; // '#b79a77'
 *
 * // Helper function (takes a coded colour value)
 * const color = getSoilColor(layer.colour); // '#b79a77'
 * const unknown = getSoilColor(null); // null
 * ```
 */

import type { Coded } from "./core/producer.js";

/**
 * BRO soil color name to hex color mapping
 *
 * Based on Munsell soil color chart averages as defined in the BRO standard.
 */
export const BRO_SOIL_COLORS: Record<string, string> = {
  // Blues (Blauw)
  lichtBlauw: "#96abbc",
  standaardBlauw: "#6c718a",
  donkerBlauw: "#534350",

  // Browns (Bruin)
  lichtBruin: "#b79a77",
  standaardBruin: "#896748",
  donkerBruin: "#5b422d",

  // Yellows (Geel)
  lichtGeel: "#ddd1af",
  standaardGeel: "#d0a55b",
  donkerGeel: "#b18f40",

  // Grays (Grijs)
  lichtGrijs: "#adb1a3",
  standaardGrijs: "#84857a",
  donkerGrijs: "#56564d",

  // Greens (Groen)
  lichtGroen: "#8cab94",
  standaardGroen: "#5e8269",
  donkerGroen: "#3d4f44",

  // Olives (Olijf)
  lichtOlijf: "#938e63",
  standaardOlijf: "#787049",
  donkerOlijf: "#525134",

  // Oranges (Oranje) - estimated from Munsell descriptions
  lichtOranje: "#e8c89a",
  standaardOranje: "#d9a870",
  donkerOranje: "#c48b50",

  // Reds (Rood)
  lichtRood: "#bc9183",
  standaardRood: "#b37c67",
  donkerRood: "#5f3633",

  // Black & White
  wit: "#ddd2ca",
  zwart: "#3a3a31",

  // Simple colors (IMBRO/A - NEN5104Synthetisch, no intensity modifier)
  // Map to standard intensity as reasonable default
  blauw: "#6c718a",
  bruin: "#896748",
  geel: "#d0a55b",
  grijs: "#84857a",
  groen: "#5e8269",
  olijf: "#787049",
  oranje: "#d9a870",
  paars: "#8070a0", // Purple - estimated
  rood: "#b37c67",
};

/**
 * Normalized lookup map (lowercase keys for case-insensitive matching)
 */
const normalizedColorMap: Record<string, string> = Object.fromEntries(
  Object.entries(BRO_SOIL_COLORS).map(([key, value]) => [key.toLowerCase(), value]),
);

/**
 * Get the hex color for a BRO soil colour code.
 *
 * @param colour - A coded colour value (e.g. `layer.colour`), or `null`/`undefined`
 * @returns Hex color string, or `null` if the code is absent or not recognised
 *
 * @example
 * ```typescript
 * getSoilColor(layer.colour);                       // '#b79a77'
 * getSoilColor({ code: 'lichtBruin', codeSpace }); // '#b79a77'
 * getSoilColor(null);                               // null
 * ```
 */
export function getSoilColor(colour: Coded | null | undefined): string | null;
/**
 * Get the hex color for a BRO soil colour code, falling back to a default.
 *
 * @param colour - A coded colour value, or `null`/`undefined`
 * @param defaultColor - Fallback color returned when the code is absent or unknown
 * @returns Hex color string, or `defaultColor` if the code is absent or unknown
 *
 * @example
 * ```typescript
 * getSoilColor(null, '#808080'); // '#808080'
 * ```
 */
export function getSoilColor(colour: Coded | null | undefined, defaultColor: string): string;
export function getSoilColor(colour: Coded | null | undefined, defaultColor?: string): string | null {
  const normalized = colour?.code.toLowerCase();
  return (normalized ? normalizedColorMap[normalized] : undefined) ?? defaultColor ?? null;
}

/**
 * Check if a color name is a valid BRO soil color
 *
 * @param colorName - Color name to validate
 * @returns true if the color name is recognized
 */
export function isValidSoilColor(colorName: string): boolean {
  return colorName.toLowerCase() in normalizedColorMap;
}

/**
 * Get all available BRO soil color names
 *
 * @returns Array of color names in their canonical form
 */
export function getSoilColorNames(): Array<string> {
  return Object.keys(BRO_SOIL_COLORS);
}
