#!/usr/bin/env npx tsx
/**
 * XSD coverage checker for BRO schemas.
 *
 * Fetches the official BRO XSDs (live, from schema.broservices.nl), assembles the
 * full type graph per domain (following xsd:import / xsd:include), flattens each
 * registration-object type down to its leaf elements, and diffs that against the
 * element names our parser actually references (in src/schemas/**, src/resolvers/**,
 * src/schema-presets.ts).
 *
 * The XSD walk itself lives in ./lib/bro-xsd.ts (shared with codegen-schema.ts).
 * This file is the coverage-specific half: harvest covered names from our source,
 * diff, and report.
 *
 * The point: BRO's XSDs are the authoritative, closed set of every property a
 * document can carry. Diffing against them turns "we keep discovering missed
 * properties" into an exhaustive, repeatable check.
 *
 * Output (written to scripts/xsd-coverage-out/):
 *   <domain>.leaves.md    - every distinct leaf property (start here to model a type)
 *   <domain>.report.md    - gaps table (leaf elements in the XSD we never reference)
 *   <domain>.scaffold.ts  - suggested SchemaField entries for the gaps, to adapt
 *
 * Matching is by element name, not by full XPath. Our resolvers dig into subtrees
 * with relative paths from arbitrary context nodes, so a path-exact diff would be
 * mostly false positives. Name-based matching answers the real question: "which
 * BRO-defined leaf elements does our code never mention?" A leaf counts as covered
 * if either its `prefix:localName` or its bare `localName` appears in our source.
 *
 * Usage:
 *   npx tsx scripts/check-xsd-coverage.ts
 *   npm run check:xsd-coverage
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { BRO_NAMESPACES } from "../src/namespaces.js";
import {
  SCHEMA_HOST,
  type Leaf,
  loadSchema,
  findRegistrationObjectType,
  flattenRoot,
  dedupeByQualified,
  guessResolver,
  toFieldName,
} from "./lib/bro-xsd.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const OUT_DIR = path.join(__dirname, "xsd-coverage-out");

/** Source dirs/files whose xpath string-literals define "what we already cover". */
const SOURCE_GLOBS = [
  path.join(__dirname, "../src/schemas"),
  path.join(__dirname, "../src/resolvers"),
  path.join(__dirname, "../src/schema-presets.ts"),
];

interface DomainConfig {
  /** Data type key used in reports. */
  key: string;
  /** URL of the dataservice "messages" XSD (the entry point). */
  messagesUrl: string;
  /** Whether our parser models this domain at all (SFR does not yet). */
  modeled: boolean;
  /**
   * Path substrings for subtrees a resolver handles dynamically (i.e. by reading
   * whatever child elements are present, not by naming each one). Leaves under
   * these are moved to a separate "resolver-handled (review)" section instead of
   * counting as gaps. Keep this SURGICAL - only genuinely dynamic subtrees, never
   * a subtree where the resolver names a fixed set of fields (those misses are real).
   */
  resolverHandledPrefixes?: string[];
  /**
   * Path substrings for subtrees we have DELIBERATELY chosen not to model. Leaves
   * under these are listed separately as "intentionally not modeled" and excluded
   * from the headline gap count, so a conscious scope boundary doesn't read as an
   * oversight on every run. (Distinct from resolverHandledPrefixes, which ARE
   * covered - these simply aren't modeled yet, by choice.)
   */
  unmodeledPrefixes?: string[];
}

