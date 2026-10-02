/**
 * BRO XML namespace definitions
 *
 * Centralizes all namespace URIs and prefixes used in BRO documents.
 */

import type { Namespaces } from "./types/index.js";

/**
 * Standard BRO namespace URIs
 */
export const BRO_NAMESPACES: Namespaces = {
  // CPT namespaces
  dscpt: "http://www.broservices.nl/xsd/dscpt/1.1",
  brocom: "http://www.broservices.nl/xsd/brocommon/3.0",
  cptcommon: "http://www.broservices.nl/xsd/cptcommon/1.1",

  // Bore namespaces (BHR-GT dsbhr-gt/2.1)
  dsbhrgt: "http://www.broservices.nl/xsd/dsbhr-gt/2.1",
  bhrcommon: "http://www.broservices.nl/xsd/bhrcommon/1.1",
  bhrgt: "http://www.broservices.nl/xsd/bhrgt/1.1",
  bhrgtcom: "http://www.broservices.nl/xsd/bhrgtcommon/2.1",

  // BHR-G namespaces (dsbhrg/3.1)
  dsbhrg: "http://www.broservices.nl/xsd/dsbhrg/3.1",
  bhrgcom: "http://www.broservices.nl/xsd/bhrgcommon/3.1",

  // GMW namespaces (Grondwatermonitoringput, dsgmw/1.1)
  dsgmw: "http://www.broservices.nl/xsd/dsgmw/1.1",
  gmwcommon: "http://www.broservices.nl/xsd/gmwcommon/1.1",

  // GLD namespaces (Grondwaterstandonderzoek, dsgld/1.0)
  dsgld: "http://www.broservices.nl/xsd/dsgld/1.0",
  gldcommon: "http://www.broservices.nl/xsd/gldcommon/1.0",

  // Common geospatial namespaces
  gml: "http://www.opengis.net/gml/3.2",
  swe: "http://www.opengis.net/swe/2.0",
  om: "http://www.opengis.net/om/2.0",
  sampling: "http://www.opengis.net/sampling/2.0",
  // OGC WaterML 2.0 - GLD groundwater level time-series (docs use prefix "waterml";
  // XPath binds by URI, so "wml2" here resolves those elements regardless).
  wml2: "http://www.opengis.net/waterml/2.0",
  xlink: "http://www.w3.org/1999/xlink",
};

/**
 * List of known BRO namespace prefixes
 * Used by NodeXMLAdapter for pre-populating the xpath library's namespace map
 */
export const KNOWN_BRO_PREFIXES: ReadonlyArray<string> = [
  "dscpt",
  "brocom",
  "cptcommon",
  "gml",
  "swe",
  "om",
  "sampling",
  "dsbhr",
  "dsbhrgt",
  "bhrcommon",
  "bhrgt",
  "bhrgtcom",
  "dsbhrg",
  "bhrgcom",
  "dsgmw",
  "gmwcommon",
  "dsgld",
  "gldcommon",
  "wml2",
  "xlink",
] as const;

/**
 * Collapse the URI scheme difference: BRO namespaces occur with both `http://`
 * and `https://` schemes in the wild, naming the same schema. Namespace URIs
 * are identifiers, so the canonical form is the `http://` one the XSDs declare.
 */
export function canonicalNamespace(uri: string): string {
  return uri.replace(/^https:\/\//, "http://");
}

/**
 * Strip a trailing schema version from a namespace URI, yielding its "family".
 *
 * BRO publishes the same schema under several version suffixes — e.g.
 * `.../dsbhrg/3.1` (the documented XSD) and `.../dsbhrg/3` (returned by several
 * REST services); both share the family `.../dsbhrg`. Only a trailing
 * `/<major>` or `/<major>.<minor>` is removed, so a URI like
 * `.../1999/xlink` (version-free) is returned unchanged. The family is also
 * scheme-canonical, so `https://` and `http://` variants share one family.
 */
export function namespaceFamily(uri: string): string {
  return canonicalNamespace(uri).replace(/\/\d+(?:\.\d+)?$/, "");
}

/**
 * Re-point the configured namespace URIs at the versions a document declares.
 *
 * The XPath resolver binds each prefix to one exact URI, so a document that
 * declares `.../dsbhrg/3` never matches queries bound to `.../dsbhrg/3.1`. For
 * every configured prefix whose family also appears among `declaredUris`, adopt
 * the document's URI; leave the rest untouched. Matching by family means a
 * major-3 BHR-G parses whether it arrives as `/3`, `/3.0`, or `/3.1`, without
 * the schema (which is prefix-keyed) needing to know which minor it got.
 */
export function adaptNamespacesToDocument(
  defaults: Namespaces,
  declaredUris: Iterable<string>,
): Namespaces {
  const byFamily = new Map<string, string>();
  for (const uri of declaredUris) {
    byFamily.set(namespaceFamily(uri), uri);
  }

  const adapted: Namespaces = { ...defaults };
  for (const [prefix, uri] of Object.entries(defaults)) {
    const declared = byFamily.get(namespaceFamily(uri));
    if (declared) {
      adapted[prefix] = declared;
    }
  }
  return adapted;
}
