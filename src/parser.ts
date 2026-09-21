/**
 * BRO Parser - Main parser class
 *
 * Uses dependency injection to work with any XMLAdapter implementation.
 * The adapter is provided at construction time, making testing and
 * environment-specific behavior explicit.
 */

import { SchemaParser } from "./core/schema-parser.js";
import {
  detectAndValidateVersion,
  getVersionInfo,
  type VersionDetectionResult,
} from "./core/version-detector.js";
import { CPT_PRODUCER } from "./schemas/cpt-schema.js";
import { BORE_PRODUCER } from "./schemas/bore-schema.js";
import { BHRG_PRODUCER } from "./schemas/bhrg-schema.js";
import { GMW_PRODUCER } from "./schemas/gmw-schema.js";
import { GLD_PRODUCER } from "./schemas/gld-schema.js";
import { BRO_NAMESPACES } from "./namespaces.js";
import type {
  XMLAdapter,
  Namespaces,
  CPTData,
  BHRGTData,
  BHRGData,
  GMWData,
  GLDData,
  BROData,
  ParseMeta,
  BROFileType,
} from "./types/index.js";
import { BROParseError } from "./types/index.js";
import { object_ } from "./core/producer.js";
import type { Producer, ProducedFields, Presence } from "./core/producer.js";

/**
 * Main BRO Parser class
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from '@bedrock-engineer/bro-xml-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 *
 * // Check for warnings
 * if (cptData.meta.warnings.length > 0) {
 *   console.warn('Parse warnings:', cptData.meta.warnings);
 * }
 * ```
 */
export class BROParser {
  private adapter: XMLAdapter;
  private parser: SchemaParser;

  /**
   * Create a BRO parser instance
   *
   * @param adapter - XML adapter for the target environment (browser/Node.js)
   * @param namespaces - Optional namespace overrides (defaults to BRO_NAMESPACES)
   */
  constructor(adapter: XMLAdapter, namespaces?: Namespaces) {
    this.adapter = adapter;
    this.parser = new SchemaParser(adapter, namespaces ?? BRO_NAMESPACES);
  }

  /**
   * Create ParseMeta from version detection result
   */
  private createMeta(versionResult: VersionDetectionResult): ParseMeta {
    // Log warnings to console
    for (const warning of versionResult.warnings) {
      console.warn(`[BROParser] ${warning}`);
    }

    return {
      schemaVersion: versionResult.version,
      schemaNamespace: versionResult.namespace,
      dataType: versionResult.dataType,
      warnings: versionResult.warnings,
    };
  }

