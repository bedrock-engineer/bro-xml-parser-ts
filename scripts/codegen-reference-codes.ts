#!/usr/bin/env npx tsx
/**
 * Codegen script for BRO reference codes
 *
 * Fetches all reference code domains from the BRO API and generates
 * TypeScript files with code lookups and descriptions.
 *
 * Usage:
 *   npx tsx scripts/codegen-reference-codes.ts
 *   # or
 *   npm run codegen:reference-codes
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const BRO_API_BASE = 'https://publiek.broservices.nl/bro/refcodes/v1';
const OUTPUT_DIR = path.join(__dirname, '../src/reference-codes');

/**
 * Supported schema versions - must match src/core/version-detector.ts
 */
const SUPPORTED_VERSIONS: Record<string, string> = {
  CPT: '1.1',
  'BHR-GT': '2.1',
  'BHR-G': '3.1',
};

/**
 * Map URN prefixes to data types for version selection
 */
const URN_PREFIX_TO_DATATYPE: Record<string, string | null> = {
  'urn:bro:cpt:': 'CPT',
  'urn:bro:bhrgt:': 'BHR-GT',
  'urn:bro:bhrg:': 'BHR-G',
  'urn:bro:bhrgcommon:': 'BHR-G',
  'urn:bro:': null, // Common codes - use latest
};

/**
 * Domains to generate (filtered from all available domains)
 * Only include domains that are actually used in our parsed types
 */
