/**
 * Type definitions for BRO/XML parser
 */

/**
 * Namespace mapping (prefix -> URI)
 */
export type Namespaces = Record<string, string>;

/**
 * Metadata about the parsed document
 *
 * Contains schema version information and any warnings
 * encountered during parsing.
 */
export interface ParseMeta {
  /**
   * Schema version detected in the document (e.g., "1.1", "2.0")
   */
  schemaVersion: string;

  /**
   * Full namespace URI of the schema
   */
  schemaNamespace: string;

  /**
   * Data type detected (CPT, BHR-GT, BHR-G)
   */
  dataType: "CPT" | "BHR-GT" | "BHR-G";

  /**
   * Warnings encountered during parsing
   *
   * Non-fatal issues like:
   * - Parsing with older/newer minor version than supported
   * - Optional fields with unexpected formats
   */
  warnings: Array<string>;
}

/**
 * XML adapter interface for cross-runtime compatibility
 */
export interface XMLAdapter {
  parseXML(xmlText: string): Document;
  evaluateXPath(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Node | null;
  evaluateXPathAll(
    doc: Document | Node,
    query: string,
    namespaceResolver: (prefix: string | null) => string | null,
  ): Array<Node>;
}

/**
 * Context passed to resolver functions
 */
export interface ResolverContext {
  node: Node;
  element: Node;
  namespaces: Namespaces;
  adapter: XMLAdapter;
}

/**
 * Resolver function type
 */
export type ResolverFunction = (value: string | null, context: ResolverContext) => unknown;

/**
 * Schema field definition
 */
export interface SchemaField {
  xpath: string;
  resolver?: ResolverFunction;
  attribute?: string;
  required?: boolean;
}

/**
 * Schema definition (field name -> field config)
 */
export type Schema = Record<string, SchemaField>;

/**
 * BRO quality regime
 *
 * IMBRO: Strict regime for new data (all mandatory fields required)
 * IMBRO/A: Relaxed regime for historical/legacy data (allows missing fields)
 */
export type QualityRegime = "IMBRO" | "IMBRO/A";

/**
 * Geographic location with coordinates and EPSG code
 */
export interface Location {
  x: number;
  y: number;
  epsg: string;
}

/**
 * CPT measurement row (dynamic fields based on parameters)
 */
export interface CPTMeasurement {
  // Always present
  penetrationLength: number;
  depth?: number;

  // Core measurements
  elapsedTime?: number;
  coneResistance: number | null;
  correctedConeResistance?: number | null;
  netConeResistance?: number | null;
  localFriction?: number | null;
  frictionRatio?: number | null;

  // Pore pressure
  porePressureU1?: number | null;
  porePressureU2?: number | null;
  porePressureU3?: number | null;
  poreRatio?: number | null;

  // Inclination
  inclinationX?: number | null;
  inclinationY?: number | null;
  inclinationEW?: number | null;
  inclinationNS?: number | null;
  inclinationResultant?: number | null;

  // Magnetic field
  magneticFieldStrengthX?: number | null;
  magneticFieldStrengthY?: number | null;
  magneticFieldStrengthZ?: number | null;
  magneticFieldStrengthTotal?: number | null;
  magneticInclination?: number | null;
  magneticDeclination?: number | null;

  // Other
  electricalConductivity?: number | null;
  temperature?: number | null;
}

/**
 * Single measurement row in a dissipation test (pore pressure decay over time)
 */
export interface DissipationMeasurement {
  elapsedTime: number;
  coneResistance: number | null;
  porePressureU1: number | null;
  porePressureU2: number | null;
  porePressureU3: number | null;
}

/**
 * Dissipation test performed at a specific depth
 *
 * During a CPT, the cone can be paused at a given depth to measure
 * pore pressure decay over time. A CPT can contain multiple dissipation tests.
 */
export interface DissipationTest {
  penetrationLength: number;
  phenomenonTime: Date | null;
  measurements: Array<DissipationMeasurement>;
}

/**
 * Complete CPT data (metadata + measurements)
 */
export interface CPTData {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

  // Core identification
  broId: string | null;

  /**
   * User-defined identifier (not parsed from XML)
   *
   * Useful for tracking data that doesn't have a broId yet,
   * such as during data collection or before BRO registration.
   *
   * @example
   * ```typescript
   * const cpt = parser.parseCPT(xmlString);
   * cpt.alias = "Site A - Test 1";
   * ```
   */
  alias?: string;

