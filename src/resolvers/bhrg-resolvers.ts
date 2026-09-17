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
  ReportHistory,
  IntermediateEvent,
  XMLAdapter,
  Namespaces,
  MunsellColour,
  SandFraction,
  ShellFraction,
  GravelFraction,
  PeatFraction,
  Chunk,
  Mottle,
  ThinStratum,
  FractionDistribution,
} from "../types/index.js";
import {
  createLayerParser,
  createXPathTextGetter,
  createNamespaceResolver,
} from "./bore-resolver-utils.js";

import { parseFloat, parseDate } from "./type-resolvers.js";

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
/** Collect trimmed text of all nodes matching xpath (skipping empties). */
function textList(base: Node, xpath: string, adapter: XMLAdapter, namespaces: Namespaces): Array<string> {
  const nsResolver = createNamespaceResolver(namespaces);
  return adapter
    .evaluateXPathAll(base, xpath, nsResolver)
    .map((n) => n.textContent?.trim() ?? "")
    .filter((s) => s !== "");
}

function parseMunsellColour(node: Node, adapter: XMLAdapter, ns: Namespaces): MunsellColour {
  const g = createXPathTextGetter(node, adapter, ns);
  return {
    munsellHue: g("./bhrgcom:munsellHue"),
    munsellValue: g("./bhrgcom:munsellValue"),
    munsellChroma: g("./bhrgcom:munsellChroma"),
  };
}

function parseSandFraction(node: Node, adapter: XMLAdapter, ns: Namespaces): SandFraction {
  const g = createXPathTextGetter(node, adapter, ns);
  const nsResolver = createNamespaceResolver(ns);
  const sandConstituents = adapter
    .evaluateXPathAll(node, "./bhrgcom:sandConstituent", nsResolver)
    .map((c) => {
      const gc = createXPathTextGetter(c, adapter, ns);
      return {
        grainColour: gc("./bhrgcom:grainColour"),
        percentageClass: gc("./bhrgcom:percentageClass"),
        archiveClass: gc("./bhrgcom:archiveClass"),
      };
    });
  return {
    darkGrainContentClass: g("./bhrgcom:darkGrainContentClass"),
    darkGrainContentClassArchive: g("./bhrgcom:darkGrainContentClassArchive"),
    angularity: g("./bhrgcom:angularity"),
    sandMedianClass: g("./bhrgcom:sandMedianClass"),
    sandSorting: g("./bhrgcom:sandSorting"),
    variegation: g("./bhrgcom:variegation"),
    anomalouslyCoarseContentClass: g("./bhrgcom:anomalouslyCoarseContentClass"),
    anomalouslyCoarseContentClassArchive: g("./bhrgcom:anomalouslyCoarseContentClassArchive"),
    granuleContentClass: g("./bhrgcom:granuleContentClass"),
    granuleContentClassArchive: g("./bhrgcom:granuleContentClassArchive"),
    estimatedMedian: parseFloat(g("./bhrgcom:estimatedMedian")),
    sandConstituents,
  };
}

function parseShellFraction(node: Node, adapter: XMLAdapter, ns: Namespaces): ShellFraction {
  const g = createXPathTextGetter(node, adapter, ns);
  const nsResolver = createNamespaceResolver(ns);
  const shellConstituents = adapter
    .evaluateXPathAll(node, "./bhrgcom:shellConstituent", nsResolver)
    .map((c) => {
      const gc = createXPathTextGetter(c, adapter, ns);
      return {
        shellTaxon: gc("./bhrgcom:shellTaxon"),
        relativeAbundance: gc("./bhrgcom:relativeAbundance"),
        relativeAbundanceClass: gc("./bhrgcom:relativeAbundanceClass"),
        relativeAbundanceClassArchive: gc("./bhrgcom:relativeAbundanceClassArchive"),
      };
    });
  return {
    gritContentClass: g("./bhrgcom:gritContentClass"),
    fragmentContentClass: g("./bhrgcom:fragmentContentClass"),
    remainsContentClass: g("./bhrgcom:remainsContentClass"),
    wholeContentClass: g("./bhrgcom:wholeContentClass"),
    doublets: g("./bhrgcom:doublets"),
    thickWalledContentClass: g("./bhrgcom:thickWalledContentClass"),
    thinWalledContentClass: g("./bhrgcom:thinWalledContentClass"),
    inSitu: g("./bhrgcom:inSitu"),
    weatheringDegree: g("./bhrgcom:weatheringDegree"),
    shellConstituents,
  };
}

