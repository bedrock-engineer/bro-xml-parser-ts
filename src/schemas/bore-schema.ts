/**
 * BHR-GT (Geotechnical borehole) schema.
 *
 * Maps the dsbhrgt/2.1 registration object to {@link BHRGTData}. Each described
 * layer is a soil/rock discriminated union ({@link oneOf} on `material`); the
 * laboratory-analysis subtree (BHR-GT-BMA) is delegated to
 * {@link ANALYSIS_PRODUCER}. Coverage is verified against the official XSD with
 * `npm run check:xsd-coverage`.
 */

import type { Producer, Presence, Produced, ProducedFields } from "../core/producer.js";
import {
  object_,
  array,
  custom,
  oneOf,
  scalar,
  text,
  date,
  number_,
  boolean_,
} from "../core/producer.js";
import {
  COMMON_REGISTRATION_PRODUCERS,
  REGISTRATION_HISTORY,
  gmlLocation,
} from "./common-fields.js";
import { ANALYSIS_PRODUCER } from "./bhrgt-analysis.js";

const BORING = "./dsbhrgt:boring";
const SAMPLED = `${BORING}/bhrgtcom:sampledInterval`;
const SAMPLER = `${SAMPLED}/bhrgtcom:sampler`;
const SAMPLE_DESC = "./dsbhrgt:boreholeSampleDescription";
const LOG = `${SAMPLE_DESC}/bhrgtcom:descriptiveBoreholeLog`;
const VPOS = "./dsbhrgt:deliveredVerticalPosition";

const REQUIRED = { presence: "required" } as const;
const OMIT = { presence: "omit" } as const;

/** `"geen"` → false, any other code → true, absent → null. */
function parseDispersedInhomogeneity(raw: string | null): boolean | null {
  if (raw === null) {
    return null;
  }
  return raw.toLowerCase() !== "geen";
}

/** Mount an object/array producer at a relative path, keyed only when present. */
function optional<T>(producer: Producer<T, Presence>, at: string): Producer<T, "omit"> {
  return { ...producer, at, presence: "omit" };
}

/** A repeatable code list: text of each match, always present (may be empty). */
function codeList(each: string): Producer<Array<string | null>> {
  return array({ each, item: text() });
}

// === Rock branch ===

const ROCK_DESCRIPTION = object_({
  fields: {
    rockType: text("./bhrgtcom:rockType"),
    cementType: text("./bhrgtcom:cementType"),
    colour: text("./bhrgtcom:colour"),
    tertiaryRockConstituent: codeList("./bhrgtcom:tertiaryRockConstituent"),
    interbedding: text("./bhrgtcom:interbedding"),
    dispersedInhomogeneity: codeList("./bhrgtcom:dispersedInhomogeneity"),
    carbonateContentClass: text("./bhrgtcom:carbonateContentClass"),
    crossBedding: text("./bhrgtcom:crossBedding"),
    gradedBedding: text("./bhrgtcom:gradedBedding"),
    voidsPresent: text("./bhrgtcom:voidsPresent"),
    voidDistribution: text("./bhrgtcom:voidDistribution"),
    stability: text("./bhrgtcom:stability"),
    strengthClass: text("./bhrgtcom:strengthClass"),
    weathered: text("./bhrgtcom:weathered"),
    weatheringDegree: optional(
      object_({
        fields: {
          discolouration: text("./bhrgtcom:discolouration"),
          disintegration: text("./bhrgtcom:disintegration"),
          decomposition: text("./bhrgtcom:decomposition"),
        },
      }),
      "./bhrgtcom:weatheringDegree",
    ),
  },
});

const GRAINSHAPE = object_({
  fields: {
    sizeFraction: text("./bhrgtcom:sizeFraction"),
    angularity: text("./bhrgtcom:angularity"),
    sphericity: text("./bhrgtcom:sphericity"),
    roughness: text("./bhrgtcom:roughness"),
  },
});

// === The described layer: soil ⊕ rock ===

/** Fields shared by every layer, regardless of soil/rock. */
const LAYER_BASE = {
  upperBoundary: number_("./bhrgtcom:upperBoundary"),
  lowerBoundary: number_("./bhrgtcom:lowerBoundary"),
  upperBoundaryDetermination: text("./bhrgtcom:upperBoundaryDetermination"),
  lowerBoundaryDetermination: text("./bhrgtcom:lowerBoundaryDetermination"),
  anthropogenic: boolean_("./bhrgtcom:anthropogenic"),
  slant: boolean_("./bhrgtcom:slant"),
  bedding: text("./bhrgtcom:bedding", OMIT),
  compositeLayer: boolean_("./bhrgtcom:compositeLayer", OMIT),
  activityType: text("./bhrgtcom:activityType", OMIT),
  bedded: boolean_("./bhrgtcom:bedded"),
  internalStructureIntact: boolean_("./bhrgtcom:internalStructureIntact"),
  specialMaterial: text("./bhrgtcom:specialMaterial", OMIT),
};