  /**
   * BRO quality regime
   *
   * - IMBRO: Strict regime (all mandatory fields required)
   * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
   */
  qualityRegime: QualityRegime | null;

  researchReportDate: Date | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;

  // Test metadata
  cptStandard: string | null;
  /** CPT method used (e.g., "elektrisch", "mechanisch") */
  cptMethod: string | null;
  /** Stop criterion for the test */
  stopCriterion: string | null;
  dissipationtestPerformed: boolean | null;
  qualityClass: number | null;
  predrilledDepth: number | null;
  finalDepth: number | null;
  groundwaterLevel: number | null;

  // Processing flags
  /** Date of final processing */
  finalProcessingDate: Date | null;
  /** Whether signal processing was performed */
  signalProcessingPerformed: boolean | null;
  /** Whether interruption processing was performed */
  interruptionProcessingPerformed: boolean | null;
  /** Whether expert correction was performed */
  expertCorrectionPerformed: boolean | null;

  // Equipment specifications
  cptDescription: string | null;
  cptType: string | null;
  coneSurfaceArea: number | null;
  coneDiameter: number | null;
  coneSurfaceQuotient: number | null;
  coneToFrictionSleeveDistance: number | null;
  coneToFrictionSleeveSurfaceArea: number | null;
  coneToFrictionSleeveSurfaceQuotient: number | null;

  // Zero-load measurements (before/after calibration)
  zlmConeResistanceBefore: number | null;
  zlmConeResistanceAfter: number | null;
  zlmInclinationEwBefore: number | null;
  zlmInclinationEwAfter: number | null;
  zlmInclinationNsBefore: number | null;
  zlmInclinationNsAfter: number | null;
  zlmInclinationResultantBefore: number | null;
  zlmInclinationResultantAfter: number | null;
  zlmLocalFrictionBefore: number | null;
  zlmLocalFrictionAfter: number | null;
  zlmPorePressureU1Before: number | null;
  zlmPorePressureU2Before: number | null;
  zlmPorePressureU3Before: number | null;
  zlmPorePressureU1After: number | null;
  zlmPorePressureU2After: number | null;
  zlmPorePressureU3After: number | null;

  // Measurement data
  data: Array<CPTMeasurement>;

  // Dissipation tests (pore pressure decay at specific depths)
  dissipationTests: Array<DissipationTest>;
}

/**
 * Grain shape properties for sand/gravel fractions
 */
export interface Grainshape {
  /** Size fraction this shape applies to (e.g., "zand", "grind") */
  sizeFraction: string | null;
  /** Angularity of grains (e.g., "hoekig", "subhoekig", "afgerond") */
  angularity: string | null;
  /** Sphericity of grains (e.g., "bol", "plat", "langwerpig") */
  sphericity: string | null;
}

/**
 * BHR-GT (Borehole Research Geotechnical) layer data
 *
 * Contains all fields from the BRO BHR-GT schema for a single soil layer.
 */
export interface BHRGTLayer {
  // Depth boundaries
  upperBoundary: number;
  lowerBoundary: number;

  // Boundary determination method (how the boundary was positioned)
  upperBoundaryDetermination?: string | null;
  lowerBoundaryDetermination?: string | null;

  // Layer properties
  /** Whether the layer is anthropogenic (man-made) */
  anthropogenic?: boolean | null;

  // Soil classification
  geotechnicalSoilName: string;

  // Soil properties
  /** Tertiary soil constituent (e.g., "schelpMateriaal", "plantenresten") */
  tertiaryConstituent?: string | null;
  /** Soil color code */
  color?: string;
  /** Dispersed inhomogeneity presence */
  dispersedInhomogeneity?: boolean | null;
  /** Organic matter content classification */
  organicMatterContentClass?: string | null;
  /** Carbonate content classification */
  carbonateContentClass?: string | null;
  /** Sand median grain size classification */
  sandMedianClass?: string | null;
  /** Grain shape properties (for sand/gravel) */
  grainshape?: Grainshape;

  // Layer structure properties
  /** Whether the layer boundary is slanted */
  slant?: boolean | null;
  /** Whether the layer is bedded/stratified */
  bedded?: boolean | null;
  /** Whether the internal structure is intact (undisturbed) */
  internalStructureIntact?: boolean | null;
  /** Whether the soil is mixed */
  mixed?: boolean | null;
  /** Whether the soil has mottled appearance */
  mottled?: boolean | null;

  // Fine-grained soil properties
  /** Consistency of fine-grained soils (e.g., "slap", "stevig", "vast") */
  fineSoilConsistency?: string | null;

