/**
 * Resolvers for BHR-GT (Geotechnical Borehole) data
 *
 * Functions to parse and convert bore-specific data structures
 */

import type {
  ResolverContext,
  BHRGTLayer,
  Grainshape,
  BoreholeSampleAnalysis,
  InvestigatedInterval,
  WaterContentDetermination,
  VolumetricMassDensityDetermination,
  OrganicMatterContentDetermination,
  CarbonateContentDetermination,
  VolumetricMassDensityOfSolidsDetermination,
  ParticleSizeDistributionDetermination,
  ConsistencyLimitsDetermination,
  SettlementCharacteristicsDetermination,
  SaturatedPermeabilityDetermination,
  ShearStressChangeDuringLoadingDetermination,
  MaximumUndrainedShearStrengthDetermination,
  ShearStressChangeDuringHorizontalDeformationDetermination,
  DeterminationConfig,
  XMLAdapter,
  Namespaces,
  BoredInterval,
  SampledInterval,
  SamplerDetails,
  CompletedInterval,
  NotDescribedInterval,
  RegistrationHistory,
  ReportHistory,
  IntermediateEvent,
} from "../types/index.js";

// Import shared utilities
import {
  createXPathTextGetter,
  createNamespaceResolver,
  createLayerParser,
  getTextContent,
  findChildElement,
  extractArray,
  parseCSVPairs,
  parseCSVRows,
} from "./bore-resolver-utils.js";

// Import type resolvers
import { parseBoolean, parseFloat, parseJaNee } from "./type-resolvers.js";

/**
 * Parse dispersedInhomogeneity field
 * Special case: 'geen' (none) means false, any other value means true
 */
function parseDispersedInhomogeneity(text: string | null): boolean | null {
  if (text === null) {
    return null;
  }
  const lower = text.toLowerCase();
  // 'geen' means no dispersed inhomogeneity
  if (lower === "geen") {
    return false;
  }
  // Any other value indicates presence of dispersed inhomogeneity
  return true;
}

/**
 * Process bore layer data from descriptiveBoreholeLog element
 *
 * Uses createLayerParser factory to extract layer elements and convert
 * them to BHRGTLayer objects with depth boundaries and soil classification.
 *
 * Extracts all coded fields from BHR-GT layers including:
 * - Boundary determination methods (how boundaries were positioned)
 * - Anthropogenic indicator (whether layer is man-made)
 * - Tertiary soil constituent
 * - Grain shape properties for coarse fractions
 */
export const processBHRGTLayerData = createLayerParser<BHRGTLayer>({
  layerXPath: ".//bhrgtcom:layer",
  requiredFields: {
    upperBoundary: "./bhrgtcom:upperBoundary",
    lowerBoundary: "./bhrgtcom:lowerBoundary",
    soilName: "./bhrgtcom:soil/bhrgtcom:geotechnicalSoilName",
    soilNameKey: "geotechnicalSoilName",
  },
  optionalFields: [
    // Layer-level fields (outside <soil>)
    {
      xpath: "./bhrgtcom:upperBoundaryDetermination",
      key: "upperBoundaryDetermination",
    },
    {
      xpath: "./bhrgtcom:lowerBoundaryDetermination",
      key: "lowerBoundaryDetermination",
    },
    {
      xpath: "./bhrgtcom:anthropogenic",
      key: "anthropogenic",
      transform: parseJaNee,
    },
    {
      xpath: "./bhrgtcom:slant",
      key: "slant",
      transform: parseJaNee,
    },
    // Soil-level fields (inside <soil>)
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:tertiaryConstituent",
      key: "tertiaryConstituent",
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:colour",
      key: "color",
      omitIfEmpty: true,
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:dispersedInhomogeneity",
      key: "dispersedInhomogeneity",
      transform: parseDispersedInhomogeneity,
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:organicMatterContentClass",
      key: "organicMatterContentClass",
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:carbonateContentClass",
      key: "carbonateContentClass",
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:sandMedianClass",
      key: "sandMedianClass",
    },
    // Layer structure properties (at layer level)
    {
      xpath: "./bhrgtcom:bedded",
      key: "bedded",
      transform: parseJaNee,
    },
    {
      xpath: "./bhrgtcom:internalStructureIntact",
      key: "internalStructureIntact",
      transform: parseJaNee,
    },
    // Soil structure properties (inside <soil>)
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:mixed",
      key: "mixed",
      transform: parseJaNee,
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:mottled",
      key: "mottled",
      transform: parseJaNee,
    },
    // Fine-grained soil consistency
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:fineSoilConsistency",
      key: "fineSoilConsistency",
    },
    // Organic soil properties
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:organicSoilConsistency",
      key: "organicSoilConsistency",
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:organicSoilTexture",
      key: "organicSoilTexture",
    },
    {
      xpath: "./bhrgtcom:soil/bhrgtcom:peatTensileStrength",
      key: "peatTensileStrength",
    },
  ],
  // Extract nested grainshape object
  postProcess: (layerNode, layer, adapter, namespaces) => {
    const nsResolver = createNamespaceResolver(namespaces);
    const grainshapeNode = adapter.evaluateXPath(
      layerNode,
      "./bhrgtcom:soil/bhrgtcom:grainshape",
      nsResolver,
    );

    if (grainshapeNode) {
      const getText = createXPathTextGetter(grainshapeNode, adapter, namespaces);
      const grainshape: Grainshape = {
        sizeFraction: getText("./bhrgtcom:sizeFraction"),
        angularity: getText("./bhrgtcom:angularity"),
        sphericity: getText("./bhrgtcom:sphericity"),
      };
      layer.grainshape = grainshape;
    }
  },
});

/**
 * Empty structure constants for determinations
 */
const EMPTY_CONSISTENCY_LIMITS: ConsistencyLimitsDetermination = {
  determinationProcedure: null,
  determinationMethod: null,
  fractionLarger500um: null,
  usedMedium: null,
  performanceIrregularity: null,
  liquidLimit: null,
  plasticLimit: null,
  plasticityIndex: null,
  plasticityAtSpecificWaterContent: [],
};

