/**
 * BRO XML format version detection
 *
 * Validates that XML documents match the expected schema versions
 * supported by this library. Uses graceful degradation for same
 * major versions with warnings.
 */

import { BROParseError } from "../types/index.js";
import type { BROFileType } from "../types/index.js";
import { canonicalNamespace } from "../namespaces.js";

/** Alias of the canonical {@link BROFileType} union (single source in `types/index`). */
export type DataType = BROFileType;

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
 * One registration type's version facts: the stable namespace-family fragment
 * (version-independent, used to detect the type), the primary supported version,
 * and any older versions parseable with a warning.
 */
interface Registration {
  /** Version-independent namespace fragment, e.g. `/dscpt/`. Detects the type. */
  urnFragment: string;
  /** The version this library targets. */
  primary: SchemaVersionInfo;
  /** Older known versions, parseable with a warning. */
  alsoKnown: Array<SchemaVersionInfo>;
}

/**
 * The registration-type registry: version facts per {@link DataType}, the single
 * source of truth the detector reads. (Producers live in `BROParser`, keyed by the
 * same union — see the split rationale in the parser.)
 */
const REGISTRATIONS: Record<DataType, Registration> = {
  CPT: {
    urnFragment: "/dscpt/",
    primary: {
      namespace: "http://www.broservices.nl/xsd/dscpt/1.1",
      version: "1.1",
      majorVersion: 1,
      description: "Dispatch CPT schema version 1.1",
    },
    alsoKnown: [
      {
        namespace: "http://www.broservices.nl/xsd/dscpt/1.0",
        version: "1.0",
        majorVersion: 1,
        description: "Dispatch CPT schema version 1.0",
      },
    ],
  },
  "BHR-GT": {
    urnFragment: "/dsbhr-gt/",
    primary: {
      namespace: "http://www.broservices.nl/xsd/dsbhr-gt/2.1",
      version: "2.1",
      majorVersion: 2,
      description: "Dispatch BHR-GT schema version 2.1",
    },
    alsoKnown: [
      {
        namespace: "http://www.broservices.nl/xsd/dsbhr-gt/2.0",
        version: "2.0",
        majorVersion: 2,
        description: "Dispatch BHR-GT schema version 2.0",
      },
    ],
  },
  "BHR-G": {
    urnFragment: "/dsbhrg/",
    primary: {
      namespace: "http://www.broservices.nl/xsd/dsbhrg/3.1",
      version: "3.1",
      majorVersion: 3,
      description: "Dispatch BHR-G schema version 3.1",
    },
    alsoKnown: [
      {
        namespace: "http://www.broservices.nl/xsd/dsbhrg/3.0",
        version: "3.0",
        majorVersion: 3,
        description: "Dispatch BHR-G schema version 3.0",
      },
    ],
  },
  GMW: {
    urnFragment: "/dsgmw/",
    primary: {
      namespace: "http://www.broservices.nl/xsd/dsgmw/1.1",
      version: "1.1",
      majorVersion: 1,
      description: "Dispatch GMW schema version 1.1",
    },
    alsoKnown: [
      {
        namespace: "http://www.broservices.nl/xsd/dsgmw/1.0",
        version: "1.0",
        majorVersion: 1,
        description: "Dispatch GMW schema version 1.0",
      },
    ],
  },
  GLD: {
    urnFragment: "/dsgld/",
    primary: {
      namespace: "http://www.broservices.nl/xsd/dsgld/1.0",
      version: "1.0",
      majorVersion: 1,
      description: "Dispatch GLD schema version 1.0",
    },
    alsoKnown: [],
  },
};

/** Every known version for a type, primary first. */
function knownVersions(dataType: DataType): Array<SchemaVersionInfo> {
  const reg = REGISTRATIONS[dataType];
  return [reg.primary, ...reg.alsoKnown];
}

/**
 * Get the supported (primary) version for a data type
 */
function getSupportedVersion(dataType: DataType): SchemaVersionInfo {
  return REGISTRATIONS[dataType].primary;
}

/**
 * Exported for backward compatibility
 */
export const SUPPORTED_VERSIONS = {
  CPT: getSupportedVersion("CPT"),
  "BHR-GT": getSupportedVersion("BHR-GT"),
  "BHR-G": getSupportedVersion("BHR-G"),
  GMW: getSupportedVersion("GMW"),
  GLD: getSupportedVersion("GLD"),
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
 * Extract version from namespace URI. Accepts both the documented
 * `major.minor` form and the bare-major form several BRO REST services return.
 * e.g. `.../dscpt/1.1` -> "1.1", `.../dsbhrg/3` -> "3"
 */
function extractVersionFromNamespace(namespace: string): string {
  const match = /\/(\d+(?:\.\d+)?)$/.exec(namespace);
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
 * Detect schema type from a namespace by matching its version-independent family
 * fragment (e.g. `/dscpt/`) against the registry. `dsbhr-gt` and `dsbhrg` stay
 * distinct because their fragments carry the hyphen.
 */
function detectDataTypeFromNamespace(namespace: string): DataType | null {
  for (const [type, reg] of Object.entries(REGISTRATIONS)) {
    if (namespace.includes(reg.urnFragment)) {
      return type as DataType;
    }
  }
  return null;
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

  // Check for exact match with supported version (scheme-canonical: BRO
  // namespaces occur as both http:// and https://, naming the same schema).
  const canonical = canonicalNamespace(namespace);
  if (canonical === supportedVersion.namespace) {
    return {
      dataType: expectedType,
      version: supportedVersion.version,
      namespace,
      warnings: [],
    };
  }

  // Check if it's a known version for the expected type
  const knownVersion = knownVersions(expectedType).find((v) => v.namespace === canonical);

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
        hint: `Document is ${detectedType}, not ${expectedType}. Use the ${detectedType} parser.`,
      },
    );
  }

  // Check if it's the same type but unknown version
  if (detectedType === expectedType) {
    const detectedVersion = extractVersionFromNamespace(namespace);
    const detectedMajor = extractMajorVersion(detectedVersion);
    const supportedMajor = supportedVersion.majorVersion;

    if (detectedMajor === supportedMajor) {
      // A bare-major namespace (e.g. `.../dsbhrg/3`) is the whole-major form
      // several BRO REST services return for the very schema family we
      // support. It resolves cleanly, so accept it without warning. A specific
      // but unrecognized minor (e.g. `3.2`) is genuinely unverified and still
      // warns below.
      const isBareMajor = /\/\d+$/.test(namespace);
      if (isBareMajor) {
        return {
          dataType: expectedType,
          version: detectedVersion,
          namespace,
          warnings: [],
        };
      }

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
      GMW: SUPPORTED_VERSIONS.GMW.namespace,
      GLD: SUPPORTED_VERSIONS.GLD.namespace,
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
  for (const type of Object.keys(REGISTRATIONS) as Array<DataType>) {
    for (const info of knownVersions(type)) {
      if (namespace === info.namespace) {
        return {
          type,
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