  // Organic soil properties
  /** Consistency of organic soils */
  organicSoilConsistency?: string | null;
  /** Texture of organic soils (e.g., "vezeligGrof", "vezeligFijn") */
  organicSoilTexture?: string | null;
  /** Tensile strength of peat */
  peatTensileStrength?: string | null;
}

/**
 * Complete Bore data (metadata + layers)
 *
 * Note: BHRGTData represents BHR-GT-BMB (Boormonsterbeschrijving - visual/textural description)
 * For laboratory analysis data, see the optional `analysis` field (BHR-GT-BMA)
 */
export interface BHRGTData {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

  // Core identification
  broId: string | null;

  /**
   * User-defined identifier (not parsed from XML)
   *
   * Useful for tracking data that doesn't have a broId yet,
   * such as during data collection or before BRO registration.
   *
   * @example
   * ```typescript
   * const bore = parser.parseBHRGT(xmlString);
   * bore.alias = "Borehole 7 - North Field";
   * ```
   */
  alias?: string;

  /**
   * BRO quality regime
   *
   * - IMBRO: Strict regime (all mandatory fields required)
   * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
   */
  qualityRegime: QualityRegime | null;

  researchReportDate: Date | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;

  // Bore metadata
  descriptionProcedure: string | null;
  groundwaterLevel: number | null;
  boreRockReached: boolean | null;
  finalBoreDepth: number | null;
  finalSampleDepth: number | null;
  boreHoleCompleted: boolean | null;

  // Boring execution details
  /** Start date of the boring operation */
  boringStartDate: Date | null;
  /** End date of the boring operation */
  boringEndDate: Date | null;
  /** Boring procedure standard used (e.g., "EN1997d2v2007") */
  boringProcedure: string | null;
  /** Boring technique used (e.g., "gestoken", "mechanischGestoken") */
  boringTechnique: string | null;
  /** Whether the trajectory was excavated */
  trajectoryExcavated: boolean | null;
  /** Whether the subsurface is contaminated */
  subsurfaceContaminated: boolean | null;
  /** Stop criterion for boring */
  stopCriterion: string | null;

  // Sampler details
  /** Type of sampler used */
  samplerType: string | null;
  /** Sampling procedure standard */
  samplingProcedure: string | null;
  /** Sampling method used */
  samplingMethod: string | null;
  /** Sampling quality assessment */
  samplingQuality: string | null;
  /** Whether the sample was orientated */
  orientatedSampled: boolean | null;

  // Sample container
  /** Sample container diameter in mm */
  sampleContainerDiameter: number | null;
  /** Sample container length in mm */
  sampleContainerLength: number | null;

  // Sampler equipment details
  /** Piston presence in sampler */
  pistonPresent: boolean | null;
  /** Core catcher presence */
  coreCatcherPresent: boolean | null;
  /** Stocking used in sampling */
  stockingUsed: boolean | null;
  /** Lubrication fluid used */
  lubricationFluidUsed: boolean | null;
  /** Right-angled cutting shoe */
  rightAngledCuttingShoe: boolean | null;
  /** Cutting shoe inside diameter in mm */
  cuttingShoeInsideDiameter: number | null;
  /** Cutting shoe outside diameter in mm */
  cuttingShoeOutsideDiameter: number | null;
  /** Taper angle of cutting shoe */
  taperAngle: number | null;

  // Description metadata
  /** Whether the borehole log was checked */
  boreholeLogChecked: boolean | null;
  /** Description quality assessment */
  descriptionQuality: string | null;
  /** Description location (field/lab) */
  descriptionLocation: string | null;
  /** Date of description report */
  descriptionReportDate: Date | null;
  /** Described material type */
  describedMaterial: string | null;
  /** Whether sampling was continuous */
  continuouslySampled: boolean | null;
  /** Sample moistness during description */
  sampleMoistness: string | null;

  // Visual description data (BHR-GT-BMB)
  data: Array<BHRGTLayer>;

  // Laboratory analysis data (BHR-GT-BMA) - optional
  analysis?: BoreholeSampleAnalysis;

  // Boring interval details
  /** Array of bored intervals with technique and diameter */
  boredIntervals: Array<BoredInterval>;
  /** Array of sampled intervals with method and quality */
  sampledIntervals: Array<SampledInterval>;
  /** Array of completed/backfilled intervals */
  completedIntervals: Array<CompletedInterval>;
  /** Array of intervals not described (with reason) */
  notDescribedIntervals: Array<NotDescribedInterval>;