const LAYER = oneOf({
  tagAs: "material",
  base: LAYER_BASE,
  branches: [
    {
      when: "./bhrgtcom:rock",
      at: "./bhrgtcom:rock",
      tag: "rock",
      fields: { rock: ROCK_DESCRIPTION },
    },
    {
      // Any non-rock layer describes soil.
      when: ".",
      tag: "soil",
      fields: {
        geotechnicalSoilName: scalar({
          at: "./bhrgtcom:soil/bhrgtcom:geotechnicalSoilName",
          decode: (raw) => raw ?? "",
        }),
        soilNameNEN5104: text("./bhrgtcom:soil/bhrgtcom:soilNameNEN5104", OMIT),
        gravelContentClassNEN5104: text("./bhrgtcom:soil/bhrgtcom:gravelContentClassNEN5104", OMIT),
        organicMatterContentClassNEN5104: text(
          "./bhrgtcom:soil/bhrgtcom:organicMatterContentClassNEN5104",
          OMIT,
        ),
        tertiaryConstituent: text("./bhrgtcom:soil/bhrgtcom:tertiaryConstituent"),
        color: text("./bhrgtcom:soil/bhrgtcom:colour", OMIT),
        dispersedInhomogeneity: scalar({
          at: "./bhrgtcom:soil/bhrgtcom:dispersedInhomogeneity",
          decode: parseDispersedInhomogeneity,
        }),
        organicMatterContentClass: text("./bhrgtcom:soil/bhrgtcom:organicMatterContentClass"),
        carbonateContentClass: text("./bhrgtcom:soil/bhrgtcom:carbonateContentClass"),
        sandMedianClass: text("./bhrgtcom:soil/bhrgtcom:sandMedianClass"),
        gravelMedianClass: text("./bhrgtcom:soil/bhrgtcom:gravelMedianClass", OMIT),
        geotechnicalDepositionalCharacteristic: text(
          "./bhrgtcom:soil/bhrgtcom:geotechnicalDepositionalCharacteristic",
          OMIT,
        ),
        interbedding: text("./bhrgtcom:soil/bhrgtcom:interbedding", OMIT),
        mixed: boolean_("./bhrgtcom:soil/bhrgtcom:mixed"),
        mottled: boolean_("./bhrgtcom:soil/bhrgtcom:mottled"),
        fineSoilConsistency: text("./bhrgtcom:soil/bhrgtcom:fineSoilConsistency"),
        organicSoilConsistency: text("./bhrgtcom:soil/bhrgtcom:organicSoilConsistency"),
        organicSoilTexture: text("./bhrgtcom:soil/bhrgtcom:organicSoilTexture"),
        peatTensileStrength: text("./bhrgtcom:soil/bhrgtcom:peatTensileStrength"),
        crossBedding: text("./bhrgtcom:soil/bhrgtcom:crossBedding", OMIT),
        gradedBedding: text("./bhrgtcom:soil/bhrgtcom:gradedBedding", OMIT),
        mixingType: text("./bhrgtcom:soil/bhrgtcom:mixingType", OMIT),
        fineGravelContentClass: text("./bhrgtcom:soil/bhrgtcom:fineGravelContentClass", OMIT),
        mediumCoarseGravelContentClass: text(
          "./bhrgtcom:soil/bhrgtcom:mediumCoarseGravelContentClass",
          OMIT,
        ),
        veryCoarseGravelContentClass: text(
          "./bhrgtcom:soil/bhrgtcom:veryCoarseGravelContentClass",
          OMIT,
        ),
        sandSortingNEN5104: text("./bhrgtcom:soil/bhrgtcom:sandSortingNEN5104", OMIT),
        peatType: text("./bhrgtcom:soil/bhrgtcom:peatType", OMIT),
        depositionalAge: text("./bhrgtcom:soil/bhrgtcom:depositionalAge", OMIT),
        grainshape: optional(GRAINSHAPE, "./bhrgtcom:soil/bhrgtcom:grainshape"),
      },
    },
  ],
});

/**
 * A BHR-GT described layer: a soil/rock discriminated union on `material`.
 * Inferred from {@link LAYER} — the schema is the single source of truth.
 */
