/**
 * BHR-GT-BMA (Borehole Sample Analysis) — the laboratory-determination subtree.
 *
 * The ~13 lab determinations of an investigated interval, as declarative
 * producers. Determinations are mounted with `presence: "omit"` so each is keyed
 * only when performed; the CSV time-series (settlement / triaxial / direct-shear)
 * are decoded with the {@link columns} producer.
 */

import type { Producer, CustomProducer } from "../core/producer.js";
import {
  object_,
  array,
  custom,
  scalar,
  text,
  date,
  number_,
  boolean_,
} from "../core/producer.js";
import { columns, col } from "../core/columns.js";
import { parseFloat, parseInt } from "../resolvers/type-resolvers.js";
import type {
  HeightAtSpecificTime,
  StressAtSpecificSettlement,
  VolumeChangeAtSpecificTime,
  ShearStressAtSpecificStrain,
  HorizontalDeformationDataPoint,
} from "../types/index.js";

const REQUIRED = { presence: "required" } as const;

/** Mount an object/array producer at a relative path, keyed only when present. */
function optional<T>(producer: Producer<T>, at: string): Producer<T> {
  return { ...producer, at, presence: "omit" };
}

/** A repeatable code list: text of each match, always present (may be empty). */
function codeList(each: string): Producer<Array<string | null>> {
  return array({ each, item: text() });
}

/** Depth boundary: decimal, defaulting to 0 when absent (XSD-required in practice). */
function depth(at: string): Producer<number> {
  return scalar<number>({ at, decode: (raw) => parseFloat(raw) ?? 0 });
}

/** Integer step/count, defaulting to 0 when absent. */
function intOr0(at: string): Producer<number> {
  return scalar<number>({ at, decode: (raw) => parseInt(raw) ?? 0 });
}

// === CSV column specs ===

const TIME_HEIGHT = [
  { name: "time", parse: col.num },
  { name: "height", parse: col.num },
];

const STRESS_SETTLEMENT = [
  { name: "elapsedTime", parse: col.num },
  { name: "verticalStrain", parse: col.num },
  { name: "excessPoreWaterPressure", parse: col.num },
  { name: "verticalEffectiveStress", parse: col.num },
  { name: "horizontalEffectiveStress", parse: col.num },
];

const VOLUME_CHANGE = [
  { name: "time", parse: col.num },
  { name: "volumeChange", parse: col.num },
];

const SHEAR_LOADING = [
  { name: "time", parse: col.num },
  { name: "axialStrain", parse: col.num },
  { name: "deviatorStress", parse: col.num },
  { name: "cellPressure", parse: col.num },
  { name: "porePressure", parse: col.num, optional: true },
  { name: "volumeChange", parse: col.num, optional: true },
];

const SHEAR_HORIZONTAL = [
  { name: "time", parse: col.num },
  { name: "horizontalDisplacement", parse: col.num },
  { name: "shearStress", parse: col.num },
  { name: "verticalStress", parse: col.num },
  { name: "heightChange", parse: col.num, optional: true },
];

// === Determinations that read directly from their wrapper node ===

const WATER_CONTENT = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    waterContent: number_("./bhrgtcom:determinationResult/bhrgtcom:waterContent"),
    dryingTemperature: text("./bhrgtcom:determinationResult/bhrgtcom:dryingTemperature"),
    dryingPeriod: text("./bhrgtcom:determinationResult/bhrgtcom:dryingPeriod"),
    saltCorrectionMethod: text("./bhrgtcom:determinationResult/bhrgtcom:saltCorrectionMethod"),
  },
});

const VOLUMETRIC_MASS_DENSITY = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    volumetricMassDensity: number_("./bhrgtcom:volumetricMassDensity"),
  },
});

const ORGANIC_MATTER = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    lutumCorrectionApplied: boolean_("./bhrgtcom:lutumCorrectionApplied"),
    organicMatterContent: number_("./bhrgtcom:organicMatterContent"),
  },
});

const CARBONATE = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    carbonateContent: number_("./bhrgtcom:carbonateContent"),
  },
});