const DOMAINS: DomainConfig[] = [
  {
    key: "CPT",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dscpt/1.1/dscpt-messages.xsd`,
    modeled: true,
    // The measurement/dissipation column set is discovered dynamically from the
    // <parameters> ja/nee flags and read out of the <values> CSV blob.
    resolverHandledPrefixes: [":parameters/"],
  },
  {
    key: "BHR-GT",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dsbhr-gt/2.1/dsbhr-gt-messages.xsd`,
    modeled: true,
  },
  {
    key: "BHR-G",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dsbhrg/3.1/dsbhr-g-messages.xsd`,
    modeled: true,
    // BHR-G lab analysis (investigatedInterval + determinations) is deliberately
    // not modeled - BHR-G is a geological description object; its lab-analysis
    // tree has no consumers here yet. Revisit if that changes.
    unmodeledPrefixes: ["dsbhrg:boreholeSampleAnalysis"],
  },
  {
    key: "GMW",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dsgmw/1.1/dsgmw-messages.xsd`,
    modeled: true,
    // Each wellHistory/intermediateEvent carries an `eventData` diff whose leaf
    // names (tubeMaterial, glue, electrodePosition, ...) are a subset of the
    // monitoring-tube fields we model. We expose the event log (name + date) but
    // not the per-event diff; the current-state values live on the tubes. Those
    // leaves are therefore covered by name, not by a dedicated binding - a
    // deliberate scope choice, consistent with the checker's name-based matching.
  },
  {
    key: "GLD",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dsgld/1.0/dsgld-messages.xsd`,
    modeled: true,
    // The observation collapses to a single `dsgld:observation` leaf: its content
    // (om:OM_Observation -> WaterML2 MeasurementTimeseries) is in OGC namespaces the
    // flattener treats as opaque. The observation resolver reads that subtree
    // (per-observation metadata + the repeating {time, value, ...} points); coverage
    // is satisfied because the resolver references `dsgld:observation` by name.
  },
  {
    key: "SFR",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dssfr/2.0/dssfr-messages.xsd`,
    modeled: false,
  },
];

// ---------------------------------------------------------------------------
// Covered-name extraction from our source
// ---------------------------------------------------------------------------

const KNOWN_PREFIXES = new Set<string>([
  ...Object.keys(BRO_NAMESPACES),
  "cptcom",
  "sfrcommon",
  "sfrcom",
  "dssfr",
  "wml2",
  "waterml",
]);

function collectSourceFiles(target: string, acc: string[]): void {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      collectSourceFiles(path.join(target, entry), acc);
    }
  } else if (target.endsWith(".ts")) {
    acc.push(target);
  }
}

function extractCoveredNames(): { qualified: Set<string>; bare: Set<string> } {
  const qualified = new Set<string>();
  const bare = new Set<string>();
  const files: string[] = [];
  for (const g of SOURCE_GLOBS) {
    if (fs.existsSync(g)) collectSourceFiles(g, files);
  }
  const re = /([a-zA-Z][a-zA-Z0-9]*):([A-Za-z][A-Za-z0-9_]*)/g;
  for (const file of files) {
    const text = fs.readFileSync(file, "utf-8");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const [, prefix, local] = m;
      if (!KNOWN_PREFIXES.has(prefix)) continue;
      qualified.add(`${prefix}:${local}`);
      bare.add(local);
    }
  }
  return { qualified, bare };
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

/** Full flattened leaf list for a domain (every distinct property in the XSD). */
function buildLeafList(domain: DomainConfig, rootName: string, leaves: Leaf[]): string {
  const distinct = dedupeByQualified(leaves);
  const lines: string[] = [];
  lines.push(`# XSD leaves - ${domain.key}`);
  lines.push("");
  lines.push(`Source XSD: ${domain.messagesUrl}`);
  lines.push(`Registration object: \`${rootName}\``);
  lines.push(`Distinct leaf properties: **${distinct.length}** (${leaves.length} total occurrences)`);
  lines.push("");
  lines.push("| Element | Cardinality | Base type | XPath (from registration object) |");
  lines.push("| --- | --- | --- | --- |");
  for (const l of distinct) {
    lines.push(`| \`${l.qualified}\` | ${l.cardinality} | ${l.baseType} | \`${l.path}\` |`);
  }
  return lines.join("\n") + "\n";
}