const EMPTY_SETTLEMENT_CHARACTERISTICS: SettlementCharacteristicsDetermination = {
  determinationProcedure: null,
  determinationMethod: null,
  ringDiameter: null,
  sampleMoistness: null,
  filterPaperUsed: null,
  temperature: null,
  wallFrictionCorrectionMethod: null,
  apparatusDeformationApplied: null,
  bearingFrictionCorrectionApplied: null,
  irregularResult: null,
  determinationSteps: [],
};

const EMPTY_SATURATED_PERMEABILITY: SaturatedPermeabilityDetermination = {
  determinationProcedure: null,
  determinationMethod: null,
  specimenMade: null,
  saturatedWithCO2: null,
  verticallyDetermined: null,
  currentDownwards: null,
  usedMedium: null,
  waterDegassed: null,
  temperature: null,
  maximumGradient: null,
  saturatedPermeabilityAtSpecificDensity: [],
};

/**
 * Parse water content determination from XML node
 */
function parseWaterContentDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): WaterContentDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  const resultNode = findChildElement(node, "./bhrgtcom:determinationResult", adapter, namespaces);

  const extra = resultNode
    ? {
        dryingTemperature: getText("./bhrgtcom:determinationResult/bhrgtcom:dryingTemperature"),
        waterContent: parseFloat(getText("./bhrgtcom:determinationResult/bhrgtcom:waterContent")),
        saltCorrectionMethod: getText(
          "./bhrgtcom:determinationResult/bhrgtcom:saltCorrectionMethod",
        ),
        dryingPeriod: getText("./bhrgtcom:determinationResult/bhrgtcom:dryingPeriod"),
      }
    : {
        dryingTemperature: null,
        waterContent: null,
        saltCorrectionMethod: null,
        dryingPeriod: null,
      };

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
    removedMaterial: getText("./bhrgtcom:removedMaterial"),
    ...extra,
  };
}

/**
 * Parse volumetric mass density determination from XML node
 */
function parseVolumetricMassDensityDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): VolumetricMassDensityDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
    volumetricMassDensity: parseFloat(getText("./bhrgtcom:volumetricMassDensity")),
  };
}

/**
 * Parse organic matter content determination from XML node
 */
function parseOrganicMatterContentDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): OrganicMatterContentDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    removedMaterial: getText("./bhrgtcom:removedMaterial"),
    organicMatterContent: parseFloat(getText("./bhrgtcom:organicMatterContent")),
  };
}

/**
 * Parse carbonate content determination from XML node
 */
function parseCarbonateContentDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): CarbonateContentDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    removedMaterial: getText("./bhrgtcom:removedMaterial"),
    carbonateContent: parseFloat(getText("./bhrgtcom:carbonateContent")),
  };
}

/**
 * Parse volumetric mass density of solids determination from XML node
 */
function parseVolumetricMassDensityOfSolidsDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): VolumetricMassDensityOfSolidsDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    liquidUsed: getText("./bhrgtcom:usedMedium"),
    volumetricMassDensityOfSolids: parseFloat(getText("./bhrgtcom:volumetricMassDensitySolids")),
  };
}

/**
 * Parse particle size distribution determination from XML node
 */
function parseParticleSizeDistributionDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): ParticleSizeDistributionDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  const basicDistNode = findChildElement(
    node,
    "./bhrgtcom:basicParticleSizeDistribution",
    adapter,
    namespaces,
  );

  const detailedNode = basicDistNode
    ? findChildElement(
        basicDistNode,
        "./bhrgtcom:detailedDistributionFractionSmaller63um",
        adapter,
        namespaces,
      )
    : null;

  const standardNode = basicDistNode
    ? findChildElement(
        basicDistNode,
        "./bhrgtcom:standardDistributionFractionLarger63um",
        adapter,
        namespaces,
      )
    : null;

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    fractionDistribution: getText("./bhrgtcom:fractionDistribution"),
    dispersionMethod: getText("./bhrgtcom:dispersionMethod"),
    removedMaterial: getText("./bhrgtcom:removedMaterial"),
    equivalentMassDeterminationMethod: getText("./bhrgtcom:equivalentMassDeterminationMethod"),
    equivalentMass: parseFloat(getText("./bhrgtcom:equivalentMass")),

    // Basic distribution
    fractionSmaller63um: basicDistNode
      ? parseFloat(getText("./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:fractionSmaller63um"))
      : null,
    fractionLarger63um: basicDistNode
      ? parseFloat(getText("./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:fractionLarger63um"))
      : null,

    // Detailed distribution < 63μm
    fraction0to2um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction0to2um",
          ),
        )
      : null,
    fraction2to4um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction2to4um",
          ),
        )
      : null,
    fraction4to8um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction4to8um",
          ),
        )
      : null,
    fraction8to16um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction8to16um",
          ),
        )
      : null,
    fraction16to32um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction16to32um",
          ),
        )
      : null,
    fraction32to50um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction32to50um",
          ),
        )
      : null,
    fraction50to63um: detailedNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:detailedDistributionFractionSmaller63um/bhrgtcom:fraction50to63um",
          ),
        )
      : null,

    // Standard distribution > 63μm
    fraction63to90um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction63to90um",
          ),
        )
      : null,
    fraction90to125um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction90to125um",
          ),
        )
      : null,
    fraction125to180um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction125to180um",
          ),
        )
      : null,
    fraction180to250um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction180to250um",
          ),
        )
      : null,
    fraction250to355um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction250to355um",
          ),
        )
      : null,
    fraction355to500um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction355to500um",
          ),
        )
      : null,
    fraction500to710um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction500to710um",
          ),
        )
      : null,
    fraction710to1000um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction710to1000um",
          ),
        )
      : null,
    fraction1000to1400um: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction1000to1400um",
          ),
        )
      : null,
    fraction1400umto2mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction1400umto2mm",
          ),
        )
      : null,
    fraction2to4mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction2to4mm",
          ),
        )
      : null,
    fraction4to8mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction4to8mm",
          ),
        )
      : null,
    fraction8to16mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction8to16mm",
          ),
        )
      : null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction16to31_5mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction16to31_5mm",
          ),
        )
      : null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction31_5to63mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fraction31_5to63mm",
          ),
        )
      : null,
    fractionLarger63mm: standardNode
      ? parseFloat(
          getText(
            "./bhrgtcom:basicParticleSizeDistribution/bhrgtcom:standardDistributionFractionLarger63um/bhrgtcom:fractionLarger63mm",
          ),
        )
      : null,
  };
}

