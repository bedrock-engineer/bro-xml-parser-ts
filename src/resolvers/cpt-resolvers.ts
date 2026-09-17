/**
 * Resolvers for CPT-specific complex data structures
 *
 * Handles structural/metadata parsing that requires traversing multiple
 * XML nodes: removed layers and registration history.
 */

import type { ResolverContext, RemovedLayer } from "../types/index.js";
import { createXPathTextGetter, createNamespaceResolver } from "./bore-resolver-utils.js";

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

// Registration history is parsed by the shared processRegistrationHistory in
// bore-resolver-utils (identical across CPT/BHR-GT/BHR-G).