  /**
   * Parse CPT data from BRO/XML string
   *
   * Extracts all 41 metadata fields and measurement data following
   * the IMBRO CPT schema (dscpt/1.1).
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed CPT data with metadata and measurements
   * @throws {BROParseError} If parsing fails or required fields are missing
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const cptData = parser.parseCPT(xmlString);
   *
   * console.log(cptData.broId);              // "CPT000000155283"
   * console.log(cptData.finalDepth);          // 10.5
   * console.log(cptData.data.length);          // 525 measurements
   * console.log(cptData.data[0].coneResistance); // 1.234
   * console.log(cptData.meta.schemaVersion);   // "1.1"
   * ```
   */
  parseCPT(xmlText: string): CPTData {
    const doc = this.adapter.parseXML(xmlText);

    const versionResult = detectAndValidateVersion(doc, "CPT");
    const meta = this.createMeta(versionResult);

    const { value, warnings } = this.parser.produce(doc, CPT_PRODUCER, "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Parse Bore (borehole) data from BRO/XML string
   *
   * Extracts metadata and layer information following
   * the IMBRO Bore schema (dsbhr-gt/2.1).
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed BHR-GT data with metadata and soil layers
   * @throws {BROParseError} If parsing fails or required fields are missing
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const BHRGTData = parser.parseBHRGT(xmlString);
   *
   * console.log(BHRGTData.broId);              // "BHR000000123456"
   * console.log(BHRGTData.finalBoreDepth);    // 5.5
   * console.log(BHRGTData.data.length);         // 8 layers
   * console.log(BHRGTData.data[0].geotechnicalSoilName); // "zand"
   * console.log(BHRGTData.meta.schemaVersion);  // "2.1"
   * ```
   */
  parseBHRGT(xmlText: string): BHRGTData {
    const doc = this.adapter.parseXML(xmlText);

    const versionResult = detectAndValidateVersion(doc, "BHR-GT");
    const meta = this.createMeta(versionResult);

    const { value, warnings } = this.parser.produce(doc, BORE_PRODUCER, "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Parse BHR-G (Geological Borehole) data from BRO/XML string
   *
   * Extracts metadata and layer information following
   * the IMBRO BHR-G schema (dsbhrg/3.1).
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed BHR-G data with metadata and soil layers
   * @throws {BROParseError} If parsing fails or required fields are missing
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const BHRGData = parser.parseBHRG(xmlString);
   *
   * console.log(BHRGData.broId);              // "BHR000000123456"
   * console.log(BHRGData.finalBoreDepth);    // 3.0
   * console.log(BHRGData.data.length);         // 5 layers
   * console.log(BHRGData.data[0].soilNameNEN5104); // "zwakZandigeKlei"
   * console.log(BHRGData.meta.schemaVersion);  // "3.1"
   * ```
   */
  parseBHRG(xmlText: string): BHRGData {
    const doc = this.adapter.parseXML(xmlText);

    const versionResult = detectAndValidateVersion(doc, "BHR-G");
    const meta = this.createMeta(versionResult);

    const { value, warnings } = this.parser.produce(doc, BHRG_PRODUCER, "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Parse GMW (groundwater monitoring well) data from BRO/XML string
   *
   * Extracts well metadata and its monitoring tubes following the IMBRO GMW
   * schema (dsgmw/1.1). Works on the public dispatch document (`GMW_PPO`) as
   * well as the `GMW_PO` / `GMW_O` variants, which share one leaf surface.
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed GMW data with metadata and monitoring tubes
   * @throws {BROParseError} If parsing fails or required fields are missing
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const gmw = parser.parseGMW(xmlString);
   *
   * console.log(gmw.broId);                         // "GMW000000048066"
   * console.log(gmw.numberOfMonitoringTubes);       // 1
   * console.log(gmw.monitoringTubes[0].screenLength); // 1.0
   * console.log(gmw.meta.schemaVersion);            // "1.1"
   * ```
   */
  parseGMW(xmlText: string): GMWData {
    const doc = this.adapter.parseXML(xmlText);

    const versionResult = detectAndValidateVersion(doc, "GMW");
    const meta = this.createMeta(versionResult);

    const { value, warnings } = this.parser.produce(doc, GMW_PRODUCER, "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Parse GLD (groundwater level research) data from BRO/XML string
   *
   * Extracts the monitoring-point reference, monitoring-net membership and the
   * groundwater level observation time-series following the IMBRO GLD schema
   * (dsgld/1.0).
   *
   * Note: full GLD dispatch documents can be very large (years of time-series
   * measurements). Consider requesting a bounded observation period from the BRO
   * REST API before parsing.
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed GLD data with metadata and observation series
   * @throws {BROParseError} If parsing fails or required fields are missing
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const gld = parser.parseGLD(xmlString);
   *
   * console.log(gld.broId);                       // "GLD000000010000"
   * console.log(gld.monitoringPoint?.broId);      // "GMW000000020142"
   * console.log(gld.observations[0].points.length); // 8760
   * ```
   */
  parseGLD(xmlText: string): GLDData {
    const doc = this.adapter.parseXML(xmlText);

    const versionResult = detectAndValidateVersion(doc, "GLD");
    const meta = this.createMeta(versionResult);

    const { value, warnings } = this.parser.produce(doc, GLD_PRODUCER, "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Parse any BRO XML document, auto-detecting the data type
   *
   * This is the recommended entry point when you don't know the file type
   * in advance. The method detects the data type from the XML namespace
   * and calls the appropriate parser.
   *
   * @param xmlText - BRO/XML document as string
   * @returns Parsed data (CPTData, BHRGTData, or BHRGData)
   * @throws {BROParseError} If parsing fails or data type is unknown
   *
   * @example
   * ```typescript
   * const parser = new BROParser(new XMLAdapter());
   * const data = parser.parse(xmlString);
   *
   * // Use meta.dataType to discriminate
   * switch (data.meta.dataType) {
   *   case 'CPT':
   *     console.log(data.finalDepth);
   *     break;
   *   case 'BHR-GT':
   *   case 'BHR-G':
   *     console.log(data.finalBoreDepth);
   *     break;
   * }
   * ```
   */
  parse(xmlText: string): BROData {
    const doc = this.adapter.parseXML(xmlText);
    const versionInfo = getVersionInfo(doc);

    if (!versionInfo) {
      throw new BROParseError("Unable to detect BRO data type from XML document", {
        code: "UNKNOWN_DATA_TYPE",
      });
    }

    switch (versionInfo.type) {
      case "CPT":
        return this.parseCPT(xmlText);
      case "BHR-GT":
        return this.parseBHRGT(xmlText);
      case "BHR-G":
        return this.parseBHRG(xmlText);
      case "GMW":
        return this.parseGMW(xmlText);
      case "GLD":
        return this.parseGLD(xmlText);
    }
  }

  /**
   * Parse BRO XML with a custom schema for selective extraction
   *
   * This allows you to extract only the fields you need, which can be
   * more efficient and gives you full control over the output structure.
   *
   * Pass a bare map of field name → {@link Producer}, built from the `producers`
   * authoring surface. The return type is inferred from the map: each field's
   * type is its producer's output type, plus a `meta` block. Author the map as
   * an inline literal (or with `satisfies Record<string, Producer<unknown>>`) so
   * the field types are preserved for inference.
   *
   * @param xmlText - BRO/XML document as string
   * @param fields - Field name → producer map defining what to extract
   * @param dataType - The BRO data type (for version validation)
   * @returns Object with extracted fields matching your map, plus `meta`
   *
   * @example
   * ```typescript
   * import { BROParser, producers as p } from '@bedrock-engineer/bro-xml-parser';
   *
   * const parser = new BROParser(new XMLAdapter());
   *
   * // Define only the fields you need
   * const result = parser.parseCustom(xmlText, {
   *   id: p.text('brocom:broId'),                                       // string | null
   *   depth: p.number_('./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth'),
   *   location: p.gmlLocation('./dscpt:deliveredLocation/cptcommon:location'),
   * }, 'CPT');
   *
   * result.depth;    // number | null — inferred, no casts
   * result.location; // Location | null
   * ```
   */
  parseCustom<const F extends Record<string, Producer<unknown, Presence>>>(
    xmlText: string,
    fields: F,
    dataType?: BROFileType,
  ): ProducedFields<F> & { meta: ParseMeta } {
    const doc = this.adapter.parseXML(xmlText);

    // Validate version if dataType is provided
    let meta: ParseMeta;
    if (dataType) {
      const versionResult = detectAndValidateVersion(doc, dataType);
      meta = this.createMeta(versionResult);
    } else {
      // Auto-detect type
      const versionInfo = getVersionInfo(doc);
      if (versionInfo) {
        const versionResult = detectAndValidateVersion(doc, versionInfo.type);
        meta = this.createMeta(versionResult);
      } else {
        meta = {
          schemaVersion: "unknown",
          schemaNamespace: "unknown",
          dataType: "CPT", // fallback
          warnings: ["Could not detect BRO data type"],
        };
      }
    }

    const { value, warnings } = this.parser.produce(doc, object_({ fields }), "dispatchDocument");
    meta.warnings.push(...warnings);

    return { meta, ...value };
  }

  /**
   * Get the underlying XML adapter
   * (useful for advanced use cases or testing)
   */
  getAdapter(): XMLAdapter {
    return this.adapter;
  }
}