/**
 * Parse consistency limits determination (Atterberg limits) from XML node
 */
function parseConsistencyLimitsDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): ConsistencyLimitsDetermination {
  const determinationNode = findChildElement(
    node,
    "./bhrgtcom:ConsistencyLimitsDetermination",
    adapter,
    namespaces,
  );

  if (!determinationNode) {
    return EMPTY_CONSISTENCY_LIMITS;
  }

  const getText = createXPathTextGetter(determinationNode, adapter, namespaces);

  const plasticityAtSpecificWaterContent = extractArray(
    determinationNode,
    "./bhrgtcom:plasticityAtSpecificWaterContent",
    (_pNode, getPlasticityText) => {
      const waterContent = parseFloat(getPlasticityText("./bhrgtcom:waterContent"));
      const numberOfFalls = parseInt(getPlasticityText("./bhrgtcom:numberOfFalls") ?? "0", 10);

      return waterContent !== null && !isNaN(numberOfFalls)
        ? { waterContent, numberOfFalls }
        : null;
    },
    adapter,
    namespaces,
  );

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    fractionLarger500um: parseFloat(getText("./bhrgtcom:fractionLarger500um")),
    usedMedium: getText("./bhrgtcom:usedMedium"),
    performanceIrregularity: getText("./bhrgtcom:performanceIrregularity"),
    liquidLimit: parseFloat(getText("./bhrgtcom:liquidLimit")),
    plasticLimit: parseFloat(getText("./bhrgtcom:plasticLimit")),
    plasticityIndex: parseFloat(getText("./bhrgtcom:plasticityIndex")),
    plasticityAtSpecificWaterContent,
  };
}

/**
 * Parse settlement characteristics determination (Oedometer/Consolidation test) from XML node
 */
function parseSettlementCharacteristicsDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): SettlementCharacteristicsDetermination {
  const determinationNode = findChildElement(
    node,
    "./bhrgtcom:SettlementCharacteristicsDetermination",
    adapter,
    namespaces,
  );

  if (!determinationNode) {
    return EMPTY_SETTLEMENT_CHARACTERISTICS;
  }

  const getText = createXPathTextGetter(determinationNode, adapter, namespaces);

  const determinationSteps = extractArray(
    determinationNode,
    "./bhrgtcom:determinationStep",
    (stepNode, getStepText) => {
      const stepNumber = parseInt(getStepText("./bhrgtcom:stepNumber") ?? "0", 10);

      const heightChangeNode = findChildElement(
        stepNode,
        "./bhrgtcom:heightChangeDuringSettlement/bhrgtcom:values",
        adapter,
        namespaces,
      );

      const heightChangeDuringSettlement = parseCSVPairs(
        heightChangeNode?.textContent,
        (timeStr, heightStr) => {
          const time = parseFloat(timeStr);
          const height = parseFloat(heightStr);
          return time !== null && height !== null && !isNaN(time) && !isNaN(height)
            ? { time, height }
            : null;
        },
      );

      return {
        stepNumber,
        wetPerformed: parseBoolean(getStepText("./bhrgtcom:wetPerformed")),
        swellObserved: parseBoolean(getStepText("./bhrgtcom:swellObserved")),
        strainPoint24hours: parseFloat(getStepText("./bhrgtcom:strainPoint24hours")),
        stepType: getStepText("./bhrgtcom:stepType"),
        verticalStress: parseFloat(getStepText("./bhrgtcom:verticalStress")),
        heightChangeDuringSettlement,
      };
    },
    adapter,
    namespaces,
  );

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    ringDiameter: parseFloat(getText("./bhrgtcom:ringDiameter")),
    sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
    filterPaperUsed: parseBoolean(getText("./bhrgtcom:filterPaperUsed")),
    temperature: parseFloat(getText("./bhrgtcom:temperature")),
    wallFrictionCorrectionMethod: getText("./bhrgtcom:wallFrictionCorrectionMethod"),
    apparatusDeformationApplied: parseBoolean(getText("./bhrgtcom:apparatusDeformationApplied")),
    bearingFrictionCorrectionApplied: parseBoolean(
      getText("./bhrgtcom:bearingFrictionCorrectionApplied"),
    ),
    irregularResult: parseBoolean(getText("./bhrgtcom:irregularResult")),
    determinationSteps,
  };
}

/**
 * Parse saturated permeability determination (Hydraulic conductivity test) from XML node
 */
function parseSaturatedPermeabilityDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): SaturatedPermeabilityDetermination {
  const determinationNode = findChildElement(
    node,
    "./bhrgtcom:SaturatedPermeabilityDetermination",
    adapter,
    namespaces,
  );

  if (!determinationNode) {
    return EMPTY_SATURATED_PERMEABILITY;
  }

  const getText = createXPathTextGetter(determinationNode, adapter, namespaces);

  const saturatedPermeabilityAtSpecificDensity = extractArray(
    determinationNode,
    "./bhrgtcom:saturatedPermeabilityAtSpecificDensity",
    (_densityNode, getDensityText) => {
      const dryVolumetricMassDensity = parseFloat(
        getDensityText("./bhrgtcom:dryVolumetricMassDensity"),
      );
      const saturatedPermeability = parseFloat(getDensityText("./bhrgtcom:saturatedPermeability"));

      return dryVolumetricMassDensity !== null || saturatedPermeability !== null
        ? { dryVolumetricMassDensity, saturatedPermeability }
        : null;
    },
    adapter,
    namespaces,
  );

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    specimenMade: parseBoolean(getText("./bhrgtcom:specimenMade")),
    saturatedWithCO2: parseBoolean(getText("./bhrgtcom:saturatedWithCO2")),
    verticallyDetermined: parseBoolean(getText("./bhrgtcom:verticallyDetermined")),
    currentDownwards: parseBoolean(getText("./bhrgtcom:currentDownwards")),
    usedMedium: getText("./bhrgtcom:usedMedium"),
    waterDegassed: parseBoolean(getText("./bhrgtcom:waterDegassed")),
    temperature: parseFloat(getText("./bhrgtcom:temperature")),
    maximumGradient: parseFloat(getText("./bhrgtcom:maximumGradient")),
    saturatedPermeabilityAtSpecificDensity,
  };
}

/**
 * Parse shear stress change during loading determination (Triaxial/Direct shear test) from XML node
 *
 * This test can appear multiple times per interval, so this parser returns an array.
 * Tests all stages of triaxial testing: saturation, consolidation, and loading.
 */
function parseShearStressChangeDuringLoadingDeterminations(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): Array<ShearStressChangeDuringLoadingDetermination> | undefined {
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all shearStressChangeDuringLoadingDetermination elements
  const determinationNodes = adapter.evaluateXPathAll(
    node,
    "./bhrgtcom:shearStressChangeDuringLoadingDetermination",
    nsResolver,
  );

  // If no tests found, return undefined (property won't be set on interval)
  if (determinationNodes.length === 0) {
    return undefined;
  }

  const determinations: Array<ShearStressChangeDuringLoadingDetermination> = [];

  for (const determinationNode of determinationNodes) {
    // Find the actual ShearStressChangeDuringLoadingDetermination child element
    const actualDeterminationNode = findChildElement(
      determinationNode,
      "./bhrgtcom:ShearStressChangeDuringLoadingDetermination",
      adapter,
      namespaces,
    );

    if (!actualDeterminationNode) {
      continue;
    }

    const getText = createXPathTextGetter(actualDeterminationNode, adapter, namespaces);

    // Parse main properties
    const determination: ShearStressChangeDuringLoadingDetermination = {
      determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
      determinationMethod: getText("./bhrgtcom:determinationMethod"),
      specimenDisturbed: parseBoolean(getText("./bhrgtcom:specimenDisturbed")),
      specimenTrimmed: parseBoolean(getText("./bhrgtcom:specimenTrimmed")),
      sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
      beginDiameter: parseFloat(getText("./bhrgtcom:beginDiameter")),
      beginHeight: parseFloat(getText("./bhrgtcom:beginHeight")),
      topCapTiltable: parseBoolean(getText("./bhrgtcom:topCapTiltable")),
      filterPaperUsed: parseBoolean(getText("./bhrgtcom:filterPaperUsed")),
      drainageStripsUsed: parseBoolean(getText("./bhrgtcom:drainageStripsUsed")),
      membraneSaturatedBefore: parseBoolean(getText("./bhrgtcom:membraneSaturatedBefore")),
      apparatusDeformationApplied: parseBoolean(getText("./bhrgtcom:apparatusDeformationApplied")),
      cellDeformationApplied: parseBoolean(getText("./bhrgtcom:cellDeformationApplied")),
      stopCriterion: getText("./bhrgtcom:stopCriterion"),
    };

    // Parse membrane correction (optional nested object)
    const membraneCorrectionNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:membraneCorrection",
      adapter,
      namespaces,
    );
    if (membraneCorrectionNode) {
      const getMembText = createXPathTextGetter(membraneCorrectionNode, adapter, namespaces);
      determination.membraneCorrection = {
        correctionMethod: getMembText("./bhrgtcom:correctionMethod"),
        thickness: parseFloat(getMembText("./bhrgtcom:thickness")),
        stiffnessClass: getMembText("./bhrgtcom:stiffnessClass"),
      };
    }

    // Parse drainage strip correction (optional nested object)
    const drainageStripNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:drainageStripCorrection",
      adapter,
      namespaces,
    );
    if (drainageStripNode) {
      const getDrainText = createXPathTextGetter(drainageStripNode, adapter, namespaces);
      determination.drainageStripCorrection = {
        correctionMethod: getDrainText("./bhrgtcom:correctionMethod"),
        orientation: getDrainText("./bhrgtcom:orientation"),
        coverage: getDrainText("./bhrgtcom:coverage"),
      };
    }

    // Parse saturation stage (optional nested object)
    const saturationNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:saturationStageAtLoading",
      adapter,
      namespaces,
    );
    if (saturationNode) {
      const getSatText = createXPathTextGetter(saturationNode, adapter, namespaces);
      determination.saturationStageAtLoading = {
        porousDiscWet: parseBoolean(getSatText("./bhrgtcom:porousDiscWet")),
        porousDiscRough: parseBoolean(getSatText("./bhrgtcom:porousDiscRough")),
        usedMedium: getSatText("./bhrgtcom:usedMedium"),
        constantHeight: parseBoolean(getSatText("./bhrgtcom:constantHeight")),
        cellPressureAutomaticallyControlled: parseBoolean(
          getSatText("./bhrgtcom:cellPressureAutomaticallyControlled"),
        ),
        backPressure: parseFloat(getSatText("./bhrgtcom:backPressure")),
        effectivePressure: parseFloat(getSatText("./bhrgtcom:effectivePressure")),
        skemptonBCoefficient: parseFloat(getSatText("./bhrgtcom:skemptonB_Coefficient")),
        disturbanceInduced: parseBoolean(getSatText("./bhrgtcom:disturbanceInduced")),
      };
    }

    // Parse consolidation stage (optional nested object with time-series data)
    const consolidationNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:consolidationStageAtLoading",
      adapter,
      namespaces,
    );
    if (consolidationNode) {
      const getConsText = createXPathTextGetter(consolidationNode, adapter, namespaces);

      // Parse volume change time series
      const volumeChangeValuesNode = findChildElement(
        consolidationNode,
        "./bhrgtcom:volumeChangeDuringConsolidation/bhrgtcom:values",
        adapter,
        namespaces,
      );

      const volumeChangeDuringConsolidation = parseCSVRows(
        volumeChangeValuesNode?.textContent,
        (columns) => {
          if (columns.length < 2) {
            return null;
          }
          const time = parseFloat(columns[0]);
          const volumeChange = parseFloat(columns[1]);
          return time !== null && volumeChange !== null ? { time, volumeChange } : null;
        },
      );

      determination.consolidationStageAtLoading = {
        drainageTwoSided: parseBoolean(getConsText("./bhrgtcom:drainageTwoSided")),
        consolidationMethod: getConsText("./bhrgtcom:consolidationMethod"),
        verticalConsolidationStress: parseFloat(
          getConsText("./bhrgtcom:verticalConsolidationStress"),
        ),
        horizontalConsolidationStress: parseFloat(
          getConsText("./bhrgtcom:horizontalConsolidationStress"),
        ),
        verticalStrain: parseFloat(getConsText("./bhrgtcom:verticalStrain")),
        lateralEarthPressureCoefficient: parseFloat(
          getConsText("./bhrgtcom:lateralEarthPressureCoefficient"),
        ),
        volumeChangeDuringConsolidation,
      };
    }

    // Parse load stage (optional nested object with time-series data)
    const loadStageNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:loadStage",
      adapter,
      namespaces,
    );
    if (loadStageNode) {
      const getLoadText = createXPathTextGetter(loadStageNode, adapter, namespaces);

      // Parse shear stress measurements time series (6 columns)
      const shearStressValuesNode = findChildElement(
        loadStageNode,
        "./bhrgtcom:shearStressChangeDuringLoading/bhrgtcom:values",
        adapter,
        namespaces,
      );

      const shearStressChangeDuringLoading = parseCSVRows(
        shearStressValuesNode?.textContent,
        (columns) => {
          if (columns.length < 4) {
            return null;
          }

          const time = parseFloat(columns[0]);
          const axialStrain = parseFloat(columns[1]);
          const deviatorStress = parseFloat(columns[2]);
          const cellPressure = parseFloat(columns[3]);

          // Columns 4 and 5 are optional (pore pressure and volume change)
          // Handle NaN values (represented as "NaN" string in XML)
          const porePressure =
            columns.length > 4 && columns[4] !== "NaN" ? parseFloat(columns[4]) : null;
          const volumeChange =
            columns.length > 5 && columns[5] !== "NaN" ? parseFloat(columns[5]) : null;

          return time !== null &&
            axialStrain !== null &&
            deviatorStress !== null &&
            cellPressure !== null
            ? {
                time,
                axialStrain,
                deviatorStress,
                cellPressure,
                porePressure,
                volumeChange,
              }
            : null;
        },
      );

      determination.loadStage = {
        deformationRate: parseFloat(getLoadText("./bhrgtcom:deformationRate")),
        specimenShape: getLoadText("./bhrgtcom:specimenShape"),
        shearStressChangeDuringLoading,
      };
    }

    determinations.push(determination);
  }

  return determinations;
}