  // Administrative history
  /** BRO registration history */
  registrationHistory: RegistrationHistory | null;
  /** Report history with events */
  reportHistory: ReportHistory | null;

  // Additional top-level metadata
  /** Delivery context (e.g., "publiekeTaak") */
  deliveryContext: string | null;
  /** Survey purpose (e.g., "bouwwerk") */
  surveyPurpose: string | null;
  /** Discipline (e.g., "geotechniek") */
  discipline: string | null;
  /** Survey procedure standard (e.g., "EN1997d2v2007") */
  surveyProcedure: string | null;
  /** Whether site characteristics were determined */
  siteCharacteristicDetermined: boolean | null;
}

/**
 * BHR-G (Geological Borehole) layer data
 *
 * Contains all fields from the BRO BHR-G schema for a single soil layer.
 */
export interface BHRGLayer {
  // Depth boundaries
  upperBoundary: number;
  lowerBoundary: number;

  // Boundary determination method (how the boundary was positioned)
  upperBoundaryDetermination?: string | null;
  lowerBoundaryDetermination?: string | null;

  // Soil classification (NEN5104 standard)
  soilNameNEN5104: string;

  // Optional properties
  color?: string;
  /** Whether the layer is anthropogenic (man-made) - uses string codes in BHR-G (ja/nee/onbekend) */
  anthropogenic?: string | null;
  /** Whether the layer is rooted - uses string codes in BHR-G (ja/nee/onbekend) */
  rooted?: string | null;
  organicMatterContentClassNEN5104?: string | null;
  gravelContentClass?: string | null;
  carbonateContentClass?: string | null;
  sandMedianClass?: string | null;
}

/**
 * Complete BHR-G (Geological Borehole) data (metadata + layers)
 */
export interface BHRGData {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

  // Core identification
  broId: string | null;

  /**
   * User-defined identifier (not parsed from XML)
   */
  alias?: string;

  /**
   * BRO quality regime
   *
   * - IMBRO: Strict regime (all mandatory fields required)
   * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
   */
  qualityRegime: QualityRegime | null;

  researchReportDate: Date | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;

  // Bore metadata
  descriptionProcedure: string | null;
  boreRockReached: boolean | null;
  finalBoreDepth: number | null;
  finalSampleDepth: number | null;
  boreHoleCompleted: string | null; // Note: BHR-G uses string values like "onbekend"

  // Boring execution details
  /** Start date of the boring operation */
  boringStartDate: Date | null;
  /** End date of the boring operation */
  boringEndDate: Date | null;
  /** Boring procedure standard used */
  boringProcedure: string | null;
  /** Boring technique used */
  boringTechnique: string | null;
  /** Whether the trajectory was excavated */
  trajectoryExcavated: boolean | null;
  /** Whether the subsurface is contaminated */
  subsurfaceContaminated: boolean | null;
  /** Stop criterion for boring */
  stopCriterion: string | null;

  // Sampling details
  /** Sampling procedure standard */
  samplingProcedure: string | null;
  /** Sampling method used */
  samplingMethod: string | null;
  /** Sampling quality assessment */
  samplingQuality: string | null;

  // Description metadata
  /** Description quality assessment */
  descriptionQuality: string | null;
  /** Described samples quality */
  describedSamplesQuality: string | null;
  /** Description location (field/lab) */
  descriptionLocation: string | null;
  /** Date of description report */
  descriptionReportDate: Date | null;
  /** Described material type */
  describedMaterial: string | null;
  /** Whether sampling was continuous */
  continuouslySampled: boolean | null;
  /** Sample moistness during description */
  sampleMoistness: string | null;

  data: Array<BHRGLayer>;

  // Boring interval details
  /** Array of bored intervals with technique and diameter */
  boredIntervals: Array<BoredInterval>;
  /** Array of sampled intervals with method and quality */
  sampledIntervals: Array<SampledInterval>;

  // Administrative history
  /** BRO registration history */
  registrationHistory: RegistrationHistory | null;
  /** Report history with events */
  reportHistory: ReportHistory | null;

