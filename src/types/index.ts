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
 * Layer of material removed before CPT was performed (e.g. asphalt, gravel fill)
 *
 * Found in additionalInvestigation. Directly affects depth interpretation.
 */
export interface RemovedLayer {
  sequenceNumber: number;
  upperBoundary: number;
  lowerBoundary: number;
  description: string | null;
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
  phenomenonTime: string | null;
  measurements: Array<DissipationMeasurement>;
}

/**
 * Common `brocom:RegistrationObject` fields shared by every BRO registration
 * type (CPT, BHR-GT, BHR-G, ...).
 *
 * Mirrors how the XSDs model these: each registration object extends
 * `brocom:RegistrationObject` via complexContent. Domain data interfaces extend
 * this so the shared surface is declared once and stays consistent. The runtime
 * counterpart is `COMMON_REGISTRATION_FIELDS` in schemas/common-fields.ts.
 */
export interface BRORegistrationObject {
  // Core identification
  broId: string | null;

  /**
   * BRO quality regime
   *
   * - IMBRO: Strict regime (all mandatory fields required)
   * - IMBRO/A: Relaxed regime for historical data (allows missing fields)
   */
  qualityRegime: QualityRegime | null;

  /** Party responsible for delivering the data to the BRO (bronhouder, KvK number or name) */
  deliveryAccountableParty: string | null;

  /** Object identifier assigned by the accountable party (their own reference) */
  objectIdAccountableParty: string | null;

  /** KvK number of the party responsible for the delivery */
  deliveryResponsibleParty: string | null;

  /** BRO registration history */
  registrationHistory: RegistrationHistory | null;
}

/**
 * Complete CPT data (metadata + measurements)
 */
export interface CPTData extends BRORegistrationObject {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

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

  /** KvK number of the operator that carried out the research */
  researchOperator: string | null;

  researchReportDate: string | null;

  // Measurement timing (OGC O&M timestamps on the conePenetrationTest observation)
  /** When the cone penetration test was physically performed in the field (om:phenomenonTime) */
  conePenetrationTestPhenomenonTime: string | null;
  /** When the cone penetration test result was produced (om:resultTime) */
  conePenetrationTestResultTime: string | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;
  /** Coordinate transformation applied to the standardized location (e.g. "RDNAPTRANS2018") */
  coordinateTransformation: string | null;

  // Location provenance
  /** Date horizontal position was determined */
  horizontalPositioningDate: string | null;
  /** Method used to determine horizontal position (e.g., "onbekend", "GNSS") */
  horizontalPositioningMethod: string | null;
  /** KvK number of the operator that determined the horizontal position */
  horizontalPositioningOperator: string | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;
  /** Water depth at the CPT location (m), when the survey was performed over water */
  waterDepth: number | null;
  /** Date vertical position was determined */
  verticalPositioningDate: string | null;
  /** Method used to determine vertical position (e.g., "onbekend", "waterpassingKlasse2") */
  verticalPositioningMethod: string | null;
  /** KvK number of the operator that determined the vertical position */
  verticalPositioningOperator: string | null;

  // Survey context
  /** Delivery context (e.g., "publiekeTaak", "archiefoverdracht") */
  deliveryContext: string | null;
  /** Survey purpose (e.g., "waterkering", "onbekend") */
  surveyPurpose: string | null;
  /** Whether additional investigation was performed alongside the CPT */
  additionalInvestigationPerformed: boolean | null;

  // Test metadata
  cptStandard: string | null;
  /** CPT method used (e.g., "elektrisch", "mechanisch") */
  cptMethod: string | null;
  /** Stop criterion for the test */
  stopCriterion: string | null;
  /** Azimuth orientation of the sensor (degrees from north) */
  sensorAzimuth: number | null;
  dissipationtestPerformed: boolean | null;
  qualityClass: number | null;
  predrilledDepth: number | null;
  finalDepth: number | null;
  groundwaterLevel: number | null;

  // Additional investigation
  /** Date of additional investigation (e.g. groundwater level measurement) */
  investigationDate: string | null;
  /** Site conditions at time of investigation */
  conditions: string | null;
  /** Description of surface at CPT location */
  surfaceDescription: string | null;
  /** Layers removed before CPT (e.g. asphalt, gravel fill) - affects depth interpretation */
  removedLayers: Array<RemovedLayer>;

