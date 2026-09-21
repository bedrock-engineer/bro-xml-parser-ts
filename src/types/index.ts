/**
 * Type definitions for BRO/XML parser
 */

// The public data types are inferred from their Producer schemas — the schema is
// the single source of truth for both parsing and types (`import type` only, so
// this reads as an acyclic type-level dependency; erased at runtime).
import type { Produced } from "../core/producer.js";
import type {
  HeightAtSpecificTime,
  StressAtSpecificSettlement,
  VolumeChangeAtSpecificTime,
  ShearStressAtSpecificStrain,
  HorizontalDeformationDataPoint,
} from "../schemas/bhrgt-analysis.js";
import type { CPT_PRODUCER } from "../schemas/cpt-schema.js";
import type { BORE_PRODUCER } from "../schemas/bore-schema.js";
import type { BHRG_PRODUCER } from "../schemas/bhrg-schema.js";
import type { GMW_PRODUCER } from "../schemas/gmw-schema.js";
import type { GLD_PRODUCER } from "../schemas/gld-schema.js";

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
   * Data type detected (CPT, BHR-GT, BHR-G, GMW, GLD)
   */
  dataType: "CPT" | "BHR-GT" | "BHR-G" | "GMW" | "GLD";

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
 * Complete CPT data (metadata + measurements).
 *
 * Inferred from {@link CPT_PRODUCER}; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type CPTData = { meta: ParseMeta; alias?: string } & Produced<typeof CPT_PRODUCER>;

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
 * Complete Bore data (metadata + layers).
 *
 * Represents BHR-GT-BMB (Boormonsterbeschrijving — visual/textural description);
 * laboratory analysis (BHR-GT-BMA) is the optional `analysis` field.
 *
 * Inferred from {@link BORE_PRODUCER}; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type BHRGTData = { meta: ParseMeta; alias?: string } & Produced<typeof BORE_PRODUCER>;

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
 * Complete BHR-G (Geological Borehole) data (metadata + layers).
 *
 * Inferred from {@link BHRG_PRODUCER}; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type BHRGData = { meta: ParseMeta; alias?: string } & Produced<typeof BHRG_PRODUCER>;

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
export type BROData = CPTData | BHRGTData | BHRGData | GMWData | GLDData;

/**
 * BRO file type identifier
 */
export type BROFileType = "CPT" | "BHR-GT" | "BHR-G" | "GMW" | "GLD";

// ===========================================================================
// GLD (Grondwaterstandonderzoek / groundwater level research, dsgld/1.0)
// ===========================================================================

/**
 * Complete GLD (groundwater level research) data.
 *
 * Inferred from {@link GLD_PRODUCER}; `meta` (parse metadata) and the optional
 * user-set `alias` are the only fields not produced from the XML.
 */
export type GLDData = { meta: ParseMeta; alias?: string } & Produced<typeof GLD_PRODUCER>;

// ===========================================================================
// GMW (Grondwatermonitoringput / Groundwater Monitoring Well, dsgmw/1.1)
// ===========================================================================

/**
 * Complete GMW (groundwater monitoring well) data.
 *
 * The registration object carries well-level metadata plus one or more
 * {@link MonitoringTube}s. Inferred from {@link GMW_PRODUCER}; `meta` (parse
 * metadata) and the optional user-set `alias` are the only fields not produced
 * from the XML.
 */
export type GMWData = { meta: ParseMeta; alias?: string } & Produced<typeof GMW_PRODUCER>;

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