  // Additional top-level metadata
  /** Delivery context (e.g., "archiefoverdracht") */
  deliveryContext: string | null;
  /** Survey purpose */
  surveyPurpose: string | null;
  /** Discipline (e.g., "geologie") */
  discipline: string | null;
  /** Survey procedure standard */
  surveyProcedure: string | null;
  /** NITG code (legacy identifier) */
  nitgCode: string | null;
}

/**
 * Bored interval - records boring technique and diameter at specific depth ranges
 */
export interface BoredInterval {
  beginDepth: number;
  endDepth: number;
  boringTechnique: string | null;
  boredDiameter: number | null;
}

/**
 * Sampler equipment details within a sampled interval
 */
export interface SamplerDetails {
  samplerType: string | null;
  sampleContainerDiameter: number | null;
  sampleContainerLength: number | null;
  cuttingShoeInsideDiameter: number | null;
  cuttingShoeOutsideDiameter: number | null;
  stockingUsed: boolean | null;
  rightAngledCuttingShoe: boolean | null;
  taperAngle: number | null;
  lubricationFluidUsed: boolean | null;
  coreCatcherPresent: boolean | null;
  pistonPresent: boolean | null;
}

/**
 * Sampled interval - records sampling method and quality at specific depth ranges
 */
export interface SampledInterval {
  beginDepth: number;
  endDepth: number;
  preTreatment: string | null;
  samplingMethod: string | null;
  samplingQuality: string | null;
  orientatedSampled: boolean | null;
  sampler?: SamplerDetails;
}

/**
 * Completed interval - records how the borehole was completed/backfilled
 */
export interface CompletedInterval {
  beginDepth: number;
  endDepth: number;
  permanentCasingPresent: boolean | null;
  backfillMaterial: string | null;
  backfillMaterialWashed: boolean | null;
  backfillMaterialCertified: boolean | null;
}

/**
 * Not described interval - records depth ranges that were not described and why
 */
export interface NotDescribedInterval {
  beginDepth: number;
  endDepth: number;
  noDescriptionReason: string | null;
}

/**
 * Intermediate event in report history
 */
export interface IntermediateEvent {
  eventName: string | null;
  eventDate: Date | null;
}

/**
 * Registration history - BRO administrative registration information
 */
export interface RegistrationHistory {
  objectRegistrationTime: Date | null;
  registrationStatus: string | null;
  registrationCompletionTime: Date | null;
  corrected: boolean | null;
  underReview: boolean | null;
  deregistered: boolean | null;
  reregistered: boolean | null;
}

/**
 * Report history - records when and how data was reported
 */
export interface ReportHistory {
  reportStartDate: Date | null;
  reportEndDate: Date | null;
  intermediateEvents: Array<IntermediateEvent>;
}

/**
 * BHR-GT-BMA (Borehole Sample Analysis) - Laboratory Determinations
 */

/**
 * Water content determination result
 */
export interface WaterContentDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  sampleMoistness: string | null;
  removedMaterial: string | null;
  waterContent: number | null; // percentage
  dryingTemperature: string | null;
  dryingPeriod: string | null;
  saltCorrectionMethod: string | null;
}

/**
 * Volumetric mass density (bulk density) determination result
 */
export interface VolumetricMassDensityDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  sampleMoistness: string | null;
  volumetricMassDensity: number | null; // g/cm³
}

/**
 * Organic matter content determination result
 */
export interface OrganicMatterContentDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  removedMaterial: string | null;
  organicMatterContent: number | null; // percentage
}

/**
 * Carbonate content determination result
 */
export interface CarbonateContentDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  removedMaterial: string | null;
  carbonateContent: number | null; // percentage
}

/**
 * Volumetric mass density of solids determination result
 */
export interface VolumetricMassDensityOfSolidsDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  liquidUsed: string | null;
  volumetricMassDensityOfSolids: number | null; // g/cm³
}

/**
 * Particle size distribution determination result
 * Contains detailed grain size fractions
 */
export interface ParticleSizeDistributionDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  fractionDistribution: string | null;
  dispersionMethod: string | null;
  removedMaterial: string | null;
  equivalentMassDeterminationMethod: string | null;
  equivalentMass: number | null; // g/cm³

  // Basic distribution
  fractionSmaller63um: number | null; // percentage
  fractionLarger63um: number | null; // percentage

  // Detailed distribution < 63μm (7 fractions)
  fraction0to2um?: number | null;
  fraction2to4um?: number | null;
  fraction4to8um?: number | null;
  fraction8to16um?: number | null;
  fraction16to32um?: number | null;
  fraction32to50um?: number | null;
  fraction50to63um?: number | null;

  // Standard distribution > 63μm (16 fractions)
  fraction63to90um?: number | null;
  fraction90to125um?: number | null;
  fraction125to180um?: number | null;
  fraction180to250um?: number | null;
  fraction250to355um?: number | null;
  fraction355to500um?: number | null;
  fraction500to710um?: number | null;
  fraction710to1000um?: number | null;
  fraction1000to1400um?: number | null;
  fraction1400umto2mm?: number | null;
  fraction2to4mm?: number | null;
  fraction4to8mm?: number | null;
  fraction8to16mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction16to31_5mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction31_5to63mm?: number | null;
  fractionLarger63mm?: number | null;
}

