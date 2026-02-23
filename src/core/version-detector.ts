/**
 * BRO XML format version detection
 *
 * Validates that XML documents match the expected schema versions
 * supported by this library. Uses graceful degradation for same
 * major versions with warnings.
 */

import { BROParseError } from "../types/index.js";

export type DataType = "CPT" | "BHR-GT" | "BHR-G";

/**
 * Schema version info
 */
interface SchemaVersionInfo {
  namespace: string;
  version: string;
  majorVersion: number;
  description: string;
}

/**
 * Known schema versions per data type
 *
 * The first entry for each type is the "supported" version.
 * Additional entries are known older/newer versions that may
 * be parseable with warnings.
 */
const KNOWN_VERSIONS: Record<DataType, Array<SchemaVersionInfo>> = {
  CPT: [
    {
      namespace: "http://www.broservices.nl/xsd/dscpt/1.1",
      version: "1.1",
      majorVersion: 1,
      description: "Dispatch CPT schema version 1.1",
    },
    // Older known versions
    {
      namespace: "http://www.broservices.nl/xsd/dscpt/1.0",
      version: "1.0",
      majorVersion: 1,
      description: "Dispatch CPT schema version 1.0",
    },
  ],
  "BHR-GT": [
    {
      namespace: "http://www.broservices.nl/xsd/dsbhr-gt/2.1",
      version: "2.1",
      majorVersion: 2,
      description: "Dispatch BHR-GT schema version 2.1",
    },
    // Older known versions
    {
      namespace: "http://www.broservices.nl/xsd/dsbhr-gt/2.0",
      version: "2.0",
      majorVersion: 2,
      description: "Dispatch BHR-GT schema version 2.0",
    },
  ],
  "BHR-G": [
    {
      namespace: "http://www.broservices.nl/xsd/dsbhrg/3.1",
      version: "3.1",
      majorVersion: 3,
      description: "Dispatch BHR-G schema version 3.1",
    },
    // Older known versions
    {
      namespace: "http://www.broservices.nl/xsd/dsbhrg/3.0",
      version: "3.0",
      majorVersion: 3,
      description: "Dispatch BHR-G schema version 3.0",
    },
  ],
};

/**
 * Get the supported (primary) version for a data type
 */
function getSupportedVersion(dataType: DataType): SchemaVersionInfo {
  // First element is always the primary supported version
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return KNOWN_VERSIONS[dataType][0]!;
}

/**
 * Exported for backward compatibility
 */
export const SUPPORTED_VERSIONS = {
  CPT: getSupportedVersion("CPT"),
  "BHR-GT": getSupportedVersion("BHR-GT"),
  "BHR-G": getSupportedVersion("BHR-G"),
} as const;

/**
 * Result of version detection
 */
export interface VersionDetectionResult {
  dataType: DataType;
  version: string;
  namespace: string;
  warnings: Array<string>;
}

/**
 * Extract version from namespace URI
 * e.g., "http://www.broservices.nl/xsd/dscpt/1.1" -> "1.1"
 */
function extractVersionFromNamespace(namespace: string): string {
  const match = /\/(\d+\.\d+)$/.exec(namespace);
  return match?.[1] ?? "unknown";
}

/**
 * Extract major version from version string
 * e.g., "1.1" -> 1
 */
function extractMajorVersion(version: string): number {
  const match = /^(\d+)/.exec(version);
  return match?.[1] ? parseInt(match[1], 10) : 0;
}

/**
 * Detect schema type from namespace pattern
 */
function detectDataTypeFromNamespace(namespace: string): DataType | null {
  if (namespace.includes("/dscpt/")) {
    return "CPT";
  }
  if (namespace.includes("/dsbhr-gt/")) {
    return "BHR-GT";
  }
  if (namespace.includes("/dsbhrg/")) {
    return "BHR-G";
  }
  return null;
}

/**
 * Get the parser method name for a data type
 */
function getParserMethodName(dataType: DataType): string {
  switch (dataType) {
    case "CPT":
      return "parseCPT";
    case "BHR-GT":
      return "parseBHRGT";
    case "BHR-G":
      return "parseBHRG";
  }
}

/**
 * Detect and validate the BRO schema version from XML document
 *
 * Behavior:
 * - Exact match: returns version info with no warnings
 * - Same major version: returns version info with warning
 * - Different major version: throws BROParseError
 * - Unknown/invalid: throws BROParseError
 *
 * @param doc - Parsed XML document
 * @param expectedType - Expected data type (CPT, BORE, or BHRG)
 * @returns Version detection result with any warnings
 * @throws {BROParseError} If version is incompatible or document is invalid
 */
