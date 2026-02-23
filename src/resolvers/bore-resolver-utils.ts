import type { XMLAdapter, Namespaces } from "../types/index.js";

type XPathTextGetter = (xpath: string) => string | null;
type NamespaceResolver = (prefix: string | null) => string | null;

/**
 * Creates a reusable namespace resolver function
 *
 * @param namespaces - Namespace mappings
 * @returns Resolver function for XPath namespace prefixes
 */
export function createNamespaceResolver(namespaces: Namespaces): NamespaceResolver {
  return (prefix: string | null) => (prefix ? (namespaces[prefix] ?? null) : null);
}

/**
 * Helper to get text content from a node
 *
 * @param node - XML node or null
 * @returns Trimmed text content or null
 */
export function getTextContent(node: Node | null): string | null {
  const trimmed = node?.textContent?.trim();
  return trimmed || null;
}

/**
 * Creates an XPath text getter bound to a specific context node
 *
 * This eliminates the need to create identical getText helper functions
 * in every determination parser.
 *
 * @param contextNode - Node to query from
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Function that gets text from XPath expressions
 *
 * @example
 * ```typescript
 * const getText = createXPathTextGetter(detNode, adapter, namespaces);
 * const procedure = getText('./bhrgtcom:determinationProcedure');
 * const method = getText('./bhrgtcom:determinationMethod');
 * ```
 */
export function createXPathTextGetter(
  contextNode: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): XPathTextGetter {
  const nsResolver = createNamespaceResolver(namespaces);

  return (xpath: string): string | null => {
    const node = adapter.evaluateXPath(contextNode, xpath, nsResolver);
    return getTextContent(node);
  };
}

/**
 * Find a child element using XPath
 *
 * @param parentNode - Parent node to search from
 * @param childPath - XPath to child element
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Child node or null if not found
 */
export function findChildElement(
  parentNode: Node,
  childPath: string,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): Node | null {
  const nsResolver = createNamespaceResolver(namespaces);
  return adapter.evaluateXPath(parentNode, childPath, nsResolver);
}

/**
 * Extract an array of typed objects from XPath results
 *
 * @param contextNode - Node to query from
 * @param xpathPattern - XPath expression to find array elements
 * @param mapFn - Function to transform each node into typed object
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Array of non-null results
 *
 * @example
 * ```typescript
 * const points = extractArray(
 *   detNode,
 *   './bhrgtcom:plasticityAtSpecificWaterContent',
 *   (node, getText) => ({
 *     waterContent: parseFloat(getText('./bhrgtcom:waterContent')),
 *     numberOfFalls: parseInt(getText('./bhrgtcom:numberOfFalls') ?? '0', 10)
 *   }),
 *   adapter,
 *   namespaces
 * );
 * ```
 */
export function extractArray<T>(
  contextNode: Node,
  xpathPattern: string,
  mapFn: (node: Node, getText: XPathTextGetter) => T | null,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): Array<T> {
  const nsResolver = createNamespaceResolver(namespaces);

  const nodes = adapter.evaluateXPathAll(contextNode, xpathPattern, nsResolver);

  const results: Array<T> = [];

  for (const node of nodes) {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    const result = mapFn(node, getText);

    if (result !== null) {
      results.push(result);
    }
  }

  return results;
}

/**
 * Configuration for optional layer fields
 */
interface OptionalLayerField<T> {
  /** XPath to the field element */
  xpath: string;
  /** Property name on the result object */
  key: keyof T;
  /** Optional transform function (defaults to returning trimmed text or null) */
  transform?: (text: string | null) => unknown;
  /**
   * If true, only set property when value is non-null/non-empty.
   * Used for truly optional properties like 'color' that should
   * not appear on the object if absent from XML.
   */
  omitIfEmpty?: boolean;
}

/**
 * Configuration for layer parser factory
 */
interface LayerParserConfig<T> {
  /** XPath to find layer elements */
  layerXPath: string;
  /** Configuration for required fields */
  requiredFields: {
    upperBoundary: string;
    lowerBoundary: string;
    soilName: string;
    soilNameKey: keyof T;
  };
  /** Configuration for optional fields */
  optionalFields: Array<OptionalLayerField<T>>;
  /**
   * Optional post-processing callback for each layer.
   * Called after basic fields are extracted, allows adding nested objects
   * or other complex fields that can't be expressed as simple XPath extractions.
   */
  postProcess?: (layerNode: Node, layer: T, adapter: XMLAdapter, namespaces: Namespaces) => void;
}

/**
 * Factory function to create layer parsers
 *
 * @param config - Layer parser configuration
 * @returns Resolver function for parsing layers
 *
 * @example
 * ```typescript
 * const processBHRGTLayerData = createLayerParser<BHRGTLayer>({
 *   layerXPath: './/bhrgtcom:layer',
 *   requiredFields: {
 *     upperBoundary: './bhrgtcom:upperBoundary',
 *     lowerBoundary: './bhrgtcom:lowerBoundary',
 *     soilName: './bhrgtcom:soil/bhrgtcom:geotechnicalSoilName',
 *     soilNameKey: 'geotechnicalSoilName'
 *   },
 *   optionalFields: [
 *     { xpath: './bhrgtcom:soil/bhrgtcom:colour', key: 'color' },
 *     { xpath: './bhrgtcom:soil/bhrgtcom:dispersedInhomogeneity', key: 'dispersedInhomogeneity', transform: parseBoolean }
 *   ]
 * });
 * ```
 */
