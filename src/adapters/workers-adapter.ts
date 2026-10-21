/**
 * Edge/Workers runtime adapter using @xmldom/xmldom and xpath
 *
 * Uses @xmldom/xmldom for XML parsing and the pure-JS `xpath` package
 * (XPath 1.0) for XPath evaluation. Both are small enough to bundle into
 * a Cloudflare Worker, unlike fontoxpath.
 *
 * XPath 1.0 is sufficient by construction: the browser adapter evaluates
 * the same schema queries with the native `document.evaluate()`, which
 * only supports XPath 1.0, so no schema query can require more.
 */

import type { XMLAdapter } from "../types/index.js";
import { DOMParser } from "@xmldom/xmldom";
import { selectWithResolver, isArrayOfNodes, isNodeLike } from "xpath";

/** The `xpath` package resolves namespaces through `lookupNamespaceURI`. */
function wrapResolver(
  namespaceResolver: (prefix: string | null) => string | null,
): XPathNSResolver {
  return { lookupNamespaceURI: namespaceResolver };
}

export class WorkersXMLAdapter implements XMLAdapter {
  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser({
      onError: (level, message) => {
        // Ignore warnings; fatalError already throws in @xmldom/xmldom >= 0.9
        if (level === "error") {
          throw new Error(`XML parsing failed: ${message}`);
        }
      },
    });
  }

  parseXML(xmlText: string): Document {
    // @xmldom/xmldom ships its own Document type; structurally compatible for our XPath usage
    return this.parser.parseFromString(xmlText, "text/xml") as unknown as Document;
  }

  evaluateXPath(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Node | null {
    try {
      const result = selectWithResolver(query, doc, wrapResolver(namespaceResolver), true);
      return isNodeLike(result) ? result : null;
    } catch (error) {
      // Distinguish between "not found" (returns null) and actual errors (throw)
      const message = error instanceof Error ? error.message : String(error);

      // If it's an XPath syntax error or library error, throw with details
      if (isXPathSyntaxError(message)) {
        throw new Error(`XPath evaluation failed: ${message} (query: ${query})`, {
          cause: error,
        });
      }

      // For other errors, log and return null (element might just not exist)
      console.warn(`XPath query returned no results: ${query}`, message);
      return null;
    }
  }

  evaluateXPathAll(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Array<Node> {
    try {
      const result = selectWithResolver(query, doc, wrapResolver(namespaceResolver), false);
      return isArrayOfNodes(result) ? result : [];
    } catch (error) {
      // Distinguish between "not found" (returns empty array) and actual errors (throw)
      const message = error instanceof Error ? error.message : String(error);

      // If it's an XPath syntax error or library error, throw with details
      if (isXPathSyntaxError(message)) {
        throw new Error(`XPath evaluation failed: ${message} (query: ${query})`, {
          cause: error,
        });
      }

      // For other errors, log and return empty array (elements might just not exist)
      console.warn(`XPath query returned no results: ${query}`, message);
      return [];
    }
  }
}

/** The `xpath` package reports unparsable expressions with these markers. */
function isXPathSyntaxError(message: string): boolean {
  return (
    message.includes("syntax") ||
    message.includes("parse") ||
    message.includes("Unexpected") ||
    message.includes("XPath parse")
  );
}