/**
 * Parse maximum undrained shear strength determination (vane shear test) from XML node
 */
function parseMaximumUndrainedShearStrengthDetermination(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): MaximumUndrainedShearStrengthDetermination {
  const getText = createXPathTextGetter(node, adapter, namespaces);

  return {
    determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
    determinationMethod: getText("./bhrgtcom:determinationMethod"),
    determinationDiameter: getText("./bhrgtcom:determinationDiameter"),
    verticallyDetermined: parseBoolean(getText("./bhrgtcom:verticallyDetermined")),
    sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
    maximumUndrainedShearStrength: parseFloat(getText("./bhrgtcom:maximumUndrainedShearStrength")),
  };
}

/**
 * Parse shear stress change during horizontal deformation determinations (direct shear test)
 *
 * This test can appear multiple times per interval, so this parser returns an array.
 * Tests consolidation and shear stages under horizontal deformation.
 */
function parseShearStressChangeDuringHorizontalDeformationDeterminations(
  node: Node,
  adapter: XMLAdapter,
  namespaces: Namespaces,
): Array<ShearStressChangeDuringHorizontalDeformationDetermination> | undefined {
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all shearStressChangeDuringHorizontalDeformationDetermination elements
  const determinationNodes = adapter.evaluateXPathAll(
    node,
    "./bhrgtcom:shearStressChangeDuringHorizontalDeformationDetermination",
    nsResolver,
  );

  if (determinationNodes.length === 0) {
    return undefined;
  }

  const determinations: Array<ShearStressChangeDuringHorizontalDeformationDetermination> = [];

  for (const determinationNode of determinationNodes) {
    // Find the actual ShearStressChangeDuringHorizontalDeformationDetermination child element (PascalCase)
    const actualDeterminationNode = findChildElement(
      determinationNode,
      "./bhrgtcom:ShearStressChangeDuringHorizontalDeformationDetermination",
      adapter,
      namespaces,
    );

    if (!actualDeterminationNode) {
      continue;
    }

    const getText = createXPathTextGetter(actualDeterminationNode, adapter, namespaces);

    const determination: ShearStressChangeDuringHorizontalDeformationDetermination = {
      determinationProcedure: getText("./bhrgtcom:determinationProcedure"),
      determinationMethod: getText("./bhrgtcom:determinationMethod"),
      specimenDisturbed: parseBoolean(getText("./bhrgtcom:specimenDisturbed")),
      sampleMoistness: getText("./bhrgtcom:sampleMoistness"),
      specimenWaterSaturated: parseBoolean(getText("./bhrgtcom:specimenWaterSaturated")),
      porousDiscWet: parseBoolean(getText("./bhrgtcom:porousDiscWet")),
      drained: parseBoolean(getText("./bhrgtcom:drained")),
      lateralSupport: getText("./bhrgtcom:lateralSupport"),
      beginDiameter: parseFloat(getText("./bhrgtcom:beginDiameter")),
      beginHeight: parseFloat(getText("./bhrgtcom:beginHeight")),
      stopCriterion: getText("./bhrgtcom:stopCriterion"),
      membraneCorrectionApplied: parseBoolean(getText("./bhrgtcom:membraneCorrectionApplied")),
      apparatusDeformationApplied: parseBoolean(getText("./bhrgtcom:apparatusDeformationApplied")),
      bearingFrictionCorrectionApplied: parseBoolean(
        getText("./bhrgtcom:bearingFrictionCorrectionApplied"),
      ),
    };

    // Parse consolidation stage (optional nested object with consolidation steps)
    const consolidationNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:consolidationStageAtHorizontalDeformation",
      adapter,
      namespaces,
    );
    if (consolidationNode) {
      const getConsText = createXPathTextGetter(consolidationNode, adapter, namespaces);

      const consolidationSteps = extractArray(
        consolidationNode,
        "./bhrgtcom:consolidationStep",
        (stepNode, getStepText) => {
          const stepNumber = parseInt(getStepText("./bhrgtcom:stepNumber") ?? "0", 10);

          const heightChangeNode = findChildElement(
            stepNode,
            "./bhrgtcom:heightChangeDuringConsolidation/bhrgtcom:values",
            adapter,
            namespaces,
          );

          const heightChangeDuringConsolidation = parseCSVPairs(
            heightChangeNode?.textContent,
            (timeStr, heightStr) => {
              const time = parseFloat(timeStr);
              const height = parseFloat(heightStr);
              return time !== null && height !== null && !isNaN(time) && !isNaN(height)
                ? { time, height }
                : null;
            },
          );

          return {
            stepNumber,
            verticalStress: parseFloat(getStepText("./bhrgtcom:verticalStress")),
            heightChangeDuringConsolidation,
          };
        },
        adapter,
        namespaces,
      );

      determination.consolidationStageAtHorizontalDeformation = {
        pedestalFixed: parseBoolean(getConsText("./bhrgtcom:pedestalFixed")),
        consolidationSteps,
      };
    }

    // Parse shear stage (optional nested object with time-series data)
    const shearStageNode = findChildElement(
      actualDeterminationNode,
      "./bhrgtcom:shearStage",
      adapter,
      namespaces,
    );
    if (shearStageNode) {
      const getShearText = createXPathTextGetter(shearStageNode, adapter, namespaces);

      // Parse shear stress measurements time series (4-5 columns)
      const shearStressValuesNode = findChildElement(
        shearStageNode,
        "./bhrgtcom:shearStressChangeDuringHorizontalDeformation/bhrgtcom:values",
        adapter,
        namespaces,
      );

      const shearStressChangeDuringHorizontalDeformation = parseCSVRows(
        shearStressValuesNode?.textContent,
        (columns) => {
          if (columns.length < 4) {
            return null;
          }

          const time = parseFloat(columns[0]);
          const horizontalDisplacement = parseFloat(columns[1]);
          const shearStress = parseFloat(columns[2]);
          const verticalStress = parseFloat(columns[3]);

          // Column 5 is optional (heightChange)
          const heightChange =
            columns.length > 4 && columns[4] !== "NaN" ? parseFloat(columns[4]) : null;

          return time !== null &&
            horizontalDisplacement !== null &&
            shearStress !== null &&
            verticalStress !== null
            ? {
                time,
                horizontalDisplacement,
                shearStress,
                verticalStress,
                heightChange,
              }
            : null;
        },
      );

      determination.shearStage = {
        deformationRate: parseFloat(getShearText("./bhrgtcom:deformationRate")),
        activeHeightControl: parseBoolean(getShearText("./bhrgtcom:activeHeightControl")),
        shearStressChangeDuringHorizontalDeformation,
      };
    }

    determinations.push(determination);
  }

  return determinations;
}

