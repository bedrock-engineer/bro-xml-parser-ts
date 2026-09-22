/**
 * BHR-GT-BMA (Borehole Sample Analysis) — the laboratory-determination subtree.
 *
 * The ~13 lab determinations of an investigated interval, as declarative
 * producers. Determinations are mounted with `presence: "omit"` so each is keyed
 * only when performed; the CSV time-series (settlement / triaxial / direct-shear)
 * are decoded with the {@link columns} producer.
 */

import type { Producer, CustomProducer, Presence, Produced } from "../core/producer.js";
import {
  object,
  array,
  custom,
  scalar,
  text,
  date,
  number,
  boolean,
} from "../core/producer.js";
import { columns, col } from "../core/columns.js";
import type { RowOf } from "../core/columns.js";
import { parseFloat, parseInt } from "../decoders/type-decoders.js";

const REQUIRED = { presence: "required" } as const;

/** Mount an object/array producer at a relative path, keyed only when present. */
function optional<T>(producer: Producer<T, Presence>, at: string): Producer<T, "omit"> {
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

// === CSV column specs (as const so column names + cell types drive RowOf) ===

const TIME_HEIGHT = [
  { name: "time", parse: col.num },
  { name: "height", parse: col.num },
] as const;

const STRESS_SETTLEMENT = [
  { name: "elapsedTime", parse: col.num },
  { name: "verticalStrain", parse: col.num },
  { name: "excessPoreWaterPressure", parse: col.num },
  { name: "verticalEffectiveStress", parse: col.num },
  { name: "horizontalEffectiveStress", parse: col.num },
] as const;

const VOLUME_CHANGE = [
  { name: "time", parse: col.num },
  { name: "volumeChange", parse: col.num },
] as const;

const SHEAR_LOADING = [
  { name: "time", parse: col.num },
  { name: "axialStrain", parse: col.num },
  { name: "deviatorStress", parse: col.num },
  { name: "cellPressure", parse: col.num },
  { name: "porePressure", parse: col.num, optional: true },
  { name: "volumeChange", parse: col.num, optional: true },
] as const;

const SHEAR_HORIZONTAL = [
  { name: "time", parse: col.num },
  { name: "horizontalDisplacement", parse: col.num },
  { name: "shearStress", parse: col.num },
  { name: "verticalStress", parse: col.num },
  { name: "heightChange", parse: col.num, optional: true },
] as const;

/**
 * Time-series row types, inferred from the column specs above. All columns are
 * `col.num`, so every field is `number | null` and always present (the decoder
 * assigns `null` for absent/sentinel cells).
 * @internal
 */
export type HeightAtSpecificTime = RowOf<typeof TIME_HEIGHT>;
/** @internal */
export type StressAtSpecificSettlement = RowOf<typeof STRESS_SETTLEMENT>;
/** @internal */
export type VolumeChangeAtSpecificTime = RowOf<typeof VOLUME_CHANGE>;
/** @internal */
export type ShearStressAtSpecificStrain = RowOf<typeof SHEAR_LOADING>;
/** @internal */
export type HorizontalDeformationDataPoint = RowOf<typeof SHEAR_HORIZONTAL>;

// === Determinations that read directly from their wrapper node ===

const WATER_CONTENT = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    waterContent: number("./bhrgtcom:determinationResult/bhrgtcom:waterContent"),
    dryingTemperature: text("./bhrgtcom:determinationResult/bhrgtcom:dryingTemperature"),
    dryingPeriod: text("./bhrgtcom:determinationResult/bhrgtcom:dryingPeriod"),
    saltCorrectionMethod: text("./bhrgtcom:determinationResult/bhrgtcom:saltCorrectionMethod"),
  },
});

const VOLUMETRIC_MASS_DENSITY = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    volumetricMassDensity: number("./bhrgtcom:volumetricMassDensity"),
  },
});

const ORGANIC_MATTER = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    lutumCorrectionApplied: boolean("./bhrgtcom:lutumCorrectionApplied"),
    organicMatterContent: number("./bhrgtcom:organicMatterContent"),
  },
});

const CARBONATE = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    carbonateContent: number("./bhrgtcom:carbonateContent"),
  },
});

