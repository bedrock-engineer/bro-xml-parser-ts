/**
 * BHR-G (Geologische boring / geological borehole) schema.
 *
 * Maps the dsbhrg/3.1 registration object to {@link BHRGData}. The bulk is the
 * descriptive borehole log: an array of soil layers, each carrying a large
 * flattened soil surface plus nested sub-structures (Munsell colour,
 * sand/shell/gravel/peat fractions, fraction distribution, chunks, mottles, thin
 * strata). Optional soil codes that should be *absent* (not `null`) when
 * unspecified use `presence: "omit"`; repeatable code lists use an array with
 * `presence: "omit"` so the key appears only when non-empty.
 *
 * Field coverage is verified against the official XSD with
 * `npm run check:xsd-coverage`.
 */

import type { Producer, Presence, Produced } from "../core/producer.js";
import { object, array, text, date, number, boolean } from "../core/producer.js";
import {
  COMMON_REGISTRATION_PRODUCERS,
  REGISTRATION_HISTORY,
  gmlLocation,
} from "./common-fields.js";

const REQUIRED = { presence: "required" } as const;
const OMIT = { presence: "omit" } as const;

/** Mount an object/array producer at a relative path, keyed only when present. */
function optional<T>(producer: Producer<T, Presence>, at: string): Producer<T, "omit"> {
  return { ...producer, at, presence: "omit" };
}

/** A repeatable code list: array of the matched elements' text, omitted if empty. */
function codeList(each: string): Producer<Array<string | null>, "omit"> {
  return array({ each, item: text(), presence: "omit" });
}

// === Nested soil sub-structures (fields relative to each sub-structure node) ===

const MUNSELL_COLOUR = object({
  fields: {
    munsellHue: text("./bhrgcom:munsellHue"),
    munsellValue: text("./bhrgcom:munsellValue"),
    munsellChroma: text("./bhrgcom:munsellChroma"),
  },
});

const SAND_FRACTION = object({
  fields: {
    darkGrainContentClass: text("./bhrgcom:darkGrainContentClass"),
    darkGrainContentClassArchive: text("./bhrgcom:darkGrainContentClassArchive"),
    angularity: text("./bhrgcom:angularity"),
    sandMedianClass: text("./bhrgcom:sandMedianClass"),
    sandSorting: text("./bhrgcom:sandSorting"),
    variegation: text("./bhrgcom:variegation"),
    anomalouslyCoarseContentClass: text("./bhrgcom:anomalouslyCoarseContentClass"),
    anomalouslyCoarseContentClassArchive: text("./bhrgcom:anomalouslyCoarseContentClassArchive"),
    granuleContentClass: text("./bhrgcom:granuleContentClass"),
    granuleContentClassArchive: text("./bhrgcom:granuleContentClassArchive"),
    estimatedMedian: number("./bhrgcom:estimatedMedian"),
    sandConstituents: array({
      each: "./bhrgcom:sandConstituent",
      item: object({
        fields: {
          grainColour: text("./bhrgcom:grainColour"),
          percentageClass: text("./bhrgcom:percentageClass"),
          archiveClass: text("./bhrgcom:archiveClass"),
        },
      }),
    }),
  },
});

const SHELL_FRACTION = object({
  fields: {
    gritContentClass: text("./bhrgcom:gritContentClass"),
    fragmentContentClass: text("./bhrgcom:fragmentContentClass"),
    remainsContentClass: text("./bhrgcom:remainsContentClass"),
    wholeContentClass: text("./bhrgcom:wholeContentClass"),
    doublets: text("./bhrgcom:doublets"),
    thickWalledContentClass: text("./bhrgcom:thickWalledContentClass"),
    thinWalledContentClass: text("./bhrgcom:thinWalledContentClass"),
    inSitu: text("./bhrgcom:inSitu"),
    weatheringDegree: text("./bhrgcom:weatheringDegree"),
    shellConstituents: array({
      each: "./bhrgcom:shellConstituent",
      item: object({
        fields: {
          shellTaxon: text("./bhrgcom:shellTaxon"),
          relativeAbundance: text("./bhrgcom:relativeAbundance"),
          relativeAbundanceClass: text("./bhrgcom:relativeAbundanceClass"),
          relativeAbundanceClassArchive: text("./bhrgcom:relativeAbundanceClassArchive"),
        },
      }),
    }),
  },
});

