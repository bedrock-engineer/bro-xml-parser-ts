/**
 * Resolvers for CPT-specific complex data structures
 *
 * Handles structural/metadata parsing that requires traversing multiple
 * XML nodes: removed layers and registration history.
 */

import type { ResolverContext, RemovedLayer, RegistrationHistory } from "../types/index.js";
import { createXPathTextGetter, createNamespaceResolver } from "./bore-resolver-utils.js";
import { parseJaNee } from "./type-resolvers.js";

/**
 * Process removedLayer elements from additionalInvestigation
 *
 * Layers of material (e.g. asphalt, gravel fill) removed before the CPT was
 * performed. Directly affects depth interpretation of measurement data.
 */
export function processRemovedLayers(
  _value: string | null,
  context: ResolverContext,
): Array<RemovedLayer> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  const layerNodes = adapter.evaluateXPathAll(
    element,
    "./dscpt:additionalInvestigation/cptcommon:removedLayer",
    nsResolver,
  );

  return layerNodes.map((node) => {
    const getText = createXPathTextGetter(node, adapter, namespaces);
    const seqStr = getText("./cptcommon:sequenceNumber");
    const upperStr = getText("./cptcommon:upperBoundary");
    const lowerStr = getText("./cptcommon:lowerBoundary");

    return {
      sequenceNumber: seqStr ? parseInt(seqStr, 10) : 0,
      upperBoundary: upperStr ? parseFloat(upperStr) : 0,
      lowerBoundary: lowerStr ? parseFloat(lowerStr) : 0,
      description: getText("./cptcommon:description"),
    };
  });
}

/**
 * Process CPT registration history
 *
 * Equivalent to processRegistrationHistory in bore-resolvers but for the
 * dscpt namespace used in CPT documents.
 */
export function processCPTRegistrationHistory(
  _value: string | null,
  context: ResolverContext,
): RegistrationHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  const historyNode = adapter.evaluateXPath(element, "./dscpt:registrationHistory", nsResolver);

  if (!historyNode) {
    return null;
  }

  const getText = createXPathTextGetter(historyNode, adapter, namespaces);

  const objectRegistrationTimeStr = getText("./brocom:objectRegistrationTime");
  const registrationCompletionTimeStr = getText("./brocom:registrationCompletionTime");

  return {
    objectRegistrationTime: objectRegistrationTimeStr ? new Date(objectRegistrationTimeStr) : null,
    registrationStatus: getText("./brocom:registrationStatus"),
    registrationCompletionTime: registrationCompletionTimeStr
      ? new Date(registrationCompletionTimeStr)
      : null,
    corrected: parseJaNee(getText("./brocom:corrected")),
    underReview: parseJaNee(getText("./brocom:underReview")),
    deregistered: parseJaNee(getText("./brocom:deregistered")),
    reregistered: parseJaNee(getText("./brocom:reregistered")),
  };
}