  // Processing flags
  /** Date of final processing */
  finalProcessingDate: string | null;
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
  /** Electrical conductivity before test (mS/m) - zero-load calibration */
  zlmElectricalConductivityBefore: number | null;
  /** Electrical conductivity after test (mS/m) - zero-load calibration */
  zlmElectricalConductivityAfter: number | null;

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
  /** Roughness of grains (e.g., "ruw", "glad") */
  roughness: string | null;
}

/**
 * Weathering degree of a rock layer (three-axis classification)
 */
export interface RockWeatheringDegree {
  /** Degree of discolouration */
  discolouration: string | null;
  /** Degree of disintegration */
  disintegration: string | null;
  /** Degree of decomposition */
  decomposition: string | null;
}

/**
 * Rock description for a layer (BHR-GT `rock` element).
 *
 * A layer describes either soil (flattened onto BHRGTLayer) or rock (this
 * nested object). Yes/no fields keep their raw code (e.g. "ja", "nee",
 * "nietWaargenomen") to preserve archive nuance.
 */
export interface RockDescription {
  rockType: string | null;
  cementType: string | null;
  colour: string | null;
  /** Tertiary rock constituents (1 or more) */
  tertiaryRockConstituent: Array<string>;
  interbedding: string | null;
  /** Dispersed inhomogeneities (0-2) */
  dispersedInhomogeneity: Array<string>;
  carbonateContentClass: string | null;
  crossBedding: string | null;
  gradedBedding: string | null;
  voidsPresent: string | null;
  voidDistribution: string | null;
  stability: string | null;
  strengthClass: string | null;
  weathered: string | null;
  weatheringDegree?: RockWeatheringDegree;
}

/**
 * Post-sedimentary discontinuity in the descriptive borehole log
 * (e.g. a fracture or fault plane crossing the described interval)
 */
export interface PostSedimentaryDiscontinuity {
  beginDepth: number;
  endDepth: number;
  /** Whether the discontinuity is in rock (raw code, e.g. "ja"/"nee") */
  inRock: string | null;
  discontinuityType: string | null;
  compositeDiscontinuity: string | null;
  /** Spacing between discontinuities (m) */
  spacing: number | null;
  smooth: string | null;
  apertureClass: string | null;
  infillMaterial: string | null;
}

/**
 * BHR-GT (Borehole Research Geotechnical) layer data
 *
 * Contains all fields from the BRO BHR-GT schema for a single soil layer.
 */
/**
 * Fields shared by every BHR-GT described layer, regardless of whether it
 * describes soil or rock (they live directly on the XSD `layer` element).
 */
export interface BHRGTLayerBase {
  // Depth boundaries
  upperBoundary: number;
  lowerBoundary: number;

  // Boundary determination method (how the boundary was positioned)
  upperBoundaryDetermination?: string | null;
  lowerBoundaryDetermination?: string | null;

  // Layer properties
  /** Whether the layer is anthropogenic (man-made) */
  anthropogenic?: boolean | null;

  // Layer structure properties
  /** Whether the layer boundary is slanted */
  slant?: boolean | null;
  /** Whether the layer is bedded/stratified */
  bedded?: boolean | null;
  /** Bedding type of the layer (e.g., "dikGelamineerd") */
  bedding?: string | null;
  /** Whether the layer is a composite layer */
  compositeLayer?: boolean | null;
  /** Human activity type observed in the layer (e.g., "nietBepaald") */
  activityType?: string | null;
  /** Whether the internal structure is intact (undisturbed) */
  internalStructureIntact?: boolean | null;

  // Special material
  /** Special material in the layer (e.g. anthropogenic debris) */
  specialMaterial?: string | null;
}

/**
 * A BHR-GT layer that describes soil (the common case).
 * Discriminate on `material === "soil"`.
 */
export interface BHRGTSoilLayer extends BHRGTLayerBase {
  material: "soil";

