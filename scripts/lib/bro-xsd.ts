/**
 * Shared BRO XSD machinery.
 *
 * Fetches the official BRO XSDs (live, from schema.broservices.nl), assembles the
 * full type graph per domain (following xsd:import / xsd:include), and flattens a
 * registration-object type down to its leaf elements with cardinality, base type
 * and an example XPath.
 *
 * This is the engine behind `check-xsd-coverage.ts`, which diffs the leaf set
 * against what our parser references. Keeping the XSD walk in one place means
 * adding a new registration type is "add a domain entry, run the tool" rather
 * than re-deriving it each time.
 */

import { DOMParser } from "@xmldom/xmldom";
import { BRO_NAMESPACES } from "../../src/namespaces.js";

const XSD_NS = "http://www.w3.org/2001/XMLSchema";
export const SCHEMA_HOST = "schema.broservices.nl";

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

function buildPrefixMap(schemaEl: Element): {
  prefixMap: Map<string, string>;
  defaultNs: string | null;
} {
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

/** Fetch a schema (and everything it imports/includes on the BRO host) into the registries. */
export async function loadSchema(url: string): Promise<void> {
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

export interface QName {
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

export interface Leaf {
  /** prefix:localName using our canonical prefixes */
  qualified: string;
  local: string;
  /** example XPath from the registration object down to this leaf */
  path: string;
  /** min..max occurrence (max "unbounded" -> "*") */
  cardinality: string;
  /** best-effort xsd base type local name (e.g. "date", "decimal", "boolean") */
  baseType: string;
  /** the `fixed` value of the type's `codeSpace` attribute, if this is a coded leaf (e.g. "urn:bro:cpt:QualityClass") */
  domain?: string;
  /** xs:documentation text on the leaf element (BRO ships Dutch Definition/Explanation), if any */
  doc?: string;
}

/** The `fixed` value of a `codeSpace` attribute on a complexType's simpleContent, if any. */
function findFixedCodeSpace(container: Element): string | undefined {
  const simpleContent = directChildElements(container, "simpleContent")[0];
  const scope = simpleContent
    ? (directChildElements(simpleContent, "extension")[0] ??
      directChildElements(simpleContent, "restriction")[0])
    : undefined;
  const attrParent = scope ?? container;
  for (const attr of directChildElements(attrParent, "attribute")) {
    if (attr.getAttribute("name") === "codeSpace") {
      const fixed = attr.getAttribute("fixed");
      if (fixed) return fixed;
    }
  }
  return undefined;
}

/**
 * The coded domain of a leaf: the `fixed` `codeSpace` on its type. Present only
 * for coded elements (a `{ code, codeSpace }` value in BRO), so its presence is
 * itself the "this leaf is coded" signal.
 */
function codeSpaceDomain(typeQ: QName | null, inlineType: Element | null): string | undefined {
  if (inlineType && inlineType.localName === "complexType") {
    const d = findFixedCodeSpace(inlineType);
    if (d) return d;
  }
  if (typeQ) {
    const ct = complexTypes.get(typeKey(typeQ.uri, typeQ.local));
    if (ct) return findFixedCodeSpace(ct);
  }
  return undefined;
}

/** Collapsed text of an element's own `xs:annotation/xs:documentation` (whitespace-normalized). */
function documentationOf(el: Element): string | undefined {
  const ann = directChildElements(el, "annotation")[0];
  if (!ann) return undefined;
  const text = directChildElements(ann, "documentation")
    .map((d) => (d.textContent ?? "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
  return text || undefined;
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
  // BRO's bi-state ja/nee indicator is a boolean, not the string it restricts —
  // recognise it by name before the restriction collapses to string. Both spellings
  // occur (elements type it as the `...Type` or reference the `...Enumeration`
  // directly). The tri-state IndicationYesNoUnknown{Type,Enumeration} (ja/nee/onbekend)
  // is deliberately excluded: it must keep `onbekend`, so it stays plain text.
  if (typeQ && /^IndicationYesNo(Type|Enumeration)$/.test(typeQ.local)) return "boolean";
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
      const ext =
        directChildElements(simpleContent, "extension")[0] ??
        directChildElements(simpleContent, "restriction")[0];
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
      const ext =
        directChildElements(simpleContent, "extension")[0] ??
        directChildElements(simpleContent, "restriction")[0];
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
interface Unwrapped {
  typeQ: QName | null;
  inline: Element | null;
  /** The wrapped object element (e.g. `Boring`) — a real element in the instance. */
  element: QName | null;
}

function unwrapProperty(typeQ: QName): Unwrapped | null {
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
      return { typeQ: t ? resolveQName(t, docUrlOf(g)) : null, inline, element: q };
    }
    return null;
  }
  const t = child.getAttribute("type");
  const inline =
    directChildElements(child, "complexType")[0] ??
    directChildElements(child, "simpleType")[0] ??
    null;
  const name = child.getAttribute("name");
  const element = name
    ? { uri: loadedDocs.get(ownerUrl)?.targetNamespace ?? "", local: name }
    : null;
  return { typeQ: t ? resolveQName(t, ownerUrl) : null, inline, element };
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
        ? (complexTypes.get(typeKey(typeQ.uri, typeQ.local)) ?? null)
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
    childElements(ct, "element").length > 0 || directChildElements(ct, "complexContent").length > 0
  );
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

/**
 * Flatten a registration-object type into deduped leaves (the coverage view).
 * Derived from {@link buildTree}: one walker, two shapes.
 */
export function flattenRoot(rootType: QName): Leaf[] {
  return dedupeLeaves(collectLeaves(buildTree(rootType)));
}

/** Collect the leaf nodes of a node tree as flat {@link Leaf} records. */
function collectLeaves(nodes: TreeNode[]): Leaf[] {
  const out: Leaf[] = [];
  for (const n of nodes) {
    if (n.kind === "leaf") {
      out.push({
        qualified: n.qualified,
        local: n.local,
        path: n.path,
        cardinality: n.cardinality,
        baseType: n.baseType ?? "unknown",
        ...(n.domain ? { domain: n.domain } : {}),
        doc: n.doc,
      });
    } else if (n.children) {
      out.push(...collectLeaves(n.children));
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Structure-preserving tree (for codegen: nested interfaces + schema spec)
// ---------------------------------------------------------------------------

/**
 * A node in the nested XSD type tree. Unlike {@link Leaf} (a flat coverage view),
 * this preserves object nesting and per-node repeatability (`array`), which a
 * faithful generated interface/schema needs.
 */
export interface TreeNode {
  /** camelCase field name (from the local element name). */
  name: string;
  /** `prefix:localName`. */
  qualified: string;
  local: string;
  /** example XPath from the registration object to this node. */
  path: string;
  /** min..max occurrence. */
  cardinality: string;
  /** `true` when maxOccurs > 1 — the field is an array. */
  array: boolean;
  kind: "object" | "leaf";
  /** leaf: xsd base type local name (`date`/`decimal`/`boolean`/…). */
  baseType?: string;
  /** leaf: the `fixed` codeSpace domain, if coded. */
  domain?: string;
  /**
   * object/array: the GML property/object wrapper element (e.g. `bhrgcom:Boring`)
   * that sits between this element and its fields in the instance. When set, the
   * node's `at`/`each` must descend through it (`./boring/bhrgcom:Boring`).
   */
  wrapper?: string;
  doc?: string;
  /** object: child nodes. */
  children?: TreeNode[];
}

/** Resolve an element particle's identity + type (shared shape with the flattener). */
interface ResolvedElement {
  name: string;
  qualified: string;
  elemNs: string;
  cardinality: string;
  array: boolean;
  typeQ: QName | null;
  effInline: Element | null;
  /** GML property/object wrapper element, if the type is a property-type wrapper. */
  wrapper?: string;
  doc?: string;
}

function resolveElement(el: Element): ResolvedElement | null {
  const ref = el.getAttribute("ref");
  let name: string | null = el.getAttribute("name");
  let typeAttr: string | null = el.getAttribute("type");
  let elemNs = "";
  let ownerUrl = docUrlOf(el);
  let inlineType: Element | null =
    directChildElements(el, "complexType")[0] ?? directChildElements(el, "simpleType")[0] ?? null;
  let docEl: Element = el;

  if (ref && !name) {
    const q = resolveQName(ref, ownerUrl);
    if (q) {
      const globalEl = globalElements.get(typeKey(q.uri, q.local));
      if (globalEl) {
        docEl = globalEl;
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
    elemNs = loadedDocs.get(ownerUrl)?.targetNamespace ?? "";
  }

  if (!name) return null;

  const maxOccurs = el.getAttribute("maxOccurs");
  const array = maxOccurs === "unbounded" || (maxOccurs !== null && Number(maxOccurs) > 1);
  const cardinality = `${el.getAttribute("minOccurs") ?? "1"}..${
    maxOccurs === "unbounded" ? "*" : (maxOccurs ?? "1")
  }`;

  let typeQ = typeAttr ? resolveQName(typeAttr, ownerUrl) : null;
  let effInline = inlineType;
  let wrapper: string | undefined;
  for (let guard = 0; typeQ && isBroNamespace(typeQ.uri) && guard < 6; guard++) {
    const unwrapped = unwrapProperty(typeQ);
    if (!unwrapped) break;
    typeQ = unwrapped.typeQ;
    if (unwrapped.inline) effInline = unwrapped.inline;
    if (unwrapped.element) {
      wrapper = `${prefixForUri(unwrapped.element.uri)}:${unwrapped.element.local}`;
    }
  }

  return {
    name,
    qualified: `${prefixForUri(elemNs)}:${name}`,
    elemNs,
    cardinality,
    array,
    typeQ,
    effInline,
    ...(wrapper ? { wrapper } : {}),
    doc: documentationOf(docEl),
  };
}

function elementParticleTree(
  el: Element,
  pathPrefix: string,
  seenTypes: Set<string>,
  depth: number,
): TreeNode | null {
  if (depth > MAX_DEPTH) return null;
  const r = resolveElement(el);
  if (!r) return null;

  const path = `${pathPrefix}/${r.qualified}`;
  const base = {
    name: toFieldName(r.name),
    qualified: r.qualified,
    local: r.name,
    path,
    cardinality: r.cardinality,
    array: r.array,
    doc: r.doc,
  };

  // BRO partial-date fields collapse to a single date leaf (as in the flattener).
  if ((r.typeQ && /PartialDate/i.test(r.typeQ.local)) || isPartialDateExtension(r.typeQ, r.effInline)) {
    return { ...base, kind: "leaf", baseType: "date" };
  }

  const typeIsBroComplex =
    r.typeQ &&
    isBroNamespace(r.typeQ.uri) &&
    complexTypes.has(typeKey(r.typeQ.uri, r.typeQ.local)) &&
    complexTypeHasElements(complexTypes.get(typeKey(r.typeQ.uri, r.typeQ.local))!) &&
    directChildElements(complexTypes.get(typeKey(r.typeQ.uri, r.typeQ.local))!, "simpleContent")
      .length === 0;

  const inlineIsComplex =
    r.effInline &&
    r.effInline.localName === "complexType" &&
    complexTypeHasElements(r.effInline) &&
    directChildElements(r.effInline, "simpleContent").length === 0;

  // A GML property/object wrapper (e.g. `Boring`) sits between this element and its
  // fields in the instance — descend through it and record it on the node.
  const childPath = r.wrapper ? `${path}/${r.wrapper}` : path;
  const wrap = r.wrapper ? { wrapper: r.wrapper } : {};

  if (typeIsBroComplex) {
    const ck = typeKey(r.typeQ!.uri, r.typeQ!.local);
    if (seenTypes.has(ck)) {
      return { ...base, kind: "leaf", baseType: "recursive" };
    }
    const nextSeen = new Set(seenTypes);
    nextSeen.add(ck);
    return {
      ...base,
      kind: "object",
      ...wrap,
      children: buildTreeFromComplexType(complexTypes.get(ck)!, childPath, nextSeen, depth + 1),
    };
  }

  if (inlineIsComplex) {
    return {
      ...base,
      kind: "object",
      ...wrap,
      children: buildTreeFromComplexType(r.effInline!, childPath, new Set(seenTypes), depth + 1),
    };
  }

  const baseType = leafBaseType(r.typeQ, r.effInline);
  const domain = codeSpaceDomain(r.typeQ, r.effInline);
  return { ...base, kind: "leaf", baseType, ...(domain ? { domain } : {}) };
}

function buildTreeFromComplexType(
  ct: Element,
  pathPrefix: string,
  seenTypes: Set<string>,
  depth: number,
): TreeNode[] {
  const out: TreeNode[] = [];
  if (depth > MAX_DEPTH) return out;

  for (const cc of directChildElements(ct, "complexContent")) {
    const ext =
      directChildElements(cc, "extension")[0] ?? directChildElements(cc, "restriction")[0];
    if (!ext) continue;
    const baseAttr = ext.getAttribute("base");
    if (baseAttr) {
      const q = resolveQName(baseAttr, docUrlOf(ct));
      if (q && isBroNamespace(q.uri)) {
        const bk = typeKey(q.uri, q.local);
        const baseCt = complexTypes.get(bk);
        if (baseCt && !seenTypes.has(bk)) {
          const nextSeen = new Set(seenTypes);
          nextSeen.add(bk);
          out.push(...buildTreeFromComplexType(baseCt, pathPrefix, nextSeen, depth + 1));
        }
      }
    }
    for (const el of collectParticleElements(ext)) {
      const node = elementParticleTree(el, pathPrefix, seenTypes, depth);
      if (node) out.push(node);
    }
  }

  for (const el of collectParticleElements(ct)) {
    const node = elementParticleTree(el, pathPrefix, seenTypes, depth);
    if (node) out.push(node);
  }

  return out;
}

/** Build the nested type tree for a registration-object type (already loaded). */
export function buildTree(rootType: QName): TreeNode[] {
  const ct = complexTypes.get(typeKey(rootType.uri, rootType.local));
  if (!ct) return [];
  return buildTreeFromComplexType(ct, "", new Set([typeKey(rootType.uri, rootType.local)]), 0);
}

// ---------------------------------------------------------------------------
// Registration object discovery
// ---------------------------------------------------------------------------

export function findRegistrationObjectType(messagesUrl: string): { name: string; type: QName } | null {
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
// Helpers shared by the coverage report and the codegen
// ---------------------------------------------------------------------------

/** Map an xsd base type local name to one of our type decoders (or null for string). */
export function guessDecoder(baseType: string): string | null {
  const t = baseType.toLowerCase();
  if (t.includes("date") || t.includes("time") || t.startsWith("gyear")) return "parseDate";
  if (t === "boolean") return "parseBoolean";
  if (t.includes("integer") || t === "int" || t === "long" || t === "nonnegativeinteger")
    return "parseInt";
  if (t === "decimal" || t === "double" || t === "float" || t.includes("measure"))
    return "parseFloat";
  return null;
}

/** Map a {@link guessDecoder} result to the `producers` combinator that wraps it. */
export function combinatorFor(decoder: string | null): string {
  switch (decoder) {
    case "parseFloat":
      return "number";
    case "parseInt":
      return "integer";
    case "parseDate":
      return "date";
    case "parseBoolean":
      return "boolean";
    default:
      return "text";
  }
}

/** The `producers` leaf combinator for an xsd base type (untyped/string → `text`). */
export function baseTypeToCombinator(baseType: string): string {
  return combinatorFor(guessDecoder(baseType));
}

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
export function dedupeByQualified(leaves: Leaf[]): Leaf[] {
  const byName = new Map<string, Leaf>();
  for (const l of leaves) {
    const existing = byName.get(l.qualified);
    if (!existing || l.path.length < existing.path.length) byName.set(l.qualified, l);
  }
  return [...byName.values()];
}

export function toFieldName(local: string): string {
  return local.charAt(0).toLowerCase() + local.slice(1);
}