const INCLUDED_DOMAIN_PREFIXES = [
  'urn:bro:cpt:',
  'urn:bro:bhrgt:',
  'urn:bro:bhrg:',
  'urn:bro:bhrgcommon:',
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RefCode {
  code: string;
  description: string;
  imbro: string;
  imbroA: string;
}

interface RefDomainVersion {
  majorVersion: number;
  minorVersion: number;
  refCodes: RefCode[];
}

interface RefDomainResponse {
  name: string;
  refDomainVersions: RefDomainVersion[];
}

interface DomainInfo {
  uri: string;
  name: string;
  description?: string;
}

// ---------------------------------------------------------------------------
// API Functions
// ---------------------------------------------------------------------------

async function fetchDomains(): Promise<DomainInfo[]> {
  const response = await fetch(`${BRO_API_BASE}/domains`);
  if (!response.ok) {
    throw new Error(`Failed to fetch domains: ${response.status}`);
  }
  const data = await response.json();
  return data.refDomains || [];
}

async function fetchDomainCodes(urn: string): Promise<RefDomainResponse | null> {
  const url = `${BRO_API_BASE}/codes?domain=${encodeURIComponent(urn)}`;
  const response = await fetch(url);

  if (response.status === 204) {
    // No content - domain exists but has no codes
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch codes for ${urn}: ${response.status}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Version Selection
// ---------------------------------------------------------------------------

function getDataTypeForUrn(urn: string): string | null {
  for (const [prefix, dataType] of Object.entries(URN_PREFIX_TO_DATATYPE)) {
    if (urn.startsWith(prefix)) {
      return dataType;
    }
  }
  return null;
}

function getTargetVersion(urn: string): { major: number; minor: number } | null {
  const dataType = getDataTypeForUrn(urn);
  if (!dataType) return null;

  const versionStr = SUPPORTED_VERSIONS[dataType];
  if (!versionStr) return null;

  const [major, minor] = versionStr.split('.').map(Number);
  return { major, minor };
}

function selectVersionCodes(domain: RefDomainResponse, urn: string): RefCode[] {
  const versions = domain.refDomainVersions;
  if (!versions || versions.length === 0) return [];

  const target = getTargetVersion(urn);

  if (target) {
    // Find exact version match or closest lower version
    const sorted = [...versions].sort((a, b) => {
      if (a.majorVersion !== b.majorVersion) {
        return b.majorVersion - a.majorVersion;
      }
      return b.minorVersion - a.minorVersion;
    });

    // Find version <= target
    const match = sorted.find(
      v => v.majorVersion < target.major ||
           (v.majorVersion === target.major && v.minorVersion <= target.minor)
    );

    if (match) {
      return match.refCodes;
    }
  }

  // Fallback: use latest version
  const latest = versions.reduce((a, b) => {
    if (a.majorVersion !== b.majorVersion) {
      return a.majorVersion > b.majorVersion ? a : b;
    }
    return a.minorVersion > b.minorVersion ? a : b;
  });

  return latest.refCodes;
}

// ---------------------------------------------------------------------------
// Code Generation
// ---------------------------------------------------------------------------

function extractUrnParts(urn: string): { prefix: string; name: string } {
  // urn:bro:bhrgt:GeotechnicalSoilName -> { prefix: 'bhrgt', name: 'GeotechnicalSoilName' }
  const parts = urn.split(':');
  const name = parts.pop() || 'unknown';
  const prefix = parts.pop() || '';
  return { prefix, name };
}

function urnToFileName(urn: string): string {
  // urn:bro:bhrgt:GeotechnicalSoilName -> bhrgt-geotechnical-soil-name.ts
  const { prefix, name } = extractUrnParts(urn);
  return toKebabCase(prefix) + '-' + toKebabCase(name) + '.ts';
}

function urnToConstName(urn: string): string {
  // urn:bro:bhrgt:GeotechnicalSoilName -> BHRGT_GEOTECHNICAL_SOIL_NAME_CODES
  const { prefix, name } = extractUrnParts(urn);
  return toScreamingSnakeCase(prefix) + '_' + toScreamingSnakeCase(name) + '_CODES';
}

function urnToFunctionName(urn: string): string {
  // urn:bro:bhrgt:GeotechnicalSoilName -> getBhrgtGeotechnicalSoilNameDescription
  const { prefix, name } = extractUrnParts(urn);
  const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  return 'get' + capitalizedPrefix + name + 'Description';
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function toScreamingSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toUpperCase();
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

function isValidIdentifier(str: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str);
}

function formatKey(key: string): string {
  return isValidIdentifier(key) ? key : `'${key}'`;
}

function generateFile(urn: string, codes: RefCode[]): string {
  const constName = urnToConstName(urn);
  const funcName = urnToFunctionName(urn);
  const domainName = urn.split(':').pop() || 'Unknown';

  const codeEntries = codes
    .map(c => `  ${formatKey(c.code)}: '${escapeString(c.description)}',`)
    .join('\n');

  return `/**
 * ${domainName} codes and descriptions from the official BRO reference.
 *
 * @generated from ${urn}
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=${encodeURIComponent(urn)}
 */

export const ${constName}: Record<string, string> = {
${codeEntries}
};

/**
 * Get the Dutch description for a ${domainName} code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function ${funcName}(code: string): string | undefined {
  return ${constName}[code];
}
`;
}

function generateIndexFile(domains: Array<{ uri: string; fileName: string }>): string {
  const exports = domains
    .map(d => {
      const constName = urnToConstName(d.uri);
      const funcName = urnToFunctionName(d.uri);
      const moduleName = d.fileName.replace('.ts', '.js');
      return `export { ${constName}, ${funcName} } from './${moduleName}';`;
    })
    .join('\n');

  return `/**
 * BRO Reference Codes
 *
 * Official code lists from the BRO (Basisregistratie Ondergrond) reference API.
 * These provide human-readable descriptions for coded values in BRO XML files.
 *
 * @generated
 * @see https://publiek.broservices.nl/bro/refcodes/v1/domains
 */

${exports}
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Fetching BRO reference code domains...\n');

  const allDomains = await fetchDomains();
  console.log(`Found ${allDomains.length} total domains\n`);

  // Filter to included prefixes
  const includedDomains = allDomains.filter(d =>
    d.uri && INCLUDED_DOMAIN_PREFIXES.some(prefix => d.uri.startsWith(prefix))
  );
  console.log(`Filtered to ${includedDomains.length} relevant domains\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Clear existing generated files (keep index.ts for now)
  const existingFiles = fs.readdirSync(OUTPUT_DIR);
  for (const file of existingFiles) {
    if (file.endsWith('.ts') && file !== 'index.ts') {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  }

  const generated: Array<{ uri: string; fileName: string; codeCount: number }> = [];
  let totalCodes = 0;

  for (const domain of includedDomains) {
    process.stdout.write(`  Fetching ${domain.uri}...`);

    try {
      const response = await fetchDomainCodes(domain.uri);

      if (!response) {
        console.log(' (empty)');
        continue;
      }

      const codes = selectVersionCodes(response, domain.uri);

      if (codes.length === 0) {
        console.log(' (no codes)');
        continue;
      }

      const fileName = urnToFileName(domain.uri);
      const filePath = path.join(OUTPUT_DIR, fileName);
      const content = generateFile(domain.uri, codes);

      fs.writeFileSync(filePath, content, 'utf-8');

      generated.push({ uri: domain.uri, fileName, codeCount: codes.length });
      totalCodes += codes.length;

      console.log(` ${codes.length} codes`);
    } catch (error) {
      console.log(` ERROR: ${error}`);
    }
  }

  // Generate index file
  console.log('\nGenerating index.ts...');
  const indexContent = generateIndexFile(generated);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent, 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log(`Generated ${generated.length} files in ${OUTPUT_DIR}`);
  console.log(`Total: ${totalCodes} codes`);
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