  // Soil classification
  /** Geotechnical soil name (may be "" for IMBRO/A archive data using NEN 5104) */
  geotechnicalSoilName: string;
  /** Soil name per NEN 5104 (IMBRO/A archive data; geotechnicalSoilName is often nil there) */
  soilNameNEN5104?: string | null;
  /** Gravel content classification per NEN 5104 (IMBRO/A) */
  gravelContentClassNEN5104?: string | null;
  /** Organic matter content classification per NEN 5104 (IMBRO/A) */
  organicMatterContentClassNEN5104?: string | null;

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
  /** Gravel median grain size classification (e.g., "fijn", "middelgrof") */
  gravelMedianClass?: string | null;
  /** Depositional characteristic of the soil (e.g., "nietBepaald") */
  geotechnicalDepositionalCharacteristic?: string | null;
  /** Interbedding of other material in the soil (e.g., "kleiWeinigDikkeLaminae") */
  interbedding?: string | null;
  /** Grain shape properties (for sand/gravel) */
  grainshape?: Grainshape;

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

  // Additional soil description fields
  /** Cross bedding present (raw code) */
  crossBedding?: string | null;
  /** Graded bedding present (raw code) */
  gradedBedding?: string | null;
  /** Mixing type of the soil */
  mixingType?: string | null;
  /** Fine gravel content classification */
  fineGravelContentClass?: string | null;
  /** Medium-coarse gravel content classification */
  mediumCoarseGravelContentClass?: string | null;
  /** Very coarse gravel content classification */
  veryCoarseGravelContentClass?: string | null;
  /** Sand sorting classification per NEN 5104 */
  sandSortingNEN5104?: string | null;
  /** Peat type classification */
  peatType?: string | null;
  /** Depositional age of the layer */
  depositionalAge?: string | null;
}

/**
 * A BHR-GT layer that describes rock.
 * Discriminate on `material === "rock"`.
 */
export interface BHRGTRockLayer extends BHRGTLayerBase {
  material: "rock";
  /** Rock description */
  rock: RockDescription;
}

/**
 * A BHR-GT described layer: either soil or rock.
 *
 * Narrow on the `material` discriminant:
 * ```ts
 * if (layer.material === "rock") layer.rock.rockType;
 * else layer.geotechnicalSoilName;
 * ```
 */
export type BHRGTLayer = BHRGTSoilLayer | BHRGTRockLayer;

/**
 * Complete Bore data (metadata + layers)
 *
 * Note: BHRGTData represents BHR-GT-BMB (Boormonsterbeschrijving - visual/textural description)
 * For laboratory analysis data, see the optional `analysis` field (BHR-GT-BMA)
 */
export interface BHRGTData extends BRORegistrationObject {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

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

  researchReportDate: string | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;

  // Site characteristic
  /** Soil use at the site (e.g., "akker", "grasland", "geenBodemgebruik") */
  soilUse: string | null;
  /** Position of the borehole on the ground body (e.g. "kruin", "talud") */
  positionOnGroundBody: string | null;
  /** Temporary change at the site at time of drilling (e.g. "geen") */
  temporaryChange: string | null;

  // Bore metadata
  descriptionProcedure: string | null;
  groundwaterLevel: number | null;
  /** Mean highest groundwater level in m relative to local reference (GHG) */
  meanHighestGroundwaterLevel: number | null;
  /** Mean lowest groundwater level in m relative to local reference (GLG) */
  meanLowestGroundwaterLevel: number | null;
  boreRockReached: boolean | null;
  finalBoreDepth: number | null;
  finalSampleDepth: number | null;
  /** Final depth reached during site preparation (m) */
  finalDepthPreparation: number | null;
  /** Final depth reached by excavation (m) */
  finalDepthExcavation: number | null;
  /** Final depth reached with a temporary casing (m) */
  finalDepthTemporaryCasing: number | null;
  boreHoleCompleted: boolean | null;