export function detectAndValidateVersion(
  doc: Document,
  expectedType: DataType,
): VersionDetectionResult {
  const rootElement = doc.documentElement;

  const namespace = rootElement.getAttribute("xmlns");

  if (!namespace) {
    throw new BROParseError("No namespace found in XML document", {
      code: "MISSING_NAMESPACE",
      hint: "BRO XML documents must declare a namespace",
    });
  }

  const supportedVersion = getSupportedVersion(expectedType);
  const warnings: Array<string> = [];

  // Check for exact match with supported version
  if (namespace === supportedVersion.namespace) {
    return {
      dataType: expectedType,
      version: supportedVersion.version,
      namespace,
      warnings: [],
    };
  }

  // Check if it's a known version for the expected type
  const knownVersions = KNOWN_VERSIONS[expectedType];
  const knownVersion = knownVersions.find((v) => v.namespace === namespace);

  if (knownVersion) {
    // Known version but not the primary supported one
    warnings.push(
      `Parsing with schema version ${knownVersion.version}, ` +
        `but this library is optimized for version ${supportedVersion.version}. ` +
        `Some fields may be missing or have different formats.`,
    );
    return {
      dataType: expectedType,
      version: knownVersion.version,
      namespace,
      warnings,
    };
  }

  // Check if it's a different data type
  const detectedType = detectDataTypeFromNamespace(namespace);

  if (detectedType && detectedType !== expectedType) {
    throw new BROParseError(
      `Wrong document type: expected ${expectedType} but got ${detectedType}`,
      {
        code: "WRONG_DOCUMENT_TYPE",
        expected: expectedType,
        actual: detectedType,
        namespace,
        hint: `Use ${getParserMethodName(detectedType)}() instead of ${getParserMethodName(expectedType)}()`,
      },
    );
  }

  // Check if it's the same type but unknown version
  if (detectedType === expectedType) {
    const detectedVersion = extractVersionFromNamespace(namespace);
    const detectedMajor = extractMajorVersion(detectedVersion);
    const supportedMajor = supportedVersion.majorVersion;

    if (detectedMajor === supportedMajor) {
      // Same major version - attempt parsing with warning
      warnings.push(
        `Unknown schema version ${detectedVersion} for ${expectedType}. ` +
          `This library supports version ${supportedVersion.version}. ` +
          `Attempting to parse as they share major version ${detectedMajor}.`,
      );
      return {
        dataType: expectedType,
        version: detectedVersion,
        namespace,
        warnings,
      };
    }

    // Different major version - throw error
    throw new BROParseError(`Incompatible schema major version: ${detectedVersion}`, {
      code: "INCOMPATIBLE_VERSION",
      namespace,
      detectedVersion,
      detectedMajorVersion: detectedMajor,
      supportedVersion: supportedVersion.version,
      supportedMajorVersion: supportedMajor,
      hint:
        `This library supports ${expectedType} schema major version ${supportedMajor} ` +
        `(e.g., ${supportedVersion.version}). ` +
        `The provided document uses major version ${detectedMajor}.`,
    });
  }

  // Completely unknown namespace
  throw new BROParseError(`Unsupported schema: ${namespace}`, {
    code: "UNSUPPORTED_SCHEMA",
    namespace,
    supportedSchemas: {
      CPT: SUPPORTED_VERSIONS.CPT.namespace,
      "BHR-GT": SUPPORTED_VERSIONS["BHR-GT"].namespace,
      "BHR-G": SUPPORTED_VERSIONS["BHR-G"].namespace,
    },
    hint: "This does not appear to be a supported BRO XML document.",
  });
}

/**
 * Get version information from document (for informational purposes)
 *
 * @param doc - Parsed XML document
 * @returns Version information or null if not detected
 */
export function getVersionInfo(
  doc: Document,
): { type: DataType; version: string; namespace: string } | null {
  const rootElement = doc.documentElement;
  const namespace = rootElement.getAttribute("xmlns");

  if (!namespace) {
    return null;
  }

  // Check all known versions
  for (const [type, versions] of Object.entries(KNOWN_VERSIONS)) {
    for (const info of versions) {
      if (namespace === info.namespace) {
        return {
          type: type as DataType,
          version: info.version,
          namespace: info.namespace,
        };
      }
    }
  }

  // Try to detect from namespace pattern
  const detectedType = detectDataTypeFromNamespace(namespace);
  if (detectedType) {
    const version = extractVersionFromNamespace(namespace);
    return {
      type: detectedType,
      version,
      namespace,
    };
  }

  return null;
}
