/**
 * BHR-GT-BMA (Borehole Sample Analysis) — the laboratory-determination subtree.
 *
 * The ~13 lab determinations of an investigated interval, as declarative
 * producers. Determinations are mounted with `presence: "omit"` so each is keyed
 * only when performed; the CSV time-series (settlement / triaxial / direct-shear)
 * are decoded with the {@link columns} producer.
 */

import type { Producer, CustomProducer, Presence, Produced, Measure } from "../core/producer.js";
import {
  object,
  array,
  custom,
  scalar,
  text,
  code,
  date,
  measure,
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

/** A repeatable coded list: a {@link Coded} per match, always present (may be empty). */
function codeList(each: string) {
  return array({ each, item: code() });
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
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    removedMaterial: codeList("./bhrgtcom:removedMaterial"),
    waterContent: measure("./bhrgtcom:determinationResult/bhrgtcom:waterContent"),
    dryingTemperature: code("./bhrgtcom:determinationResult/bhrgtcom:dryingTemperature"),
    dryingPeriod: code("./bhrgtcom:determinationResult/bhrgtcom:dryingPeriod"),
    saltCorrectionMethod: code("./bhrgtcom:determinationResult/bhrgtcom:saltCorrectionMethod"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
  },
});

const VOLUMETRIC_MASS_DENSITY = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    volumetricMassDensity: measure("./bhrgtcom:volumetricMassDensity"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
  },
});

const ORGANIC_MATTER = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    removedMaterial: codeList("./bhrgtcom:removedMaterial"),
    lutumCorrectionApplied: boolean("./bhrgtcom:lutumCorrectionApplied"),
    organicMatterContent: measure("./bhrgtcom:organicMatterContent"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
  },
});

const CARBONATE = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    removedMaterial: codeList("./bhrgtcom:removedMaterial"),
    carbonateContent: measure("./bhrgtcom:carbonateContent"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
  },
});

const DENSITY_OF_SOLIDS = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    liquidUsed: code("./bhrgtcom:usedMedium"),
    sampleContainerVolume: code("./bhrgtcom:sampleContainerVolume"),
    removedMaterial: codeList("./bhrgtcom:removedMaterial"),
    volumetricMassDensityOfSolids: measure("./bhrgtcom:volumetricMassDensitySolids"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
  },
});