  // Boring execution details
  /** Start date of the boring operation */
  boringStartDate: string | null;
  /** End date of the boring operation */
  boringEndDate: string | null;
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
  /** Whether a flushing medium was used during boring */
  flushingMediumUsed: boolean | null;
  /** Flushing additive used during boring (e.g. "geen"), when a flushing medium was used */
  flushingAdditive: string | null;
  /** Whether a temporary casing was used during boring */
  temporaryCasingUsed: boolean | null;
  /** Site preparation before boring (e.g., "geen") */
  preparation: string | null;
  /** KvK number of the operator that carried out the research */
  researchOperator: string | null;

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
  descriptionReportDate: string | null;
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
  /** Array of post-sedimentary discontinuities in the descriptive log */
  postSedimentaryDiscontinuities: Array<PostSedimentaryDiscontinuity>;
  /** Array of excavated layers (removed by excavation) */
  excavatedLayers: Array<ExcavatedLayer>;
  /** Boring velocity profile (elapsed time vs depth) */
  boringVelocity: Array<BoringVelocityMeasurement>;

  // Fluid mud layer (optional, single)
  /** Fluid mud (slib) layer at the borehole, when present */
  fluidMudLayer?: FluidMudLayer;

  // Administrative history (registrationHistory inherited from BRORegistrationObject)
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

/** Munsell colour notation (BHR-G soil colour) */
export interface MunsellColour {
  munsellHue: string | null;
  munsellValue: string | null;
  munsellChroma: string | null;
}

/** A constituent of the sand fraction */
export interface SandConstituent {
  grainColour: string | null;
  percentageClass: string | null;
  archiveClass: string | null;
}

/** Sand fraction description (BHR-G soil) */
export interface SandFraction {
  darkGrainContentClass: string | null;
  darkGrainContentClassArchive: string | null;
  angularity: string | null;
  sandMedianClass: string | null;
  sandSorting: string | null;
  variegation: string | null;
  anomalouslyCoarseContentClass: string | null;
  anomalouslyCoarseContentClassArchive: string | null;
  granuleContentClass: string | null;
  granuleContentClassArchive: string | null;
  estimatedMedian: number | null;
  sandConstituents: Array<SandConstituent>;
}

/** A constituent of the shell fraction */
export interface ShellConstituent {
  shellTaxon: string | null;
  relativeAbundance: string | null;
  relativeAbundanceClass: string | null;
  relativeAbundanceClassArchive: string | null;
}

/** Shell fraction description (BHR-G soil) */
export interface ShellFraction {
  gritContentClass: string | null;
  fragmentContentClass: string | null;
  remainsContentClass: string | null;
  wholeContentClass: string | null;
  doublets: string | null;
  thickWalledContentClass: string | null;
  thinWalledContentClass: string | null;
  inSitu: string | null;
  weatheringDegree: string | null;
  shellConstituents: Array<ShellConstituent>;
}

/** A constituent of the gravel fraction */
export interface GravelConstituent {
  gravelType: string | null;
  fractionProportion: number | null;
  archiveClass: string | null;
}

/** Gravel fraction description (BHR-G soil) */
export interface GravelFraction {
  gravelMedianClass: string | null;
  angularity: string | null;
  fineGravelContentClass: string | null;
  mediumCoarseGravelContentClass: string | null;
  veryCoarseGravelContentClass: string | null;
  ventifactPresent: string | null;
  sphericity: string | null;
  variegation: string | null;
  gravelProvenance: string | null;
  estimatedMedian: number | null;
  gravelConstituents: Array<GravelConstituent>;
}

/** A constituent of the peat fraction */
export interface PeatConstituent {
  plantRemainType: string | null;
  percentageClass: string | null;
  archiveClass: string | null;
}

/** Peat fraction description (BHR-G soil) */
export interface PeatFraction {
  peatType: string | null;
  peatConstituents: Array<PeatConstituent>;
}

/** A chunk (brok) of differing material within a layer */
export interface Chunk {
  soilType: string | null;
  sizeClass: string | null;
  percentageClass: string | null;
  archiveClass: string | null;
  colour: string | null;
  geologicalOrigin: string | null;
  cemented: string | null;
}

/** Fine fraction distribution for organic soils (mass proportions, %) */
export interface FineFractionDistributionOrganicSoil {
  estimatedMassProportionSand: number | null;
  estimatedMassProportionSilt: number | null;
  estimatedMassProportionLutum: number | null;
}

/** Fine fraction distribution for shelly soils (volume proportions, %) */
export interface FineFractionDistributionShellySoil {
  estimatedVolumeProportionSand: number | null;
  estimatedVolumeProportionSilt: number | null;
  estimatedVolumeProportionLutum: number | null;
}

/** Estimated fraction distribution of a layer's soil */
export interface FractionDistribution {
  fractionDistributionComplete: string | null;
  estimatedMassProportionOrganicMatter: number | null;
  estimatedMassProportionShellMatter: number | null;
  estimatedVolumeProportionShellMatter: number | null;
  estimatedMassProportionShell: number | null;
  estimatedMassProportionGravel: number | null;
  estimatedVolumeProportionGravel: number | null;
  fineFractionDistributionOrganicSoil?: FineFractionDistributionOrganicSoil;
  fineFractionDistributionShellySoil?: FineFractionDistributionShellySoil;
}

/** A mottle (vlek) in a layer */
export interface Mottle {
  colour: string | null;
  density: string | null;
  inBands: string | null;
}

/** A thin stratum (laagje) interbedded in a layer */
export interface ThinStratum {
  layerProportion: number | null;
  layerProportionClass: string | null;
  layerProportionClassArchive: string | null;
  stratumThicknessClass: string | null;
  geologicalOrigin: string | null;
}

/**
 * BHR-G (Geological Borehole) layer data
 *
 * Contains all fields from the BRO BHR-G schema for a single soil layer.
 * Soil-level fields are flattened directly onto the layer (matching the parser's
 * existing style); genuinely nested sub-structures (fractions, mottles, chunks,
 * thin strata) are modelled as nested objects/arrays.
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

  // Layer-level description
  /** Whether a post-sedimentary change is present (raw code) */
  postSedimentary?: string | null;
  horizonCode?: string | null;
  humanTrace?: string | null;
  geologicalOrigin?: string | null;
  bioturbated?: string | null;
  /** Sedimentary structures (0-3) */
  structure?: Array<string>;
  /** Vertical trends (0-3) */
  verticalTrend?: Array<string>;
  /** Archeological constituent types (0-5) */
  archeologicalConstituents?: Array<string>;

