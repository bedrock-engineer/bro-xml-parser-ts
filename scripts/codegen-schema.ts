#!/usr/bin/env npx tsx
/**
 * Schema codegen — generation-primary, curation keyed during the walk.
 *
 * Walks the XSD type tree (`buildTree`) and emits a nested producer schema. Type
 * rules (domain→code, PointType→gmlLocation, date/number/boolean) are applied
 * inline as leaves are emitted; structural warts are supplied by a per-type
 * curation config consulted at each node (hide raw nodes, inject hand-written
 * producers). Generation fills every node the curation table is silent on.
 *
 * Usage: npx tsx scripts/codegen-schema.ts
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  SCHEMA_HOST,
  loadSchema,
  findRegistrationObjectType,
  buildTree,
  baseTypeToCombinator,
  type TreeNode,
} from "./lib/bro-xsd.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Curation config
// ---------------------------------------------------------------------------

interface Container {
  /** Child field names to drop (raw XSD nodes replaced by curation). */
  hide?: Set<string>;
  /** Curated fields appended to this container: fieldName → producer expression. */
  add?: Record<string, string>;
}

interface Curation {
  /**
   * Escape hatch for `xsd:string` leaves that are really booleans but aren't the
   * `IndicationYesNo*` type (which the walker already maps to boolean). By field name.
   */
  booleanFields?: Set<string>;
  /** Keyed by a container node's `path`. */
  containers: Record<string, Container>;
  /** Import lines the generated file needs for the curated expressions. */
  imports: string[];
}

interface SchemaTarget {
  key: string;
  messagesUrl: string;
  out: string;
  producerConst: string;
  curation: Curation;
}

const CPT: SchemaTarget = {
  key: "CPT",
  messagesUrl: `https://${SCHEMA_HOST}/xsd/dscpt/1.1/dscpt-messages.xsd`,
  out: path.join(__dirname, "../src/schemas/cpt-schema.ts"),
  producerConst: "CPT_PRODUCER",
  curation: {
    // Booleans are detected by their IndicationYesNo* XSD type — no list needed.
    containers: {
      "/dscpt:conePenetrometerSurvey": {
        // Raw nodes the codegen can't decode (opaque swe/om) — replaced by curation.
        hide: new Set(["conePenetrationTest", "dissipationTest", "parameters"]),
        add: {
          // XSD-faithful: the observation object, and singular repeated-element names.
          conePenetrationTest: "CONE_PENETRATION_TEST",
          dissipationTest: "DISSIPATION_TESTS",
        },
      },
    },
    imports: ['import { CONE_PENETRATION_TEST, DISSIPATION_TESTS } from "./cpt-curation.js";'],
  },
};

const BHRGT: SchemaTarget = {
  key: "BHR-GT",
  messagesUrl: `https://${SCHEMA_HOST}/xsd/dsbhr-gt/2.1/dsbhr-gt-messages.xsd`,
  out: path.join(__dirname, "../src/schemas/bore-schema.ts"),
  producerConst: "BORE_PRODUCER",
  curation: {
    containers: {
      // Root: the BHR-GT-BMA lab-analysis subtree stays hand-curated (columns,
      // determination dispatch) — inject the existing producer, hide the raw node.
      "": {
        hide: new Set(["boreholeSampleAnalysis"]),
        add: { analysis: "ANALYSIS_PRODUCER" },
      },
    },
    imports: ['import { ANALYSIS_PRODUCER } from "./bhrgt-analysis.js";'],
  },
};

const BHRG: SchemaTarget = {
  key: "BHR-G",
  messagesUrl: `https://${SCHEMA_HOST}/xsd/dsbhrg/3.1/dsbhr-g-messages.xsd`,
  out: path.join(__dirname, "../src/schemas/bhrg-schema.ts"),
  producerConst: "BHRG_PRODUCER",
  // BHR-G has no warts — no opaque swe/om blobs, no oneOf, no columns. Pure generation,
  // including the boreholeSampleAnalysis lab subtree (214 leaves, fully typed from the XSD).
  curation: { containers: {}, imports: [] },
};

const GMW: SchemaTarget = {
  key: "GMW",
  messagesUrl: `https://${SCHEMA_HOST}/xsd/dsgmw/1.1/dsgmw-messages.xsd`,
  out: path.join(__dirname, "../src/schemas/gmw-schema.ts"),
  producerConst: "GMW_PRODUCER",
  // No warts — no opaque swe/om blobs, no oneOf, no columns. The per-event `eventData`
  // diff and the `survey` cross-references generate faithfully from the XSD.
  curation: { containers: {}, imports: [] },
};

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

const usedCombinators = new Set<string>();
/** Set when a field key isn't a bare identifier (needs the naming-convention disable). */
let usedQuotedKey = false;

