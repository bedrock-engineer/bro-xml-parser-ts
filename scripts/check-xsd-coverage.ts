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
 * The point: BRO's XSDs are the authoritative, closed set of every property a
 * document can carry. Diffing against them turns "we keep discovering missed
 * properties" into an exhaustive, repeatable check.
 *
 * Output (written to scripts/xsd-coverage-out/):
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
import { DOMParser } from "@xmldom/xmldom";
import { BRO_NAMESPACES } from "../src/namespaces.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const XSD_NS = "http://www.w3.org/2001/XMLSchema";
const SCHEMA_HOST = "schema.broservices.nl";
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
    key: "SFR",
    messagesUrl: `https://${SCHEMA_HOST}/xsd/dssfr/2.0/dssfr-messages.xsd`,
    modeled: false,
  },
];

/**
 * Namespaces we do NOT descend into - treated as opaque leaves. These are the
 * geospatial/standard namespaces handled by dedicated resolvers (gml-resolvers),
 * plus XLink. Everything under broservices.nl is BRO domain content we care about.
 */
const OPAQUE_NS_HINTS = [
  "opengis.net",
  "w3.org/1999/xlink",
  "w3.org/2001/XMLSchema",
];

// ---------------------------------------------------------------------------
// URI <-> prefix mapping
// ---------------------------------------------------------------------------

/** Invert BRO_NAMESPACES: uri -> our canonical prefix. */
const URI_TO_PREFIX = new Map<string, string>();
for (const [prefix, uri] of Object.entries(BRO_NAMESPACES)) {
  if (!URI_TO_PREFIX.has(uri)) URI_TO_PREFIX.set(uri, prefix);
}

