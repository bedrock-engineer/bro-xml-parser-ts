/**
 * Generic schema-driven XML parser
 *
 * This parser interprets a schema definition (field configurations)
 * and extracts data from XML documents accordingly.
 * The same parser works for any schema (CPT, Bore, etc.)
 */

import type {
  XMLAdapter,
  Schema,
  SchemaField,
  Namespaces,
  ResolverContext,
} from "../types/index.js";
import { BROParseError } from "../types/index.js";
import type { NodeLens, Producer, ObjectProducer } from "./producer.js";

/** A relative XPath ending in `/@name` selects an attribute node. */
type NamespaceResolver = (prefix: string | null) => string | null;

/** Trimmed text content of a node, or `null` when empty. */
function readText(node: Node): string | null {
  const trimmed = node.textContent?.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
}

/** Outcome of running one producer: its value, and whether it found data. */
interface Outcome {
  value: unknown;
  /** `false` means "absent/failed" — drives the presence + absence model. */
  satisfied: boolean;
}

export class SchemaParser {
  constructor(
    private adapter: XMLAdapter,
    private namespaces: Namespaces,
  ) {}

  /**
   * Parse XML document using provided schema
   *
   * @param doc - Parsed XML document
   * @param schema - Field definitions (field name -> config)
   * @param rootPath - Optional XPath to root element
   * @returns Parsed data object with fields from schema
   */

  parse(doc: Document, schema: Schema, rootPath?: string): Record<string, unknown> {
    const rootElement = this.resolveRoot(doc, rootPath);

    const result: Record<string, unknown> = {};

    // Iterate through schema fields and extract each one
    for (const [fieldName, config] of Object.entries(schema)) {
      try {
        const value = this.extractField(rootElement, config);
        result[fieldName] = value;
      } catch (error) {
        // If field is required and extraction failed, throw error
        if (config.required) {
          throw new BROParseError(`Required field missing or invalid: ${fieldName}`, {
            code: "MISSING_REQUIRED_FIELD",
            field: fieldName,
            xpath: config.xpath,
            originalError: error,
          });
        }

        // Optional fields default to null on error
        result[fieldName] = null;
      }
    }

    return result;
  }

  /**
   * Extract single field using schema config
   *
   * @param element - Root element to search from
   * @param config - Field configuration (xpath, resolver, etc.)
   * @returns Extracted and resolved value
   */
  private extractField(element: Node, config: SchemaField): unknown {
    // Find element using XPath
    const node = this.adapter.evaluateXPath(element, config.xpath, (prefix) =>
      prefix ? (this.namespaces[prefix] ?? null) : null,
    );

    if (!node) {
      return null;
    }

    // Get value from element (text content or attribute)
    let value: string | null;
    if (config.attribute) {
      // Get specific attribute (e.g., "textContent")
      // Use type assertion to access dynamic properties
      const element = node as unknown as Record<string, unknown>;
      const attrValue = element[config.attribute];
      value = typeof attrValue === "string" ? attrValue : null;
    } else {
      // Default to text content
      value = node.textContent;
    }

    if (config.resolver) {
      const context: ResolverContext = {
        node,
        element,
        namespaces: this.namespaces,
        adapter: this.adapter,
      };

      return config.resolver(value, context);
    }

    return value;
  }

  // =========================================================================
  // Producer interpreter (the deepened path)
  // =========================================================================

  /**
   * Interpret a {@link Producer} schema against a document, recursing through
   * nested objects, arrays, unions and custom decoders.
   *
   * The top-level producer must be an object (a registration object's fields).
   * Warnings from the absence model (dropped array items) are returned rather
   * than logged, so callers can fold them into `meta.warnings`.
   *
   * @throws {BROParseError} `MISSING_REQUIRED_FIELD` when a `required` field is
   *   missing at the document root (nested required failures null their object
   *   instead — see the absence model).
   */
  produce<T>(
    doc: Document,
    root: ObjectProducer<T>,
    rootPath?: string,
  ): { value: T; warnings: Array<string> } {
    const rootElement = this.resolveRoot(doc, rootPath);
    const self = root.at ? this.xpath(rootElement, root.at) : rootElement;
    if (!self) {
      throw new BROParseError(`Root element not found: ${root.at ?? rootPath ?? "."}`, {
        code: "MISSING_ROOT",
        path: root.at ?? rootPath,
      });
    }

    const warnings: Array<string> = [];
    const value = this.runObject(self, root, warnings, true).value as T;
    return { value, warnings };
  }

  /**
   * Resolve the schema root: the first child of `rootPath` (the registration
   * object under `dispatchDocument`), or the document itself when unspecified.
   */
  private resolveRoot(doc: Document, rootPath?: string): Node {
    if (!rootPath) {
      return doc;
    }

    let root = this.xpath(doc, `.//${rootPath}/*[1]`);
    root ??= this.xpath(doc, `//*[local-name()='${rootPath}']/*[1]`);

    if (!root) {
      throw new BROParseError(`Root element not found: ${rootPath}`, {
        code: "MISSING_ROOT",
        path: rootPath,
      });
    }

    return root;
  }