function leafCombinator(node: TreeNode, cur: Curation): string {
  // Curation/type overrides the codegen can't infer from the base type alone.
  if (cur.booleanFields?.has(node.name)) return "boolean";
  if (node.domain) return "code";
  // GML point geometry: `PointType` or its `PointPropertyType` wrapper.
  if (/^point/i.test(node.baseType ?? "")) return "gmlLocation";
  // Everything else is the shared xsd-base-type → combinator mapping.
  return baseTypeToCombinator(node.baseType ?? "string");
}

function fieldExpr(node: TreeNode, cur: Curation, indent: string): string {
  // Descend through a GML property/object wrapper element when present (BHR-G).
  const step = `./${node.qualified}${node.wrapper ? `/${node.wrapper}` : ""}`;
  const at = `"${step}"`;
  const each = `"${step}"`;

  if (node.kind === "leaf") {
    const comb = leafCombinator(node, cur);
    usedCombinators.add(comb);
    if (node.array) {
      usedCombinators.add("array");
      return `array({ each: ${each}, item: ${comb}() })`;
    }
    return `${comb}(${at})`;
  }

  // object
  const inner = emitFields(node.children ?? [], node.path, cur, indent + "  ");
  usedCombinators.add("object");
  if (node.array) {
    usedCombinators.add("array");
    return `array({ each: ${each}, item: object({ fields: {\n${inner}\n${indent}} }) })`;
  }
  return `object({ at: ${at}, fields: {\n${inner}\n${indent}} })`;
}

/** Quote a field name that isn't a bare JS identifier (BRO has names like `fraction0to0.2um`). */
function fieldKey(name: string): string {
  if (/^[A-Za-z_$][\w$]*$/.test(name)) return name;
  usedQuotedKey = true;
  return JSON.stringify(name);
}

function emitFields(nodes: TreeNode[], containerPath: string, cur: Curation, indent: string): string {
  const container = cur.containers[containerPath];
  const hide = container?.hide ?? new Set<string>();
  const seen = new Set<string>();
  const lines: string[] = [];

  for (const node of nodes) {
    if (seen.has(node.name) || hide.has(node.name)) continue;
    seen.add(node.name);
    lines.push(`${indent}${fieldKey(node.name)}: ${fieldExpr(node, cur, indent)},`);
  }
  for (const [name, expr] of Object.entries(container?.add ?? {})) {
    lines.push(`${indent}${name}: ${expr},`);
  }
  return lines.join("\n");
}

async function generate(target: SchemaTarget): Promise<void> {
  await loadSchema(target.messagesUrl);
  const root = findRegistrationObjectType(target.messagesUrl);
  if (!root) throw new Error(`No registration object for ${target.key}`);
  const tree = buildTree(root.type);

  usedCombinators.clear();
  usedQuotedKey = false;
  const fields = emitFields(tree, "", target.curation, "    ");
  const combinators = [...usedCombinators].filter((c) => c !== "gmlLocation").sort();
  const needsGml = usedCombinators.has("gmlLocation");
  // Only files with non-identifier field names (e.g. BHR-G's `fraction0to0.2um`) need
  // the naming-convention disable; emitting it elsewhere trips no-unused-disable.
  const namingDisable = usedQuotedKey
    ? "\n/* eslint-disable @typescript-eslint/naming-convention -- field keys are XSD element names (e.g. `fraction0to0.2um`) */"
    : "";

  const header = `/**
 * ${target.key} schema — GENERATED from the official XSD by scripts/codegen-schema.ts.
 * Do not edit by hand. Structural warts are supplied by ./${path.basename(target.out).replace("-schema.ts", "-curation.ts")}.
 *
 * @generated from ${target.messagesUrl}
 */${namingDisable}

import { ${combinators.join(", ")} } from "../core/producer.js";
${needsGml ? 'import { gmlLocation } from "./common-fields.js";\n' : ""}${target.curation.imports.join("\n")}

export const ${target.producerConst} = object({
  fields: {
${fields}
  },
});
`;

  fs.writeFileSync(target.out, header, "utf-8");
  console.log(`${target.key}: wrote ${path.relative(process.cwd(), target.out)}`);
}

const GLD: SchemaTarget = {
  key: "GLD",
  messagesUrl: `https://${SCHEMA_HOST}/xsd/dsgld/1.0/dsgld-messages.xsd`,
  out: path.join(__dirname, "../src/schemas/gld-schema.ts"),
  producerConst: "GLD_PRODUCER",
  curation: {
    containers: {
      // `observation` is an OGC om:OM_Observation with an untyped WaterML2 result and
      // href-keyed metadata — unwalkable by the XSD codegen; supply it hand-written.
      "": {
        hide: new Set(["observation"]),
        add: { observation: "OBSERVATIONS" },
      },
    },
    imports: ['import { OBSERVATIONS } from "./gld-curation.js";'],
  },
};

await generate(CPT);
await generate(BHRGT);
await generate(BHRG);
await generate(GMW);
await generate(GLD);
