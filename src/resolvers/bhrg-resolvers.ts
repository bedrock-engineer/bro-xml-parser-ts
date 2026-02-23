/**
 * Resolvers for BHR-G (Geological Borehole) data
 *
 * Functions to parse and convert BHR-G-specific data structures
 */

import type {
  BHRGLayer,
  ResolverContext,
  BoredInterval,
  SampledInterval,
  RegistrationHistory,
  ReportHistory,
  IntermediateEvent,
} from "../types/index.js";
import {
  createLayerParser,
  createXPathTextGetter,
  createNamespaceResolver,
} from "./bore-resolver-utils.js";

import { parseFloat as parseFloatValue } from "./type-resolvers.js";

/**
 * Parse ja/nee boolean field
 */
function parseJaNee(text: string | null): boolean | null {
  if (text === null) {
    return null;
  }
  const lower = text.toLowerCase();
  if (lower === "ja" || lower === "yes") {
    return true;
  }
  if (lower === "nee" || lower === "no") {
    return false;
  }
  return null;
}

/**
 * Helper to parse float with null handling
 */
function parseFloat(text: string | null | undefined): number | null {
  return parseFloatValue(text ?? null);
}

/**
 * Process BHR-G layer data from descriptiveBoreholeLog element
 *
 * Uses createLayerParser factory to extract layer elements and convert
 * them to BHRGLayer objects with depth boundaries and NEN5104 soil classification.
 *
 * Extracts all coded fields from BHR-G layers including:
 * - Boundary determination methods (how boundaries were positioned)
 * - Anthropogenic and rooted indicators
 * - All soil classification properties
 */
export const processBHRGLayerData = createLayerParser<BHRGLayer>({
  layerXPath: ".//bhrgcom:layer/bhrgcom:Layer",
  requiredFields: {
    upperBoundary: "./bhrgcom:upperBoundary",
    lowerBoundary: "./bhrgcom:lowerBoundary",
    soilName: "./bhrgcom:soil/bhrgcom:soilNameNEN5104",
    soilNameKey: "soilNameNEN5104",
  },
  optionalFields: [
    // Layer-level fields (outside <soil>)
    {
      xpath: "./bhrgcom:upperBoundaryDetermination",
      key: "upperBoundaryDetermination",
    },
    {
      xpath: "./bhrgcom:lowerBoundaryDetermination",
      key: "lowerBoundaryDetermination",
    },
    { xpath: "./bhrgcom:anthropogenic", key: "anthropogenic" },
    { xpath: "./bhrgcom:rooted", key: "rooted" },
    // Soil-level fields (inside <soil>)
    { xpath: "./bhrgcom:soil/bhrgcom:colour", key: "color", omitIfEmpty: true },
    {
      xpath: "./bhrgcom:soil/bhrgcom:organicMatterContentClassNEN5104",
      key: "organicMatterContentClassNEN5104",
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:gravelContentClass",
      key: "gravelContentClass",
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:carbonateContentClass",
      key: "carbonateContentClass",
    },
    { xpath: "./bhrgcom:soil/bhrgcom:sandMedianClass", key: "sandMedianClass" },
  ],
});

/**
 * Process bored intervals from BHR-G boring element
 *
 * BHR-G uses wrapper elements: bhrgcom:boredInterval/bhrgcom:BoredInterval
 */
export function processBHRGBoredIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<BoredInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all boredInterval elements within boring - BHR-G uses wrapper element
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:boredInterval/bhrgcom:BoredInterval",
    nsResolver,
  );

  const intervals: Array<BoredInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    intervals.push({
      beginDepth,
      endDepth,
      boringTechnique: getText("./bhrgcom:boringTechnique"),
      boredDiameter: parseFloat(getText("./bhrgcom:boredDiameter")),
    });
  }

  return intervals;
}

/**
 * Process sampled intervals from BHR-G boring element
 *
 * BHR-G uses wrapper elements: bhrgcom:sampledInterval/bhrgcom:SampledInterval
 * Note: BHR-G doesn't have the detailed sampler info that BHR-GT has
 */
export function processBHRGSampledIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<SampledInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all sampledInterval elements within boring - BHR-G uses wrapper element
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrg:boring/bhrgcom:Boring/bhrgcom:sampledInterval/bhrgcom:SampledInterval",
    nsResolver,
  );

  const intervals: Array<SampledInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    intervals.push({
      beginDepth,
      endDepth,
      preTreatment: getText("./bhrgcom:preTreatment"),
      samplingMethod: getText("./bhrgcom:samplingMethod"),
      samplingQuality: getText("./bhrgcom:samplingQuality"),
      orientatedSampled: null, // Not present in BHR-G
    });
  }

  return intervals;
}

/**
 * Process registration history from BHR-G document element
 */
export function processBHRGRegistrationHistory(
  _value: string | null,
  context: ResolverContext,
): RegistrationHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find registrationHistory element (in default namespace dsbhrg)
  const historyNode = adapter.evaluateXPath(element, "./dsbhrg:registrationHistory", nsResolver);

  if (!historyNode) {
    return null;
  }

  const getText = createXPathTextGetter(historyNode, adapter, namespaces);

  // Parse dates
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

/**
 * Process report history from BHR-G document element
 *
 * Note: BHR-G uses a different structure (event with date and name) than BHR-GT
 */
export function processBHRGReportHistory(
  _value: string | null,
  context: ResolverContext,
): ReportHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find reportHistory element (in default namespace dsbhrg)
  const historyNode = adapter.evaluateXPath(element, "./dsbhrg:reportHistory", nsResolver);

  if (!historyNode) {
    return null;
  }

  // BHR-G uses bhrgcom:event instead of intermediateEvent
  const eventNodes = adapter.evaluateXPathAll(historyNode, "./bhrgcom:event", nsResolver);

  const intermediateEvents: Array<IntermediateEvent> = [];

  for (const eventNode of eventNodes) {
    const getEventText = createXPathTextGetter(eventNode, adapter, namespaces);
    const eventDateStr = getEventText("./bhrgcom:date/brocom:date");

    intermediateEvents.push({
      eventName: getEventText("./bhrgcom:name"),
      eventDate: eventDateStr ? new Date(eventDateStr) : null,
    });
  }

  // BHR-G doesn't have reportStartDate/reportEndDate at top level
  // The event date serves as the report date
  const firstEvent = intermediateEvents[0];
  const firstEventDate = firstEvent ? firstEvent.eventDate : null;

  return {
    reportStartDate: firstEventDate,
    reportEndDate: firstEventDate,
    intermediateEvents,
  };
}