  // Soil-level classification (inside <soil>)
  /** Geological soil name (lithostratigraphic) */
  geologicalSoilName?: string | null;
  /** Shell matter content classification */
  shellMatterContentClass?: string | null;
  micaContentClass?: string | null;
  micaContentClassArchive?: string | null;
  shellMatterContentClassArchive?: string | null;
  /** Very coarse fraction content classes (0-2) */
  veryCoarseFractionContentClass?: Array<string>;
  /** Very coarse fraction content classes, archive coding (0-2) */
  veryCoarseFractionContentClassArchive?: Array<string>;
  glauconiteContentClass?: string | null;
  glauconiteContentClassArchive?: string | null;
  sedimentaryPhenomenon?: string | null;
  /** Animal fossil types found in the soil (0+) */
  animalFossils?: Array<string>;

  // Nested soil sub-structures
  munsellColour?: MunsellColour;
  sandFraction?: SandFraction;
  shellFraction?: ShellFraction;
  gravelFraction?: GravelFraction;
  peatFraction?: PeatFraction;
  fractionDistribution?: FractionDistribution;
  /** Chunks of differing material (0-3) */
  chunks?: Array<Chunk>;
  /** Mottles (0-3) */
  mottles?: Array<Mottle>;
  /** Thin interbedded strata (0-4) */
  thinStrata?: Array<ThinStratum>;
}

/**
 * Complete BHR-G (Geological Borehole) data (metadata + layers)
 */
export interface BHRGData extends BRORegistrationObject {
  /**
   * Metadata about the parsed document (schema version, warnings)
   */
  meta: ParseMeta;

  /**
   * User-defined identifier (not parsed from XML)
   */
  alias?: string;

  researchReportDate: string | null;

  // Location
  deliveredLocation: Location | null;
  standardizedLocation: Location | null;

  // Vertical position
  deliveredVerticalPositionOffset: number | null;
  deliveredVerticalPositionDatum: string | null;
  deliveredVerticalPositionReferencePoint: string | null;
  /** Water depth at the borehole location (m), when the survey was over water */
  waterDepth: number | null;
  /** Date vertical position was determined */
  verticalPositioningDate: string | null;
  /** Method used to determine vertical position */
  verticalPositioningMethod: string | null;
  /** KvK number of the operator that determined the vertical position */
  verticalPositioningOperator: string | null;

