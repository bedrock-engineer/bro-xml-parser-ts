/**
 * Node.js runtime adapter using @xmldom/xmldom and fontoxpath
 *
 * Uses @xmldom/xmldom for XML parsing and fontoxpath for XPath evaluation.
 * These packages are required dependencies for Node.js environments.
 */

import type { XMLAdapter } from "../types/index.js";
import { DOMParser } from "@xmldom/xmldom";
import fontoxpath from "fontoxpath";

export class NodeXMLAdapter implements XMLAdapter {
  private parser: DOMParser;
  private fontoxpath: typeof fontoxpath;

  constructor() {
    this.parser = new DOMParser({
      errorHandler: {
        warning: () => {
          // Ignore warnings
        },
        error: (msg: string) => {
          throw new Error(`XML parsing failed: ${msg}`);
        },
        fatalError: (msg: string) => {
          throw new Error(`XML parsing failed: ${msg}`);
        },
      },
    });
    this.fontoxpath = fontoxpath;
  }

  parseXML(xmlText: string): Document {
    return this.parser.parseFromString(xmlText, "text/xml");
  }

  evaluateXPath(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Node | null {
    try {
      // fontoxpath accepts the namespace resolver directly (like browsers)
      return this.fontoxpath.evaluateXPathToFirstNode(query, doc, null, {}, { namespaceResolver });
    } catch (error) {
      // Distinguish between "not found" (returns null) and actual errors (throw)
      const message = error instanceof Error ? error.message : String(error);

      // If it's an XPath syntax error or library error, throw with details
      if (message.includes("XPST") || message.includes("syntax") || message.includes("parse")) {
        throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
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
      return this.fontoxpath.evaluateXPathToNodes(query, doc, null, {}, { namespaceResolver });
    } catch (error) {
      // Distinguish between "not found" (returns empty array) and actual errors (throw)
      const message = error instanceof Error ? error.message : String(error);

      // If it's an XPath syntax error or library error, throw with details
      if (message.includes("XPST") || message.includes("syntax") || message.includes("parse")) {
        throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
      }

      // For other errors, log and return empty array (elements might just not exist)
      console.warn(`XPath query returned no results: ${query}`, message);
      return [];
    }
  }
}