  private get nsResolver(): NamespaceResolver {
    return (prefix) => (prefix ? (this.namespaces[prefix] ?? null) : null);
  }

  private xpath(from: Node, query: string): Node | null {
    return this.adapter.evaluateXPath(from, query, this.nsResolver);
  }

  private xpathAll(from: Node, query: string): Array<Node> {
    return this.adapter.evaluateXPathAll(from, query, this.nsResolver);
  }

  /** Run one producer against `node` (the enclosing context node). */
  private run(node: Node, producer: Producer<unknown>, warnings: Array<string>): Outcome {
    // Resolve this producer's own node (relative to the enclosing node).
    const self = producer.at ? this.xpath(node, producer.at) : node;
    if (!self) {
      return { value: this.emptyValue(producer), satisfied: false };
    }

    switch (producer.kind) {
      case "scalar": {
        const raw = readText(self);
        return { value: producer.decode(raw), satisfied: raw !== null };
      }
      case "custom": {
        return { value: producer.produce(this.makeLens(self)), satisfied: true };
      }
      case "object": {
        return this.runObject(self, producer, warnings, false);
      }
      case "array": {
        const items = this.xpathAll(self, producer.each);
        const out: Array<unknown> = [];
        for (const itemNode of items) {
          const outcome = this.run(itemNode, producer.item, warnings);
          if (!outcome.satisfied) {
            // Structured items (object/oneOf) that fail a required field are a
            // meaningful data loss; an empty scalar in a code list is not.
            if (producer.item.kind !== "scalar") {
              warnings.push(
                `Dropped an item from array "${producer.each}": required data was missing`,
              );
            }
            continue;
          }
          out.push(outcome.value);
        }
        return { value: out, satisfied: items.length > 0 };
      }
      case "oneOf": {
        return this.runOneOf(self, producer, warnings);
      }
    }
  }

  /**
   * Build an object by running each field. Applies the presence + absence model:
   * a missing `required` field nulls the whole object (or throws at the root); a
   * missing `omit` field drops its key; a missing `optional` field keeps its
   * empty value.
   */
  private runObject(
    self: Node,
    producer: ObjectProducer<unknown>,
    warnings: Array<string>,
    isRoot: boolean,
  ): Outcome {
    const obj: Record<string, unknown> = {};

    for (const [key, field] of Object.entries(producer.fields)) {
      const outcome = this.run(self, field, warnings);
      if (outcome.satisfied) {
        obj[key] = outcome.value;
        continue;
      }

      const presence = field.presence ?? "optional";
      if (presence === "required") {
        if (isRoot) {
          throw new BROParseError(`Required field missing or invalid: ${key}`, {
            code: "MISSING_REQUIRED_FIELD",
            field: key,
            xpath: field.at,
          });
        }
        // Object-local failure: null the nearest enclosing object.
        return { value: null, satisfied: false };
      }
      if (presence === "omit") {
        continue;
      }
      obj[key] = outcome.value;
    }

    return { value: obj, satisfied: true };
  }

  /** Run a discriminated union: base fields once, then the first matching branch. */
  private runOneOf(
    self: Node,
    producer: OneOfProducerNode,
    warnings: Array<string>,
  ): Outcome {
    // Assign each field, honouring `presence: "omit"` (skip the key when absent).
    const assign = (target: Record<string, unknown>, node: Node, fields: ObjectProducer<unknown>["fields"]): void => {
      for (const [key, field] of Object.entries(fields)) {
        const outcome = this.run(node, field, warnings);
        if (outcome.satisfied || (field.presence ?? "optional") !== "omit") {
          target[key] = outcome.value;
        }
      }
    };

    const base: Record<string, unknown> = {};
    assign(base, self, producer.base);

    for (const branch of producer.branches) {
      if (!this.xpath(self, branch.when)) {
        continue;
      }
      const branchNode = branch.at ? this.xpath(self, branch.at) : self;
      const merged: Record<string, unknown> = { ...base, [producer.tagAs]: branch.tag };
      if (branchNode) {
        assign(merged, branchNode, branch.fields);
      }
      return { value: merged, satisfied: true };
    }

    // No branch matched: absent.
    return { value: null, satisfied: false };
  }

  /** The "empty" value a producer yields when its node is absent. */
  private emptyValue(producer: Producer<unknown>): unknown {
    switch (producer.kind) {
      case "scalar":
        return producer.decode(null);
      case "array":
        return [];
      default:
        return null;
    }
  }

  /** A relative-only lens over `node` for custom producers. */
  private makeLens(node: Node): NodeLens {
    const at = (xpath: string): string | null => {
      const found = this.xpath(node, xpath);
      return found ? readText(found) : null;
    };
    return {
      name: () => {
        const localName = (node as Partial<Element>).localName;
        return typeof localName === "string" ? localName : null;
      },
      text: () => readText(node),
      textAt: at,
      attr: at,
      all: (xpath) => this.xpathAll(node, xpath).map((n) => this.makeLens(n)),
    };
  }
}

/** The runtime shape of {@link OneOfProducer} without its phantom type param. */
type OneOfProducerNode = Extract<Producer<unknown>, { kind: "oneOf" }>;