const GRAVEL_FRACTION = object({
  fields: {
    gravelMedianClass: text("./bhrgcom:gravelMedianClass"),
    angularity: text("./bhrgcom:angularity"),
    fineGravelContentClass: text("./bhrgcom:fineGravelContentClass"),
    mediumCoarseGravelContentClass: text("./bhrgcom:mediumCoarseGravelContentClass"),
    veryCoarseGravelContentClass: text("./bhrgcom:veryCoarseGravelContentClass"),
    ventifactPresent: text("./bhrgcom:ventifactPresent"),
    sphericity: text("./bhrgcom:sphericity"),
    variegation: text("./bhrgcom:variegation"),
    gravelProvenance: text("./bhrgcom:gravelProvenance"),
    estimatedMedian: number("./bhrgcom:estimatedMedian"),
    gravelConstituents: array({
      each: "./bhrgcom:gravelConstituent",
      item: object({
        fields: {
          gravelType: text("./bhrgcom:gravelType"),
          fractionProportion: number("./bhrgcom:fractionProportion"),
          archiveClass: text("./bhrgcom:archiveClass"),
        },
      }),
    }),
  },
});

const PEAT_FRACTION = object({
  fields: {
    peatType: text("./bhrgcom:peatType"),
    peatConstituents: array({
      each: "./bhrgcom:peatConstituent",
      item: object({
        fields: {
          plantRemainType: text("./bhrgcom:plantRemainType"),
          percentageClass: text("./bhrgcom:percentageClass"),
          archiveClass: text("./bhrgcom:archiveClass"),
        },
      }),
    }),
  },
});

const FRACTION_DISTRIBUTION = object({
  fields: {
    fractionDistributionComplete: text("./bhrgcom:fractionDistributionComplete"),
    estimatedMassProportionOrganicMatter: number("./bhrgcom:estimatedMassProportionOrganicMatter"),
    estimatedMassProportionShellMatter: number("./bhrgcom:estimatedMassProportionShellMatter"),
    estimatedVolumeProportionShellMatter: number("./bhrgcom:estimatedVolumeProportionShellMatter"),
    estimatedMassProportionShell: number("./bhrgcom:estimatedMassProportionShell"),
    estimatedMassProportionGravel: number("./bhrgcom:estimatedMassProportionGravel"),
    estimatedVolumeProportionGravel: number("./bhrgcom:estimatedVolumeProportionGravel"),
    fineFractionDistributionOrganicSoil: optional(
      object({
        fields: {
          estimatedMassProportionSand: number("./bhrgcom:estimatedMassProportionSand"),
          estimatedMassProportionSilt: number("./bhrgcom:estimatedMassProportionSilt"),
          estimatedMassProportionLutum: number("./bhrgcom:estimatedMassProportionLutum"),
        },
      }),
      "./bhrgcom:fineFractionDistributionOrganicSoil",
    ),
    fineFractionDistributionShellySoil: optional(
      object({
        fields: {
          estimatedVolumeProportionSand: number("./bhrgcom:estimatedVolumeProportionSand"),
          estimatedVolumeProportionSilt: number("./bhrgcom:estimatedVolumeProportionSilt"),
          estimatedVolumeProportionLutum: number("./bhrgcom:estimatedVolumeProportionLutum"),
        },
      }),
      "./bhrgcom:fineFractionDistributionShellySoil",
    ),
  },
});

