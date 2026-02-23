/**
 * Public resolver functions for custom schema definitions
 *
 * These functions can be used in custom schemas to transform
 * XML values into appropriate JavaScript types.
 *
 * @example
 * ```typescript
 * import { BROParser, resolvers } from '@bedrock-engineer/bro-xml';
 *
 * const mySchema = {
 *   depth: {
 *     xpath: './/cptcommon:finalDepth',
 *     resolver: resolvers.parseFloat
 *   },
 *   date: {
 *     xpath: './dscpt:researchReportDate/brocom:date',
 *     resolver: resolvers.parseDate
 *   },
 *   completed: {
 *     xpath: './dsbhrgt:boring/bhrgtcom:boreholeCompleted',
 *     resolver: resolvers.parseBoolean
 *   }
 * };
 * ```
 */

// Re-export type resolvers
export {
  parseFloat,
  parseInt,
  parseBoolean,
  parseDate,
  parseQualityClass,
  lowerText,
} from "./resolvers/type-resolvers.js";

// Re-export GML resolvers
export { parseGMLLocation } from "./resolvers/gml-resolvers.js";

// Re-export measurement resolvers
export { processCPTResult } from "./resolvers/measurement-resolver.js";

// Re-export bore resolvers (BHR-GT)
export {
  processBHRGTLayerData,
  processBoreholeSampleAnalysis,
  processBoredIntervals,
  processSampledIntervals,
  processCompletedIntervals,
  processNotDescribedIntervals,
  processRegistrationHistory,
  processReportHistory,
} from "./resolvers/bore-resolvers.js";

// Re-export BHR-G resolvers
export {
  processBHRGLayerData,
  processBHRGBoredIntervals,
  processBHRGSampledIntervals,
  processBHRGRegistrationHistory,
  processBHRGReportHistory,
} from "./resolvers/bhrg-resolvers.js";