function parseGravelFraction(node: Node, adapter: XMLAdapter, ns: Namespaces): GravelFraction {
  const g = createXPathTextGetter(node, adapter, ns);
  const nsResolver = createNamespaceResolver(ns);
  const gravelConstituents = adapter
    .evaluateXPathAll(node, "./bhrgcom:gravelConstituent", nsResolver)
    .map((c) => {
      const gc = createXPathTextGetter(c, adapter, ns);
      return {
        gravelType: gc("./bhrgcom:gravelType"),
        fractionProportion: parseFloat(gc("./bhrgcom:fractionProportion")),
        archiveClass: gc("./bhrgcom:archiveClass"),
      };
    });
  return {
    gravelMedianClass: g("./bhrgcom:gravelMedianClass"),
    angularity: g("./bhrgcom:angularity"),
    fineGravelContentClass: g("./bhrgcom:fineGravelContentClass"),
    mediumCoarseGravelContentClass: g("./bhrgcom:mediumCoarseGravelContentClass"),
    veryCoarseGravelContentClass: g("./bhrgcom:veryCoarseGravelContentClass"),
    ventifactPresent: g("./bhrgcom:ventifactPresent"),
    sphericity: g("./bhrgcom:sphericity"),
    variegation: g("./bhrgcom:variegation"),
    gravelProvenance: g("./bhrgcom:gravelProvenance"),
    estimatedMedian: parseFloat(g("./bhrgcom:estimatedMedian")),
    gravelConstituents,
  };
}

function parsePeatFraction(node: Node, adapter: XMLAdapter, ns: Namespaces): PeatFraction {
  const g = createXPathTextGetter(node, adapter, ns);
  const nsResolver = createNamespaceResolver(ns);
  const peatConstituents = adapter
    .evaluateXPathAll(node, "./bhrgcom:peatConstituent", nsResolver)
    .map((c) => {
      const gc = createXPathTextGetter(c, adapter, ns);
      return {
        plantRemainType: gc("./bhrgcom:plantRemainType"),
        percentageClass: gc("./bhrgcom:percentageClass"),
        archiveClass: gc("./bhrgcom:archiveClass"),
      };
    });
  return { peatType: g("./bhrgcom:peatType"), peatConstituents };
}

