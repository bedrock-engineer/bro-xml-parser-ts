import type {
  XMLAdapter,
  Namespaces,
  ResolverContext,
  RegistrationHistory,
} from "../types/index.js";
import { parseDate, parseBoolean } from "./type-resolvers.js";

type XPathTextGetter = (xpath: string) => string | null;
type NamespaceResolver = (prefix: string | null) => string | null;

/**
 * Creates a reusable namespace resolver function
 *
 * @param namespaces - Namespace mappings
 * @returns Resolver function for XPath namespace prefixes
 */
export function createNamespaceResolver(namespaces: Namespaces): NamespaceResolver {
  return (prefix: string | null) => (prefix ? (namespaces[prefix] ?? null) : null);
}

/**
 * Helper to get text content from a node
 *
 * @param node - XML node or null
 * @returns Trimmed text content or null
 */
export function getTextContent(node: Node | null): string | null {
  const trimmed = node?.textContent?.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
}

/**
 * Creates an XPath text getter bound to a specific context node.
 *
 * @param contextNode - Node to query from
 * @param adapter - XML adapter
 * @param namespaces - Namespace mappings
 * @returns Function that gets text from XPath expressions
 */
export function createXPathTextGetter(
  contextNode: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): XPathTextGetter {
  const nsResolver = createNamespaceResolver(namespaces);

  return (xpath: string): string | null => {
    const node = adapter.evaluateXPath(contextNode, xpath, nsResolver);
    return getTextContent(node);
  };
}

/**
 * Parse the BRO registration history.
 *
 * Shared by every registration type: the `registrationHistory` element is a
 * direct child of the registration object and its children are all `brocom:*`,
 * identical across domains - only the container's ds-namespace differs, which we
 * sidestep with a namespace-agnostic local-name() match. Exposed publicly for
 * custom (`parseCustom`) schemas.
 */
export function processRegistrationHistory(
  _value: string | null,
  context: ResolverContext,
): RegistrationHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  const historyNode = adapter.evaluateXPath(
    element,
    "./*[local-name()='registrationHistory']",
    nsResolver,
  );
  if (!historyNode) {
    return null;
  }

  const getText = createXPathTextGetter(historyNode, adapter, namespaces);

  return {
    objectRegistrationTime: parseDate(getText("./brocom:objectRegistrationTime")),
    registrationStatus: getText("./brocom:registrationStatus"),
    registrationCompletionTime: parseDate(getText("./brocom:registrationCompletionTime")),
    latestCorrectionTime: parseDate(getText("./brocom:latestCorrectionTime")),
    latestAdditionTime: parseDate(getText("./brocom:latestAdditionTime")),
    underReviewTime: parseDate(getText("./brocom:underReviewTime")),
    deregistrationTime: parseDate(getText("./brocom:deregistrationTime")),
    reregistrationTime: parseDate(getText("./brocom:reregistrationTime")),
    corrected: parseBoolean(getText("./brocom:corrected")),
    underReview: parseBoolean(getText("./brocom:underReview")),
    deregistered: parseBoolean(getText("./brocom:deregistered")),
    reregistered: parseBoolean(getText("./brocom:reregistered")),
  };
}