export type BHRGTLayer = Produced<typeof LAYER>;
/** Fields common to every {@link BHRGTLayer}, regardless of material. */
export type BHRGTLayerBase = ProducedFields<typeof LAYER_BASE>;
/** A layer that describes soil (`material === "soil"`). */
export type BHRGTSoilLayer = Extract<BHRGTLayer, { material: "soil" }>;
/** A layer that describes rock (`material === "rock"`). */
export type BHRGTRockLayer = Extract<BHRGTLayer, { material: "rock" }>;

// === Interval item producers ===

const depthRange = {
  beginDepth: number_("./bhrgtcom:beginDepth", REQUIRED),
  endDepth: number_("./bhrgtcom:endDepth", REQUIRED),
};

const BORED_INTERVAL = object_({
  fields: {
    ...depthRange,
    boringTechnique: text("./bhrgtcom:boringTechnique"),
    boredDiameter: number_("./bhrgtcom:boredDiameter"),
  },
});

const SAMPLED_INTERVAL = object_({
  fields: {
    ...depthRange,
    preTreatment: text("./bhrgtcom:preTreatment"),
    samplingMethod: text("./bhrgtcom:samplingMethod"),
    samplingQuality: text("./bhrgtcom:samplingQuality"),
    orientatedSampled: boolean_("./bhrgtcom:orientatedSampled"),
    sampler: optional(
      object_({
        fields: {
          samplerType: text("./bhrgtcom:samplerType"),
          sampleContainerDiameter: number_("./bhrgtcom:sampleContainerDiameter"),
          sampleContainerLength: number_("./bhrgtcom:sampleContainerLength"),
          cuttingShoeInsideDiameter: number_("./bhrgtcom:cuttingShoeInsideDiameter"),
          cuttingShoeOutsideDiameter: number_("./bhrgtcom:cuttingShoeOutsideDiameter"),
          stockingUsed: boolean_("./bhrgtcom:stockingUsed"),
          rightAngledCuttingShoe: boolean_("./bhrgtcom:rightAngledCuttingShoe"),
          taperAngle: number_("./bhrgtcom:taperAngle"),
          lubricationFluidUsed: boolean_("./bhrgtcom:lubricationFluidUsed"),
          coreCatcherPresent: boolean_("./bhrgtcom:coreCatcherPresent"),
          pistonPresent: boolean_("./bhrgtcom:pistonPresent"),
        },
      }),
      "./bhrgtcom:sampler",
    ),
    coreRecovery: optional(
      object_({
        fields: {
          totalCoreRecovery: number_("./bhrgtcom:totalCoreRecovery"),
          solidCoreRecovery: number_("./bhrgtcom:solidCoreRecovery"),
          rockQualityDesignation: number_("./bhrgtcom:rockQualityDesignation"),
          fieldDetermined: boolean_("./bhrgtcom:fieldDetermined"),
        },
      }),
      "./bhrgtcom:coreRecovery",
    ),
  },
});

const COMPLETED_INTERVAL = object_({
  fields: {
    ...depthRange,
    permanentCasingPresent: boolean_("./bhrgtcom:permanentCasingPresent"),
    diameterPermanentCasing: number_("./bhrgtcom:diameterPermanentCasing"),
    materialPermanentCasing: text("./bhrgtcom:materialPermanentCasing"),
    backfillMaterial: text("./bhrgtcom:backfillMaterial"),
    backfillMaterialWashed: boolean_("./bhrgtcom:backfillMaterialWashed"),
    backfillMaterialCertified: boolean_("./bhrgtcom:backfillMaterialCertified"),
  },
});

const POST_SED_DISCONTINUITY = object_({
  fields: {
    ...depthRange,
    inRock: text("./bhrgtcom:inRock"),
    discontinuityType: text("./bhrgtcom:discontinuityType"),
    compositeDiscontinuity: text("./bhrgtcom:compositeDiscontinuity"),
    spacing: number_("./bhrgtcom:spacing"),
    smooth: text("./bhrgtcom:smooth"),
    apertureClass: text("./bhrgtcom:apertureClass"),
    infillMaterial: text("./bhrgtcom:infillMaterial"),
  },
});