function parseFractionDistribution(
  node: Node,
  adapter: XMLAdapter,
  ns: Namespaces,
): FractionDistribution {
  const g = createXPathTextGetter(node, adapter, ns);
  const nsResolver = createNamespaceResolver(ns);
  const result: FractionDistribution = {
    fractionDistributionComplete: g("./bhrgcom:fractionDistributionComplete"),
    estimatedMassProportionOrganicMatter: parseFloat(
      g("./bhrgcom:estimatedMassProportionOrganicMatter"),
    ),
    estimatedMassProportionShellMatter: parseFloat(g("./bhrgcom:estimatedMassProportionShellMatter")),
    estimatedVolumeProportionShellMatter: parseFloat(
      g("./bhrgcom:estimatedVolumeProportionShellMatter"),
    ),
    estimatedMassProportionShell: parseFloat(g("./bhrgcom:estimatedMassProportionShell")),
    estimatedMassProportionGravel: parseFloat(g("./bhrgcom:estimatedMassProportionGravel")),
    estimatedVolumeProportionGravel: parseFloat(g("./bhrgcom:estimatedVolumeProportionGravel")),
  };
  const organic = adapter.evaluateXPath(
    node,
    "./bhrgcom:fineFractionDistributionOrganicSoil",
    nsResolver,
  );
  if (organic) {
    const go = createXPathTextGetter(organic, adapter, ns);
    result.fineFractionDistributionOrganicSoil = {
      estimatedMassProportionSand: parseFloat(go("./bhrgcom:estimatedMassProportionSand")),
      estimatedMassProportionSilt: parseFloat(go("./bhrgcom:estimatedMassProportionSilt")),
      estimatedMassProportionLutum: parseFloat(go("./bhrgcom:estimatedMassProportionLutum")),
    };
  }
  const shelly = adapter.evaluateXPath(
    node,
    "./bhrgcom:fineFractionDistributionShellySoil",
    nsResolver,
  );
  if (shelly) {
    const gs = createXPathTextGetter(shelly, adapter, ns);
    result.fineFractionDistributionShellySoil = {
      estimatedVolumeProportionSand: parseFloat(gs("./bhrgcom:estimatedVolumeProportionSand")),
      estimatedVolumeProportionSilt: parseFloat(gs("./bhrgcom:estimatedVolumeProportionSilt")),
      estimatedVolumeProportionLutum: parseFloat(gs("./bhrgcom:estimatedVolumeProportionLutum")),
    };
  }
  return result;
}

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
    { xpath: "./bhrgcom:upperBoundaryDetermination", key: "upperBoundaryDetermination" },
    { xpath: "./bhrgcom:lowerBoundaryDetermination", key: "lowerBoundaryDetermination" },
    { xpath: "./bhrgcom:anthropogenic", key: "anthropogenic" },
    { xpath: "./bhrgcom:rooted", key: "rooted" },
    { xpath: "./bhrgcom:postSedimentary", key: "postSedimentary", omitIfEmpty: true },
    { xpath: "./bhrgcom:horizonCode", key: "horizonCode", omitIfEmpty: true },
    { xpath: "./bhrgcom:humanTrace", key: "humanTrace", omitIfEmpty: true },
    { xpath: "./bhrgcom:geologicalOrigin", key: "geologicalOrigin", omitIfEmpty: true },
    { xpath: "./bhrgcom:bioturbated", key: "bioturbated", omitIfEmpty: true },
    // Soil-level fields (inside <soil>)
    { xpath: "./bhrgcom:soil/bhrgcom:colour", key: "color", omitIfEmpty: true },
    {
      xpath: "./bhrgcom:soil/bhrgcom:organicMatterContentClassNEN5104",
      key: "organicMatterContentClassNEN5104",
    },
    { xpath: "./bhrgcom:soil/bhrgcom:gravelContentClass", key: "gravelContentClass" },
    { xpath: "./bhrgcom:soil/bhrgcom:carbonateContentClass", key: "carbonateContentClass" },
    { xpath: "./bhrgcom:soil/bhrgcom:sandMedianClass", key: "sandMedianClass" },
    {
      xpath: "./bhrgcom:soil/bhrgcom:geologicalSoilName",
      key: "geologicalSoilName",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:shellMatterContentClass",
      key: "shellMatterContentClass",
      omitIfEmpty: true,
    },
    { xpath: "./bhrgcom:soil/bhrgcom:micaContentClass", key: "micaContentClass", omitIfEmpty: true },
    {
      xpath: "./bhrgcom:soil/bhrgcom:micaContentClassArchive",
      key: "micaContentClassArchive",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:shellMatterContentClassArchive",
      key: "shellMatterContentClassArchive",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:glauconiteContentClass",
      key: "glauconiteContentClass",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:glauconiteContentClassArchive",
      key: "glauconiteContentClassArchive",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgcom:soil/bhrgcom:sedimentaryPhenomenon",
      key: "sedimentaryPhenomenon",
      omitIfEmpty: true,
    },
  ],
  postProcess: (layerNode, layer, adapter, namespaces) => {
    const nsResolver = createNamespaceResolver(namespaces);

    // Layer-level repeatable codes
    const structure = textList(layerNode, "./bhrgcom:structure", adapter, namespaces);
    if (structure.length) { layer.structure = structure; }
    const verticalTrend = textList(layerNode, "./bhrgcom:verticalTrend", adapter, namespaces);
    if (verticalTrend.length) { layer.verticalTrend = verticalTrend; }
    const archeological = textList(
      layerNode,
      "./bhrgcom:archeologicalConstituent/bhrgcom:constituentType",
      adapter,
      namespaces,
    );
    if (archeological.length) { layer.archeologicalConstituents = archeological; }

    // Thin strata (layer level)
    const thinStrata: Array<ThinStratum> = adapter
      .evaluateXPathAll(layerNode, "./bhrgcom:thinStratum", nsResolver)
      .map((t) => {
        const g = createXPathTextGetter(t, adapter, namespaces);
        return {
          layerProportion: parseFloat(g("./bhrgcom:layerProportion")),
          layerProportionClass: g("./bhrgcom:layerProportionClass"),
          layerProportionClassArchive: g("./bhrgcom:layerProportionClassArchive"),
          stratumThicknessClass: g("./bhrgcom:stratumThicknessClass"),
          geologicalOrigin: g("./bhrgcom:geologicalOrigin"),
        };
      });
    if (thinStrata.length) { layer.thinStrata = thinStrata; }

    const soilNode = adapter.evaluateXPath(layerNode, "./bhrgcom:soil", nsResolver);
    if (!soilNode) { return; }

    const vcf = textList(soilNode, "./bhrgcom:veryCoarseFractionContentClass", adapter, namespaces);
    if (vcf.length) { layer.veryCoarseFractionContentClass = vcf; }
    const vcfArchive = textList(
      soilNode,
      "./bhrgcom:veryCoarseFractionContentClassArchive",
      adapter,
      namespaces,
    );
    if (vcfArchive.length) { layer.veryCoarseFractionContentClassArchive = vcfArchive; }
    const animalFossils = textList(
      soilNode,
      "./bhrgcom:animalFossil/bhrgcom:animalFossilType",
      adapter,
      namespaces,
    );
    if (animalFossils.length) { layer.animalFossils = animalFossils; }

    const single = (xpath: string): Node | null =>
      adapter.evaluateXPath(soilNode, xpath, nsResolver);

    const munsell = single("./bhrgcom:munsellColour");
    if (munsell) { layer.munsellColour = parseMunsellColour(munsell, adapter, namespaces); }
    const sand = single("./bhrgcom:sandFraction");
    if (sand) { layer.sandFraction = parseSandFraction(sand, adapter, namespaces); }
    const shell = single("./bhrgcom:shellFraction");
    if (shell) { layer.shellFraction = parseShellFraction(shell, adapter, namespaces); }
    const gravel = single("./bhrgcom:gravelFraction");
    if (gravel) { layer.gravelFraction = parseGravelFraction(gravel, adapter, namespaces); }
    const peat = single("./bhrgcom:peatFraction");
    if (peat) { layer.peatFraction = parsePeatFraction(peat, adapter, namespaces); }
    const fracDist = single("./bhrgcom:fractionDistribution");
    if (fracDist) { layer.fractionDistribution = parseFractionDistribution(fracDist, adapter, namespaces); }

    // Chunks and mottles (soil level, repeatable)
    const chunks: Array<Chunk> = adapter
      .evaluateXPathAll(soilNode, "./bhrgcom:chunk", nsResolver)
      .map((c) => {
        const g = createXPathTextGetter(c, adapter, namespaces);
        return {
          soilType: g("./bhrgcom:soilType"),
          sizeClass: g("./bhrgcom:sizeClass"),
          percentageClass: g("./bhrgcom:percentageClass"),
          archiveClass: g("./bhrgcom:archiveClass"),
          colour: g("./bhrgcom:colour"),
          geologicalOrigin: g("./bhrgcom:geologicalOrigin"),
          cemented: g("./bhrgcom:cemented"),
        };
      });
    if (chunks.length) { layer.chunks = chunks; }

    const mottles: Array<Mottle> = adapter
      .evaluateXPathAll(soilNode, "./bhrgcom:mottle", nsResolver)
      .map((m) => {
        const g = createXPathTextGetter(m, adapter, namespaces);
        return {
          colour: g("./bhrgcom:colour"),
          density: g("./bhrgcom:density"),
          inBands: g("./bhrgcom:inBands"),
        };
      });
    if (mottles.length) { layer.mottles = mottles; }
  },
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

// Registration history is parsed by the shared processRegistrationHistory in
// bore-resolver-utils (identical across CPT/BHR-GT/BHR-G).

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
    const eventDateStr = getEventText("./bhrgcom:date");

    intermediateEvents.push({
      eventName: getEventText("./bhrgcom:name"),
      eventDate: parseDate(eventDateStr),
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