/**
 * Plasticity data point for Atterberg limits test
 * Used to construct the plasticity curve (Casagrande)
 */
export interface PlasticityAtSpecificWaterContent {
  waterContent: number; // percentage
  numberOfFalls: number; // integer - Casagrande cup test
}

/**
 * Consistency limits determination (Atterberg limits)
 * Used to determine soil plasticity characteristics
 */
export interface ConsistencyLimitsDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  fractionLarger500um: number | null; // percentage
  usedMedium: string | null;
  performanceIrregularity: string | null;

  // Calculated limits
  liquidLimit: number | null; // percentage (LL)
  plasticLimit: number | null; // percentage (PL)
  plasticityIndex: number | null; // percentage (PI = LL - PL)

  // Plasticity curve data points (for Casagrande chart)
  plasticityAtSpecificWaterContent: Array<PlasticityAtSpecificWaterContent>;
}

/**
 * Height measurement at specific time during settlement test
 * Used to construct compression/consolidation curves
 */
export interface HeightAtSpecificTime {
  time: number; // seconds
  height: number; // mm
}

/**
 * Single loading step in settlement characteristics test
 * Represents one stress increment in oedometer/consolidation test
 */
export interface SettlementDeterminationStep {
  stepNumber: number;
  wetPerformed: boolean | null;
  swellObserved: boolean | null;
  strainPoint24hours: number | null; // percentage
  stepType: string | null; // belastingstap, ontlastingstap
  verticalStress: number | null; // kPa
  heightChangeDuringSettlement: Array<HeightAtSpecificTime>;
}

/**
 * Settlement characteristics determination (oedometer/consolidation test)
 * Used to determine soil compressibility and consolidation behavior
 */
export interface SettlementCharacteristicsDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  ringDiameter: number | null; // mm
  sampleMoistness: string | null;
  filterPaperUsed: boolean | null;
  temperature: number | null; // Celsius
  wallFrictionCorrectionMethod: string | null;
  apparatusDeformationApplied: boolean | null;
  bearingFrictionCorrectionApplied: boolean | null;
  irregularResult: boolean | null;
  determinationSteps: Array<SettlementDeterminationStep>;
}

/**
 * Permeability at specific density measurement
 */
export interface SaturatedPermeabilityAtSpecificDensity {
  dryVolumetricMassDensity: number | null; // g/cm³
  saturatedPermeability: number | null; // m/s
}

/**
 * Saturated permeability determination (hydraulic conductivity)
 * Used to determine water flow characteristics through soil
 */
export interface SaturatedPermeabilityDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null; // constantHead, fallingHead
  specimenMade: boolean | null;
  saturatedWithCO2: boolean | null;
  verticallyDetermined: boolean | null;
  currentDownwards: boolean | null;
  usedMedium: string | null;
  waterDegassed: boolean | null;
  temperature: number | null; // Celsius
  maximumGradient: number | null; // cm/cm
  saturatedPermeabilityAtSpecificDensity: Array<SaturatedPermeabilityAtSpecificDensity>;
}

/**
 * Membrane correction data for triaxial test
 * Corrects for membrane stiffness effects during testing
 */
export interface MembraneCorrection {
  correctionMethod: string | null;
  thickness: number | null; // mm
  stiffnessClass: string | null; // e.g., "1700kPa"
}

/**
 * Drainage strip correction data for triaxial test
 * Corrects for drainage strip effects during testing
 */
export interface DrainageStripCorrection {
  correctionMethod: string | null;
  orientation: string | null; // e.g., "verticaal"
  coverage: string | null; // e.g., "40tot45"
}

/**
 * Saturation stage data for triaxial test
 * Documents sample saturation process before testing
 */
export interface SaturationStageAtLoading {
  porousDiscWet: boolean | null;
  porousDiscRough: boolean | null;
  usedMedium: string | null; // e.g., "gezuiverdWater"
  constantHeight: boolean | null;
  cellPressureAutomaticallyControlled: boolean | null;
  backPressure: number | null; // kPa
  effectivePressure: number | null; // kPa
  skemptonBCoefficient: number | null; // dimensionless (0-1)
  disturbanceInduced: boolean | null;
}

/**
 * Volume change measurement at specific time during consolidation
 */