export const BORE_PRODUCER = object_({
  fields: {
    // === Core identification (shared brocom fields) ===
    ...COMMON_REGISTRATION_PRODUCERS,

    researchReportDate: date("./dsbhrgt:reportHistory/dsbhrgt:reportStartDate"),

    // === Location ===
    deliveredLocation: gmlLocation("./dsbhrgt:deliveredLocation/bhrgtcom:location"),
    standardizedLocation: gmlLocation("./dsbhrgt:standardizedLocation/brocom:location"),

    // === Vertical position ===
    deliveredVerticalPositionOffset: number_(`${VPOS}/bhrgtcom:offset`),
    deliveredVerticalPositionDatum: text(`${VPOS}/bhrgtcom:verticalDatum`),
    deliveredVerticalPositionReferencePoint: text(`${VPOS}/bhrgtcom:localVerticalReferencePoint`),

    // === Boring metadata ===
    descriptionProcedure: text(`${SAMPLE_DESC}/bhrgtcom:descriptionProcedure`),
    groundwaterLevel: number_(`${BORING}/bhrgtcom:groundwaterLevel`),
    meanHighestGroundwaterLevel: number_(`${LOG}/bhrgtcom:meanHighestGroundwaterLevel`),
    meanLowestGroundwaterLevel: number_(`${LOG}/bhrgtcom:meanLowestGroundwaterLevel`),
    boreRockReached: boolean_(`${BORING}/bhrgtcom:rockReached`),
    finalBoreDepth: number_(`${BORING}/bhrgtcom:finalDepthBoring`),
    finalSampleDepth: number_(`${BORING}/bhrgtcom:finalDepthSampling`),
    finalDepthPreparation: number_(`${BORING}/bhrgtcom:finalDepthPreparation`),
    finalDepthExcavation: number_(`${BORING}/bhrgtcom:finalDepthExcavation`),
    finalDepthTemporaryCasing: number_(`${BORING}/bhrgtcom:finalDepthTemporaryCasing`),
    boreHoleCompleted: boolean_(`${BORING}/bhrgtcom:boreholeCompleted`),

    // === Boring execution details ===
    boringStartDate: date(`${BORING}/bhrgtcom:boringStartDate`),
    boringEndDate: date(`${BORING}/bhrgtcom:boringEndDate`),
    boringProcedure: text(`${BORING}/bhrgtcom:boringProcedure`),
    boringTechnique: text(`${BORING}/bhrgtcom:boredInterval/bhrgtcom:boringTechnique`),
    trajectoryExcavated: boolean_(`${BORING}/bhrgtcom:trajectoryExcavated`),
    subsurfaceContaminated: boolean_(`${BORING}/bhrgtcom:subsurfaceContaminated`),
    stopCriterion: text(`${BORING}/bhrgtcom:stopCriterion`),
    flushingMediumUsed: boolean_(`${BORING}/bhrgtcom:flushingMediumUsed`),
    flushingAdditive: text(`${BORING}/bhrgtcom:flushingAdditive`),
    temporaryCasingUsed: boolean_(`${BORING}/bhrgtcom:temporaryCasingUsed`),
    preparation: text(`${BORING}/bhrgtcom:preparation`),

    // === Site characteristic ===
    soilUse: text("./dsbhrgt:siteCharacteristic/bhrgtcom:soilUse"),
    positionOnGroundBody: text("./dsbhrgt:siteCharacteristic/bhrgtcom:positionOnGroundBody"),
    temporaryChange: text("./dsbhrgt:siteCharacteristic/bhrgtcom:temporaryChange"),
    researchOperator: custom({
      at: "./dsbhrgt:researchOperator",
      produce: (lens) =>
        lens.textAt("./brocom:chamberOfCommerceNumber") ??
        lens.textAt("./brocom:europeanCompanyRegistrationNumber"),
    }),

    // === Sampler details ===
    samplerType: text(`${SAMPLER}/bhrgtcom:samplerType`),
    samplingProcedure: text(`${BORING}/bhrgtcom:samplingProcedure`),
    samplingMethod: text(`${SAMPLED}/bhrgtcom:samplingMethod`),
    samplingQuality: text(`${SAMPLED}/bhrgtcom:samplingQuality`),
    orientatedSampled: boolean_(`${SAMPLER}/bhrgtcom:orientatedSampled`),
    sampleContainerDiameter: number_(`${SAMPLER}/bhrgtcom:sampleContainerDiameter`),
    sampleContainerLength: number_(`${SAMPLER}/bhrgtcom:sampleContainerLength`),
    pistonPresent: boolean_(`${SAMPLER}/bhrgtcom:pistonPresent`),
    coreCatcherPresent: boolean_(`${SAMPLER}/bhrgtcom:coreCatcherPresent`),
    stockingUsed: boolean_(`${SAMPLER}/bhrgtcom:stockingUsed`),
    lubricationFluidUsed: boolean_(`${SAMPLER}/bhrgtcom:lubricationFluidUsed`),
    rightAngledCuttingShoe: boolean_(`${SAMPLER}/bhrgtcom:rightAngledCuttingShoe`),
    cuttingShoeInsideDiameter: number_(`${SAMPLER}/bhrgtcom:cuttingShoeInsideDiameter`),
    cuttingShoeOutsideDiameter: number_(`${SAMPLER}/bhrgtcom:cuttingShoeOutsideDiameter`),
    taperAngle: number_(`${SAMPLER}/bhrgtcom:taperAngle`),

    // === Description metadata ===
    boreholeLogChecked: boolean_(`${LOG}/bhrgtcom:boreholeLogChecked`),
    descriptionQuality: text(`${LOG}/bhrgtcom:descriptionQuality`),
    descriptionLocation: text(`${LOG}/bhrgtcom:descriptionLocation`),
    descriptionReportDate: date(`${SAMPLE_DESC}/bhrgtcom:descriptionReportDate`),
    describedMaterial: text(`${LOG}/bhrgtcom:describedMaterial`),
    continuouslySampled: boolean_(`${LOG}/bhrgtcom:continuouslySampled`),
    sampleMoistness: text(`${LOG}/bhrgtcom:sampleMoistness`),

    // === Visual description (BHR-GT-BMB): soil/rock layers ===
    data: array({ at: LOG, each: ".//bhrgtcom:layer", item: LAYER }),

    // === Laboratory analysis (BHR-GT-BMA) ===
    analysis: ANALYSIS_PRODUCER,

    // === Boring interval arrays ===
    boredIntervals: array({ each: `${BORING}/bhrgtcom:boredInterval`, item: BORED_INTERVAL }),
    sampledIntervals: array({ each: SAMPLED, item: SAMPLED_INTERVAL }),
    completedIntervals: array({
      each: `${BORING}/bhrgtcom:completedInterval`,
      item: COMPLETED_INTERVAL,
    }),
    notDescribedIntervals: array({
      each: `${LOG}/bhrgtcom:notDescribedInterval`,
      item: object_({ fields: { ...depthRange, noDescriptionReason: text("./bhrgtcom:noDescriptionReason") } }),
    }),
    postSedimentaryDiscontinuities: array({
      each: `${LOG}/bhrgtcom:postSedimentaryDiscontinuity`,
      item: POST_SED_DISCONTINUITY,
    }),
    excavatedLayers: array({
      each: `${BORING}/bhrgtcom:excavatedLayer`,
      item: object_({
        fields: {
          upperBoundary: number_("./bhrgtcom:upperBoundary", REQUIRED),
          lowerBoundary: number_("./bhrgtcom:lowerBoundary", REQUIRED),
          excavatedMaterial: text("./bhrgtcom:excavatedMaterial"),
        },
      }),
    }),
    boringVelocity: array({
      each: `${BORING}/bhrgtcom:boringVelocity`,
      item: object_({
        fields: {
          elapsedTime: number_("./bhrgtcom:elapsedTime"),
          depth: number_("./bhrgtcom:depth"),
        },
      }),
    }),

    // === Fluid mud layer (optional, single) ===
    fluidMudLayer: optional(
      object_({
        fields: {
          thickness: number_("./bhrgtcom:thickness"),
          colour: text("./bhrgtcom:colour"),
          upperBoundaryPositioningMethod: text("./bhrgtcom:upperBoundaryPositioningMethod"),
          lowerBoundaryPositioningMethod: text("./bhrgtcom:lowerBoundaryPositioningMethod"),
        },
      }),
      "./dsbhrgt:fluidMudLayer",
    ),

    // === Administrative history ===
    registrationHistory: REGISTRATION_HISTORY,
    reportHistory: object_({
      at: "./dsbhrgt:reportHistory",
      fields: {
        reportStartDate: date("./dsbhrgt:reportStartDate"),
        reportEndDate: date("./dsbhrgt:reportEndDate"),
        intermediateEvents: array({
          each: "./dsbhrgt:intermediateEvent",
          item: object_({
            fields: {
              eventName: text("./dsbhrgt:eventName"),
              eventDate: date("./dsbhrgt:eventDate"),
            },
          }),
        }),
      },
    }),

    // === Additional top-level metadata ===
    deliveryContext: text("./dsbhrgt:deliveryContext"),
    surveyPurpose: text("./dsbhrgt:surveyPurpose"),
    discipline: text("./dsbhrgt:discipline"),
    surveyProcedure: text("./dsbhrgt:surveyProcedure"),
    siteCharacteristicDetermined: boolean_("./dsbhrgt:siteCharacteristicDetermined"),
  },
});