const DENSITY_OF_SOLIDS = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    liquidUsed: text("./bhrgtcom:usedMedium"),
    sampleContainerVolume: text("./bhrgtcom:sampleContainerVolume"),
    volumetricMassDensityOfSolids: number_("./bhrgtcom:volumetricMassDensitySolids"),
  },
});

const MAX_UNDRAINED_SHEAR = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    determinationDiameter: text("./bhrgtcom:determinationDiameter"),
    verticallyDetermined: boolean_("./bhrgtcom:verticallyDetermined"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    maximumUndrainedShearStrength: number_("./bhrgtcom:maximumUndrainedShearStrength"),
    lowestMaximumUndrainedShearStrength: number_("./bhrgtcom:lowestMaximumUndrainedShearStrength"),
    highestMaximumUndrainedShearStrength: number_(
      "./bhrgtcom:highestMaximumUndrainedShearStrength",
    ),
  },
});

// === Particle size distribution (fractions live in mutually-exclusive groups) ===

const PSD = "./bhrgtcom:basicParticleSizeDistribution";
const PSD_DET_S = `${PSD}/bhrgtcom:detailedDistributionFractionSmaller63um`;
const PSD_STD_S = `${PSD}/bhrgtcom:standardDistributionFractionSmaller63um`;
const PSD_STD_L = `${PSD}/bhrgtcom:standardDistributionFractionLarger63um`;
const PSD_DET_L = `${PSD}/bhrgtcom:detailedDistributionFractionLarger63um`;

/** A fraction read from one fixed group path (null when that group is absent). */
const frac = (group: string, name: string): Producer<number | null> =>
  number_(`${group}/bhrgtcom:${name}`);

/** A fraction present in either of two mutually-exclusive groups (first non-null wins). */
function fracEither(name: string): CustomProducer<number | null> {
  return custom<number | null>({
    produce: (lens) =>
      parseFloat(lens.textAt(`${PSD_DET_S}/bhrgtcom:${name}`) ?? lens.textAt(`${PSD_STD_S}/bhrgtcom:${name}`)),
  });
}