const MAX_UNDRAINED_SHEAR = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    determinationDiameter: code("./bhrgtcom:determinationDiameter"),
    verticallyDetermined: boolean("./bhrgtcom:verticallyDetermined"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    maximumUndrainedShearStrength: measure("./bhrgtcom:maximumUndrainedShearStrength"),
    lowestMaximumUndrainedShearStrength: measure("./bhrgtcom:lowestMaximumUndrainedShearStrength"),
    highestMaximumUndrainedShearStrength: measure(
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
const frac = (group: string, name: string): Producer<Measure | null> =>
  measure(`${group}/bhrgtcom:${name}`);

/** A fraction present in either of two mutually-exclusive groups (first non-null wins). */
function fracEither(name: string, groups: readonly [string, string]): CustomProducer<Measure | null> {
  return custom<Measure | null>({
    produce: (lens) => {
      const at = groups
        .map((group) => `${group}/bhrgtcom:${name}`)
        .find((path) => lens.textAt(path) !== null);
      if (!at) {
        return null;
      }
      const value = parseFloat(lens.textAt(at));
      const uom = lens.attr(`${at}/@uom`);
      return value === null || uom === null ? null : { value, uom };
    },
  });
}

/** The <63μm fractions shared by the detailed and standard fine groups. */
const EITHER_S = [PSD_DET_S, PSD_STD_S] as const;
/** The >63μm standard buckets, which the detailed coarse group also carries. */
const EITHER_L = [PSD_STD_L, PSD_DET_L] as const;

const PARTICLE_SIZE = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    fractionDistribution: code("./bhrgtcom:fractionDistribution"),
    dispersionMethod: code("./bhrgtcom:dispersionMethod"),
    removedMaterial: codeList("./bhrgtcom:removedMaterial"),
    equivalentMassDeterminationMethod: code("./bhrgtcom:equivalentMassDeterminationMethod"),
    equivalentMass: measure("./bhrgtcom:equivalentMass"),
    usedOpticalModel: code("./bhrgtcom:usedOpticalModel"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),

    fractionSmaller63um: frac(PSD, "fractionSmaller63um"),
    fractionLarger63um: frac(PSD, "fractionLarger63um"),

    // Detailed <63μm group (with 3 fractions shared with the standard <63μm group)
    fraction0to2um: fracEither("fraction0to2um", EITHER_S),
    fraction2to4um: frac(PSD_DET_S, "fraction2to4um"),
    fraction4to8um: frac(PSD_DET_S, "fraction4to8um"),
    fraction8to16um: frac(PSD_DET_S, "fraction8to16um"),
    fraction16to32um: frac(PSD_DET_S, "fraction16to32um"),
    fraction32to50um: fracEither("fraction32to50um", EITHER_S),
    fraction50to63um: fracEither("fraction50to63um", EITHER_S),
    fraction2to32um: frac(PSD_STD_S, "fraction2to32um"),

    // Standard >63μm group
    fraction63to90um: fracEither("fraction63to90um", EITHER_L),
    fraction90to125um: fracEither("fraction90to125um", EITHER_L),
    fraction125to180um: fracEither("fraction125to180um", EITHER_L),
    fraction180to250um: fracEither("fraction180to250um", EITHER_L),
    fraction250to355um: fracEither("fraction250to355um", EITHER_L),
    fraction355to500um: fracEither("fraction355to500um", EITHER_L),
    fraction500to710um: fracEither("fraction500to710um", EITHER_L),
    fraction710to1000um: fracEither("fraction710to1000um", EITHER_L),
    fraction1000to1400um: fracEither("fraction1000to1400um", EITHER_L),
    fraction1400umto2mm: fracEither("fraction1400umto2mm", EITHER_L),
    fraction2to4mm: fracEither("fraction2to4mm", EITHER_L),
    fraction4to8mm: fracEither("fraction4to8mm", EITHER_L),
    fraction8to16mm: fracEither("fraction8to16mm", EITHER_L),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction16to31_5mm: fracEither("fraction16to31_5mm", EITHER_L),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fraction31_5to63mm: fracEither("fraction31_5to63mm", EITHER_L),
    fractionLarger63mm: fracEither("fractionLarger63mm", EITHER_L),

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
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    fractionLarger500um: measure("./bhrgtcom:fractionLarger500um"),
    usedMedium: code("./bhrgtcom:usedMedium"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    conusType: code("./bhrgtcom:conusType"),
    liquidLimit: measure("./bhrgtcom:liquidLimit"),
    plasticLimit: measure("./bhrgtcom:plasticLimit"),
    plasticityIndex: measure("./bhrgtcom:plasticityIndex"),
    plasticityAtSpecificWaterContent: array({
      each: "./bhrgtcom:plasticityAtSpecificWaterContent",
      item: object({
        fields: {
          waterContent: { ...measure("./bhrgtcom:waterContent"), ...REQUIRED },
          numberOfFalls: intOr0("./bhrgtcom:numberOfFalls"),
          penetrationDepth: measure("./bhrgtcom:penetrationDepth"),
        },
      }),
    }),
  },
});

const SATURATION_AT_COMPRESSION = object({
  fields: {
    porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
    usedMedium: code("./bhrgtcom:usedMedium"),
    backPressure: measure("./bhrgtcom:backPressure"),
    constantHeight: boolean("./bhrgtcom:constantHeight"),
    specimenHeightAfterwards: measure("./bhrgtcom:specimenHeightAfterwards"),
    disturbanceInduced: boolean("./bhrgtcom:disturbanceInduced"),
    maximumStressDifference: measure("./bhrgtcom:maximumStressDifference"),
    maximumStrain: measure("./bhrgtcom:maximumStrain"),
  },
});