/**
 * Registry of all determination types to parse
 *
 * Each entry specifies the XPath to find the determination node,
 * the property name to set on the interval, and the parser function to call.
 */
const DETERMINATION_CONFIGS: Array<DeterminationConfig<unknown>> = [
  {
    xpath: "./bhrgtcom:waterContentDetermination",
    propertyName: "waterContentDetermination",
    parser: parseWaterContentDetermination,
  },
  {
    xpath: "./bhrgtcom:organicMatterContentDetermination",
    propertyName: "organicMatterContentDetermination",
    parser: parseOrganicMatterContentDetermination,
  },
  {
    xpath: "./bhrgtcom:carbonateContentDetermination",
    propertyName: "carbonateContentDetermination",
    parser: parseCarbonateContentDetermination,
  },
  {
    xpath: "./bhrgtcom:volumetricMassDensityDetermination",
    propertyName: "volumetricMassDensityDetermination",
    parser: parseVolumetricMassDensityDetermination,
  },
  {
    xpath: "./bhrgtcom:volumetricMassDensitySolidsDetermination",
    propertyName: "volumetricMassDensityOfSolidsDetermination",
    parser: parseVolumetricMassDensityOfSolidsDetermination,
  },
  {
    xpath: "./bhrgtcom:particleSizeDistributionDetermination",
    propertyName: "particleSizeDistributionDetermination",
    parser: parseParticleSizeDistributionDetermination,
  },
  {
    xpath: "./bhrgtcom:consistencyLimitsDetermination",
    propertyName: "consistencyLimitsDetermination",
    parser: parseConsistencyLimitsDetermination,
  },
  {
    xpath: "./bhrgtcom:settlementCharacteristicsDetermination",
    propertyName: "settlementCharacteristicsDetermination",
    parser: parseSettlementCharacteristicsDetermination,
  },
  {
    xpath: "./bhrgtcom:saturatedPermeabilityDetermination",
    propertyName: "saturatedPermeabilityDetermination",
    parser: parseSaturatedPermeabilityDetermination,
  },
  {
    // Special case: This determination can appear multiple times per interval
    // Use '.' to pass the interval node so the parser can find all occurrences
    xpath: ".",
    propertyName: "shearStressChangeDuringLoadingDetermination",
    parser: parseShearStressChangeDuringLoadingDeterminations,
  },
  {
    xpath: "./bhrgtcom:maximumUndrainedShearStrengthDetermination",
    propertyName: "maximumUndrainedShearStrengthDetermination",
    parser: parseMaximumUndrainedShearStrengthDetermination,
  },
  {
    // Special case: This determination can appear multiple times per interval
    xpath: ".",
    propertyName: "shearStressChangeDuringHorizontalDeformationDetermination",
    parser: parseShearStressChangeDuringHorizontalDeformationDeterminations,
  },
];