const PARTICLE_SIZE = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    fractionDistribution: text("./bhrgtcom:fractionDistribution"),
    dispersionMethod: text("./bhrgtcom:dispersionMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    equivalentMassDeterminationMethod: text("./bhrgtcom:equivalentMassDeterminationMethod"),
    equivalentMass: number_("./bhrgtcom:equivalentMass"),
    usedOpticalModel: text("./bhrgtcom:usedOpticalModel"),

    fractionSmaller63um: frac(PSD, "fractionSmaller63um"),
    fractionLarger63um: frac(PSD, "fractionLarger63um"),

    // Detailed <63μm group (with 3 fractions shared with the standard <63μm group)
    fraction0to2um: fracEither("fraction0to2um"),
    fraction2to4um: frac(PSD_DET_S, "fraction2to4um"),
    fraction4to8um: frac(PSD_DET_S, "fraction4to8um"),
    fraction8to16um: frac(PSD_DET_S, "fraction8to16um"),
    fraction16to32um: frac(PSD_DET_S, "fraction16to32um"),
    fraction32to50um: fracEither("fraction32to50um"),
    fraction50to63um: fracEither("fraction50to63um"),
    fraction2to32um: frac(PSD_STD_S, "fraction2to32um"),

    // Standard >63μm group
    fraction63to90um: frac(PSD_STD_L, "fraction63to90um"),
    fraction90to125um: frac(PSD_STD_L, "fraction90to125um"),
    fraction125to180um: frac(PSD_STD_L, "fraction125to180um"),
    fraction180to250um: frac(PSD_STD_L, "fraction180to250um"),
    fraction250to355um: frac(PSD_STD_L, "fraction250to355um"),
    fraction355to500um: frac(PSD_STD_L, "fraction355to500um"),
    fraction500to710um: frac(PSD_STD_L, "fraction500to710um"),
    fraction710to1000um: frac(PSD_STD_L, "fraction710to1000um"),
    fraction1000to1400um: frac(PSD_STD_L, "fraction1000to1400um"),
    fraction1400umto2mm: frac(PSD_STD_L, "fraction1400umto2mm"),
    fraction2to4mm: frac(PSD_STD_L, "fraction2to4mm"),
    fraction4to8mm: frac(PSD_STD_L, "fraction4to8mm"),
    fraction8to16mm: frac(PSD_STD_L, "fraction8to16mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction16to31_5mm: frac(PSD_STD_L, "fraction16to31_5mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction31_5to63mm: frac(PSD_STD_L, "fraction31_5to63mm"),
    fractionLarger63mm: frac(PSD_STD_L, "fractionLarger63mm"),

    // Detailed >63μm group (finer buckets, alternative to the standard >63μm set)
    fraction63to75um: frac(PSD_DET_L, "fraction63to75um"),
    fraction75to90um: frac(PSD_DET_L, "fraction75to90um"),
    fraction90to106um: frac(PSD_DET_L, "fraction90to106um"),
    fraction106to125um: frac(PSD_DET_L, "fraction106to125um"),
    fraction125to150um: frac(PSD_DET_L, "fraction125to150um"),
    fraction150to180um: frac(PSD_DET_L, "fraction150to180um"),
    fraction180to212um: frac(PSD_DET_L, "fraction180to212um"),
    fraction212to250um: frac(PSD_DET_L, "fraction212to250um"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction4to5_6mm: frac(PSD_DET_L, "fraction4to5_6mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction5_6to8mm: frac(PSD_DET_L, "fraction5_6to8mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction8to11_2mm: frac(PSD_DET_L, "fraction8to11_2mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction11_2to16mm: frac(PSD_DET_L, "fraction11_2to16mm"),
    fraction16to20mm: frac(PSD_DET_L, "fraction16to20mm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction20to31_5mm: frac(PSD_DET_L, "fraction20to31_5mm"),
  },
});

// === Determinations wrapped in a PascalCase child element ===

const CONSISTENCY_LIMITS = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    fractionLarger500um: number_("./bhrgtcom:fractionLarger500um"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    performanceIrregularity: text("./bhrgtcom:performanceIrregularity"),
    conusType: text("./bhrgtcom:conusType"),
    liquidLimit: number_("./bhrgtcom:liquidLimit"),
    plasticLimit: number_("./bhrgtcom:plasticLimit"),
    plasticityIndex: number_("./bhrgtcom:plasticityIndex"),
    plasticityAtSpecificWaterContent: array({
      each: "./bhrgtcom:plasticityAtSpecificWaterContent",
      item: object_({
        fields: {
          waterContent: { ...number_("./bhrgtcom:waterContent"), ...REQUIRED },
          numberOfFalls: intOr0("./bhrgtcom:numberOfFalls"),
          penetrationDepth: number_("./bhrgtcom:penetrationDepth"),
        },
      }),
    }),
  },
});

const SATURATION_AT_COMPRESSION = object_({
  fields: {
    porousDiscWet: boolean_("./bhrgtcom:porousDiscWet"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    backPressure: number_("./bhrgtcom:backPressure"),
    constantHeight: boolean_("./bhrgtcom:constantHeight"),
    specimenHeightAfterwards: number_("./bhrgtcom:specimenHeightAfterwards"),
    disturbanceInduced: boolean_("./bhrgtcom:disturbanceInduced"),
    maximumStressDifference: number_("./bhrgtcom:maximumStressDifference"),
    maximumStrain: number_("./bhrgtcom:maximumStrain"),
  },
});

const SETTLEMENT_STEP = object_({
  fields: {
    stepNumber: intOr0("./bhrgtcom:stepNumber"),
    wetPerformed: boolean_("./bhrgtcom:wetPerformed"),
    swellObserved: boolean_("./bhrgtcom:swellObserved"),
    strainPoint24hours: number_("./bhrgtcom:strainPoint24hours"),
    stepType: text("./bhrgtcom:stepType"),
    verticalStress: number_("./bhrgtcom:verticalStress"),
    heightChangeDuringSettlement: columns<HeightAtSpecificTime>(
      "./bhrgtcom:heightChangeDuringSettlement/bhrgtcom:values",
      TIME_HEIGHT,
    ),
    stressChangeDuringSettlement: columns<StressAtSpecificSettlement>(
      "./bhrgtcom:stressChangeDuringSettlement/bhrgtcom:values",
      STRESS_SETTLEMENT,
    ),
  },
});

const SETTLEMENT = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    ringDiameter: number_("./bhrgtcom:ringDiameter"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    filterPaperUsed: boolean_("./bhrgtcom:filterPaperUsed"),
    temperature: number_("./bhrgtcom:temperature"),
    wallFrictionCorrectionMethod: text("./bhrgtcom:wallFrictionCorrectionMethod"),
    apparatusDeformationApplied: boolean_("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean_("./bhrgtcom:bearingFrictionCorrectionApplied"),
    irregularResult: boolean_("./bhrgtcom:irregularResult"),
    saturationStageAtCompression: optional(
      SATURATION_AT_COMPRESSION,
      "./bhrgtcom:saturationStageAtCompression",
    ),
    determinationSteps: array({ each: "./bhrgtcom:determinationStep", item: SETTLEMENT_STEP }),
  },
});

const PERMEABILITY = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenMade: boolean_("./bhrgtcom:specimenMade"),
    saturatedWithCO2: boolean_("./bhrgtcom:saturatedWithCO2"),
    verticallyDetermined: boolean_("./bhrgtcom:verticallyDetermined"),
    currentDownwards: boolean_("./bhrgtcom:currentDownwards"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    waterDegassed: boolean_("./bhrgtcom:waterDegassed"),
    temperature: number_("./bhrgtcom:temperature"),
    maximumGradient: number_("./bhrgtcom:maximumGradient"),
    ringWaterRepellent: text("./bhrgtcom:ringWaterRepellent"),
    waterContentAfterwards: number_("./bhrgtcom:waterContentAfterwards"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    saturatedPermeabilityAtSpecificDensity: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificDensity",
      item: object_({
        fields: {
          dryVolumetricMassDensity: number_("./bhrgtcom:dryVolumetricMassDensity"),
          saturatedPermeability: number_("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
    saturatedPermeabilityAtSpecificLoad: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificLoad",
      item: object_({
        fields: {
          load: number_("./bhrgtcom:load"),
          saturatedPermeability: number_("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
  },
});

// === Shear determinations (repeatable; wrapper holds a PascalCase inner) ===

const SHEAR_LOADING_DET = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean_("./bhrgtcom:specimenDisturbed"),
    specimenTrimmed: boolean_("./bhrgtcom:specimenTrimmed"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    beginDiameter: number_("./bhrgtcom:beginDiameter"),
    beginHeight: number_("./bhrgtcom:beginHeight"),
    topCapTiltable: boolean_("./bhrgtcom:topCapTiltable"),
    filterPaperUsed: boolean_("./bhrgtcom:filterPaperUsed"),
    drainageStripsUsed: boolean_("./bhrgtcom:drainageStripsUsed"),
    membraneSaturatedBefore: boolean_("./bhrgtcom:membraneSaturatedBefore"),
    apparatusDeformationApplied: boolean_("./bhrgtcom:apparatusDeformationApplied"),
    cellDeformationApplied: boolean_("./bhrgtcom:cellDeformationApplied"),
    stopCriterion: text("./bhrgtcom:stopCriterion"),
    membraneCorrection: optional(
      object_({
        fields: {
          correctionMethod: text("./bhrgtcom:correctionMethod"),
          thickness: number_("./bhrgtcom:thickness"),
          stiffnessClass: text("./bhrgtcom:stiffnessClass"),
        },
      }),
      "./bhrgtcom:membraneCorrection",
    ),
    drainageStripCorrection: optional(
      object_({
        fields: {
          correctionMethod: text("./bhrgtcom:correctionMethod"),
          orientation: text("./bhrgtcom:orientation"),
          coverage: text("./bhrgtcom:coverage"),
        },
      }),
      "./bhrgtcom:drainageStripCorrection",
    ),
    madeSpecimenForLoading: optional(
      object_({
        fields: {
          makingMethod: text("./bhrgtcom:makingMethod"),
          dryVolumetricMassDensity: number_("./bhrgtcom:dryVolumetricMassDensity"),
        },
      }),
      "./bhrgtcom:madeSpecimenForLoading",
    ),
    saturationStageAtLoading: optional(
      object_({
        fields: {
          porousDiscWet: boolean_("./bhrgtcom:porousDiscWet"),
          porousDiscRough: boolean_("./bhrgtcom:porousDiscRough"),
          usedMedium: text("./bhrgtcom:usedMedium"),
          constantHeight: boolean_("./bhrgtcom:constantHeight"),
          cellPressureAutomaticallyControlled: boolean_(
            "./bhrgtcom:cellPressureAutomaticallyControlled",
          ),
          backPressure: number_("./bhrgtcom:backPressure"),
          effectivePressure: number_("./bhrgtcom:effectivePressure"),
          skemptonBCoefficient: number_("./bhrgtcom:skemptonB_Coefficient"),
          disturbanceInduced: boolean_("./bhrgtcom:disturbanceInduced"),
          stressDifference: number_("./bhrgtcom:stressDifference"),
        },
      }),
      "./bhrgtcom:saturationStageAtLoading",
    ),
    consolidationStageAtLoading: optional(
      object_({
        fields: {
          drainageTwoSided: boolean_("./bhrgtcom:drainageTwoSided"),
          consolidationMethod: text("./bhrgtcom:consolidationMethod"),
          verticalConsolidationStress: number_("./bhrgtcom:verticalConsolidationStress"),
          horizontalConsolidationStress: number_("./bhrgtcom:horizontalConsolidationStress"),
          verticalStrain: number_("./bhrgtcom:verticalStrain"),
          lateralEarthPressureCoefficient: number_("./bhrgtcom:lateralEarthPressureCoefficient"),
          volumeChangeDuringConsolidation: columns<VolumeChangeAtSpecificTime>(
            "./bhrgtcom:volumeChangeDuringConsolidation/bhrgtcom:values",
            VOLUME_CHANGE,
          ),
        },
      }),
      "./bhrgtcom:consolidationStageAtLoading",
    ),
    loadStage: optional(
      object_({
        fields: {
          deformationRate: number_("./bhrgtcom:deformationRate"),
          specimenShape: text("./bhrgtcom:specimenShape"),
          shearStressChangeDuringLoading: columns<ShearStressAtSpecificStrain>(
            "./bhrgtcom:shearStressChangeDuringLoading/bhrgtcom:values",
            SHEAR_LOADING,
          ),
        },
      }),
      "./bhrgtcom:loadStage",
    ),
  },
});

const HORIZONTAL_CONSOLIDATION_STEP = object_({
  fields: {
    stepNumber: intOr0("./bhrgtcom:stepNumber"),
    verticalStress: number_("./bhrgtcom:verticalStress"),
    heightChangeDuringConsolidation: columns<HeightAtSpecificTime>(
      "./bhrgtcom:heightChangeDuringConsolidation/bhrgtcom:values",
      TIME_HEIGHT,
    ),
  },
});

const SHEAR_HORIZONTAL_DET = object_({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean_("./bhrgtcom:specimenDisturbed"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    specimenWaterSaturated: boolean_("./bhrgtcom:specimenWaterSaturated"),
    porousDiscWet: boolean_("./bhrgtcom:porousDiscWet"),
    drained: boolean_("./bhrgtcom:drained"),
    lateralSupport: text("./bhrgtcom:lateralSupport"),
    beginDiameter: number_("./bhrgtcom:beginDiameter"),
    beginHeight: number_("./bhrgtcom:beginHeight"),
    stopCriterion: text("./bhrgtcom:stopCriterion"),
    membraneCorrectionApplied: boolean_("./bhrgtcom:membraneCorrectionApplied"),
    apparatusDeformationApplied: boolean_("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean_("./bhrgtcom:bearingFrictionCorrectionApplied"),
    consolidationStageAtHorizontalDeformation: optional(
      object_({
        fields: {
          pedestalFixed: boolean_("./bhrgtcom:pedestalFixed"),
          consolidationSteps: array({
            each: "./bhrgtcom:consolidationStep",
            item: HORIZONTAL_CONSOLIDATION_STEP,
          }),
        },
      }),
      "./bhrgtcom:consolidationStageAtHorizontalDeformation",
    ),
    shearStage: optional(
      object_({
        fields: {
          deformationRate: number_("./bhrgtcom:deformationRate"),
          activeHeightControl: boolean_("./bhrgtcom:activeHeightControl"),
          shearStressChangeDuringHorizontalDeformation: columns<HorizontalDeformationDataPoint>(
            "./bhrgtcom:shearStressChangeDuringHorizontalDeformation/bhrgtcom:values",
            SHEAR_HORIZONTAL,
          ),
        },
      }),
      "./bhrgtcom:shearStage",
    ),
  },
});

// === Investigated interval ===

const INVESTIGATED_INTERVAL = object_({
  fields: {
    beginDepth: depth("./bhrgtcom:beginDepth"),
    endDepth: depth("./bhrgtcom:endDepth"),
    sampleQuality: text("./bhrgtcom:sampleQuality"),
    analysisType: text("./bhrgtcom:analysisType"),
    waterContentDetermined: boolean_("./bhrgtcom:waterContentDetermined"),
    organicMatterContentDetermined: boolean_("./bhrgtcom:organicMatterContentDetermined"),
    carbonateContentDetermined: boolean_("./bhrgtcom:carbonateContentDetermined"),
    volumetricMassDensityDetermined: boolean_("./bhrgtcom:volumetricMassDensityDetermined"),
    volumetricMassDensitySolidsDetermined: boolean_(
      "./bhrgtcom:volumetricMassDensitySolidsDetermined",
    ),
    described: boolean_("./bhrgtcom:described"),

    waterContentDetermination: optional(WATER_CONTENT, "./bhrgtcom:waterContentDetermination"),
    organicMatterContentDetermination: optional(
      ORGANIC_MATTER,
      "./bhrgtcom:organicMatterContentDetermination",
    ),
    carbonateContentDetermination: optional(CARBONATE, "./bhrgtcom:carbonateContentDetermination"),
    volumetricMassDensityDetermination: optional(
      VOLUMETRIC_MASS_DENSITY,
      "./bhrgtcom:volumetricMassDensityDetermination",
    ),
    volumetricMassDensityOfSolidsDetermination: optional(
      DENSITY_OF_SOLIDS,
      "./bhrgtcom:volumetricMassDensitySolidsDetermination",
    ),
    particleSizeDistributionDetermination: optional(
      PARTICLE_SIZE,
      "./bhrgtcom:particleSizeDistributionDetermination",
    ),
    consistencyLimitsDetermination: optional(
      CONSISTENCY_LIMITS,
      "./bhrgtcom:consistencyLimitsDetermination/bhrgtcom:ConsistencyLimitsDetermination",
    ),
    settlementCharacteristicsDetermination: optional(
      SETTLEMENT,
      "./bhrgtcom:settlementCharacteristicsDetermination/bhrgtcom:SettlementCharacteristicsDetermination",
    ),
    saturatedPermeabilityDetermination: optional(
      PERMEABILITY,
      "./bhrgtcom:saturatedPermeabilityDetermination/bhrgtcom:SaturatedPermeabilityDetermination",
    ),
    maximumUndrainedShearStrengthDetermination: optional(
      MAX_UNDRAINED_SHEAR,
      "./bhrgtcom:maximumUndrainedShearStrengthDetermination",
    ),
    shearStressChangeDuringLoadingDetermination: array({
      each: "./bhrgtcom:shearStressChangeDuringLoadingDetermination/bhrgtcom:ShearStressChangeDuringLoadingDetermination",
      item: SHEAR_LOADING_DET,
      presence: "omit",
    }),
    shearStressChangeDuringHorizontalDeformationDetermination: array({
      each: "./bhrgtcom:shearStressChangeDuringHorizontalDeformationDetermination/bhrgtcom:ShearStressChangeDuringHorizontalDeformationDetermination",
      item: SHEAR_HORIZONTAL_DET,
      presence: "omit",
    }),
  },
});

/** The `analysis` field: absent (`omit`) when there is no BMA subtree. */
export const ANALYSIS_PRODUCER = object_({
  at: "./dsbhrgt:boreholeSampleAnalysis",
  presence: "omit",
  fields: {
    analysisReportDate: date("./bhrgtcom:analysisReportDate"),
    analysisProcedure: text("./bhrgtcom:analysisProcedure"),
    investigatedIntervals: array({
      each: "./bhrgtcom:investigatedInterval",
      item: INVESTIGATED_INTERVAL,
    }),
  },
});