const THIN_STRATUM = object({
  fields: {
    layerProportion: number("./bhrgcom:layerProportion"),
    layerProportionClass: text("./bhrgcom:layerProportionClass"),
    layerProportionClassArchive: text("./bhrgcom:layerProportionClassArchive"),
    stratumThicknessClass: text("./bhrgcom:stratumThicknessClass"),
    geologicalOrigin: text("./bhrgcom:geologicalOrigin"),
  },
});

const CHUNK = object({
  fields: {
    soilType: text("./bhrgcom:soilType"),
    sizeClass: text("./bhrgcom:sizeClass"),
    percentageClass: text("./bhrgcom:percentageClass"),
    archiveClass: text("./bhrgcom:archiveClass"),
    colour: text("./bhrgcom:colour"),
    geologicalOrigin: text("./bhrgcom:geologicalOrigin"),
    cemented: text("./bhrgcom:cemented"),
  },
});

const MOTTLE = object({
  fields: {
    colour: text("./bhrgcom:colour"),
    density: text("./bhrgcom:density"),
    inBands: text("./bhrgcom:inBands"),
  },
});

// === One descriptive-log layer (fields relative to bhrgcom:Layer) ===

const LAYER = object({
  fields: {
    upperBoundary: number("./bhrgcom:upperBoundary", REQUIRED),
    lowerBoundary: number("./bhrgcom:lowerBoundary", REQUIRED),
    soilNameNEN5104: text("./bhrgcom:soil/bhrgcom:soilNameNEN5104", REQUIRED),

    // Layer-level (outside <soil>)
    upperBoundaryDetermination: text("./bhrgcom:upperBoundaryDetermination"),
    lowerBoundaryDetermination: text("./bhrgcom:lowerBoundaryDetermination"),
    anthropogenic: text("./bhrgcom:anthropogenic"),
    rooted: text("./bhrgcom:rooted"),
    postSedimentary: text("./bhrgcom:postSedimentary", OMIT),
    horizonCode: text("./bhrgcom:horizonCode", OMIT),
    humanTrace: text("./bhrgcom:humanTrace", OMIT),
    geologicalOrigin: text("./bhrgcom:geologicalOrigin", OMIT),
    bioturbated: text("./bhrgcom:bioturbated", OMIT),
    structure: codeList("./bhrgcom:structure"),
    verticalTrend: codeList("./bhrgcom:verticalTrend"),
    archeologicalConstituents: codeList(
      "./bhrgcom:archeologicalConstituent/bhrgcom:constituentType",
    ),
    thinStrata: array({ each: "./bhrgcom:thinStratum", item: THIN_STRATUM, presence: "omit" }),

    // Soil-level (inside <soil>)
    color: text("./bhrgcom:soil/bhrgcom:colour", OMIT),
    organicMatterContentClassNEN5104: text(
      "./bhrgcom:soil/bhrgcom:organicMatterContentClassNEN5104",
    ),
    gravelContentClass: text("./bhrgcom:soil/bhrgcom:gravelContentClass"),
    carbonateContentClass: text("./bhrgcom:soil/bhrgcom:carbonateContentClass"),
    sandMedianClass: text("./bhrgcom:soil/bhrgcom:sandMedianClass"),
    geologicalSoilName: text("./bhrgcom:soil/bhrgcom:geologicalSoilName", OMIT),
    shellMatterContentClass: text("./bhrgcom:soil/bhrgcom:shellMatterContentClass", OMIT),
    micaContentClass: text("./bhrgcom:soil/bhrgcom:micaContentClass", OMIT),
    micaContentClassArchive: text("./bhrgcom:soil/bhrgcom:micaContentClassArchive", OMIT),
    shellMatterContentClassArchive: text(
      "./bhrgcom:soil/bhrgcom:shellMatterContentClassArchive",
      OMIT,
    ),
    glauconiteContentClass: text("./bhrgcom:soil/bhrgcom:glauconiteContentClass", OMIT),
    glauconiteContentClassArchive: text(
      "./bhrgcom:soil/bhrgcom:glauconiteContentClassArchive",
      OMIT,
    ),
    sedimentaryPhenomenon: text("./bhrgcom:soil/bhrgcom:sedimentaryPhenomenon", OMIT),
    veryCoarseFractionContentClass: codeList(
      "./bhrgcom:soil/bhrgcom:veryCoarseFractionContentClass",
    ),
    veryCoarseFractionContentClassArchive: codeList(
      "./bhrgcom:soil/bhrgcom:veryCoarseFractionContentClassArchive",
    ),
    animalFossils: codeList("./bhrgcom:soil/bhrgcom:animalFossil/bhrgcom:animalFossilType"),

    // Nested soil sub-structures (present only when the node exists)
    munsellColour: optional(MUNSELL_COLOUR, "./bhrgcom:soil/bhrgcom:munsellColour"),
    sandFraction: optional(SAND_FRACTION, "./bhrgcom:soil/bhrgcom:sandFraction"),
    shellFraction: optional(SHELL_FRACTION, "./bhrgcom:soil/bhrgcom:shellFraction"),
    gravelFraction: optional(GRAVEL_FRACTION, "./bhrgcom:soil/bhrgcom:gravelFraction"),
    peatFraction: optional(PEAT_FRACTION, "./bhrgcom:soil/bhrgcom:peatFraction"),
    fractionDistribution: optional(FRACTION_DISTRIBUTION, "./bhrgcom:soil/bhrgcom:fractionDistribution"),
    chunks: array({ each: "./bhrgcom:soil/bhrgcom:chunk", item: CHUNK, presence: "omit" }),
    mottles: array({ each: "./bhrgcom:soil/bhrgcom:mottle", item: MOTTLE, presence: "omit" }),
  },
});