const DENSITY_OF_SOLIDS = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    liquidUsed: text("./bhrgtcom:usedMedium"),
    sampleContainerVolume: text("./bhrgtcom:sampleContainerVolume"),
    volumetricMassDensityOfSolids: number("./bhrgtcom:volumetricMassDensitySolids"),
  },
});

const MAX_UNDRAINED_SHEAR = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    determinationDiameter: text("./bhrgtcom:determinationDiameter"),
    verticallyDetermined: boolean("./bhrgtcom:verticallyDetermined"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    maximumUndrainedShearStrength: number("./bhrgtcom:maximumUndrainedShearStrength"),
    lowestMaximumUndrainedShearStrength: number("./bhrgtcom:lowestMaximumUndrainedShearStrength"),
    highestMaximumUndrainedShearStrength: number(
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
  number(`${group}/bhrgtcom:${name}`);

/** A fraction present in either of two mutually-exclusive groups (first non-null wins). */
function fracEither(name: string): CustomProducer<number | null> {
  return custom<number | null>({
    produce: (lens) =>
      parseFloat(lens.textAt(`${PSD_DET_S}/bhrgtcom:${name}`) ?? lens.textAt(`${PSD_STD_S}/bhrgtcom:${name}`)),
  });
}

const PARTICLE_SIZE = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    fractionDistribution: text("./bhrgtcom:fractionDistribution"),
    dispersionMethod: text("./bhrgtcom:dispersionMethod"),
    removedMaterial: text("./bhrgtcom:removedMaterial"),
    equivalentMassDeterminationMethod: text("./bhrgtcom:equivalentMassDeterminationMethod"),
    equivalentMass: number("./bhrgtcom:equivalentMass"),
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

const CONSISTENCY_LIMITS = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    fractionLarger500um: number("./bhrgtcom:fractionLarger500um"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    performanceIrregularity: text("./bhrgtcom:performanceIrregularity"),
    conusType: text("./bhrgtcom:conusType"),
    liquidLimit: number("./bhrgtcom:liquidLimit"),
    plasticLimit: number("./bhrgtcom:plasticLimit"),
    plasticityIndex: number("./bhrgtcom:plasticityIndex"),
    plasticityAtSpecificWaterContent: array({
      each: "./bhrgtcom:plasticityAtSpecificWaterContent",
      item: object({
        fields: {
          waterContent: { ...number("./bhrgtcom:waterContent"), ...REQUIRED },
          numberOfFalls: intOr0("./bhrgtcom:numberOfFalls"),
          penetrationDepth: number("./bhrgtcom:penetrationDepth"),
        },
      }),
    }),
  },
});

const SATURATION_AT_COMPRESSION = object({
  fields: {
    porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    backPressure: number("./bhrgtcom:backPressure"),
    constantHeight: boolean("./bhrgtcom:constantHeight"),
    specimenHeightAfterwards: number("./bhrgtcom:specimenHeightAfterwards"),
    disturbanceInduced: boolean("./bhrgtcom:disturbanceInduced"),
    maximumStressDifference: number("./bhrgtcom:maximumStressDifference"),
    maximumStrain: number("./bhrgtcom:maximumStrain"),
  },
});

const SETTLEMENT_STEP = object({
  fields: {
    stepNumber: intOr0("./bhrgtcom:stepNumber"),
    wetPerformed: boolean("./bhrgtcom:wetPerformed"),
    swellObserved: boolean("./bhrgtcom:swellObserved"),
    strainPoint24hours: number("./bhrgtcom:strainPoint24hours"),
    stepType: text("./bhrgtcom:stepType"),
    verticalStress: number("./bhrgtcom:verticalStress"),
    heightChangeDuringSettlement: columns(
      "./bhrgtcom:heightChangeDuringSettlement/bhrgtcom:values",
      TIME_HEIGHT,
    ),
    stressChangeDuringSettlement: columns(
      "./bhrgtcom:stressChangeDuringSettlement/bhrgtcom:values",
      STRESS_SETTLEMENT,
    ),
  },
});

const SETTLEMENT = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    ringDiameter: number("./bhrgtcom:ringDiameter"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    filterPaperUsed: boolean("./bhrgtcom:filterPaperUsed"),
    temperature: number("./bhrgtcom:temperature"),
    wallFrictionCorrectionMethod: text("./bhrgtcom:wallFrictionCorrectionMethod"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean("./bhrgtcom:bearingFrictionCorrectionApplied"),
    irregularResult: boolean("./bhrgtcom:irregularResult"),
    saturationStageAtCompression: optional(
      SATURATION_AT_COMPRESSION,
      "./bhrgtcom:saturationStageAtCompression",
    ),
    determinationSteps: array({ each: "./bhrgtcom:determinationStep", item: SETTLEMENT_STEP }),
  },
});

