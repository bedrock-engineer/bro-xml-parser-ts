/* THROWAWAY PROBE — measures XSD-doc + @group harvest coverage. Delete after.
   usage: npx tsx scripts/probe-docs.ts gld|bhrgt */
import { loadSchema, findRegistrationObjectType, flattenRoot, type Leaf } from "./lib/bro-xsd.js";
import { GLD_PRODUCER } from "../src/schemas/gld-schema.js";
import { BORE_PRODUCER } from "../src/schemas/bore-schema.js";

const OPAQUE = new Set(["om", "wml2", "gml", "swe", "xlink", "xsi"]);

const DOMAIN = (process.argv[2] ?? "gld").toLowerCase();
const CFG: Record<string, { url: string; producer: any }> = {
  gld: { url: "https://schema.broservices.nl/xsd/dsgld/1.0/dsgld-messages.xsd", producer: GLD_PRODUCER },
  bhrgt: { url: "https://schema.broservices.nl/xsd/dsbhr-gt/2.1/dsbhr-gt-messages.xsd", producer: BORE_PRODUCER },
};

function join(parent: string, at: string): string {
  const seg = at.replace(/^\.\//, "").replace(/^\//, "");
  return parent === "" ? "/" + seg : parent + "/" + seg;
}

type Field = { key: string; path: string; kind: string };
function walk(p: any, parent: string, key: string, out: Field[]): void {
  const at: string | undefined = p.at;
  if (p.kind === "object") {
    const base = at ? join(parent, at) : parent;
    for (const [k, child] of Object.entries<any>(p.fields)) walk(child, base, k, out);
  } else if (p.kind === "array") {
    const base = p.each ? join(at ? join(parent, at) : parent, p.each) : parent;
    walk(p.item, base, key, out);
  } else if (p.kind === "oneOf") {
    const base = at ? join(parent, at) : parent;
    for (const [k, child] of Object.entries<any>(p.base ?? {})) walk(child, base, k, out);
    for (const br of p.branches ?? []) {
      const bBase = br.at ? join(base, br.at) : base;
      for (const [k, child] of Object.entries<any>(br.fields ?? {})) walk(child, bBase, k, out);
    }
  } else if (p.kind === "scalar") {
    out.push({ key, path: at ? join(parent, at) : parent, kind: "scalar" });
  } else if (p.kind === "custom") {
    out.push({ key, path: at ? join(parent, at) : parent, kind: "custom" });
  }
}

function lastSeg(path: string): string {
  return path.split("/").filter(Boolean).slice(-1)[0] ?? "";
}

async function main() {
  const { url, producer } = CFG[DOMAIN]!;
  await loadSchema(url);
  const root = findRegistrationObjectType(url)!;
  const leaves = flattenRoot(root.type);

  const withDoc = leaves.filter((l) => l.doc);
  console.log(`\n=== XSD-SIDE CEILING (${DOMAIN.toUpperCase()}) ===`);
  console.log(`distinct leaves: ${leaves.length} | with xs:documentation: ${withDoc.length} (${Math.round((100 * withDoc.length) / leaves.length)}%)`);

  const byQual = new Map<string, Leaf>();
  for (const l of leaves) if (!byQual.has(l.qualified)) byQual.set(l.qualified, l);

  const fields: Field[] = [];
  walk(producer, "", "$root", fields);

  let doc = 0, leafNoDoc = 0, opaqueGap = 0, customGap = 0, noLeaf = 0;
  for (const f of fields) {
    const seg = lastSeg(f.path);
    const prefix = seg.split(":")[0] ?? "";
    if (f.kind === "custom") { customGap++; continue; }
    if (OPAQUE.has(prefix)) { opaqueGap++; continue; }
    const hit = byQual.get(seg);
    if (!hit) { noLeaf++; continue; }
    if (hit.doc) doc++; else leafNoDoc++;
  }

  const total = fields.length;
  console.log(`\n=== PRODUCER-JOIN (${total} walkable output leaf fields) ===`);
  console.log(`  documented from XSD : ${doc}  (${Math.round((100 * doc) / total)}% of walkable)`);
  console.log(`  BRO leaf, no doc    : ${leafNoDoc}`);
  console.log(`  no matching leaf    : ${noLeaf}  (attributes / unwrapped-path mismatch)`);
  console.log(`  opaque-ns gap       : ${opaqueGap}`);
  console.log(`  custom-producer gap : ${customGap}`);
}
main();