const BORING = "./dsbhrg:boring/bhrgcom:Boring";
const SAMPLE_DESC =
  "./dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription";
const LOG = `${SAMPLE_DESC}/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog`;

/** Report history: an event log; the first event's date stands in for start/end. */
/**
 * Report history. BHR-G carries only an `event` list (no explicit report
 * start/end), so both dates are taken from the first event via `event[1]`.
 */
const REPORT_HISTORY = object({
  at: "./dsbhrg:reportHistory",
  fields: {
    reportStartDate: date("./bhrgcom:event[1]/bhrgcom:date"),
    reportEndDate: date("./bhrgcom:event[1]/bhrgcom:date"),
    intermediateEvents: array({
      each: "./bhrgcom:event",
      item: object({
        fields: {
          eventName: text("./bhrgcom:name"),
          eventDate: date("./bhrgcom:date"),
        },
      }),
    }),
  },
});

/** Report history (start/end + intermediate events). Inferred from {@link REPORT_HISTORY}. @internal */
export type ReportHistory = Produced<typeof REPORT_HISTORY>;
/** One dated intermediate report event. @internal */
export type IntermediateEvent = ReportHistory["intermediateEvents"][number];

export const BHRG_PRODUCER = object({
  fields: {
    // === Core identification (shared brocom fields) ===
    ...COMMON_REGISTRATION_PRODUCERS,

    researchReportDate: date("./dsbhrg:researchReportDate"),

    // === Location ===
    deliveredLocation: gmlLocation("./dsbhrg:deliveredLocation/bhrgcom:location"),
    standardizedLocation: gmlLocation("./dsbhrg:standardizedLocation/brocom:location"),

    // === Vertical position ===
    deliveredVerticalPositionOffset: number("./dsbhrg:deliveredVerticalPosition/bhrgcom:offset"),
    deliveredVerticalPositionDatum: text(
      "./dsbhrg:deliveredVerticalPosition/bhrgcom:verticalDatum",
    ),
    deliveredVerticalPositionReferencePoint: text(
      "./dsbhrg:deliveredVerticalPosition/bhrgcom:localVerticalReferencePoint",
    ),
    waterDepth: number("./dsbhrg:deliveredVerticalPosition/bhrgcom:waterDepth"),
    verticalPositioningDate: date(
      "./dsbhrg:deliveredVerticalPosition/bhrgcom:verticalPositioningDate",
    ),
    verticalPositioningMethod: text(
      "./dsbhrg:deliveredVerticalPosition/bhrgcom:verticalPositioningMethod",
    ),
    verticalPositioningOperator: text(
      "./dsbhrg:deliveredVerticalPosition/bhrgcom:verticalPositioningOperator",
    ),

    // === Site characteristic ===
    landscapeElement: text("./dsbhrg:siteCharacteristic/bhrgcom:landscapeElement"),
    hydrologicalSetting: text("./dsbhrg:siteCharacteristic/bhrgcom:hydrologicalSetting"),
    currentProcess: text("./dsbhrg:siteCharacteristic/bhrgcom:currentProcess"),

    // === Boring metadata ===
    descriptionProcedure: text(`${SAMPLE_DESC}/bhrgcom:descriptionProcedure`),
    utensil: text(`${SAMPLE_DESC}/bhrgcom:utensil`),
    boreRockReached: boolean(`${BORING}/bhrgcom:rockReached`),
    finalBoreDepth: number(`${BORING}/bhrgcom:finalDepthBoring`),
    finalSampleDepth: number(`${BORING}/bhrgcom:finalDepthSampling`),
    boreHoleCompleted: text(`${BORING}/bhrgcom:boreholeCompleted`),

    // === Boring execution details ===
    boringStartDate: date(`${BORING}/bhrgcom:boringStartDate`),
    boringEndDate: date(`${BORING}/bhrgcom:boringEndDate`),
    boringProcedure: text(`${BORING}/bhrgcom:boringProcedure`),
    boringTechnique: text(
      `${BORING}/bhrgcom:boredInterval/bhrgcom:BoredInterval/bhrgcom:boringTechnique`,
    ),
    trajectoryExcavated: boolean(`${BORING}/bhrgcom:trajectoryExcavated`),
    subsurfaceContaminated: boolean(`${BORING}/bhrgcom:subsurfaceContaminated`),
    stopCriterion: text(`${BORING}/bhrgcom:stopCriterion`),
    flushingAdditiveUsed: text(`${BORING}/bhrgcom:flushingAdditiveUsed`),

    // === Sampling details ===
    samplingProcedure: text(`${BORING}/bhrgcom:samplingProcedure`),
    samplingMethod: text(
      `${BORING}/bhrgcom:sampledInterval/bhrgcom:SampledInterval/bhrgcom:samplingMethod`,
    ),
    samplingQuality: text(
      `${BORING}/bhrgcom:sampledInterval/bhrgcom:SampledInterval/bhrgcom:samplingQuality`,
    ),

    // === Description metadata ===
    descriptionQuality: text(`${LOG}/bhrgcom:descriptionQuality`),
    describedSamplesQuality: text(`${LOG}/bhrgcom:describedSamplesQuality`),
    descriptionLocation: text(`${LOG}/bhrgcom:descriptionLocation`),
    descriptionReportDate: date(`${SAMPLE_DESC}/bhrgcom:descriptionReportDate`),
    describedMaterial: text(`${LOG}/bhrgcom:describedMaterial`),
    continuouslySampled: boolean(`${LOG}/bhrgcom:continuouslySampled`),
    sampleMoistness: text(`${LOG}/bhrgcom:sampleMoistness`),

    // === Layer data ===
    data: array({ at: LOG, each: ".//bhrgcom:layer/bhrgcom:Layer", item: LAYER }),

    // === Boring interval arrays ===
    boredIntervals: array({
      each: `${BORING}/bhrgcom:boredInterval/bhrgcom:BoredInterval`,
      item: object({
        fields: {
          beginDepth: number("./bhrgcom:beginDepth", REQUIRED),
          endDepth: number("./bhrgcom:endDepth", REQUIRED),
          boringTechnique: text("./bhrgcom:boringTechnique"),
          boredDiameter: number("./bhrgcom:boredDiameter"),
        },
      }),
    }),
    sampledIntervals: array({
      each: `${BORING}/bhrgcom:sampledInterval/bhrgcom:SampledInterval`,
      item: object({
        fields: {
          beginDepth: number("./bhrgcom:beginDepth", REQUIRED),
          endDepth: number("./bhrgcom:endDepth", REQUIRED),
          preTreatment: text("./bhrgcom:preTreatment"),
          samplingMethod: text("./bhrgcom:samplingMethod"),
          samplingQuality: text("./bhrgcom:samplingQuality"),
          // Not present in BHR-G (only BHR-GT) — always null.
          orientatedSampled: boolean("./bhrgcom:orientatedSampled"),
        },
      }),
    }),

    // === Administrative history ===
    registrationHistory: REGISTRATION_HISTORY,
    reportHistory: REPORT_HISTORY,

    // === Additional top-level metadata ===
    deliveryContext: text("./dsbhrg:deliveryContext"),
    surveyPurpose: text("./dsbhrg:surveyPurpose"),
    discipline: text("./dsbhrg:discipline"),
    surveyProcedure: text("./dsbhrg:surveyProcedure"),
    nitgCode: text("./dsbhrg:NITGCode"),
  },
});

