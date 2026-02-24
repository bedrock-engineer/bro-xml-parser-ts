/**
 * Measurement data resolver for parsing embedded CSV in CPT XML
 */

import type {
  ResolverContext,
  CPTMeasurement,
  DissipationTest,
  DissipationMeasurement,
} from "../types/index.js";
import { BROParseError } from "../types/index.js";
import { SENTINEL } from "./constants.js";

/**
 * Parse CPT measurement data from embedded CSV
 *
 * The CPT XML contains measurement data as CSV text embedded in the values element.
 * The structure is:
 * - parameters: defines which columns are included (ja/nee flags)
 * - encoding: defines CSV delimiters
 * - values: actual CSV data with all columns (we select only "ja" columns)
 */
export function processCPTResult(
  _value: string | null,
  context: ResolverContext,
): Array<CPTMeasurement> {
  const { element, adapter, namespaces } = context;

  const encodingNode = adapter.evaluateXPath(
    element,
    ".//swe:encoding/swe:TextEncoding",
    (prefix) => (prefix ? (namespaces[prefix] ?? null) : null),
  );

  if (!encodingNode) {
    throw new BROParseError("Missing encoding information", {
      code: "MISSING_ENCODING",
      xpath: ".//swe:encoding/swe:TextEncoding",
    });
  }

  // Type guard: ensure we have an Element with getAttribute
  if (!("getAttribute" in encodingNode) || typeof encodingNode.getAttribute !== "function") {
    throw new BROParseError("Invalid encoding node - not an Element", {
      code: "INVALID_ENCODING_NODE",
      nodeType: encodingNode.nodeType,
    });
  }

  const encodingElement = encodingNode as Element;
  const delimiter = encodingElement.getAttribute("tokenSeparator") ?? ",";
  const blockSeparator = encodingElement.getAttribute("blockSeparator") ?? ";";
  const decimalSeparator = encodingElement.getAttribute("decimalSeparator") ?? ".";

  if (decimalSeparator !== ".") {
    console.warn(`Non-standard decimal separator: ${decimalSeparator} (expected ".")`);
  }

  // Get column definitions from parameters
  const parametersNode = adapter.evaluateXPath(element, ".//cptcommon:parameters", (prefix) =>
    prefix ? (namespaces[prefix] ?? null) : null,
  );

  if (!parametersNode) {
    throw new BROParseError("Missing parameters definition", {
      code: "MISSING_PARAMETERS",
      xpath: ".//cptcommon:parameters",
    });
  }

  // Extract column names and indices (dynamic detection)
  // Important: CSV contains ALL columns, we only read the ones marked "ja"
  const paramNodes = adapter.evaluateXPathAll(parametersNode, "./*", (prefix) =>
    prefix ? (namespaces[prefix] ?? null) : null,
  );

  const columns: Array<string> = [];
  const indices: Array<number> = [];

  paramNodes.forEach((node, i) => {
    // Type guard: ensure we have an Element with localName
    if (!("localName" in node) || !("textContent" in node)) {
      return; // Skip non-element nodes
    }

    const element = node as Element;
    const columnName = element.localName;
    const textContent = element.textContent;

    if (!columnName || !textContent) {
      return; // Skip nodes without name or content
    }

    const included = textContent.trim().toLowerCase() === "ja";

    if (included) {
      columns.push(columnName);
      indices.push(i);
    }
  });

  if (columns.length === 0) {
    throw new BROParseError("No columns marked as included", {
      code: "NO_COLUMNS",
      xpath: ".//cptcommon:parameters",
    });
  }

  // Get CSV data
  const valuesNode = adapter.evaluateXPath(element, ".//cptcommon:values", (prefix) =>
    prefix ? (namespaces[prefix] ?? null) : null,
  );

  if (!valuesNode) {
    throw new BROParseError("Missing measurement values", {
      code: "MISSING_VALUES",
      xpath: ".//cptcommon:values",
    });
  }

  const csvText = valuesNode.textContent?.trim();
  if (!csvText) {
    return [];
  }

  // Parse CSV rows
  const rows = csvText.split(blockSeparator).filter((r: string) => r.trim());

  return rows
    .map((row: string) => {
      const allValues = row.split(delimiter);
      const measurement: Record<string, number | null> = {};

      // Extract only the columns that are marked "ja"
      columns.forEach((col, index) => {
        const idx = indices[index];
        if (idx === undefined) {
          return;
        }
        const valueStr = allValues[idx];
        if (!valueStr) {
          return;
        }
        const value = parseFloat(valueStr);

        measurement[col] = value === SENTINEL || isNaN(value) ? null : value;
      });

      return measurement as CPTMeasurement;
    })
    .filter((m: CPTMeasurement) => {
      // Keep rows with at least some valid data
      // (filters out rows that are all nulls)
      return Object.values(m).some((v) => v !== null && v !== undefined);
    });
}