/** Derive a stable prefix for a BRO namespace URI we don't have a canonical one for. */
function prefixForUri(uri: string): string {
  const known = URI_TO_PREFIX.get(uri);
  if (known) return known;
  // http://www.broservices.nl/xsd/sfrcommon/2.0 -> "sfrcommon"
  const m = uri.match(/\/xsd\/([^/]+)\//);
  if (m) return m[1];
  return uri;
}

function isBroNamespace(uri: string | null | undefined): boolean {
  return !!uri && uri.includes("broservices.nl");
}

function isOpaqueNamespace(uri: string | null | undefined): boolean {
  if (!uri) return true;
  return OPAQUE_NS_HINTS.some((h) => uri.includes(h));
}

// ---------------------------------------------------------------------------
// XSD fetching + assembly
// ---------------------------------------------------------------------------

interface LoadedDoc {
  url: string;
  doc: Document;
  targetNamespace: string;
  /** prefix -> uri declared on the schema root */
  prefixMap: Map<string, string>;
  defaultNs: string | null;
}

const fetchCache = new Map<string, string>();

async function fetchText(url: string): Promise<string> {
  const cached = fetchCache.get(url);
  if (cached !== undefined) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  const text = await res.text();
  fetchCache.set(url, text);
  return text;
}

/** All loaded schema docs, keyed by absolute URL. */
const loadedDocs = new Map<string, LoadedDoc>();

/** Global registries keyed by `${uri}::${localName}`. */
const complexTypes = new Map<string, Element>();
const simpleTypes = new Map<string, Element>();
const globalElements = new Map<string, Element>();

function typeKey(uri: string, local: string): string {
  return `${uri}::${local}`;
}

function buildPrefixMap(schemaEl: Element): { prefixMap: Map<string, string>; defaultNs: string | null } {
  const prefixMap = new Map<string, string>();
  let defaultNs: string | null = null;
  const attrs = schemaEl.attributes;
  for (let i = 0; i < attrs.length; i++) {
    const a = attrs.item(i)!;
    if (a.name === "xmlns") defaultNs = a.value;
    else if (a.name.startsWith("xmlns:")) prefixMap.set(a.name.slice(6), a.value);
  }
  return { prefixMap, defaultNs };
}

function childElements(parent: Element, localName: string): Element[] {
  const out: Element[] = [];
  const nodes = parent.getElementsByTagNameNS(XSD_NS, localName);
  for (let i = 0; i < nodes.length; i++) out.push(nodes.item(i) as unknown as Element);
  return out;
}

/** Direct XSD children (not descendants) with the given local name. */
function directChildElements(parent: Element, localName: string): Element[] {
  const out: Element[] = [];
  const kids = parent.childNodes;
  for (let i = 0; i < kids.length; i++) {
    const n = kids.item(i);
    if (n && n.nodeType === 1) {
      const el = n as unknown as Element;
      if (el.namespaceURI === XSD_NS && el.localName === localName) out.push(el);
    }
  }
  return out;
}

async function loadSchema(url: string): Promise<void> {
  if (loadedDocs.has(url)) return;

  let text: string;
  try {
    text = await fetchText(url);
  } catch (err) {
    console.warn(`  ! skip ${url}: ${(err as Error).message}`);
    return;
  }

  const doc = new DOMParser().parseFromString(text, "text/xml") as unknown as Document;
  const schemaEl = doc.getElementsByTagNameNS(XSD_NS, "schema").item(0) as unknown as Element | null;
  if (!schemaEl) {
    console.warn(`  ! no <schema> root in ${url}`);
    return;
  }

  const targetNamespace = schemaEl.getAttribute("targetNamespace") ?? "";
  const { prefixMap, defaultNs } = buildPrefixMap(schemaEl);

  const loaded: LoadedDoc = { url, doc, targetNamespace, prefixMap, defaultNs };
  loadedDocs.set(url, loaded);

  // Register named types + global elements from this document.
  for (const ct of childElements(schemaEl, "complexType")) {
    const name = ct.getAttribute("name");
    if (name) complexTypes.set(typeKey(targetNamespace, name), ct);
  }
  for (const st of childElements(schemaEl, "simpleType")) {
    const name = st.getAttribute("name");
    if (name) simpleTypes.set(typeKey(targetNamespace, name), st);
  }
  for (const el of directChildElements(schemaEl, "element")) {
    const name = el.getAttribute("name");
    if (name) globalElements.set(typeKey(targetNamespace, name), el);
  }

  // Follow imports/includes that live on the BRO schema host only.
  const refs: string[] = [];
  for (const imp of childElements(schemaEl, "import")) {
    const loc = imp.getAttribute("schemaLocation");
    const ns = imp.getAttribute("namespace");
    if (loc && (isBroNamespace(ns) || loc.includes(SCHEMA_HOST) || !/^https?:/.test(loc))) {
      refs.push(loc);
    }
  }
  for (const inc of childElements(schemaEl, "include")) {
    const loc = inc.getAttribute("schemaLocation");
    if (loc) refs.push(loc);
  }

  for (const ref of refs) {
    const abs = new URL(ref, url).toString();
    if (abs.includes(SCHEMA_HOST) || abs.startsWith("http")) {
      await loadSchema(abs);
    }
  }
}

// ---------------------------------------------------------------------------
// QName resolution
// ---------------------------------------------------------------------------

interface QName {
  uri: string;
  local: string;
}

function resolveQName(qname: string, contextDocUrl: string): QName | null {
  const loaded = loadedDocs.get(contextDocUrl);
  if (!loaded) return null;
  const idx = qname.indexOf(":");
  if (idx === -1) {
    return { uri: loaded.defaultNs ?? "", local: qname };
  }
  const prefix = qname.slice(0, idx);
  const local = qname.slice(idx + 1);
  const uri = loaded.prefixMap.get(prefix);
  if (!uri) return null;
  return { uri, local };
}

/** Which loaded doc does an element belong to? (by walking to its schema root url) */
const elementToUrl = new WeakMap<Element, string>();
function docUrlOf(el: Element): string {
  const cached = elementToUrl.get(el);
  if (cached) return cached;
  // Find the owning LoadedDoc by identity of ownerDocument.
  for (const [url, loaded] of loadedDocs) {
    if (el.ownerDocument === loaded.doc) {
      elementToUrl.set(el, url);
      return url;
    }
  }
  return "";
}

// ---------------------------------------------------------------------------
// Flattening
// ---------------------------------------------------------------------------

interface Leaf {
  /** prefix:localName using our canonical prefixes */
  qualified: string;
  local: string;
  /** example XPath from the registration object down to this leaf */
  path: string;
  /** min..max occurrence (max "unbounded" -> "*") */
  cardinality: string;
  /** best-effort xsd base type local name (e.g. "date", "decimal", "boolean") */
  baseType: string;
}

const MAX_DEPTH = 40;

/** Resolve an xsd:simpleType (or builtin ref) down to a builtin base local name. */
function resolveSimpleBase(uri: string, local: string, seen: Set<string>): string {
  if (uri === XSD_NS) return local;
  const key = typeKey(uri, local);
  if (seen.has(key)) return local;
  seen.add(key);
  const st = simpleTypes.get(key);
  if (!st) return local;
  const restriction = directChildElements(st, "restriction")[0];
  if (restriction) {
    const base = restriction.getAttribute("base");
    if (base) {
      const q = resolveQName(base, docUrlOf(st));
      if (q) return resolveSimpleBase(q.uri, q.local, seen);
    }
  }
  // union / list -> just report "string-like"
  return local;
}

/** Determine the base type local name for a leaf element's type. */
function leafBaseType(typeQ: QName | null, inlineType: Element | null): string {
  if (inlineType) {
    if (inlineType.localName === "simpleType") {
      const restriction = directChildElements(inlineType, "restriction")[0];
      if (restriction) {
        const base = restriction.getAttribute("base");
        if (base) {
          const q = resolveQName(base, docUrlOf(inlineType));
          if (q) return resolveSimpleBase(q.uri, q.local, new Set());
        }
      }
    }
    // inline complexType with simpleContent
    const simpleContent = directChildElements(inlineType, "simpleContent")[0];
    if (simpleContent) {
      const ext = directChildElements(simpleContent, "extension")[0] ?? directChildElements(simpleContent, "restriction")[0];
      const base = ext?.getAttribute("base");
      if (base) {
        const q = resolveQName(base, docUrlOf(inlineType));
        if (q) return resolveSimpleBase(q.uri, q.local, new Set());
      }
    }
    return "complex";
  }
  if (!typeQ) return "unknown";
  if (typeQ.uri === XSD_NS) return typeQ.local;
  if (simpleTypes.has(typeKey(typeQ.uri, typeQ.local))) {
    return resolveSimpleBase(typeQ.uri, typeQ.local, new Set());
  }
  // complexType with simpleContent -> value-bearing leaf
  const ct = complexTypes.get(typeKey(typeQ.uri, typeQ.local));
  if (ct) {
    const simpleContent = directChildElements(ct, "simpleContent")[0];
    if (simpleContent) {
      const ext = directChildElements(simpleContent, "extension")[0] ?? directChildElements(simpleContent, "restriction")[0];
      const base = ext?.getAttribute("base");
      if (base) {
        const q = resolveQName(base, docUrlOf(ct));
        if (q) return resolveSimpleBase(q.uri, q.local, new Set());
      }
    }
  }
  return typeQ.local;
}

/**
 * GML/BRO property-type idiom: `XxxPropertyType` is a wrapper complexType holding
 * a single object element (e.g. BoreholeSampleAnalysisPropertyType -> element
 * BoreholeSampleAnalysis). We unwrap it so the capitalized wrapper element doesn't
 * pollute paths ("boreholeSampleAnalysis/BoreholeSampleAnalysis/..."). Returns the
 * real content's type (and inline type element), or null if it isn't a wrapper.
 */
function unwrapProperty(typeQ: QName): { typeQ: QName | null; inline: Element | null } | null {
  if (!/PropertyType$/.test(typeQ.local)) return null;
  const ct = complexTypes.get(typeKey(typeQ.uri, typeQ.local));
  if (!ct) return null;
  const parts = collectParticleElements(ct);
  if (parts.length !== 1) return null; // xlink-only or multi-child -> not a simple wrapper
  const child = parts[0];
  const ownerUrl = docUrlOf(ct);
  const ref = child.getAttribute("ref");
  if (ref) {
    const q = resolveQName(ref, ownerUrl);
    if (!q) return null;
    const g = globalElements.get(typeKey(q.uri, q.local));
    if (g) {
      const t = g.getAttribute("type");
      const inline =
        directChildElements(g, "complexType")[0] ?? directChildElements(g, "simpleType")[0] ?? null;
      return { typeQ: t ? resolveQName(t, docUrlOf(g)) : null, inline };
    }
    return null;
  }
  const t = child.getAttribute("type");
  const inline =
    directChildElements(child, "complexType")[0] ?? directChildElements(child, "simpleType")[0] ?? null;
  return { typeQ: t ? resolveQName(t, ownerUrl) : null, inline };
}

/**
 * True if the element's type is a complexType (named or inline) that extends
 * brocom:PartialDateType - i.e. it IS a partial date with extra attributes.
 */
function isPartialDateExtension(typeQ: QName | null, inlineType: Element | null): boolean {
  const ct =
    inlineType && inlineType.localName === "complexType"
      ? inlineType
      : typeQ
        ? complexTypes.get(typeKey(typeQ.uri, typeQ.local)) ?? null
        : null;
  if (!ct) return false;
  const cc = directChildElements(ct, "complexContent")[0];
  const ext = cc ? directChildElements(cc, "extension")[0] : undefined;
  const base = ext?.getAttribute("base");
  if (!base) return false;
  const q = resolveQName(base, docUrlOf(ct));
  return !!q && /PartialDate/i.test(q.local);
}

/** Does this complexType have element children (i.e. is it worth recursing into)? */
function complexTypeHasElements(ct: Element): boolean {
  return (
    childElements(ct, "element").length > 0 ||
    directChildElements(ct, "complexContent").length > 0
  );
}

/**
 * Flatten a complexType's element particles into leaves, recursing into BRO
 * complexTypes and stopping at opaque namespaces / simple types / simpleContent.
 */
function flattenComplexType(
  ct: Element,
  pathPrefix: string,
  leaves: Leaf[],
  seenTypes: Set<string>,
  depth: number,
): void {
  if (depth > MAX_DEPTH) return;

  // complexContent extension: pull in base type's particles first.
  for (const cc of directChildElements(ct, "complexContent")) {
    const ext = directChildElements(cc, "extension")[0] ?? directChildElements(cc, "restriction")[0];
    if (ext) {
      const base = ext.getAttribute("base");
      if (base) {
        const q = resolveQName(base, docUrlOf(ct));
        if (q && isBroNamespace(q.uri)) {
          const baseCt = complexTypes.get(typeKey(q.uri, q.local));
          const bk = typeKey(q.uri, q.local);
          if (baseCt && !seenTypes.has(bk)) {
            const nextSeen = new Set(seenTypes);
            nextSeen.add(bk);
            flattenComplexType(baseCt, pathPrefix, leaves, nextSeen, depth + 1);
          }
        }
      }
      // process the extension's own particles below (recurse into ext as if a type body)
      processParticles(ext, pathPrefix, leaves, seenTypes, depth);
    }
  }

  processParticles(ct, pathPrefix, leaves, seenTypes, depth);
}

/** Walk sequence/choice/all particles under a container element (complexType or extension). */
function processParticles(
  container: Element,
  pathPrefix: string,
  leaves: Leaf[],
  seenTypes: Set<string>,
  depth: number,
): void {
  // Collect element particles that are descendants of this container but not nested
  // inside a child complexType. We only descend through model-group elements.
  const elements = collectParticleElements(container);

  for (const el of elements) {
    handleElementParticle(el, pathPrefix, leaves, seenTypes, depth);
  }
}

/**
 * Collect xs:element particles belonging directly to `container`'s model group,
 * skipping any elements that live inside a nested inline complexType/simpleType
 * (those belong to a child element's own type and are handled by recursion).
 */
function collectParticleElements(container: Element): Element[] {
  const out: Element[] = [];
  const walk = (node: Element) => {
    const kids = node.childNodes;
    for (let i = 0; i < kids.length; i++) {
      const n = kids.item(i);
      if (!n || n.nodeType !== 1) continue;
      const el = n as unknown as Element;
      if (el.namespaceURI !== XSD_NS) continue;
      switch (el.localName) {
        case "element":
          out.push(el);
          break;
        case "sequence":
        case "choice":
        case "all":
        case "group":
          walk(el);
          break;
        default:
          // complexType, simpleType, annotation, attribute, etc. -> don't descend
          break;
      }
    }
  };
  walk(container);
  return out;
}

function handleElementParticle(
  el: Element,
  pathPrefix: string,
  leaves: Leaf[],
  seenTypes: Set<string>,
  depth: number,
): void {
  const ref = el.getAttribute("ref");
  let name: string | null = el.getAttribute("name");
  let typeAttr: string | null = el.getAttribute("type");
  let elemNs = "";
  let ownerUrl = docUrlOf(el);
  let inlineType: Element | null =
    directChildElements(el, "complexType")[0] ?? directChildElements(el, "simpleType")[0] ?? null;

  if (ref && !name) {
    const q = resolveQName(ref, ownerUrl);
    if (q) {
      const globalEl = globalElements.get(typeKey(q.uri, q.local));
      if (globalEl) {
        name = globalEl.getAttribute("name");
        typeAttr = globalEl.getAttribute("type");
        elemNs = q.uri;
        ownerUrl = docUrlOf(globalEl);
        inlineType =
          directChildElements(globalEl, "complexType")[0] ??
          directChildElements(globalEl, "simpleType")[0] ??
          inlineType;
      } else {
        name = q.local;
        elemNs = q.uri;
      }
    }
  } else {
    // Locally declared element belongs to its schema's targetNamespace.
    elemNs = loadedDocs.get(ownerUrl)?.targetNamespace ?? "";
  }

  if (!name) return;

  const prefix = prefixForUri(elemNs);
  const qualified = `${prefix}:${name}`;
  const path = `${pathPrefix}/${qualified}`;
  const cardinality = `${el.getAttribute("minOccurs") ?? "1"}..${
    el.getAttribute("maxOccurs") === "unbounded" ? "*" : el.getAttribute("maxOccurs") ?? "1"
  }`;

  // Resolve the element's type, unwrapping GML property-type wrappers.
  let typeQ = typeAttr ? resolveQName(typeAttr, ownerUrl) : null;
  let effInline = inlineType;
  for (let guard = 0; typeQ && isBroNamespace(typeQ.uri) && guard < 6; guard++) {
    const unwrapped = unwrapProperty(typeQ);
    if (!unwrapped) break;
    typeQ = unwrapped.typeQ;
    if (unwrapped.inline) effInline = unwrapped.inline;
  }

  // BRO partial-date fields (PartialDateType: choice of date/yearMonth/year/voidReason)
  // are parsed wholesale by the parseDate resolver - collapse to a single leaf.
  // Matches the type directly OR an (inline/named) complexType that extends it
  // (e.g. BHR-G verticalPositioningDate adds a nilReason attribute).
  if ((typeQ && /PartialDate/i.test(typeQ.local)) || isPartialDateExtension(typeQ, effInline)) {
    leaves.push({ qualified, local: name, path, cardinality, baseType: "date" });
    return;
  }

  // Decide: leaf or recurse.
  const typeIsBroComplex =
    typeQ &&
    isBroNamespace(typeQ.uri) &&
    complexTypes.has(typeKey(typeQ.uri, typeQ.local)) &&
    complexTypeHasElements(complexTypes.get(typeKey(typeQ.uri, typeQ.local))!) &&
    // simpleContent complexTypes are value-bearing leaves (direct child only)
    directChildElements(complexTypes.get(typeKey(typeQ.uri, typeQ.local))!, "simpleContent").length === 0;

  const inlineIsComplex =
    effInline && effInline.localName === "complexType" && complexTypeHasElements(effInline) &&
    directChildElements(effInline, "simpleContent").length === 0;

  if (typeIsBroComplex) {
    const ck = typeKey(typeQ!.uri, typeQ!.local);
    if (seenTypes.has(ck)) {
      // recursive type - record as leaf to avoid infinite loop
      leaves.push({ qualified, local: name, path, cardinality, baseType: "recursive" });
      return;
    }
    const nextSeen = new Set(seenTypes);
    nextSeen.add(ck);
    flattenComplexType(complexTypes.get(ck)!, path, leaves, nextSeen, depth + 1);
    return;
  }

  if (inlineIsComplex) {
    flattenComplexType(effInline!, path, leaves, new Set(seenTypes), depth + 1);
    return;
  }

  // Opaque-namespace types (gml/swe/om) and simple types -> leaf.
  const baseType = leafBaseType(typeQ, effInline);
  leaves.push({ qualified, local: name, path, cardinality, baseType });
}

// ---------------------------------------------------------------------------
// Registration object discovery
// ---------------------------------------------------------------------------

function findRegistrationObjectType(messagesUrl: string): { name: string; type: QName } | null {
  const loaded = loadedDocs.get(messagesUrl);
  if (!loaded) return null;
  const schemaEl = loaded.doc.getElementsByTagNameNS(XSD_NS, "schema").item(0) as unknown as Element;

  const candidates: { name: string; type: QName }[] = [];
  for (const el of directChildElements(schemaEl, "element")) {
    const sub = el.getAttribute("substitutionGroup") ?? "";
    const name = el.getAttribute("name") ?? "";
    const typeAttr = el.getAttribute("type");
    if (!typeAttr) continue;
    if (sub.endsWith("RegistrationObject") && name) {
      const q = resolveQName(typeAttr, messagesUrl);
      if (q) candidates.push({ name, type: q });
    }
  }
  // Prefer the plain `_O` object (not `_O_DP` dispatch-only or `_C` characteristics).
  candidates.sort((a, b) => scoreObj(a.name) - scoreObj(b.name));
  return candidates[0] ?? null;
}

function scoreObj(name: string): number {
  if (/_O$/.test(name)) return 0;
  if (/_O_/.test(name)) return 2;
  return 1;
}

// ---------------------------------------------------------------------------
// Covered-name extraction from our source
// ---------------------------------------------------------------------------

const KNOWN_PREFIXES = new Set<string>([
  ...Object.keys(BRO_NAMESPACES),
  "cptcom",
  "sfrcommon",
  "sfrcom",
  "dssfr",
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
// Resolver guessing for scaffold
// ---------------------------------------------------------------------------

function guessResolver(baseType: string): string | null {
  const t = baseType.toLowerCase();
  if (t.includes("date") || t.includes("time") || t.startsWith("gyear")) return "parseDate";
  if (t === "boolean") return "parseBoolean";
  if (t.includes("integer") || t === "int" || t === "long" || t === "nonnegativeinteger")
    return "parseInt";
  if (t === "decimal" || t === "double" || t === "float" || t.includes("measure")) return "parseFloat";
  return null;
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function dedupeLeaves(leaves: Leaf[]): Leaf[] {
  const seen = new Set<string>();
  const out: Leaf[] = [];
  for (const l of leaves) {
    if (seen.has(l.path)) continue;
    seen.add(l.path);
    out.push(l);
  }
  return out;
}

/** Dedupe by qualified element name, keeping the shortest example path. */
function dedupeByQualified(leaves: Leaf[]): Leaf[] {
  const byName = new Map<string, Leaf>();
  for (const l of leaves) {
    const existing = byName.get(l.qualified);
    if (!existing || l.path.length < existing.path.length) byName.set(l.qualified, l);
  }
  return [...byName.values()];
}

function toFieldName(local: string): string {
  return local.charAt(0).toLowerCase() + local.slice(1);
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
      : `Modeled by this parser: **no** (every leaf shows as a gap - this is a survey of the SFR surface, not a defect list)`,
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

    const ct = complexTypes.get(typeKey(rootInfo.type.uri, rootInfo.type.local));
    if (!ct) {
      console.warn(`  ! type ${rootInfo.type.local} not found - skipping`);
      continue;
    }

    const leaves: Leaf[] = [];
    flattenComplexType(ct, "", leaves, new Set([typeKey(rootInfo.type.uri, rootInfo.type.local)]), 0);
    const deduped = dedupeLeaves(leaves);

    const { report, scaffold, gapCount, total } = buildReport(
      domain,
      rootInfo.name,
      deduped,
      covered,
    );

    const slug = domain.key.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