export function createLayerParser<T extends { upperBoundary: number; lowerBoundary: number }>(
  config: LayerParserConfig<T>,
): (
  value: string | null,
  context: { node: Node; adapter: XMLAdapter; namespaces: Namespaces },
) => Array<T> {
  return (_value, context) => {
    const { node, adapter, namespaces } = context;
    const nsResolver = createNamespaceResolver(namespaces);

    // Find all layer elements
    const layerNodes = adapter.evaluateXPathAll(node, config.layerXPath, nsResolver);

    const layers: Array<T> = [];

    for (const layerNode of layerNodes) {
      // Extract required fields
      const upperBoundaryNode = adapter.evaluateXPath(
        layerNode,
        config.requiredFields.upperBoundary,
        nsResolver,
      );

      const lowerBoundaryNode = adapter.evaluateXPath(
        layerNode,
        config.requiredFields.lowerBoundary,
        nsResolver,
      );

      const soilNameNode = adapter.evaluateXPath(
        layerNode,
        config.requiredFields.soilName,
        nsResolver,
      );

      // Skip layer if required fields are missing
      if (!upperBoundaryNode || !lowerBoundaryNode || !soilNameNode) {
        continue;
      }

      const upperBoundary = Number.parseFloat(upperBoundaryNode.textContent ?? "0");
      const lowerBoundary = Number.parseFloat(lowerBoundaryNode.textContent ?? "0");
      const soilName = (soilNameNode.textContent ?? "").trim();

      // Create base layer object with required fields
      const layer = {
        upperBoundary,
        lowerBoundary,
        [config.requiredFields.soilNameKey]: soilName,
      } as T;

      // Extract optional fields
      for (const field of config.optionalFields) {
        const fieldNode = adapter.evaluateXPath(layerNode, field.xpath, nsResolver);
        const textContent = fieldNode?.textContent?.trim() ?? null;

        if (field.transform) {
          // Apply custom transform function
          const transformed = field.transform(textContent);
          if (field.omitIfEmpty && (transformed === null || transformed === undefined)) {
            continue;
          }
          (layer as Record<string, unknown>)[field.key as string] = transformed;
        } else if (field.omitIfEmpty) {
          // Only set property if value exists
          if (textContent) {
            (layer as Record<string, unknown>)[field.key as string] = textContent;
          }
        } else {
          // Always set, using null for missing values
          (layer as Record<string, unknown>)[field.key as string] = textContent;
        }
      }

      // Call post-process callback for complex nested fields
      if (config.postProcess) {
        config.postProcess(layerNode, layer, adapter, namespaces);
      }

      layers.push(layer);
    }

    return layers;
  };
}

/**
 * Parse space-separated comma-delimited pairs from CSV text
 *
 * Handles the common pattern of "value1,value2 value3,value4" format
 * used in settlement characteristics and other time-series data.
 *
 * @param csvText - Space-separated "key,value" pairs
 * @param parsePair - Function to parse a single key,value pair
 * @returns Array of parsed objects
 *
 * @example
 * ```typescript
 * const timeHeightPairs = parseCSVPairs(
 *   csvNode.textContent,
 *   (timeStr, heightStr) => {
 *     const time = parseFloat(timeStr);
 *     const height = parseFloat(heightStr);
 *     return !isNaN(time) && !isNaN(height)
 *       ? { time, height }
 *       : null;
 *   }
 * );
 * ```
 */
export function parseCSVPairs<T>(
  csvText: string | null | undefined,
  parsePair: (key: string, value: string) => T | null,
): Array<T> {
  if (!csvText) {
    return [];
  }

  const trimmed = csvText.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const pairs = trimmed.split(/\s+/);
  const results: Array<T> = [];

  for (const pair of pairs) {
    const [keyStr, valueStr] = pair.split(",");

    if (keyStr && valueStr) {
      const result = parsePair(keyStr, valueStr);

      if (result !== null) {
        results.push(result);
      }
    }
  }

  return results;
}

/**
 * Parse space-separated comma-delimited rows with multiple columns
 *
 * Handles CSV data with arbitrary number of columns per row.
 * Format: "col1,col2,col3,... col1,col2,col3,..." (space-separated rows)
 *
 * @param csvText - Space-separated CSV rows
 * @param parseRow - Function to parse a single row's columns into an object
 * @returns Array of parsed objects
 *
 * @example
 * ```typescript
 * const measurements = parseCSVRows(
 *   csvNode.textContent,
 *   (columns) => {
 *     if (columns.length < 6) return null;
 *     return {
 *       time: parseFloat(columns[0]),
 *       strain: parseFloat(columns[1]),
 *       stress: parseFloat(columns[2]),
 *       pressure: parseFloat(columns[3]),
 *       porePressure: parseFloat(columns[4]) ?? null,
 *       volumeChange: parseFloat(columns[5]) ?? null
 *     };
 *   }
 * );
 * ```
 */
export function parseCSVRows<T>(
  csvText: string | null | undefined,
  parseRow: (columns: Array<string>) => T | null,
): Array<T> {
  if (!csvText) {
    return [];
  }

  const trimmed = csvText.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const rows = trimmed.split(/\s+/);
  const results: Array<T> = [];

  for (const row of rows) {
    const columns = row.split(",");

    if (columns.length > 0) {
      const result = parseRow(columns);

      if (result !== null) {
        results.push(result);
      }
    }
  }

  return results;
}