export interface VolumeChangeAtSpecificTime {
  time: number; // seconds
  volumeChange: number; // cm³ or percentage
}

/**
 * Consolidation stage data for triaxial test
 * Documents specimen consolidation under specified stresses
 */
export interface ConsolidationStageAtLoading {
  drainageTwoSided: boolean | null;
  consolidationMethod: string | null; // e.g., "isotroop", "anisotroop"
  verticalConsolidationStress: number | null; // kPa
  horizontalConsolidationStress: number | null; // kPa
  verticalStrain: number | null; // percentage
  lateralEarthPressureCoefficient: number | null; // K0
  volumeChangeDuringConsolidation: Array<VolumeChangeAtSpecificTime>;
}

/**
 * Shear stress measurement at specific strain during loading
 * Used to construct stress-strain curves for soil strength analysis
 */
export interface ShearStressAtSpecificStrain {
  time: number; // seconds
  axialStrain: number; // percentage
  deviatorStress: number; // kPa (σ1 - σ3)
  cellPressure: number; // kPa (confining pressure)
  porePressure?: number | null; // kPa (for undrained tests)
  volumeChange?: number | null; // cm³ (for drained tests)
}

/**
 * Load stage data for triaxial test
 * Documents the shearing/loading phase of the test
 */
export interface LoadStage {
  deformationRate: number | null; // mm/min or %/min
  specimenShape: string | null; // e.g., "schuifvlakEnkel", "cilindrisch"
  shearStressChangeDuringLoading: Array<ShearStressAtSpecificStrain>;
}

/**
 * Shear stress change during loading determination (triaxial/direct shear test)
 * ISO 17892-9 (triaxial) or ISO 17892-10 (direct shear)
 *
 * Measures soil shear strength and stress-strain behavior under controlled loading.
 * Common test types:
 * - CU: Consolidated Undrained (belastenGeconsolideerdOngedraineerd)
 * - CD: Consolidated Drained (belastenGeconsolideerdGedraineerd)
 * - UU: Unconsolidated Undrained (belastenOngeconsolideerdOngedraineerd)
 */
export interface ShearStressChangeDuringLoadingDetermination {
  determinationProcedure: string | null; // e.g., "ISO17892d9v2018"
  determinationMethod: string | null; // test type (CU/CD/UU)

  // Sample preparation
  specimenDisturbed: boolean | null;
  specimenTrimmed: boolean | null;
  sampleMoistness: string | null; // e.g., "veldvochtig", "verzadigd"
  beginDiameter: number | null; // mm
  beginHeight: number | null; // mm

  // Equipment configuration
  topCapTiltable: boolean | null;
  filterPaperUsed: boolean | null;
  drainageStripsUsed: boolean | null;
  membraneSaturatedBefore: boolean | null;
  apparatusDeformationApplied: boolean | null;
  cellDeformationApplied: boolean | null;
  stopCriterion: string | null; // e.g., "einddoel", "breuk"

  // Corrections
  membraneCorrection?: MembraneCorrection;
  drainageStripCorrection?: DrainageStripCorrection;

  // Test stages
  saturationStageAtLoading?: SaturationStageAtLoading;
  consolidationStageAtLoading?: ConsolidationStageAtLoading;
  loadStage?: LoadStage;
}

/**
 * Maximum undrained shear strength determination (vane shear test)
 * ISO 14688-2 - Measures peak undrained shear strength using hand vane
 */
export interface MaximumUndrainedShearStrengthDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  determinationDiameter: string | null;
  verticallyDetermined: boolean | null;
  sampleMoistness: string | null;
  maximumUndrainedShearStrength: number | null; // kPa
}

/**
 * Height measurement at specific time during consolidation in horizontal deformation test
 */
export interface HeightAtSpecificConsolidationTime {
  time: number; // seconds
  height: number; // mm
}

/**
 * Single consolidation step in horizontal deformation test
 */
export interface ConsolidationStepAtHorizontalDeformation {
  stepNumber: number | null;
  verticalStress: number | null; // kPa
  heightChangeDuringConsolidation: Array<HeightAtSpecificConsolidationTime>;
}

/**
 * Consolidation stage for horizontal deformation (direct shear) test
 */
export interface ConsolidationStageAtHorizontalDeformation {
  pedestalFixed: boolean | null;
  consolidationSteps: Array<ConsolidationStepAtHorizontalDeformation>;
}

/**
 * Shear stress measurement at specific deformation during horizontal shearing
 */