/**
 * Process borehole sample analysis data from boreholeSampleAnalysis element
 *
 * Extracts laboratory analysis data including all investigated intervals
 * and their determination results.
 *
 * @param value - Not used (we work with the node directly)
 * @param context - Resolver context containing the XML node and adapter
 * @returns BoreholeSampleAnalysis object or undefined if not present
 */
export function processBoreholeSampleAnalysis(
  _value: string | null,
  context: ResolverContext,
): BoreholeSampleAnalysis | undefined {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find the boreholeSampleAnalysis element
  const analysisNode = adapter.evaluateXPath(
    element,
    "./dsbhrgt:boreholeSampleAnalysis",
    nsResolver,
  );

  if (!analysisNode) {
    return undefined;
  }

  // Extract analysis metadata
  const analysisReportDateNode = adapter.evaluateXPath(
    analysisNode,
    "./bhrgtcom:analysisReportDate",
    nsResolver,
  );

  const analysisProcedureNode = adapter.evaluateXPath(
    analysisNode,
    "./bhrgtcom:analysisProcedure",
    nsResolver,
  );

  let analysisReportDate: Date | null = null;
  if (analysisReportDateNode?.textContent) {
    const dateStr = analysisReportDateNode.textContent.trim();
    try {
      analysisReportDate = new Date(dateStr);
    } catch {
      analysisReportDate = null;
    }
  }

  const analysisProcedure = analysisProcedureNode?.textContent?.trim() ?? null;

  // Find all investigated intervals
  const intervalNodes = adapter.evaluateXPathAll(
    analysisNode,
    "./bhrgtcom:investigatedInterval",
    nsResolver,
  );

  const investigatedIntervals: Array<InvestigatedInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = (xpath: string) => {
      const n = adapter.evaluateXPath(intervalNode, xpath, nsResolver);
      return getTextContent(n);
    };

    // Extract depth boundaries
    const beginDepth = parseFloat(getText("./bhrgtcom:beginDepth")) ?? 0;
    const endDepth = parseFloat(getText("./bhrgtcom:endDepth")) ?? 0;

    // Extract metadata
    const sampleQuality = getText("./bhrgtcom:sampleQuality");
    const analysisType = getText("./bhrgtcom:analysisType");

    // Extract determination flags
    const waterContentDetermined = parseBoolean(getText("./bhrgtcom:waterContentDetermined"));
    const organicMatterContentDetermined = parseBoolean(
      getText("./bhrgtcom:organicMatterContentDetermined"),
    );
    const carbonateContentDetermined = parseBoolean(
      getText("./bhrgtcom:carbonateContentDetermined"),
    );
    const volumetricMassDensityDetermined = parseBoolean(
      getText("./bhrgtcom:volumetricMassDensityDetermined"),
    );
    const volumetricMassDensitySolidsDetermined = parseBoolean(
      getText("./bhrgtcom:volumetricMassDensitySolidsDetermined"),
    );
    const described = parseBoolean(getText("./bhrgtcom:described"));

    const interval: InvestigatedInterval = {
      beginDepth,
      endDepth,
      sampleQuality,
      analysisType,
      waterContentDetermined,
      organicMatterContentDetermined,
      carbonateContentDetermined,
      volumetricMassDensityDetermined,
      volumetricMassDensitySolidsDetermined,
      described,
    };

    // Parse all determinations using registry pattern
    for (const config of DETERMINATION_CONFIGS) {
      const determinationNode = adapter.evaluateXPath(intervalNode, config.xpath, nsResolver);
      if (determinationNode) {
        (interval as Record<keyof InvestigatedInterval, unknown>)[config.propertyName] =
          config.parser(determinationNode, adapter, namespaces);
      }
    }

    investigatedIntervals.push(interval);
  }

  return {
    analysisReportDate,
    analysisProcedure,
    investigatedIntervals,
  };
}

/**
 * Process bored intervals from boring element
 *
 * Extracts array of bored intervals with technique and diameter.
 */
export function processBoredIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<BoredInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all boredInterval elements within boring
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrgt:boring/bhrgtcom:boredInterval",
    nsResolver,
  );

  const intervals: Array<BoredInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgtcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgtcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    intervals.push({
      beginDepth,
      endDepth,
      boringTechnique: getText("./bhrgtcom:boringTechnique"),
      boredDiameter: parseFloat(getText("./bhrgtcom:boredDiameter")),
    });
  }

  return intervals;
}

/**
 * Process sampled intervals from boring element
 *
 * Extracts array of sampled intervals with method, quality, and optional sampler details.
 */