function buildReport(
  domain: DomainConfig,
  rootName: string,
  leaves: Leaf[],
  covered: { qualified: Set<string>; bare: Set<string> },
): { report: string; scaffold: string; gapCount: number; total: number } {
  const allGaps = leaves.filter(
    (l) => !covered.qualified.has(l.qualified) && !covered.bare.has(l.local),
  );
  const handledPrefixes = domain.resolverHandledPrefixes ?? [];
  const unmodeledPrefixes = domain.unmodeledPrefixes ?? [];
  const isResolverHandled = (l: Leaf) => handledPrefixes.some((p) => l.path.includes(p));
  const isUnmodeled = (l: Leaf) => unmodeledPrefixes.some((p) => l.path.includes(p));
  const reviewGaps = dedupeByQualified(allGaps.filter(isResolverHandled));
  const unmodeledGaps = dedupeByQualified(allGaps.filter(isUnmodeled));
  const gapOccurrences = allGaps.filter((l) => !isResolverHandled(l) && !isUnmodeled(l));

  // The same element can appear under many choice branches (esp. the geological
  // BHR-G layer). Report DISTINCT missing properties, keeping one example path.
  const gaps = dedupeByQualified(gapOccurrences);

  const lines: string[] = [];
  lines.push(`# XSD coverage - ${domain.key}`);
  lines.push("");
  lines.push(`Source XSD: ${domain.messagesUrl}`);
  lines.push(`Registration object: \`${rootName}\``);
  lines.push(
    domain.modeled
      ? `Modeled by this parser: yes`
      : `Modeled by this parser: **no** (every leaf shows as a gap - this is a survey of the surface, not a defect list)`,
  );
  lines.push("");
  lines.push(`Leaf elements in XSD: **${leaves.length}** (${dedupeByQualified(leaves).length} distinct names)`);
  lines.push(
    `Likely gaps - distinct missing properties never referenced in our source: **${gaps.length}**` +
      (gapOccurrences.length !== gaps.length ? ` (${gapOccurrences.length} occurrences across choice branches)` : ""),
  );
  if (reviewGaps.length > 0) {
    lines.push(`Under resolver-handled subtrees (review, not counted): ${reviewGaps.length}`);
  }
  if (unmodeledGaps.length > 0) {
    lines.push(`Intentionally not modeled (excluded from gap count): ${unmodeledGaps.length}`);
  }
  lines.push("");

  // Breakdown by top-level section (first path segment) so large trees like
  // boreholeSampleAnalysis don't drown out core-metadata gaps.
  if (gaps.length > 0) {
    const bySection = new Map<string, number>();
    for (const g of gaps) {
      const seg = g.path.split("/").filter(Boolean)[0] ?? "(root)";
      bySection.set(seg, (bySection.get(seg) ?? 0) + 1);
    }
    const sorted = [...bySection.entries()].sort((a, b) => b[1] - a[1]);
    lines.push("## Gaps by section");
    lines.push("");
    lines.push("| Section | Gaps |");
    lines.push("| --- | --- |");
    for (const [seg, count] of sorted) lines.push(`| \`${seg}\` | ${count} |`);
    lines.push("");
    lines.push("## All gaps");
    lines.push("");
  }

  if (gaps.length === 0) {
    lines.push("No gaps. Every leaf element is referenced somewhere in the parser source.");
  } else {
    lines.push("| Element | Cardinality | Base type | XPath (from registration object) |");
    lines.push("| --- | --- | --- | --- |");
    for (const g of gaps) {
      lines.push(`| \`${g.qualified}\` | ${g.cardinality} | ${g.baseType} | \`${g.path}\` |`);
    }
  }
  lines.push("");

  if (reviewGaps.length > 0) {
    lines.push("## Resolver-handled subtrees (review)");
    lines.push("");
    lines.push(
      "These live under a subtree a resolver reads dynamically (e.g. the measurement " +
        "column set from `<parameters>`/`<values>`). They are almost certainly covered, " +
        "but verify the resolver maps each one.",
    );
    lines.push("");
    lines.push("| Element | XPath |");
    lines.push("| --- | --- |");
    for (const g of reviewGaps) {
      lines.push(`| \`${g.qualified}\` | \`${g.path}\` |`);
    }
    lines.push("");
  }

  if (unmodeledGaps.length > 0) {
    lines.push("## Intentionally not modeled");
    lines.push("");
    lines.push(
      "These are a deliberate scope boundary (see `unmodeledPrefixes` in the checker), " +
        "not missed properties. Listed for visibility; excluded from the gap count.",
    );
    lines.push("");
    lines.push("| Element | XPath |");
    lines.push("| --- | --- |");
    for (const g of unmodeledGaps) {
      lines.push(`| \`${g.qualified}\` | \`${g.path}\` |`);
    }
    lines.push("");
  }

  // Scaffold
  const scaffoldLines: string[] = [];
  scaffoldLines.push(`// Suggested SchemaField entries for ${domain.key} gaps.`);
  scaffoldLines.push(`// Generated by scripts/check-xsd-coverage.ts - review, rename, and adapt.`);
  scaffoldLines.push(`// XPaths are the raw XSD paths; resolvers are best-effort guesses.`);
  scaffoldLines.push("");
  const usedNames = new Set<string>();
  for (const g of gaps) {
    let fieldName = toFieldName(g.local);
    while (usedNames.has(fieldName)) fieldName += "_";
    usedNames.add(fieldName);
    const resolver = guessResolver(g.baseType);
    const xpath = "." + g.path; // path already starts with "/..."
    scaffoldLines.push(`  ${fieldName}: {`);
    scaffoldLines.push(`    xpath: "${xpath}",`);
    if (resolver) scaffoldLines.push(`    resolver: typeResolvers.${resolver},`);
    if (g.cardinality.endsWith("*")) scaffoldLines.push(`    // repeatable (${g.cardinality}) - likely needs a custom array resolver`);
    scaffoldLines.push(`  },`);
  }

  return {
    report: lines.join("\n") + "\n",
    scaffold: scaffoldLines.join("\n") + "\n",
    gapCount: gaps.length,
    total: leaves.length,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("BRO XSD coverage check\n");

  const covered = extractCoveredNames();
  console.log(
    `Covered element names harvested from source: ${covered.qualified.size} qualified, ${covered.bare.size} bare\n`,
  );

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const summary: { key: string; total: number; gaps: number; modeled: boolean }[] = [];

  for (const domain of DOMAINS) {
    console.log(`== ${domain.key} ==`);
    console.log(`  loading ${domain.messagesUrl}`);
    await loadSchema(domain.messagesUrl);

    const rootInfo = findRegistrationObjectType(domain.messagesUrl);
    if (!rootInfo) {
      console.warn(`  ! could not find registration object element - skipping`);
      continue;
    }
    console.log(`  registration object: ${rootInfo.name} (${rootInfo.type.local})`);

    const deduped = flattenRoot(rootInfo.type);
    if (deduped.length === 0) {
      console.warn(`  ! type ${rootInfo.type.local} not found or empty - skipping`);
      continue;
    }

    const { report, scaffold, gapCount, total } = buildReport(
      domain,
      rootInfo.name,
      deduped,
      covered,
    );

    const slug = domain.key.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Full flattened leaf list (every property, not just gaps). This is the
    // starting point for modeling a new registration type from the XSD: it lists
    // each leaf with its cardinality, base type, and example XPath - including
    // leaves whose names collide with an already-modeled domain (which the gap
    // report hides). Written for every domain so it's always current.
    fs.writeFileSync(
      path.join(OUT_DIR, `${slug}.leaves.md`),
      buildLeafList(domain, rootInfo.name, deduped),
      "utf-8",
    );
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.report.md`), report, "utf-8");
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.scaffold.ts`), scaffold, "utf-8");

    console.log(`  leaves: ${total}, gaps: ${gapCount} -> ${slug}.report.md\n`);
    summary.push({ key: domain.key, total, gaps: gapCount, modeled: domain.modeled });
  }

  console.log("=".repeat(60));
  console.log("Summary");
  console.log("=".repeat(60));
  for (const s of summary) {
    const note = s.modeled ? "" : "  (not modeled yet)";
    console.log(`  ${s.key.padEnd(8)} ${String(s.gaps).padStart(4)} gaps / ${s.total} leaves${note}`);
  }
  console.log(`\nReports + scaffolds written to ${path.relative(process.cwd(), OUT_DIR)}/`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