  // Site characteristic
  /** Landscape element at the site */
  landscapeElement: string | null;
  /** Hydrological setting at the site */
  hydrologicalSetting: string | null;
  /** Current geomorphological process at the site */
  currentProcess: string | null;

  // Bore metadata
  descriptionProcedure: string | null;
  /** Tool used for the sample description */
  utensil: string | null;
  boreRockReached: boolean | null;
  finalBoreDepth: number | null;
  finalSampleDepth: number | null;
  boreHoleCompleted: string | null; // Note: BHR-G uses string values like "onbekend"

  // Boring execution details
  /** Start date of the boring operation */
  boringStartDate: string | null;
  /** End date of the boring operation */
  boringEndDate: string | null;
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
  /** Whether a flushing additive was used (raw code) */
  flushingAdditiveUsed: string | null;

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
  descriptionReportDate: string | null;
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

  // Administrative history (registrationHistory inherited from BRORegistrationObject)
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
 * Core recovery measurements for a sampled interval (rock coring)
 */
export interface CoreRecovery {
  /** Total core recovery (%) */
  totalCoreRecovery: number | null;
  /** Solid core recovery (%) */
  solidCoreRecovery: number | null;
  /** Rock Quality Designation (%) */
  rockQualityDesignation: number | null;
  /** Whether the core recovery was determined in the field */
  fieldDetermined: boolean | null;
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
  /** Core recovery measurements (rock coring), when determined */
  coreRecovery?: CoreRecovery;
}

/**
 * Completed interval - records how the borehole was completed/backfilled
 */
export interface CompletedInterval {
  beginDepth: number;
  endDepth: number;
  permanentCasingPresent: boolean | null;
  /** Diameter of the permanent casing (mm) */
  diameterPermanentCasing: number | null;
  /** Material of the permanent casing */
  materialPermanentCasing: string | null;
  backfillMaterial: string | null;
  backfillMaterialWashed: boolean | null;
  backfillMaterialCertified: boolean | null;
}

/**
 * Excavated layer - a layer removed by excavation before/during boring
 */
export interface ExcavatedLayer {
  upperBoundary: number;
  lowerBoundary: number;
  /** Material that was excavated */
  excavatedMaterial: string | null;
}

/**
 * Boring velocity measurement - drilling depth reached after a given elapsed time
 */
export interface BoringVelocityMeasurement {
  /** Elapsed time (s) */
  elapsedTime: number | null;
  /** Depth reached (m) */
  depth: number | null;
}

/**
 * Fluid mud layer - a layer of fluid mud (slib) recorded at the borehole
 */
export interface FluidMudLayer {
  /** Thickness of the fluid mud layer (m) */
  thickness: number | null;
  /** Colour of the fluid mud */
  colour: string | null;
  /** Method used to position the upper boundary */
  upperBoundaryPositioningMethod: string | null;
  /** Method used to position the lower boundary */
  lowerBoundaryPositioningMethod: string | null;
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
  eventDate: string | null;
}

/**
 * Registration history - BRO administrative registration information
 */
export interface RegistrationHistory {
  objectRegistrationTime: string | null;
  registrationStatus: string | null;
  registrationCompletionTime: string | null;
  /** Time of the latest correction to the registered object */
  latestCorrectionTime: string | null;
  /** Time of the latest addition to the registered object */
  latestAdditionTime: string | null;
  /** Time the object was placed under review */
  underReviewTime: string | null;
  /** Time the object was deregistered */
  deregistrationTime: string | null;
  /** Time the object was reregistered after deregistration */
  reregistrationTime: string | null;
  corrected: boolean | null;
  underReview: boolean | null;
  deregistered: boolean | null;
  reregistered: boolean | null;
}

/**
 * Report history - records when and how data was reported
 */
export interface ReportHistory {
  reportStartDate: string | null;
  reportEndDate: string | null;
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
  /** Whether a lutum (clay fraction) correction was applied to the result */
  lutumCorrectionApplied: boolean | null;
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
  /** Volume of the sample container used (e.g., "100ml") */
  sampleContainerVolume: string | null;
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
  /** Optical model used (for laser-diffraction methods) */
  usedOpticalModel?: string | null;