export function processSampledIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<SampledInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all sampledInterval elements within boring
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrgt:boring/bhrgtcom:sampledInterval",
    nsResolver,
  );

  const intervals: Array<SampledInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgtcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgtcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    const interval: SampledInterval = {
      beginDepth,
      endDepth,
      preTreatment: getText("./bhrgtcom:preTreatment"),
      samplingMethod: getText("./bhrgtcom:samplingMethod"),
      samplingQuality: getText("./bhrgtcom:samplingQuality"),
      orientatedSampled: parseJaNee(getText("./bhrgtcom:orientatedSampled")),
    };

    // Check for nested sampler element
    const samplerNode = adapter.evaluateXPath(intervalNode, "./bhrgtcom:sampler", nsResolver);

    if (samplerNode) {
      const getSamplerText = createXPathTextGetter(samplerNode, adapter, namespaces);

      const sampler: SamplerDetails = {
        samplerType: getSamplerText("./bhrgtcom:samplerType"),
        sampleContainerDiameter: parseFloat(getSamplerText("./bhrgtcom:sampleContainerDiameter")),
        sampleContainerLength: parseFloat(getSamplerText("./bhrgtcom:sampleContainerLength")),
        cuttingShoeInsideDiameter: parseFloat(
          getSamplerText("./bhrgtcom:cuttingShoeInsideDiameter"),
        ),
        cuttingShoeOutsideDiameter: parseFloat(
          getSamplerText("./bhrgtcom:cuttingShoeOutsideDiameter"),
        ),
        stockingUsed: parseJaNee(getSamplerText("./bhrgtcom:stockingUsed")),
        rightAngledCuttingShoe: parseJaNee(getSamplerText("./bhrgtcom:rightAngledCuttingShoe")),
        taperAngle: parseFloat(getSamplerText("./bhrgtcom:taperAngle")),
        lubricationFluidUsed: parseJaNee(getSamplerText("./bhrgtcom:lubricationFluidUsed")),
        coreCatcherPresent: parseJaNee(getSamplerText("./bhrgtcom:coreCatcherPresent")),
        pistonPresent: parseJaNee(getSamplerText("./bhrgtcom:pistonPresent")),
      };

      interval.sampler = sampler;
    }

    intervals.push(interval);
  }

  return intervals;
}

/**
 * Process completed intervals from boring element
 *
 * Extracts array of completed intervals with backfill information.
 */
export function processCompletedIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<CompletedInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all completedInterval elements within boring
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrgt:boring/bhrgtcom:completedInterval",
    nsResolver,
  );

  const intervals: Array<CompletedInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgtcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgtcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    intervals.push({
      beginDepth,
      endDepth,
      permanentCasingPresent: parseJaNee(getText("./bhrgtcom:permanentCasingPresent")),
      backfillMaterial: getText("./bhrgtcom:backfillMaterial"),
      backfillMaterialWashed: parseJaNee(getText("./bhrgtcom:backfillMaterialWashed")),
      backfillMaterialCertified: parseJaNee(getText("./bhrgtcom:backfillMaterialCertified")),
    });
  }

  return intervals;
}

/**
 * Process not described intervals from boreholeSampleDescription element
 *
 * Extracts array of intervals that were not described and the reason.
 */
export function processNotDescribedIntervals(
  _value: string | null,
  context: ResolverContext,
): Array<NotDescribedInterval> {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find all notDescribedInterval elements
  const intervalNodes = adapter.evaluateXPathAll(
    element,
    "./dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog/bhrgtcom:notDescribedInterval",
    nsResolver,
  );

  const intervals: Array<NotDescribedInterval> = [];

  for (const intervalNode of intervalNodes) {
    const getText = createXPathTextGetter(intervalNode, adapter, namespaces);

    const beginDepth = parseFloat(getText("./bhrgtcom:beginDepth"));
    const endDepth = parseFloat(getText("./bhrgtcom:endDepth"));

    if (beginDepth === null || endDepth === null) {
      continue;
    }

    intervals.push({
      beginDepth,
      endDepth,
      noDescriptionReason: getText("./bhrgtcom:noDescriptionReason"),
    });
  }

  return intervals;
}

/**
 * Process registration history from document element
 *
 * Extracts BRO registration history information.
 */
export function processRegistrationHistory(
  _value: string | null,
  context: ResolverContext,
): RegistrationHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find registrationHistory element (in default namespace dsbhrgt)
  const historyNode = adapter.evaluateXPath(element, "./dsbhrgt:registrationHistory", nsResolver);

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
 * Process report history from document element
 *
 * Extracts report history including intermediate events.
 */
export function processReportHistory(
  _value: string | null,
  context: ResolverContext,
): ReportHistory | null {
  const { element, adapter, namespaces } = context;
  const nsResolver = createNamespaceResolver(namespaces);

  // Find reportHistory element (in default namespace dsbhrgt)
  const historyNode = adapter.evaluateXPath(element, "./dsbhrgt:reportHistory", nsResolver);

  if (!historyNode) {
    return null;
  }

  const getText = createXPathTextGetter(historyNode, adapter, namespaces);

  // Parse dates - these elements are in the default namespace (no prefix)
  const reportStartDateStr = getText("./dsbhrgt:reportStartDate/brocom:date");
  const reportEndDateStr = getText("./dsbhrgt:reportEndDate/brocom:date");

  // Find intermediate events (in default namespace)
  const eventNodes = adapter.evaluateXPathAll(
    historyNode,
    "./dsbhrgt:intermediateEvent",
    nsResolver,
  );

  const intermediateEvents: Array<IntermediateEvent> = [];

  for (const eventNode of eventNodes) {
    const getEventText = createXPathTextGetter(eventNode, adapter, namespaces);
    const eventDateStr = getEventText("./dsbhrgt:eventDate/brocom:date");

    intermediateEvents.push({
      eventName: getEventText("./dsbhrgt:eventName"),
      eventDate: eventDateStr ? new Date(eventDateStr) : null,
    });
  }

  return {
    reportStartDate: reportStartDateStr ? new Date(reportStartDateStr) : null,
    reportEndDate: reportEndDateStr ? new Date(reportEndDateStr) : null,
    intermediateEvents,
  };
}