export interface HorizontalDeformationDataPoint {
  time: number;
  horizontalDisplacement: number;
  shearStress: number;
  verticalStress: number;
  heightChange?: number | null; // optional 5th column
}

/**
 * Shear stage for horizontal deformation (direct shear) test
 */
export interface ShearStageAtHorizontalDeformation {
  deformationRate: number | null; // mm/h
  activeHeightControl: boolean | null;
  shearStressChangeDuringHorizontalDeformation: Array<HorizontalDeformationDataPoint>;
}

/**
 * Shear stress change during horizontal deformation determination (direct shear test)
 * ASTM D6528 - Measures soil shear strength under horizontal deformation
 */
export interface ShearStressChangeDuringHorizontalDeformationDetermination {
  determinationProcedure: string | null;
  determinationMethod: string | null;
  specimenDisturbed: boolean | null;
  sampleMoistness: string | null;
  specimenWaterSaturated: boolean | null;
  porousDiscWet: boolean | null;
  drained: boolean | null;
  lateralSupport: string | null;
  beginDiameter: number | null; // mm
  beginHeight: number | null; // mm
  stopCriterion: string | null;
  membraneCorrectionApplied: boolean | null;
  apparatusDeformationApplied: boolean | null;
  bearingFrictionCorrectionApplied: boolean | null;
  consolidationStageAtHorizontalDeformation?: ConsolidationStageAtHorizontalDeformation;
  shearStage?: ShearStageAtHorizontalDeformation;
}

/**
 * Investigated interval with laboratory determinations
 * Each interval represents a depth range with analysis results
 */
export interface InvestigatedInterval {
  // Depth range
  beginDepth: number; // meters
  endDepth: number; // meters

  // Sample metadata
  sampleQuality: string | null;
  analysisType: string | null;

  // Determination flags (indicate which tests were performed)
  waterContentDetermined: boolean | null;
  organicMatterContentDetermined: boolean | null;
  carbonateContentDetermined: boolean | null;
  volumetricMassDensityDetermined: boolean | null;
  volumetricMassDensitySolidsDetermined: boolean | null;
  described: boolean | null;

  // Actual determination results (only present if performed)
  waterContentDetermination?: WaterContentDetermination;
  organicMatterContentDetermination?: OrganicMatterContentDetermination;
  carbonateContentDetermination?: CarbonateContentDetermination;
  volumetricMassDensityDetermination?: VolumetricMassDensityDetermination;
  volumetricMassDensityOfSolidsDetermination?: VolumetricMassDensityOfSolidsDetermination;
  particleSizeDistributionDetermination?: ParticleSizeDistributionDetermination;
  consistencyLimitsDetermination?: ConsistencyLimitsDetermination;
  settlementCharacteristicsDetermination?: SettlementCharacteristicsDetermination;
  saturatedPermeabilityDetermination?: SaturatedPermeabilityDetermination;
  shearStressChangeDuringLoadingDetermination?: Array<ShearStressChangeDuringLoadingDetermination>;

  maximumUndrainedShearStrengthDetermination?: MaximumUndrainedShearStrengthDetermination;
  shearStressChangeDuringHorizontalDeformationDetermination?: Array<ShearStressChangeDuringHorizontalDeformationDetermination>;
}

/**
 * Borehole sample analysis data (BHR-GT-BMA)
 * Contains laboratory test results for soil samples
 */
export interface BoreholeSampleAnalysis {
  analysisReportDate: Date | null;
  analysisProcedure: string | null;
  investigatedIntervals: Array<InvestigatedInterval>;
}

/**
 * Configuration for determination type parsing in registry pattern
 */
export interface DeterminationConfig<T> {
  xpath: string;
  propertyName: keyof InvestigatedInterval;
  parser: (node: Node, adapter: XMLAdapter, namespaces: Namespaces) => T;
}

/**
 * Union type for all BRO data types
 *
 * Use the `meta.dataType` field to discriminate between types:
 * ```typescript
 * const data = parser.parse(xmlText);
 * if (data.meta.dataType === 'CPT') {
 *   // data is CPTData
 * }
 * ```
 */
export type BROData = CPTData | BHRGTData | BHRGData;

/**
 * BRO file type identifier
 */
export type BROFileType = "CPT" | "BHR-GT" | "BHR-G";

/**
 * Parse error with context
 */
export class BROParseError extends Error {
  public readonly code: string;
  public readonly details: Record<string, unknown>;

  constructor(message: string, details: { code: string; [key: string]: unknown }) {
    super(message);
    this.name = "BROParseError";
    this.code = details.code;
    this.details = details;
  }
}