// ===========================================================================
// Derived types — the schema (the producers above) is the single source.
// ===========================================================================

/** One descriptive-log layer of a BHR-G borehole. Inferred from {@link LAYER}. @internal */
export type BHRGLayer = Produced<typeof LAYER>;
/** Munsell colour of a layer. Inferred from {@link MUNSELL_COLOUR}. @internal */
export type MunsellColour = Produced<typeof MUNSELL_COLOUR>;
/** Sand fraction of a layer. Inferred from {@link SAND_FRACTION}. @internal */
export type SandFraction = Produced<typeof SAND_FRACTION>;
/** Shell fraction of a layer. Inferred from {@link SHELL_FRACTION}. @internal */
export type ShellFraction = Produced<typeof SHELL_FRACTION>;
/** Gravel fraction of a layer. Inferred from {@link GRAVEL_FRACTION}. @internal */
export type GravelFraction = Produced<typeof GRAVEL_FRACTION>;
/** Peat fraction of a layer. Inferred from {@link PEAT_FRACTION}. @internal */
export type PeatFraction = Produced<typeof PEAT_FRACTION>;
/** Mass/volume fraction distribution of a layer. Inferred from {@link FRACTION_DISTRIBUTION}. @internal */
export type FractionDistribution = Produced<typeof FRACTION_DISTRIBUTION>;
/** A thin stratum within a layer. Inferred from {@link THIN_STRATUM}. @internal */
export type ThinStratum = Produced<typeof THIN_STRATUM>;
/** A chunk within a layer. Inferred from {@link CHUNK}. @internal */
export type Chunk = Produced<typeof CHUNK>;
/** A mottle within a layer. Inferred from {@link MOTTLE}. @internal */
export type Mottle = Produced<typeof MOTTLE>;

// --- Inline sub-types (derived one level from their parent) ---
/** @internal */
export type SandConstituent = SandFraction["sandConstituents"][number];
/** @internal */
export type ShellConstituent = ShellFraction["shellConstituents"][number];
/** @internal */
export type GravelConstituent = GravelFraction["gravelConstituents"][number];
/** @internal */
export type PeatConstituent = PeatFraction["peatConstituents"][number];
/** @internal */
export type FineFractionDistributionOrganicSoil = NonNullable<
  FractionDistribution["fineFractionDistributionOrganicSoil"]
>;
/** @internal */
export type FineFractionDistributionShellySoil = NonNullable<
  FractionDistribution["fineFractionDistributionShellySoil"]
>;