const PERMEABILITY = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenMade: boolean("./bhrgtcom:specimenMade"),
    saturatedWithCO2: boolean("./bhrgtcom:saturatedWithCO2"),
    verticallyDetermined: boolean("./bhrgtcom:verticallyDetermined"),
    currentDownwards: boolean("./bhrgtcom:currentDownwards"),
    usedMedium: text("./bhrgtcom:usedMedium"),
    waterDegassed: boolean("./bhrgtcom:waterDegassed"),
    temperature: number("./bhrgtcom:temperature"),
    maximumGradient: number("./bhrgtcom:maximumGradient"),
    ringWaterRepellent: text("./bhrgtcom:ringWaterRepellent"),
    waterContentAfterwards: number("./bhrgtcom:waterContentAfterwards"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    saturatedPermeabilityAtSpecificDensity: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificDensity",
      item: object({
        fields: {
          dryVolumetricMassDensity: number("./bhrgtcom:dryVolumetricMassDensity"),
          saturatedPermeability: number("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
    saturatedPermeabilityAtSpecificLoad: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificLoad",
      item: object({
        fields: {
          load: number("./bhrgtcom:load"),
          saturatedPermeability: number("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
  },
});

// === Shear determinations (repeatable; wrapper holds a PascalCase inner) ===

const SHEAR_LOADING_DET = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean("./bhrgtcom:specimenDisturbed"),
    specimenTrimmed: boolean("./bhrgtcom:specimenTrimmed"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    beginDiameter: number("./bhrgtcom:beginDiameter"),
    beginHeight: number("./bhrgtcom:beginHeight"),
    topCapTiltable: boolean("./bhrgtcom:topCapTiltable"),
    filterPaperUsed: boolean("./bhrgtcom:filterPaperUsed"),
    drainageStripsUsed: boolean("./bhrgtcom:drainageStripsUsed"),
    membraneSaturatedBefore: boolean("./bhrgtcom:membraneSaturatedBefore"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    cellDeformationApplied: boolean("./bhrgtcom:cellDeformationApplied"),
    stopCriterion: text("./bhrgtcom:stopCriterion"),
    membraneCorrection: optional(
      object({
        fields: {
          correctionMethod: text("./bhrgtcom:correctionMethod"),
          thickness: number("./bhrgtcom:thickness"),
          stiffnessClass: text("./bhrgtcom:stiffnessClass"),
        },
      }),
      "./bhrgtcom:membraneCorrection",
    ),
    drainageStripCorrection: optional(
      object({
        fields: {
          correctionMethod: text("./bhrgtcom:correctionMethod"),
          orientation: text("./bhrgtcom:orientation"),
          coverage: text("./bhrgtcom:coverage"),
        },
      }),
      "./bhrgtcom:drainageStripCorrection",
    ),
    madeSpecimenForLoading: optional(
      object({
        fields: {
          makingMethod: text("./bhrgtcom:makingMethod"),
          dryVolumetricMassDensity: number("./bhrgtcom:dryVolumetricMassDensity"),
        },
      }),
      "./bhrgtcom:madeSpecimenForLoading",
    ),
    saturationStageAtLoading: optional(
      object({
        fields: {
          porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
          porousDiscRough: boolean("./bhrgtcom:porousDiscRough"),
          usedMedium: text("./bhrgtcom:usedMedium"),
          constantHeight: boolean("./bhrgtcom:constantHeight"),
          cellPressureAutomaticallyControlled: boolean(
            "./bhrgtcom:cellPressureAutomaticallyControlled",
          ),
          backPressure: number("./bhrgtcom:backPressure"),
          effectivePressure: number("./bhrgtcom:effectivePressure"),
          skemptonBCoefficient: number("./bhrgtcom:skemptonB_Coefficient"),
          disturbanceInduced: boolean("./bhrgtcom:disturbanceInduced"),
          stressDifference: number("./bhrgtcom:stressDifference"),
        },
      }),
      "./bhrgtcom:saturationStageAtLoading",
    ),
    consolidationStageAtLoading: optional(
      object({
        fields: {
          drainageTwoSided: boolean("./bhrgtcom:drainageTwoSided"),
          consolidationMethod: text("./bhrgtcom:consolidationMethod"),
          verticalConsolidationStress: number("./bhrgtcom:verticalConsolidationStress"),
          horizontalConsolidationStress: number("./bhrgtcom:horizontalConsolidationStress"),
          verticalStrain: number("./bhrgtcom:verticalStrain"),
          lateralEarthPressureCoefficient: number("./bhrgtcom:lateralEarthPressureCoefficient"),
          volumeChangeDuringConsolidation: columns(
            "./bhrgtcom:volumeChangeDuringConsolidation/bhrgtcom:values",
            VOLUME_CHANGE,
          ),
        },
      }),
      "./bhrgtcom:consolidationStageAtLoading",
    ),
    loadStage: optional(
      object({
        fields: {
          deformationRate: number("./bhrgtcom:deformationRate"),
          specimenShape: text("./bhrgtcom:specimenShape"),
          shearStressChangeDuringLoading: columns(
            "./bhrgtcom:shearStressChangeDuringLoading/bhrgtcom:values",
            SHEAR_LOADING,
          ),
        },
      }),
      "./bhrgtcom:loadStage",
    ),
  },
});

const HORIZONTAL_CONSOLIDATION_STEP = object({
  fields: {
    stepNumber: intOr0("./bhrgtcom:stepNumber"),
    verticalStress: number("./bhrgtcom:verticalStress"),
    heightChangeDuringConsolidation: columns(
      "./bhrgtcom:heightChangeDuringConsolidation/bhrgtcom:values",
      TIME_HEIGHT,
    ),
  },
});

const SHEAR_HORIZONTAL_DET = object({
  fields: {
    determinationProcedure: text("./bhrgtcom:determinationProcedure"),
    determinationMethod: text("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean("./bhrgtcom:specimenDisturbed"),
    sampleMoistness: text("./bhrgtcom:sampleMoistness"),
    specimenWaterSaturated: boolean("./bhrgtcom:specimenWaterSaturated"),
    porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
    drained: boolean("./bhrgtcom:drained"),
    lateralSupport: text("./bhrgtcom:lateralSupport"),
    beginDiameter: number("./bhrgtcom:beginDiameter"),
    beginHeight: number("./bhrgtcom:beginHeight"),
    stopCriterion: text("./bhrgtcom:stopCriterion"),
    membraneCorrectionApplied: boolean("./bhrgtcom:membraneCorrectionApplied"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean("./bhrgtcom:bearingFrictionCorrectionApplied"),
    consolidationStageAtHorizontalDeformation: optional(
      object({
        fields: {
          pedestalFixed: boolean("./bhrgtcom:pedestalFixed"),
          consolidationSteps: array({
            each: "./bhrgtcom:consolidationStep",
            item: HORIZONTAL_CONSOLIDATION_STEP,
          }),
        },
      }),
      "./bhrgtcom:consolidationStageAtHorizontalDeformation",
    ),
    shearStage: optional(
      object({
        fields: {
          deformationRate: number("./bhrgtcom:deformationRate"),
          activeHeightControl: boolean("./bhrgtcom:activeHeightControl"),
          shearStressChangeDuringHorizontalDeformation: columns(
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

const INVESTIGATED_INTERVAL = object({
  fields: {
    beginDepth: depth("./bhrgtcom:beginDepth"),
    endDepth: depth("./bhrgtcom:endDepth"),
    sampleQuality: text("./bhrgtcom:sampleQuality"),
    analysisType: text("./bhrgtcom:analysisType"),
    waterContentDetermined: boolean("./bhrgtcom:waterContentDetermined"),
    organicMatterContentDetermined: boolean("./bhrgtcom:organicMatterContentDetermined"),
    carbonateContentDetermined: boolean("./bhrgtcom:carbonateContentDetermined"),
    volumetricMassDensityDetermined: boolean("./bhrgtcom:volumetricMassDensityDetermined"),
    volumetricMassDensitySolidsDetermined: boolean(
      "./bhrgtcom:volumetricMassDensitySolidsDetermined",
    ),
    described: boolean("./bhrgtcom:described"),

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
export const ANALYSIS_PRODUCER = object({
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

// ===========================================================================
// Derived types — the schema (the producers above) is the single source.
// ===========================================================================

/** The BHR-GT-BMA laboratory-analysis subtree. Inferred from {@link ANALYSIS_PRODUCER}. @internal */
export type BoreholeSampleAnalysis = Produced<typeof ANALYSIS_PRODUCER>;
/** One investigated interval within the analysis. Inferred from {@link INVESTIGATED_INTERVAL}. @internal */
export type InvestigatedInterval = Produced<typeof INVESTIGATED_INTERVAL>;

// --- Determinations (each inferred from its named producer) ---
/** @internal */
export type WaterContentDetermination = Produced<typeof WATER_CONTENT>;
/** @internal */
export type VolumetricMassDensityDetermination = Produced<typeof VOLUMETRIC_MASS_DENSITY>;
/** @internal */
export type OrganicMatterContentDetermination = Produced<typeof ORGANIC_MATTER>;
/** @internal */
export type CarbonateContentDetermination = Produced<typeof CARBONATE>;
/** @internal */
export type VolumetricMassDensityOfSolidsDetermination = Produced<typeof DENSITY_OF_SOLIDS>;
/** @internal */
export type MaximumUndrainedShearStrengthDetermination = Produced<typeof MAX_UNDRAINED_SHEAR>;
/** @internal */
export type ParticleSizeDistributionDetermination = Produced<typeof PARTICLE_SIZE>;
/** @internal */
export type ConsistencyLimitsDetermination = Produced<typeof CONSISTENCY_LIMITS>;
/** @internal */
export type SettlementCharacteristicsDetermination = Produced<typeof SETTLEMENT>;
/** @internal */
export type SettlementDeterminationStep = Produced<typeof SETTLEMENT_STEP>;
/** @internal */
export type SaturationStageAtCompression = Produced<typeof SATURATION_AT_COMPRESSION>;
/** @internal */
export type SaturatedPermeabilityDetermination = Produced<typeof PERMEABILITY>;
/** @internal */
export type ShearStressChangeDuringLoadingDetermination = Produced<typeof SHEAR_LOADING_DET>;
/** @internal */
export type ConsolidationStepAtHorizontalDeformation = Produced<typeof HORIZONTAL_CONSOLIDATION_STEP>;
/** @internal */
export type ShearStressChangeDuringHorizontalDeformationDetermination = Produced<
  typeof SHEAR_HORIZONTAL_DET
>;

// --- Inline sub-types (derived one level from their parent determination) ---
/** @internal */
export type PlasticityAtSpecificWaterContent =
  ConsistencyLimitsDetermination["plasticityAtSpecificWaterContent"][number];
/** @internal */
export type SaturatedPermeabilityAtSpecificDensity =
  SaturatedPermeabilityDetermination["saturatedPermeabilityAtSpecificDensity"][number];
/** @internal */
export type SaturatedPermeabilityAtSpecificLoad =
  SaturatedPermeabilityDetermination["saturatedPermeabilityAtSpecificLoad"][number];
/** @internal */
export type MembraneCorrection = NonNullable<
  ShearStressChangeDuringLoadingDetermination["membraneCorrection"]
>;
/** @internal */
export type DrainageStripCorrection = NonNullable<
  ShearStressChangeDuringLoadingDetermination["drainageStripCorrection"]
>;
/** @internal */
export type SpecimenMadeForLoading = NonNullable<
  ShearStressChangeDuringLoadingDetermination["madeSpecimenForLoading"]
>;
/** @internal */
export type SaturationStageAtLoading = NonNullable<
  ShearStressChangeDuringLoadingDetermination["saturationStageAtLoading"]
>;
/** @internal */
export type ConsolidationStageAtLoading = NonNullable<
  ShearStressChangeDuringLoadingDetermination["consolidationStageAtLoading"]
>;
/** @internal */
export type LoadStage = NonNullable<ShearStressChangeDuringLoadingDetermination["loadStage"]>;
/** @internal */
export type ConsolidationStageAtHorizontalDeformation = NonNullable<
  ShearStressChangeDuringHorizontalDeformationDetermination["consolidationStageAtHorizontalDeformation"]
>;
/** @internal */
export type ShearStageAtHorizontalDeformation = NonNullable<
  ShearStressChangeDuringHorizontalDeformationDetermination["shearStage"]
>;
