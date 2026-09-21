/**
 * Type definitions for BRO/XML parser
 */

// The public data types are inferred from their Producer schemas — the schema is
// the single source of truth for both parsing and types (`import type` only, so
// this reads as an acyclic type-level dependency; erased at runtime).
import type { Produced } from "../core/producer.js";
import type { CPT_PRODUCER } from "../schemas/cpt-schema.js";
import type { BORE_PRODUCER } from "../schemas/bore-schema.js";
import type { BHRG_PRODUCER } from "../schemas/bhrg-schema.js";
import type { GMW_PRODUCER } from "../schemas/gmw-schema.js";
import type { GLD_PRODUCER } from "../schemas/gld-schema.js";

/**
 * Namespace mapping (prefix -> URI)
 */
export type Namespaces = Record<string, string>;

/**
 * Metadata about the parsed document
 *
 * Contains schema version information and any warnings
 * encountered during parsing.
 */
export interface ParseMeta {
  /**
   * Schema version detected in the document (e.g., "1.1", "2.0")
   */
  schemaVersion: string;

  /**
   * Full namespace URI of the schema
   */
  schemaNamespace: string;

  /**
   * Data type detected (CPT, BHR-GT, BHR-G, GMW, GLD)
   */
  dataType: "CPT" | "BHR-GT" | "BHR-G" | "GMW" | "GLD";

  /**
   * Warnings encountered during parsing
   *
   * Non-fatal issues like:
   * - Parsing with older/newer minor version than supported
   * - Optional fields with unexpected formats
   */
  warnings: Array<string>;
}

/**
 * XML adapter interface for cross-runtime compatibility
 */
export interface XMLAdapter {
  parseXML(xmlText: string): Document;
  evaluateXPath(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Node | null;
  evaluateXPathAll(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Array<Node>;
}

/**
 * BRO quality regime
 *
 * IMBRO: Strict regime for new data (all mandatory fields required)
 * IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
 */
export type QualityRegime = "IMBRO" | "IMBRO/A";

/**
 * Geographic location with coordinates and EPSG code
 */
export interface Location {
  x: number;
  y: number;
  epsg: string;
}

/**
 * CPT measurement row (dynamic fields based on parameters)
 * @internal
 */
export interface CPTMeasurement {
  // Always present
  penetrationLength: number;
  depth?: number;

  // Core measurements
  elapsedTime?: number;
  coneResistance: number | null;
  correctedConeResistance?: number | null;
  netConeResistance?: number | null;
  localFriction?: number | null;
  frictionRatio?: number | null;

  // Pore pressure
  porePressureU1?: number | null;
  porePressureU2?: number | null;
  porePressureU3?: number | null;
  poreRatio?: number | null;

  // Inclination
  inclinationX?: number | null;
  inclinationY?: number | null;
  inclinationEW?: number | null;
  inclinationNS?: number | null;
  inclinationResultant?: number | null;

  // Magnetic field
  magneticFieldStrengthX?: number | null;
  magneticFieldStrengthY?: number | null;
  magneticFieldStrengthZ?: number | null;
  magneticFieldStrengthTotal?: number | null;
  magneticInclination?: number | null;
  magneticDeclination?: number | null;

  // Other
  electricalConductivity?: number | null;
  temperature?: number | null;
}

/**
 * Single measurement row in a dissipation test (pore pressure decay over time)
 * @internal
 */
export interface DissipationMeasurement {
  elapsedTime: number;
  coneResistance: number | null;
  porePressureU1: number | null;
  porePressureU2: number | null;
  porePressureU3: number | null;
}

/**
 * Complete CPT data (metadata + measurements).
 *
 * Inferred from `CPT_PRODUCER`; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type CPTData = { meta: ParseMeta; alias?: string } & Produced<typeof CPT_PRODUCER>;

/**
 * Complete Bore data (metadata + layers).
 *
 * Represents BHR-GT-BMB (Boormonsterbeschrijving — visual/textural description);
 * laboratory analysis (BHR-GT-BMA) is the optional `analysis` field.
 *
 * Inferred from `BORE_PRODUCER`; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type BHRGTData = { meta: ParseMeta; alias?: string } & Produced<typeof BORE_PRODUCER>;

/**
 * Complete BHR-G (Geological Borehole) data (metadata + layers).
 *
 * Inferred from `BHRG_PRODUCER`; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type BHRGData = { meta: ParseMeta; alias?: string } & Produced<typeof BHRG_PRODUCER>;

/**
 * Union type for all BRO data types
 *
 * Use the `meta.dataType` field to discriminate between types:
 * ```typescript
 * const data = parser.parse(xmlText);
 * if (data.meta.dataType === 'CPT') {
 *   // data is CPTData
 * }
 * ```
 */
export type BROData = CPTData | BHRGTData | BHRGData | GMWData | GLDData;

/**
 * BRO file type identifier
 */
export type BROFileType = "CPT" | "BHR-GT" | "BHR-G" | "GMW" | "GLD";

// ===========================================================================
// GLD (Grondwaterstandonderzoek / groundwater level research, dsgld/1.0)
// ===========================================================================

/**
 * Complete GLD (groundwater level research) data.
 *
 * Inferred from `GLD_PRODUCER`; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type GLDData = { meta: ParseMeta; alias?: string } & Produced<typeof GLD_PRODUCER>;

// ===========================================================================
// GMW (Grondwatermonitoringput / Groundwater Monitoring Well, dsgmw/1.1)
// ===========================================================================

/**
 * Complete GMW (groundwater monitoring well) data.
 *
 * The registration object carries well-level metadata plus one or more
 * monitoring tubes. Inferred from `GMW_PRODUCER`; `meta` (parse
 * metadata) and the optional user-set `alias` are the only fields not produced
 * from the XML.
 */
export type GMWData = { meta: ParseMeta; alias?: string } & Produced<typeof GMW_PRODUCER>;

/**
 * Parse error with context
 */
export class BROParseError extends Error {
  public readonly code: string;
  public readonly details: Record<string, unknown>;

  constructor(message: string, details: { code: string; [key: string]: unknown }) {
    super(message);
    this.name = "BROParseError";
    this.code = details.code;
    this.details = details;
  }
}