const SETTLEMENT_STEP = object({
  fields: {
    stepNumber: intOr0("./bhrgtcom:stepNumber"),
    wetPerformed: boolean("./bhrgtcom:wetPerformed"),
    swellObserved: boolean("./bhrgtcom:swellObserved"),
    strainPoint24hours: measure("./bhrgtcom:strainPoint24hours"),
    stepType: code("./bhrgtcom:stepType"),
    verticalStress: measure("./bhrgtcom:verticalStress"),
    deformationRate: measure("./bhrgtcom:deformationRate"),
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
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    ringDiameter: measure("./bhrgtcom:ringDiameter"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    filterPaperUsed: boolean("./bhrgtcom:filterPaperUsed"),
    temperature: measure("./bhrgtcom:temperature"),
    wallFrictionCorrectionMethod: code("./bhrgtcom:wallFrictionCorrectionMethod"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean("./bhrgtcom:bearingFrictionCorrectionApplied"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    irregularResult: boolean("./bhrgtcom:irregularResult"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    saturationStageAtCompression: optional(
      SATURATION_AT_COMPRESSION,
      "./bhrgtcom:saturationStageAtCompression",
    ),
    determinationSteps: array({ each: "./bhrgtcom:determinationStep", item: SETTLEMENT_STEP }),
  },
});

const PERMEABILITY = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    specimenMade: boolean("./bhrgtcom:specimenMade"),
    makingMethod: code("./bhrgtcom:makingMethod"),
    saturatedWithCO2: boolean("./bhrgtcom:saturatedWithCO2"),
    verticallyDetermined: boolean("./bhrgtcom:verticallyDetermined"),
    porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
    currentDownwards: boolean("./bhrgtcom:currentDownwards"),
    usedMedium: code("./bhrgtcom:usedMedium"),
    waterDegassed: boolean("./bhrgtcom:waterDegassed"),
    temperature: measure("./bhrgtcom:temperature"),
    swellObserved: boolean("./bhrgtcom:swellObserved"),
    maximumGradient: measure("./bhrgtcom:maximumGradient"),
    ringWaterRepellent: boolean("./bhrgtcom:ringWaterRepellent"),
    waterContentAfterwards: measure("./bhrgtcom:waterContentAfterwards"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    saturatedPermeabilityAtSpecificDensity: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificDensity",
      item: object({
        fields: {
          dryVolumetricMassDensity: measure("./bhrgtcom:dryVolumetricMassDensity"),
          saturatedPermeability: measure("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
    saturatedPermeabilityAtSpecificLoad: array({
      each: "./bhrgtcom:saturatedPermeabilityAtSpecificLoad",
      item: object({
        fields: {
          load: measure("./bhrgtcom:load"),
          saturatedPermeability: measure("./bhrgtcom:saturatedPermeability"),
        },
      }),
    }),
  },
});

// === Shear determinations (repeatable; wrapper holds a PascalCase inner) ===

const SHEAR_LOADING_DET = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean("./bhrgtcom:specimenDisturbed"),
    specimenTrimmed: boolean("./bhrgtcom:specimenTrimmed"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    beginDiameter: measure("./bhrgtcom:beginDiameter"),
    beginHeight: measure("./bhrgtcom:beginHeight"),
    topCapTiltable: boolean("./bhrgtcom:topCapTiltable"),
    filterPaperUsed: boolean("./bhrgtcom:filterPaperUsed"),
    drainageStripsUsed: boolean("./bhrgtcom:drainageStripsUsed"),
    membraneSaturatedBefore: boolean("./bhrgtcom:membraneSaturatedBefore"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    cellDeformationApplied: boolean("./bhrgtcom:cellDeformationApplied"),
    stopCriterion: code("./bhrgtcom:stopCriterion"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    membraneCorrection: optional(
      object({
        fields: {
          correctionMethod: code("./bhrgtcom:correctionMethod"),
          thickness: measure("./bhrgtcom:thickness"),
          stiffnessClass: code("./bhrgtcom:stiffnessClass"),
        },
      }),
      "./bhrgtcom:membraneCorrection",
    ),
    drainageStripCorrection: optional(
      object({
        fields: {
          correctionMethod: code("./bhrgtcom:correctionMethod"),
          orientation: code("./bhrgtcom:orientation"),
          coverage: code("./bhrgtcom:coverage"),
        },
      }),
      "./bhrgtcom:drainageStripCorrection",
    ),
    madeSpecimenForLoading: optional(
      object({
        fields: {
          makingMethod: code("./bhrgtcom:makingMethod"),
          waterContent: measure("./bhrgtcom:waterContent"),
          volumetricMassDensity: measure("./bhrgtcom:volumetricMassDensity"),
          dryVolumetricMassDensity: measure("./bhrgtcom:dryVolumetricMassDensity"),
        },
      }),
      "./bhrgtcom:madeSpecimenForLoading",
    ),
    saturationStageAtLoading: optional(
      object({
        fields: {
          porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
          porousDiscRough: boolean("./bhrgtcom:porousDiscRough"),
          usedMedium: code("./bhrgtcom:usedMedium"),
          constantHeight: boolean("./bhrgtcom:constantHeight"),
          cellPressureAutomaticallyControlled: boolean(
            "./bhrgtcom:cellPressureAutomaticallyControlled",
          ),
          backPressure: measure("./bhrgtcom:backPressure"),
          effectivePressure: measure("./bhrgtcom:effectivePressure"),
          skemptonBCoefficient: measure("./bhrgtcom:skemptonB_Coefficient"),
          verticalStrain: measure("./bhrgtcom:verticalStrain"),
          disturbanceInduced: boolean("./bhrgtcom:disturbanceInduced"),
          stressDifference: measure("./bhrgtcom:stressDifference"),
        },
      }),
      "./bhrgtcom:saturationStageAtLoading",
    ),
    consolidationStageAtLoading: optional(
      object({
        fields: {
          drainageTwoSided: boolean("./bhrgtcom:drainageTwoSided"),
          consolidationMethod: code("./bhrgtcom:consolidationMethod"),
          verticalConsolidationStress: measure("./bhrgtcom:verticalConsolidationStress"),
          horizontalConsolidationStress: measure("./bhrgtcom:horizontalConsolidationStress"),
          verticalStrain: measure("./bhrgtcom:verticalStrain"),
          lateralEarthPressureCoefficient: measure("./bhrgtcom:lateralEarthPressureCoefficient"),
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
          deformationRate: measure("./bhrgtcom:deformationRate"),
          specimenShape: code("./bhrgtcom:specimenShape"),
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
    verticalStress: measure("./bhrgtcom:verticalStress"),
    heightChangeDuringConsolidation: columns(
      "./bhrgtcom:heightChangeDuringConsolidation/bhrgtcom:values",
      TIME_HEIGHT,
    ),
  },
});

const SHEAR_HORIZONTAL_DET = object({
  fields: {
    determinationProcedure: code("./bhrgtcom:determinationProcedure"),
    determinationMethod: code("./bhrgtcom:determinationMethod"),
    specimenDisturbed: boolean("./bhrgtcom:specimenDisturbed"),
    sampleMoistness: code("./bhrgtcom:sampleMoistness"),
    specimenWaterSaturated: boolean("./bhrgtcom:specimenWaterSaturated"),
    porousDiscWet: boolean("./bhrgtcom:porousDiscWet"),
    drained: boolean("./bhrgtcom:drained"),
    lateralSupport: code("./bhrgtcom:lateralSupport"),
    beginDiameter: measure("./bhrgtcom:beginDiameter"),
    beginHeight: measure("./bhrgtcom:beginHeight"),
    stopCriterion: code("./bhrgtcom:stopCriterion"),
    performanceIrregularity: codeList("./bhrgtcom:performanceIrregularity"),
    materialIrregularity: codeList("./bhrgtcom:materialIrregularity"),
    membraneCorrectionApplied: boolean("./bhrgtcom:membraneCorrectionApplied"),
    apparatusDeformationApplied: boolean("./bhrgtcom:apparatusDeformationApplied"),
    bearingFrictionCorrectionApplied: boolean("./bhrgtcom:bearingFrictionCorrectionApplied"),
    madeSpecimenForHorizontalDeformation: optional(
      object({
        fields: {
          makingMethod: code("./bhrgtcom:makingMethod"),
          waterContent: measure("./bhrgtcom:waterContent"),
          volumetricMassDensity: measure("./bhrgtcom:volumetricMassDensity"),
        },
      }),
      "./bhrgtcom:madeSpecimenForHorizontalDeformation",
    ),
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
          deformationRate: measure("./bhrgtcom:deformationRate"),
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
    beginDepth: measure("./bhrgtcom:beginDepth"),
    endDepth: measure("./bhrgtcom:endDepth"),
    sampleQuality: code("./bhrgtcom:sampleQuality"),
    analysisType: code("./bhrgtcom:analysisType"),
    waterContentDetermined: boolean("./bhrgtcom:waterContentDetermined"),
    organicMatterContentDetermined: boolean("./bhrgtcom:organicMatterContentDetermined"),
    carbonateContentDetermined: boolean("./bhrgtcom:carbonateContentDetermined"),
    volumetricMassDensityDetermined: boolean("./bhrgtcom:volumetricMassDensityDetermined"),
    volumetricMassDensitySolidsDetermined: boolean(
      "./bhrgtcom:volumetricMassDensitySolidsDetermined",
    ),
    described: boolean("./bhrgtcom:described"),
    investigatedMaterial: object({
      at: "./bhrgtcom:investigatedMaterial",
      fields: {
        specialMaterial: code("./bhrgtcom:specialMaterial"),
        geotechnicalSoilName: code("./bhrgtcom:geotechnicalSoilName"),
        tertiaryConstituent: codeList("./bhrgtcom:tertiaryConstituent"),
        colour: code("./bhrgtcom:colour"),
        carbonateContentClass: code("./bhrgtcom:carbonateContentClass"),
        organicMatterContentClass: code("./bhrgtcom:organicMatterContentClass"),
        gravelMedianClass: code("./bhrgtcom:gravelMedianClass"),
        sandMedianClass: code("./bhrgtcom:sandMedianClass"),
      },
    }),

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
    analysisProcedure: code("./bhrgtcom:analysisProcedure"),
    analysisOperator: object({
      at: "./bhrgtcom:analysisOperator",
      fields: {
        chamberOfCommerceNumber: text("./brocom:chamberOfCommerceNumber"),
        europeanCompanyRegistrationNumber: text("./brocom:europeanCompanyRegistrationNumber"),
      },
    }),
    investigatedInterval: array({
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
export type SpecimenMadeForHorizontalDeformation = NonNullable<
  ShearStressChangeDuringHorizontalDeformationDetermination["madeSpecimenForHorizontalDeformation"]
>;
/** The field description of the investigated material (coded classes). @internal */
export type InvestigatedMaterial = NonNullable<InvestigatedInterval["investigatedMaterial"]>;
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