/**
 * Parse dissipation test data from CPT XML
 *
 * Dissipation tests are siblings of conePenetrationTest inside conePenetrometerSurvey.
 * Each test contains time-series pore pressure decay data at a specific depth.
 * CSV columns (fixed): elapsedTime, coneResistance, porePressureU1, porePressureU2, porePressureU3
 */
export function processDissipationTests(
  _value: string | null,
  context: ResolverContext,
): Array<DissipationTest> {
  const { element, adapter, namespaces } = context;
  const nsResolver = (prefix: string | null) => (prefix ? (namespaces[prefix] ?? null) : null);

  const testNodes = adapter.evaluateXPathAll(element, ".//cptcommon:dissipationTest", nsResolver);

  if (testNodes.length === 0) {
    return [];
  }

  return testNodes.map((testNode) => {
    // Extract penetration length
    const plNode = adapter.evaluateXPath(testNode, "cptcommon:penetrationLength", nsResolver);
    const penetrationLength = plNode?.textContent ? parseFloat(plNode.textContent) : 0;

    // Extract phenomenon time
    const timeNode = adapter.evaluateXPath(
      testNode,
      "om:phenomenonTime//gml:timePosition",
      nsResolver,
    );
    const phenomenonTime = timeNode?.textContent ? new Date(timeNode.textContent) : null;

    // Extract encoding
    const encodingNode = adapter.evaluateXPath(
      testNode,
      "cptcommon:disResult/swe:encoding/swe:TextEncoding",
      nsResolver,
    );

    let delimiter = ",";
    let blockSeparator = ";";

    if (
      encodingNode &&
      "getAttribute" in encodingNode &&
      typeof encodingNode.getAttribute === "function"
    ) {
      const el = encodingNode as Element;
      delimiter = el.getAttribute("tokenSeparator") ?? ",";
      blockSeparator = el.getAttribute("blockSeparator") ?? ";";
    }

    // Extract CSV values
    const valuesNode = adapter.evaluateXPath(
      testNode,
      "cptcommon:disResult/cptcommon:values",
      nsResolver,
    );

    const csvText = valuesNode?.textContent?.trim();
    if (!csvText) {
      return { penetrationLength, phenomenonTime, measurements: [] };
    }

    const measurements: Array<DissipationMeasurement> = csvText
      .split(blockSeparator)
      .filter((r: string) => r.trim())
      .map((row: string) => {
        const vals = row.split(delimiter);
        const toNum = (s: string | undefined): number | null => {
          if (!s) {
            return null;
          }
          const n = parseFloat(s);
          return n === SENTINEL || isNaN(n) ? null : n;
        };
        return {
          elapsedTime: parseFloat(vals[0] ?? "0"),
          coneResistance: toNum(vals[1]),
          porePressureU1: toNum(vals[2]),
          porePressureU2: toNum(vals[3]),
          porePressureU3: toNum(vals[4]),
        };
      });

    return { penetrationLength, phenomenonTime, measurements };
  });
}