  // Basic distribution
  fractionSmaller63um: number | null; // percentage
  fractionLarger63um: number | null; // percentage

  // Detailed distribution < 63μm (7 fractions)
  fraction0to2um?: number | null;
  /** 2–32 µm fraction — only present in the coarser standardDistributionFractionSmaller63um group */
  fraction2to32um?: number | null;
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

  // Detailed distribution > 63μm (finer buckets; alternative to the standard >63μm set)
  fraction63to75um?: number | null;
  fraction75to90um?: number | null;
  fraction90to106um?: number | null;
  fraction106to125um?: number | null;
  fraction125to150um?: number | null;
  fraction150to180um?: number | null;
  fraction180to212um?: number | null;
  fraction212to250um?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction4to5_6mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction5_6to8mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction8to11_2mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction11_2to16mm?: number | null;
  fraction16to20mm?: number | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fraction20to31_5mm?: number | null;
}

/**
 * Plasticity data point for Atterberg limits test
 * Used to construct the plasticity curve (Casagrande)
 */
export interface PlasticityAtSpecificWaterContent {
  waterContent: number; // percentage
  numberOfFalls: number; // integer - Casagrande cup test
  /** Cone penetration depth in mm (fall-cone method) */
  penetrationDepth?: number | null;
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
  /** Fall-cone apparatus type used (e.g., "zweedseConus30graden") */
  conusType: string | null;

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
 * Stress/strain measurement at a specific time during a settlement step
 * Columns of the StressAtSpecificSettlement time-series (oedometer/consolidation).
 */
export interface StressAtSpecificSettlement {
  elapsedTime: number; // seconds
  verticalStrain: number; // percentage
  excessPoreWaterPressure: number | null; // kPa
  verticalEffectiveStress: number | null; // kPa
  horizontalEffectiveStress: number | null; // kPa
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
  /** Stress/strain time-series for the step (alternative to heightChangeDuringSettlement) */
  stressChangeDuringSettlement?: Array<StressAtSpecificSettlement>;
}

/**
 * Saturation stage preceding compression in the oedometer/settlement test
 * Documents how the specimen was saturated before loading.
 */
export interface SaturationStageAtCompression {
  porousDiscWet: boolean | null;
  usedMedium: string | null; // e.g., "leidingwater"
  backPressure: number | null; // kPa
  constantHeight: boolean | null;
  specimenHeightAfterwards: number | null; // mm
  disturbanceInduced: boolean | null;
  /** Maximum stress difference during saturation (kPa) */
  maximumStressDifference: number | null;
  /** Maximum strain during saturation (%) */
  maximumStrain: number | null;
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
  /** Saturation stage performed before compression (optional) */
  saturationStageAtCompression?: SaturationStageAtCompression;
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
 * Permeability at specific load measurement
 */
export interface SaturatedPermeabilityAtSpecificLoad {
  load: number | null; // kPa
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
  /** Whether the confining ring was water-repellent (raw code) */
  ringWaterRepellent: string | null;
  /** Water content after the test (%) */
  waterContentAfterwards: number | null;
  /** Material irregularities observed (0-2 codes) */
  materialIrregularity: Array<string>;
  saturatedPermeabilityAtSpecificDensity: Array<SaturatedPermeabilityAtSpecificDensity>;
  saturatedPermeabilityAtSpecificLoad: Array<SaturatedPermeabilityAtSpecificLoad>;
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
  /** Stress difference during saturation (kPa) */
  stressDifference: number | null;
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
 * Reconstituted/remoulded specimen preparation for a triaxial loading test
 * Present when the specimen was made in the lab rather than taken intact.
 */
export interface SpecimenMadeForLoading {
  makingMethod: string | null; // e.g., "samenstellenStampenVochtig"
  dryVolumetricMassDensity: number | null; // g/cm³
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

  // Specimen preparation (remoulded specimens only)
  madeSpecimenForLoading?: SpecimenMadeForLoading;

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
  /** Lowest measured maximum undrained shear strength (kPa) */
  lowestMaximumUndrainedShearStrength: number | null;
  /** Highest measured maximum undrained shear strength (kPa) */
  highestMaximumUndrainedShearStrength: number | null;
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
  analysisReportDate: string | null;
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
