/**
 * Reference code tables indexed by their full BRO domain URI.
 *
 * The URI is exactly the value a coded element carries in its `codeSpace`
 * attribute, so `describe(coded)` is a direct two-step lookup with no
 * field-name guessing — the crosswalk this replaces.
 *
 * @generated
 */

import { BHRG_BACKFILL_MATERIAL_CODES } from "./bhrg-backfill-material.js";
import { BHRG_CURRENT_PROCESS_CODES } from "./bhrg-current-process.js";
import { BHRG_ANALYSIS_PROCEDURE_CODES } from "./bhrg-analysis-procedure.js";
import { BHRG_SAMPLER_TYPE_CODES } from "./bhrg-sampler-type.js";
import { BHRG_ARCHIVE_CLASS_CODES } from "./bhrg-archive-class.js";
import { BHRG_RELATIVE_ABUNDANCE_CLASS_CODES } from "./bhrg-relative-abundance-class.js";
import { BHRG_MOTTLING_DENSITY_CODES } from "./bhrg-mottling-density.js";
import { BHRG_SAMPLING_QUALITY_CODES } from "./bhrg-sampling-quality.js";
import { BHRG_SAMPLING_METHOD_CODES } from "./bhrg-sampling-method.js";
import { BHRG_SAMPLING_PROCEDURE_CODES } from "./bhrg-sampling-procedure.js";
import { BHRG_DETERMINED_HYDROPHYSICAL_PROPERTIES_CODES } from "./bhrg-determined-hydrophysical-properties.js";
import { BHRG_DETERMINED_COMPOSITION_PROPERTIES_CODES } from "./bhrg-determined-composition-properties.js";
import { BHRG_DETERMINATION_METHOD_CODES } from "./bhrg-determination-method.js";
import { BHRG_DETERMINATION_PROCEDURE_CODES } from "./bhrg-determination-procedure.js";
import { BHRG_DESCRIBED_MATERIAL_CODES } from "./bhrg-described-material.js";
import { BHRG_DESCRIPTION_QUALITY_CODES } from "./bhrg-description-quality.js";
import { BHRG_DESCRIPTION_LOCATION_CODES } from "./bhrg-description-location.js";
import { BHRG_DESCRIPTION_PROCEDURE_CODES } from "./bhrg-description-procedure.js";
import { BHRG_MATERIAL_IRREGULARITY_CODES } from "./bhrg-material-irregularity.js";
import { BHRG_PERFORMANCE_IRREGULARITY_CODES } from "./bhrg-performance-irregularity.js";
import { BHRG_SPECIAL_MATERIAL_CODES } from "./bhrg-special-material.js";
import { BHRG_SOIL_USE_CODES } from "./bhrg-soil-use.js";
import { BHRG_VARIEGATION_CODES } from "./bhrg-variegation.js";
import { BHRG_BORING_PROCEDURE_CODES } from "./bhrg-boring-procedure.js";
import { BHRG_BORING_TECHNIQUE_CODES } from "./bhrg-boring-technique.js";
import { BHRG_CASING_MATERIAL_CODES } from "./bhrg-casing-material.js";
import { BHRG_FINE_SOIL_CONSISTENCY_CODES } from "./bhrg-fine-soil-consistency.js";
import { BHRG_ORGANIC_SOIL_CONSISTENCY_CODES } from "./bhrg-organic-soil-consistency.js";
import { BHRG_CORRECTION_REASON_CODES } from "./bhrg-correction-reason.js";
import { BHRG_DISPERSION_METHOD_CODES } from "./bhrg-dispersion-method.js";
import { BHRG_DRYING_TEMPERATURE_CODES } from "./bhrg-drying-temperature.js";
import { BHRG_DRYING_PERIOD_CODES } from "./bhrg-drying-period.js";
import { BHRG_FRACTION_DISTRIBUTION_LAB_CODES } from "./bhrg-fraction-distribution-lab.js";
import { BHRG_USED_MEDIUM_CODES } from "./bhrg-used-medium.js";
import { BHRG_GEOLOGICAL_ORIGIN_CODES } from "./bhrg-geological-origin.js";
import { BHRG_GEOLOGICAL_SOIL_NAME_CODES } from "./bhrg-geological-soil-name.js";
import { BHRG_GEOTECHNICAL_SOIL_NAME_CODES } from "./bhrg-geotechnical-soil-name.js";
import { BHRG_MICA_CONTENT_CLASS_CODES } from "./bhrg-mica-content-class.js";
import { BHRG_BOUNDARY_POSITIONING_METHOD_CODES } from "./bhrg-boundary-positioning-method.js";
import { BHRG_GRAVEL_CONTENT_CLASS_CODES } from "./bhrg-gravel-content-class.js";
import { BHRG_GRAVEL_CONTENT_CLASS_TO50_CODES } from "./bhrg-gravel-content-class-to50.js";
import { BHRG_GRAVEL_PROVENANCE_CODES } from "./bhrg-gravel-provenance.js";
import { BHRG_GRAVEL_MEDIAN_CLASS_CODES } from "./bhrg-gravel-median-class.js";
import { BHRG_SOIL_NAME_BERENDSEN_STOUTHAMER_CODES } from "./bhrg-soil-name-berendsen-stouthamer.js";
import { BHRG_SOIL_NAME_NEN5104_CODES } from "./bhrg-soil-name-nen5104.js";
import { BHRG_CHUNK_SIZE_CLASS_CODES } from "./bhrg-chunk-size-class.js";
import { BHRG_CALCULATION_VALUE_ORIGIN_CODES } from "./bhrg-calculation-value-origin.js";
import { BHRG_ANGULARITY_CODES } from "./bhrg-angularity.js";
import { BHRG_HORIZON_CODE_CODES } from "./bhrg-horizon-code.js";
import { BHRG_UTENSIL_CODES } from "./bhrg-utensil.js";
import { BHRG_HYDROLOGICAL_SETTING_CODES } from "./bhrg-hydrological-setting.js";
import { BHRG_SAMPLE_CONTAINER_VOLUME_CODES } from "./bhrg-sample-container-volume.js";
import { BHRG_DELIVERY_CONTEXT_CODES } from "./bhrg-delivery-context.js";
import { BHRG_SURVEY_PURPOSE_CODES } from "./bhrg-survey-purpose.js";
import { BHRG_SURVEY_PROCEDURE_CODES } from "./bhrg-survey-procedure.js";
import { BHRG_CARBONATE_CONTENT_CLASS_CODES } from "./bhrg-carbonate-content-class.js";
import { BHRG_COLOUR_CODES } from "./bhrg-colour.js";
import { BHRG_GRAIN_COLOUR_CODES } from "./bhrg-grain-colour.js";
import { BHRG_DESCRIBED_SAMPLES_QUALITY_CODES } from "./bhrg-described-samples-quality.js";
import { BHRG_LAYER_PROPORTION_CLASS_CODES } from "./bhrg-layer-proportion-class.js";
import { BHRG_STRATUM_THICKNESS_CLASS_CODES } from "./bhrg-stratum-thickness-class.js";
import { BHRG_LANDSCAPE_ELEMENT_CODES } from "./bhrg-landscape-element.js";
import { BHRG_POSITION_ON_GROUND_BODY_CODES } from "./bhrg-position-on-ground-body.js";
import { BHRG_LOCAL_VERTICAL_REFERENCE_POINT_CODES } from "./bhrg-local-vertical-reference-point.js";
import { BHRG_MASS_PERCENTAGE_CLASS_CODES } from "./bhrg-mass-percentage-class.js";
import { BHRG_WEATHERING_DEGREE_CODES } from "./bhrg-weathering-degree.js";
import { BHRG_HUMAN_TRACE_CODES } from "./bhrg-human-trace.js";
import { BHRG_HORIZONTAL_POSITIONING_METHOD_CODES } from "./bhrg-horizontal-positioning-method.js";
import { BHRG_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES } from "./bhrg-fluid-mud-layer-positioning-method.js";
import { BHRG_VERTICAL_POSITIONING_METHOD_CODES } from "./bhrg-vertical-positioning-method.js";
import { BHRG_SAMPLE_QUALITY_CODES } from "./bhrg-sample-quality.js";
import { BHRG_SAMPLE_MOISTNESS_CODES } from "./bhrg-sample-moistness.js";
import { BHRG_MUNSELL_HUE_CODES } from "./bhrg-munsell-hue.js";
import { BHRG_MUNSELL_VALUE_CODES } from "./bhrg-munsell-value.js";
import { BHRG_MUNSELL_CHROMA_CODES } from "./bhrg-munsell-chroma.js";
import { BHRG_EVENT_NAME_CODES } from "./bhrg-event-name.js";
import { BHRG_ORGANIC_MATTER_CONTENT_CLASS_CODES } from "./bhrg-organic-matter-content-class.js";
import { BHRG_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES } from "./bhrg-organic-matter-content-class-nen5104.js";
import { BHRG_NO_DESCRIPTION_REASON_CODES } from "./bhrg-no-description-reason.js";
import { BHRG_SEDIMENTARY_PHENOMENON_CODES } from "./bhrg-sedimentary-phenomenon.js";
import { BHRG_SPHERICITY_CODES } from "./bhrg-sphericity.js";
import { BHRG_ARCHEOLOGICAL_CONSTITUENT_TYPE_CODES } from "./bhrg-archeological-constituent-type.js";
import { BHRG_PARTICULAR_CONSTITUENT_TYPE_CODES } from "./bhrg-particular-constituent-type.js";
import { BHRG_ANIMAL_FOSSIL_TYPE_CODES } from "./bhrg-animal-fossil-type.js";
import { BHRG_ROCK_TYPE_CODES } from "./bhrg-rock-type.js";
import { BHRG_GRAVEL_TYPE_CODES } from "./bhrg-gravel-type.js";
import { BHRG_SOIL_TYPE_CODES } from "./bhrg-soil-type.js";
import { BHRG_PLANT_REMAIN_TYPE_CODES } from "./bhrg-plant-remain-type.js";
import { BHRG_SHELL_TAXON_CODES } from "./bhrg-shell-taxon.js";
import { BHRG_PEAT_TYPE_CODES } from "./bhrg-peat-type.js";
import { BHRG_FLUSHING_ADDITIVE_CODES } from "./bhrg-flushing-additive.js";
import { BHRG_STOP_CRITERION_FIELD_CODES } from "./bhrg-stop-criterion-field.js";
import { BHRG_STRUCTURE_CODES } from "./bhrg-structure.js";
import { BHRGT_BACKFILL_MATERIAL_CODES } from "./bhrgt-backfill-material.js";
import { BHRGT_DEPOSITIONAL_CHARACTERISTIC_CODES } from "./bhrgt-depositional-characteristic.js";
import { BHRGT_ANALYSIS_PROCEDURE_CODES } from "./bhrgt-analysis-procedure.js";
import { BHRGT_SAMPLER_TYPE_CODES } from "./bhrgt-sampler-type.js";
import { BHRGT_DRAINAGE_STRIP_COVERAGE_CODES } from "./bhrgt-drainage-strip-coverage.js";
import { BHRGT_SAMPLING_QUALITY_CODES } from "./bhrgt-sampling-quality.js";
import { BHRGT_SAMPLING_METHOD_CODES } from "./bhrgt-sampling-method.js";
import { BHRGT_SAMPLING_PROCEDURE_CODES } from "./bhrgt-sampling-procedure.js";
import { BHRGT_DETERMINED_PROPERTIES_CODES } from "./bhrgt-determined-properties.js";
import { BHRGT_DETERMINATION_DIAMETER_CODES } from "./bhrgt-determination-diameter.js";
import { BHRGT_DETERMINATION_METHOD_CODES } from "./bhrgt-determination-method.js";
import { BHRGT_EQUIVALENT_MASS_DETERMINATION_METHOD_CODES } from "./bhrgt-equivalent-mass-determination-method.js";
import { BHRGT_DETERMINATION_PROCEDURE_CODES } from "./bhrgt-determination-procedure.js";
import { BHRGT_DESCRIBED_MATERIAL_CODES } from "./bhrgt-described-material.js";
import { BHRGT_DESCRIPTION_QUALITY_CODES } from "./bhrgt-description-quality.js";
import { BHRGT_DESCRIPTION_LOCATION_CODES } from "./bhrgt-description-location.js";
import { BHRGT_DESCRIPTION_PROCEDURE_CODES } from "./bhrgt-description-procedure.js";
import { BHRGT_TERTIARY_CONSTITUENT_CODES } from "./bhrgt-tertiary-constituent.js";
import { BHRGT_TERTIARY_ROCK_CONSTITUENT_CODES } from "./bhrgt-tertiary-rock-constituent.js";
import { BHRGT_MATERIAL_IRREGULARITY_CODES } from "./bhrgt-material-irregularity.js";
import { BHRGT_PERFORMANCE_IRREGULARITY_CODES } from "./bhrgt-performance-irregularity.js";
import { BHRGT_SPECIAL_MATERIAL_CODES } from "./bhrgt-special-material.js";
import { BHRGT_SOIL_USE_CODES } from "./bhrgt-soil-use.js";
import { BHRGT_BORING_PROCEDURE_CODES } from "./bhrgt-boring-procedure.js";
import { BHRGT_BORING_TECHNIQUE_CODES } from "./bhrgt-boring-technique.js";
import { BHRGT_APERTURE_CLASS_CODES } from "./bhrgt-aperture-class.js";
import { BHRGT_APERTURE_CLASS_DISCONTINUITY_CODES } from "./bhrgt-aperture-class-discontinuity.js";
import { BHRGT_CASING_MATERIAL_CODES } from "./bhrgt-casing-material.js";
import { BHRGT_FINE_SOIL_CONSISTENCY_CODES } from "./bhrgt-fine-soil-consistency.js";
import { BHRGT_ORGANIC_SOIL_CONSISTENCY_CODES } from "./bhrgt-organic-soil-consistency.js";
import { BHRGT_CONSOLIDATION_METHOD_CODES } from "./bhrgt-consolidation-method.js";
import { BHRGT_CONUS_TYPE_CODES } from "./bhrgt-conus-type.js";
import { BHRGT_CORRECTION_METHOD_CODES } from "./bhrgt-correction-method.js";
import { BHRGT_CORRECTION_REASON_CODES } from "./bhrgt-correction-reason.js";
import { BHRGT_DISINTEGRATION_CODES } from "./bhrgt-disintegration.js";
import { BHRGT_DISPERSED_INHOMOGENEITY_CODES } from "./bhrgt-dispersed-inhomogeneity.js";
import { BHRGT_DISPERSION_METHOD_CODES } from "./bhrgt-dispersion-method.js";
import { BHRGT_DRYING_TEMPERATURE_CODES } from "./bhrgt-drying-temperature.js";
import { BHRGT_DRYING_PERIOD_CODES } from "./bhrgt-drying-period.js";
import { BHRG_ORGANIC_SOIL_TEXTURE_CODES } from "./bhrg-organic-soil-texture.js";
import { BHRGT_FINE_GRAVEL_CONTENT_CLASS_CODES } from "./bhrgt-fine-gravel-content-class.js";
import { BHRGT_FRACTION_DISTRIBUTION_CODES } from "./bhrgt-fraction-distribution.js";
import { BHRGT_USED_MEDIUM_CODES } from "./bhrgt-used-medium.js";
import { BHRGT_INTERBEDDING_CODES } from "./bhrgt-interbedding.js";
import { BHRGT_BEDDING_CODES } from "./bhrgt-bedding.js";
import { BHRGT_GEOTECHNICAL_DEPOSITIONAL_CHARACTERISTIC_CODES } from "./bhrgt-geotechnical-depositional-characteristic.js";
import { BHRGT_GEOTECHNICAL_SOIL_NAME_CODES } from "./bhrgt-geotechnical-soil-name.js";
import { BHRGT_BOUNDARY_POSITIONING_METHOD_CODES } from "./bhrgt-boundary-positioning-method.js";
import { BHRGT_GRAVEL_CONTENT_CLASS_CODES } from "./bhrgt-gravel-content-class.js";
import { BHRGT_GRAVEL_CONTENT_CLASS_NEN5104_CODES } from "./bhrgt-gravel-content-class-nen5104.js";
import { BHRGT_GRAVEL_MEDIAN_CLASS_CODES } from "./bhrgt-gravel-median-class.js";
import { BHRGT_SOIL_NAME_NEN5104_CODES } from "./bhrgt-soil-name-nen5104.js";
import { BHRGT_SIZE_FRACTION_CODES } from "./bhrgt-size-fraction.js";
import { BHRGT_CALCULATION_VALUE_SOURCE_CODES } from "./bhrgt-calculation-value-source.js";
import { BHRGT_ANGULARITY_CODES } from "./bhrgt-angularity.js";
import { BHRGT_VOID_DISTRIBUTION_CODES } from "./bhrgt-void-distribution.js";
import { BHRG_TEMPORARY_CHANGE_CODES } from "./bhrg-temporary-change.js";
import { BHRGT_SAMPLE_CONTAINER_VOLUME_CODES } from "./bhrgt-sample-container-volume.js";
import { BHRGT_DELIVERY_CONTEXT_CODES } from "./bhrgt-delivery-context.js";
import { BHRGT_SURVEY_PURPOSE_CODES } from "./bhrgt-survey-purpose.js";
import { BHRGT_SURVEY_PROCEDURE_CODES } from "./bhrgt-survey-procedure.js";
import { BHRGT_CARBONATE_CONTENT_CLASS_CODES } from "./bhrgt-carbonate-content-class.js";
import { BHRGT_COLOUR_CODES } from "./bhrgt-colour.js";
import { BHRGT_POSITION_ON_GROUND_BODY_CODES } from "./bhrgt-position-on-ground-body.js";
import { BHRGT_LOCAL_VERTICAL_REFERENCE_POINT_CODES } from "./bhrgt-local-vertical-reference-point.js";
import { BHRGT_MAKING_METHOD_CODES } from "./bhrgt-making-method.js";
import { BHRGT_MASS_PERCENTAGE_CLASS_CODES } from "./bhrgt-mass-percentage-class.js";
import { BHRGT_MEDIUM_COARSE_GRAVEL_CONTENT_CLASS_CODES } from "./bhrgt-medium-coarse-gravel-content-class.js";
import { BHRGT_HORIZONTAL_POSITIONING_METHOD_CODES } from "./bhrgt-horizontal-positioning-method.js";
import { BHRGT_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES } from "./bhrgt-fluid-mud-layer-positioning-method.js";
import { BHRGT_VERTICAL_POSITIONING_METHOD_CODES } from "./bhrgt-vertical-positioning-method.js";
import { BHRGT_SAMPLE_QUALITY_CODES } from "./bhrgt-sample-quality.js";
import { BHRGT_SAMPLE_MOISTNESS_CODES } from "./bhrgt-sample-moistness.js";
import { BHRGT_EVENT_NAME_CODES } from "./bhrgt-event-name.js";
import { BHRG_APPLIED_OPTICAL_MODEL_CODES } from "./bhrg-applied-optical-model.js";
import { BHRGT_DECOMPOSITION_CODES } from "./bhrgt-decomposition.js";
import { BHRGT_INFILL_MATERIAL_CODES } from "./bhrgt-infill-material.js";
import { BHRGT_ORGANIC_MATTER_CONTENT_CLASS_CODES } from "./bhrgt-organic-matter-content-class.js";
import { BHRGT_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES } from "./bhrgt-organic-matter-content-class-nen5104.js";
import { BHRGT_DEPOSITIONAL_AGE_CODES } from "./bhrgt-depositional-age.js";
import { BHRGT_DRAINAGE_STRIP_ORIENTATION_CODES } from "./bhrgt-drainage-strip-orientation.js";
import { BHRGT_NO_DESCRIPTION_REASON_CODES } from "./bhrgt-no-description-reason.js";
import { BHRGT_RESULT_IRREGULARITY_CODES } from "./bhrgt-result-irregularity.js";
import { BHRGT_RING_DIAMETER_CODES } from "./bhrgt-ring-diameter.js";
import { BHRGT_ROUGHNESS_CODES } from "./bhrgt-roughness.js";
import { BHRGT_SPHERICITY_CODES } from "./bhrgt-sphericity.js";
import { BHRGT_PARTICULAR_CONSTITUENT_TYPE_CODES } from "./bhrgt-particular-constituent-type.js";
import { BHRGT_CEMENT_TYPE_CODES } from "./bhrgt-cement-type.js";
import { BHRGT_ROCK_TYPE_CODES } from "./bhrgt-rock-type.js";
import { BHRGT_PEAT_TYPE_CODES } from "./bhrgt-peat-type.js";
import { BHRGT_FLUSHING_ADDITIVE_CODES } from "./bhrgt-flushing-additive.js";
import { BHRGT_STABILITY_CODES } from "./bhrgt-stability.js";
import { BHRGT_STEP_TYPE_CODES } from "./bhrgt-step-type.js";
import { BHRGT_STRENGTH_CLASS_CODES } from "./bhrgt-strength-class.js";
import { BHRGT_STIFFNESS_CLASS_MEMBRANE_CODES } from "./bhrgt-stiffness-class-membrane.js";
import { BHRGT_STOP_CRITERION_CODES } from "./bhrgt-stop-criterion.js";
import { BHRGT_STOP_CRITERION_DETERMINATION_CODES } from "./bhrgt-stop-criterion-determination.js";
import { BHRGT_STOP_CRITERION_FIELD_CODES } from "./bhrgt-stop-criterion-field.js";
import { BHRGT_ORGANIC_SOIL_TEXTURE_CODES } from "./bhrgt-organic-soil-texture.js";
import { BHRGT_TEMPORARY_CHANGE_CODES } from "./bhrgt-temporary-change.js";
import { BHRGT_USED_OPTICAL_MODEL_CODES } from "./bhrgt-used-optical-model.js";
import { BHRGT_PEAT_TENSILE_STRENGTH_CODES } from "./bhrgt-peat-tensile-strength.js";
import { BHRGT_ANALYSIS_TYPE_CODES } from "./bhrgt-analysis-type.js";
import { BHRGT_DISCONTINUITY_TYPE_CODES } from "./bhrgt-discontinuity-type.js";
import { BHRGT_ACTIVITY_TYPE_CODES } from "./bhrgt-activity-type.js";
import { BHRGT_MIXING_TYPE_CODES } from "./bhrgt-mixing-type.js";
import { BHRGT_DISCIPLINE_CODES } from "./bhrgt-discipline.js";
import { BHRGT_DISCOLOURATION_CODES } from "./bhrgt-discolouration.js";
import { BHRGT_VERTICAL_DATUM_CODES } from "./bhrgt-vertical-datum.js";
import { BHRGT_REMOVED_MATERIAL_CODES } from "./bhrgt-removed-material.js";
import { BHRGT_PRE_TREATMENT_CODES } from "./bhrgt-pre-treatment.js";
import { BHRGT_PREPARATION_CODES } from "./bhrgt-preparation.js";
import { BHRGT_SPECIMEN_SHAPE_CODES } from "./bhrgt-specimen-shape.js";
import { BHRGT_WALL_FRICTION_CORRECTION_METHOD_CODES } from "./bhrgt-wall-friction-correction-method.js";
import { BHRGT_EXCAVATED_MATERIAL_CODES } from "./bhrgt-excavated-material.js";
import { BHRG_DISCONTINUITY_TYPE_CODES } from "./bhrg-discontinuity-type.js";
import { BHRG_ACTIVITY_TYPE_CODES } from "./bhrg-activity-type.js";
import { BHRGT_SAND_MEDIAN_CLASS_CODES } from "./bhrgt-sand-median-class.js";
import { BHRGT_SAND_SORTING_CODES } from "./bhrgt-sand-sorting.js";
import { BHRGT_SAND_SORTING_NEN5104_CODES } from "./bhrgt-sand-sorting-nen5104.js";
import { BHRGT_VERY_COARSE_GRAVEL_CONTENT_CLASS_CODES } from "./bhrgt-very-coarse-gravel-content-class.js";
import { BHRGT_LATERAL_SUPPORT_CODES } from "./bhrgt-lateral-support.js";
import { BHRGT_SALT_CORRECTION_METHOD_CODES } from "./bhrgt-salt-correction-method.js";
import { BHRG_DISCIPLINE_CODES } from "./bhrg-discipline.js";
import { BHRG_VERTICAL_DATUM_CODES } from "./bhrg-vertical-datum.js";
import { BHRG_VERTICAL_TREND_CODES } from "./bhrg-vertical-trend.js";
import { BHRG_REMOVED_MATERIAL_CODES } from "./bhrg-removed-material.js";
import { BHRG_REMOVAL_METHOD_CARBONATE_CODES } from "./bhrg-removal-method-carbonate.js";
import { BHRG_REMOVAL_METHOD_ORGANIC_MATTER_CODES } from "./bhrg-removal-method-organic-matter.js";
import { BHRG_SATURATION_METHOD_CODES } from "./bhrg-saturation-method.js";
import { BHRG_STAIN_COLOUR_CODES } from "./bhrg-stain-colour.js";
import { BHRG_VOLUME_PERCENTAGE_CLASS_CODES } from "./bhrg-volume-percentage-class.js";
import { BHRG_PRE_TREATMENT_CODES } from "./bhrg-pre-treatment.js";
import { BHRG_PREPARATION_CODES } from "./bhrg-preparation.js";
import { BHRG_MATERIAL_SHAPE_CODES } from "./bhrg-material-shape.js";
import { BHRG_EXCAVATED_MATERIAL_CODES } from "./bhrg-excavated-material.js";
import { BHRG_SAND_MEDIAN_CLASS_CODES } from "./bhrg-sand-median-class.js";
import { BHRG_SAND_MEDIAN_CLASS50TO2000_CODES } from "./bhrg-sand-median-class50to2000.js";
import { BHRG_SAND_SORTING_CODES } from "./bhrg-sand-sorting.js";
import { BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_CODES } from "./bhrg-very-coarse-fraction-content-class.js";
import { BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_ARCHIVE_CODES } from "./bhrg-very-coarse-fraction-content-class-archive.js";
import { BHRG_SALT_CORRECTION_METHOD_CODES } from "./bhrg-salt-correction-method.js";
import { BRO_DATE_FORMAT_CODES } from "./bro-date-format.js";
import { BRO_ETRS89TRANSFORMATION_CODES } from "./bro-etrs89transformation.js";
import { BRO_HORIZONTAL_CRS_CODES } from "./bro-horizontal-crs.js";
import { BRO_INDICATION_YES_NO_CODES } from "./bro-indication-yes-no.js";
import { BRO_QUALITY_REGIME_CODES } from "./bro-quality-regime.js";
import { BRO_COORDINATE_TRANSFORMATION_CODES } from "./bro-coordinate-transformation.js";
import { CPT_COORD_TRANSFORMATION_CODES } from "./cpt-coord-transformation.js";
import { CPT_CORRECTION_REASON_CODES } from "./cpt-correction-reason.js";
import { CPT_DELIVERY_CONTEXT_CODES } from "./cpt-delivery-context.js";
import { CPT_HORIZONTAL_CRS_CODES } from "./cpt-horizontal-crs.js";
import { CPT_HORIZONTAL_POSITIONING_METHOD_CODES } from "./cpt-horizontal-positioning-method.js";
import { CPT_LOCAL_VERTICAL_REFERENCE_POINT_CODES } from "./cpt-local-vertical-reference-point.js";
import { CPT_CPT_METHOD_CODES } from "./cpt-cpt-method.js";
import { CPT_QUALITY_CLASS_CODES } from "./cpt-quality-class.js";
import { CPT_REGISTRATION_STATUS_CODES } from "./cpt-registration-status.js";
import { CPT_CPT_STANDARD_CODES } from "./cpt-cpt-standard.js";
import { CPT_STOP_CRITERION_CODES } from "./cpt-stop-criterion.js";
import { CPT_SURVEY_PURPOSE_CODES } from "./cpt-survey-purpose.js";
import { CPT_VERTICAL_DATUM_CODES } from "./cpt-vertical-datum.js";
import { CPT_VERTICAL_POSITIONING_METHOD_CODES } from "./cpt-vertical-positioning-method.js";

export const CODES_BY_DOMAIN: Record<string, Record<string, string>> = {
  "urn:bro:bhrg:BackfillMaterial": BHRG_BACKFILL_MATERIAL_CODES,
  "urn:bro:bhrg:CurrentProcess": BHRG_CURRENT_PROCESS_CODES,
  "urn:bro:bhrg:AnalysisProcedure": BHRG_ANALYSIS_PROCEDURE_CODES,
  "urn:bro:bhrg:SamplerType": BHRG_SAMPLER_TYPE_CODES,
  "urn:bro:bhrg:ArchiveClass": BHRG_ARCHIVE_CLASS_CODES,
  "urn:bro:bhrg:RelativeAbundanceClass": BHRG_RELATIVE_ABUNDANCE_CLASS_CODES,
  "urn:bro:bhrg:MottlingDensity": BHRG_MOTTLING_DENSITY_CODES,
  "urn:bro:bhrg:SamplingQuality": BHRG_SAMPLING_QUALITY_CODES,
  "urn:bro:bhrg:SamplingMethod": BHRG_SAMPLING_METHOD_CODES,
  "urn:bro:bhrg:SamplingProcedure": BHRG_SAMPLING_PROCEDURE_CODES,
  "urn:bro:bhrg:DeterminedHydrophysicalProperties": BHRG_DETERMINED_HYDROPHYSICAL_PROPERTIES_CODES,
  "urn:bro:bhrg:DeterminedCompositionProperties": BHRG_DETERMINED_COMPOSITION_PROPERTIES_CODES,
  "urn:bro:bhrg:DeterminationMethod": BHRG_DETERMINATION_METHOD_CODES,
  "urn:bro:bhrg:DeterminationProcedure": BHRG_DETERMINATION_PROCEDURE_CODES,
  "urn:bro:bhrg:DescribedMaterial": BHRG_DESCRIBED_MATERIAL_CODES,
  "urn:bro:bhrg:DescriptionQuality": BHRG_DESCRIPTION_QUALITY_CODES,
  "urn:bro:bhrg:DescriptionLocation": BHRG_DESCRIPTION_LOCATION_CODES,
  "urn:bro:bhrg:DescriptionProcedure": BHRG_DESCRIPTION_PROCEDURE_CODES,
  "urn:bro:bhrg:MaterialIrregularity": BHRG_MATERIAL_IRREGULARITY_CODES,
  "urn:bro:bhrg:PerformanceIrregularity": BHRG_PERFORMANCE_IRREGULARITY_CODES,
  "urn:bro:bhrg:SpecialMaterial": BHRG_SPECIAL_MATERIAL_CODES,
  "urn:bro:bhrg:SoilUse": BHRG_SOIL_USE_CODES,
  "urn:bro:bhrg:Variegation": BHRG_VARIEGATION_CODES,
  "urn:bro:bhrg:BoringProcedure": BHRG_BORING_PROCEDURE_CODES,
  "urn:bro:bhrg:BoringTechnique": BHRG_BORING_TECHNIQUE_CODES,
  "urn:bro:bhrg:CasingMaterial": BHRG_CASING_MATERIAL_CODES,
  "urn:bro:bhrg:FineSoilConsistency": BHRG_FINE_SOIL_CONSISTENCY_CODES,
  "urn:bro:bhrg:OrganicSoilConsistency": BHRG_ORGANIC_SOIL_CONSISTENCY_CODES,
  "urn:bro:bhrg:CorrectionReason": BHRG_CORRECTION_REASON_CODES,
  "urn:bro:bhrg:DispersionMethod": BHRG_DISPERSION_METHOD_CODES,
  "urn:bro:bhrg:DryingTemperature": BHRG_DRYING_TEMPERATURE_CODES,
  "urn:bro:bhrg:DryingPeriod": BHRG_DRYING_PERIOD_CODES,
  "urn:bro:bhrg:FractionDistributionLab": BHRG_FRACTION_DISTRIBUTION_LAB_CODES,
  "urn:bro:bhrg:UsedMedium": BHRG_USED_MEDIUM_CODES,
  "urn:bro:bhrg:GeologicalOrigin": BHRG_GEOLOGICAL_ORIGIN_CODES,
  "urn:bro:bhrg:GeologicalSoilName": BHRG_GEOLOGICAL_SOIL_NAME_CODES,
  "urn:bro:bhrg:GeotechnicalSoilName": BHRG_GEOTECHNICAL_SOIL_NAME_CODES,
  "urn:bro:bhrg:MicaContentClass": BHRG_MICA_CONTENT_CLASS_CODES,
  "urn:bro:bhrg:BoundaryPositioningMethod": BHRG_BOUNDARY_POSITIONING_METHOD_CODES,
  "urn:bro:bhrg:GravelContentClass": BHRG_GRAVEL_CONTENT_CLASS_CODES,
  "urn:bro:bhrg:GravelContentClassTo50": BHRG_GRAVEL_CONTENT_CLASS_TO50_CODES,
  "urn:bro:bhrg:GravelProvenance": BHRG_GRAVEL_PROVENANCE_CODES,
  "urn:bro:bhrg:GravelMedianClass": BHRG_GRAVEL_MEDIAN_CLASS_CODES,
  "urn:bro:bhrg:SoilNameBerendsenStouthamer": BHRG_SOIL_NAME_BERENDSEN_STOUTHAMER_CODES,
  "urn:bro:bhrg:SoilNameNEN5104": BHRG_SOIL_NAME_NEN5104_CODES,
  "urn:bro:bhrg:ChunkSizeClass": BHRG_CHUNK_SIZE_CLASS_CODES,
  "urn:bro:bhrg:CalculationValueOrigin": BHRG_CALCULATION_VALUE_ORIGIN_CODES,
  "urn:bro:bhrg:Angularity": BHRG_ANGULARITY_CODES,
  "urn:bro:bhrg:HorizonCode": BHRG_HORIZON_CODE_CODES,
  "urn:bro:bhrg:Utensil": BHRG_UTENSIL_CODES,
  "urn:bro:bhrg:HydrologicalSetting": BHRG_HYDROLOGICAL_SETTING_CODES,
  "urn:bro:bhrg:SampleContainerVolume": BHRG_SAMPLE_CONTAINER_VOLUME_CODES,
  "urn:bro:bhrg:DeliveryContext": BHRG_DELIVERY_CONTEXT_CODES,
  "urn:bro:bhrg:SurveyPurpose": BHRG_SURVEY_PURPOSE_CODES,
  "urn:bro:bhrg:SurveyProcedure": BHRG_SURVEY_PROCEDURE_CODES,
  "urn:bro:bhrg:CarbonateContentClass": BHRG_CARBONATE_CONTENT_CLASS_CODES,
  "urn:bro:bhrg:Colour": BHRG_COLOUR_CODES,
  "urn:bro:bhrg:GrainColour": BHRG_GRAIN_COLOUR_CODES,
  "urn:bro:bhrg:DescribedSamplesQuality": BHRG_DESCRIBED_SAMPLES_QUALITY_CODES,
  "urn:bro:bhrg:LayerProportionClass": BHRG_LAYER_PROPORTION_CLASS_CODES,
  "urn:bro:bhrg:StratumThicknessClass": BHRG_STRATUM_THICKNESS_CLASS_CODES,
  "urn:bro:bhrg:LandscapeElement": BHRG_LANDSCAPE_ELEMENT_CODES,
  "urn:bro:bhrg:PositionOnGroundBody": BHRG_POSITION_ON_GROUND_BODY_CODES,
  "urn:bro:bhrg:LocalVerticalReferencePoint": BHRG_LOCAL_VERTICAL_REFERENCE_POINT_CODES,
  "urn:bro:bhrg:MassPercentageClass": BHRG_MASS_PERCENTAGE_CLASS_CODES,
  "urn:bro:bhrg:WeatheringDegree": BHRG_WEATHERING_DEGREE_CODES,
  "urn:bro:bhrg:HumanTrace": BHRG_HUMAN_TRACE_CODES,
  "urn:bro:bhrg:HorizontalPositioningMethod": BHRG_HORIZONTAL_POSITIONING_METHOD_CODES,
  "urn:bro:bhrg:FluidMudLayerPositioningMethod": BHRG_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES,
  "urn:bro:bhrg:VerticalPositioningMethod": BHRG_VERTICAL_POSITIONING_METHOD_CODES,
  "urn:bro:bhrg:SampleQuality": BHRG_SAMPLE_QUALITY_CODES,
  "urn:bro:bhrg:SampleMoistness": BHRG_SAMPLE_MOISTNESS_CODES,
  "urn:bro:bhrg:MunsellHue": BHRG_MUNSELL_HUE_CODES,
  "urn:bro:bhrg:MunsellValue": BHRG_MUNSELL_VALUE_CODES,
  "urn:bro:bhrg:MunsellChroma": BHRG_MUNSELL_CHROMA_CODES,
  "urn:bro:bhrg:EventName": BHRG_EVENT_NAME_CODES,
  "urn:bro:bhrg:OrganicMatterContentClass": BHRG_ORGANIC_MATTER_CONTENT_CLASS_CODES,
  "urn:bro:bhrg:OrganicMatterContentClassNEN5104": BHRG_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES,
  "urn:bro:bhrg:NoDescriptionReason": BHRG_NO_DESCRIPTION_REASON_CODES,
  "urn:bro:bhrg:SedimentaryPhenomenon": BHRG_SEDIMENTARY_PHENOMENON_CODES,
  "urn:bro:bhrg:Sphericity": BHRG_SPHERICITY_CODES,
  "urn:bro:bhrg:ArcheologicalConstituentType": BHRG_ARCHEOLOGICAL_CONSTITUENT_TYPE_CODES,
  "urn:bro:bhrg:ParticularConstituentType": BHRG_PARTICULAR_CONSTITUENT_TYPE_CODES,
  "urn:bro:bhrg:AnimalFossilType": BHRG_ANIMAL_FOSSIL_TYPE_CODES,
  "urn:bro:bhrg:RockType": BHRG_ROCK_TYPE_CODES,
  "urn:bro:bhrg:GravelType": BHRG_GRAVEL_TYPE_CODES,
  "urn:bro:bhrg:SoilType": BHRG_SOIL_TYPE_CODES,
  "urn:bro:bhrg:PlantRemainType": BHRG_PLANT_REMAIN_TYPE_CODES,
  "urn:bro:bhrg:ShellTaxon": BHRG_SHELL_TAXON_CODES,
  "urn:bro:bhrg:PeatType": BHRG_PEAT_TYPE_CODES,
  "urn:bro:bhrg:FlushingAdditive": BHRG_FLUSHING_ADDITIVE_CODES,
  "urn:bro:bhrg:StopCriterionField": BHRG_STOP_CRITERION_FIELD_CODES,
  "urn:bro:bhrg:Structure": BHRG_STRUCTURE_CODES,
  "urn:bro:bhrgt:BackfillMaterial": BHRGT_BACKFILL_MATERIAL_CODES,
  "urn:bro:bhrgt:DepositionalCharacteristic": BHRGT_DEPOSITIONAL_CHARACTERISTIC_CODES,
  "urn:bro:bhrgt:AnalysisProcedure": BHRGT_ANALYSIS_PROCEDURE_CODES,
  "urn:bro:bhrgt:SamplerType": BHRGT_SAMPLER_TYPE_CODES,
  "urn:bro:bhrgt:DrainageStripCoverage": BHRGT_DRAINAGE_STRIP_COVERAGE_CODES,
  "urn:bro:bhrgt:SamplingQuality": BHRGT_SAMPLING_QUALITY_CODES,
  "urn:bro:bhrgt:SamplingMethod": BHRGT_SAMPLING_METHOD_CODES,
  "urn:bro:bhrgt:SamplingProcedure": BHRGT_SAMPLING_PROCEDURE_CODES,
  "urn:bro:bhrgt:DeterminedProperties": BHRGT_DETERMINED_PROPERTIES_CODES,
  "urn:bro:bhrgt:DeterminationDiameter": BHRGT_DETERMINATION_DIAMETER_CODES,
  "urn:bro:bhrgt:DeterminationMethod": BHRGT_DETERMINATION_METHOD_CODES,
  "urn:bro:bhrgt:EquivalentMassDeterminationMethod": BHRGT_EQUIVALENT_MASS_DETERMINATION_METHOD_CODES,
  "urn:bro:bhrgt:DeterminationProcedure": BHRGT_DETERMINATION_PROCEDURE_CODES,
  "urn:bro:bhrgt:DescribedMaterial": BHRGT_DESCRIBED_MATERIAL_CODES,
  "urn:bro:bhrgt:DescriptionQuality": BHRGT_DESCRIPTION_QUALITY_CODES,
  "urn:bro:bhrgt:DescriptionLocation": BHRGT_DESCRIPTION_LOCATION_CODES,
  "urn:bro:bhrgt:DescriptionProcedure": BHRGT_DESCRIPTION_PROCEDURE_CODES,
  "urn:bro:bhrgt:TertiaryConstituent": BHRGT_TERTIARY_CONSTITUENT_CODES,
  "urn:bro:bhrgt:TertiaryRockConstituent": BHRGT_TERTIARY_ROCK_CONSTITUENT_CODES,
  "urn:bro:bhrgt:MaterialIrregularity": BHRGT_MATERIAL_IRREGULARITY_CODES,
  "urn:bro:bhrgt:PerformanceIrregularity": BHRGT_PERFORMANCE_IRREGULARITY_CODES,
  "urn:bro:bhrgt:SpecialMaterial": BHRGT_SPECIAL_MATERIAL_CODES,
  "urn:bro:bhrgt:SoilUse": BHRGT_SOIL_USE_CODES,
  "urn:bro:bhrgt:BoringProcedure": BHRGT_BORING_PROCEDURE_CODES,
  "urn:bro:bhrgt:BoringTechnique": BHRGT_BORING_TECHNIQUE_CODES,
  "urn:bro:bhrgt:ApertureClass": BHRGT_APERTURE_CLASS_CODES,
  "urn:bro:bhrgt:ApertureClassDiscontinuity": BHRGT_APERTURE_CLASS_DISCONTINUITY_CODES,
  "urn:bro:bhrgt:CasingMaterial": BHRGT_CASING_MATERIAL_CODES,
  "urn:bro:bhrgt:FineSoilConsistency": BHRGT_FINE_SOIL_CONSISTENCY_CODES,
  "urn:bro:bhrgt:OrganicSoilConsistency": BHRGT_ORGANIC_SOIL_CONSISTENCY_CODES,
  "urn:bro:bhrgt:ConsolidationMethod": BHRGT_CONSOLIDATION_METHOD_CODES,
  "urn:bro:bhrgt:ConusType": BHRGT_CONUS_TYPE_CODES,
  "urn:bro:bhrgt:CorrectionMethod": BHRGT_CORRECTION_METHOD_CODES,
  "urn:bro:bhrgt:CorrectionReason": BHRGT_CORRECTION_REASON_CODES,
  "urn:bro:bhrgt:Disintegration": BHRGT_DISINTEGRATION_CODES,
  "urn:bro:bhrgt:DispersedInhomogeneity": BHRGT_DISPERSED_INHOMOGENEITY_CODES,
  "urn:bro:bhrgt:DispersionMethod": BHRGT_DISPERSION_METHOD_CODES,
  "urn:bro:bhrgt:DryingTemperature": BHRGT_DRYING_TEMPERATURE_CODES,
  "urn:bro:bhrgt:DryingPeriod": BHRGT_DRYING_PERIOD_CODES,
  "urn:bro:bhrg:OrganicSoilTexture": BHRG_ORGANIC_SOIL_TEXTURE_CODES,
  "urn:bro:bhrgt:FineGravelContentClass": BHRGT_FINE_GRAVEL_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:FractionDistribution": BHRGT_FRACTION_DISTRIBUTION_CODES,
  "urn:bro:bhrgt:UsedMedium": BHRGT_USED_MEDIUM_CODES,
  "urn:bro:bhrgt:Interbedding": BHRGT_INTERBEDDING_CODES,
  "urn:bro:bhrgt:Bedding": BHRGT_BEDDING_CODES,
  "urn:bro:bhrgt:GeotechnicalDepositionalCharacteristic": BHRGT_GEOTECHNICAL_DEPOSITIONAL_CHARACTERISTIC_CODES,
  "urn:bro:bhrgt:GeotechnicalSoilName": BHRGT_GEOTECHNICAL_SOIL_NAME_CODES,
  "urn:bro:bhrgt:BoundaryPositioningMethod": BHRGT_BOUNDARY_POSITIONING_METHOD_CODES,
  "urn:bro:bhrgt:GravelContentClass": BHRGT_GRAVEL_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:GravelContentClassNEN5104": BHRGT_GRAVEL_CONTENT_CLASS_NEN5104_CODES,
  "urn:bro:bhrgt:GravelMedianClass": BHRGT_GRAVEL_MEDIAN_CLASS_CODES,
  "urn:bro:bhrgt:SoilNameNEN5104": BHRGT_SOIL_NAME_NEN5104_CODES,
  "urn:bro:bhrgt:SizeFraction": BHRGT_SIZE_FRACTION_CODES,
  "urn:bro:bhrgt:CalculationValueSource": BHRGT_CALCULATION_VALUE_SOURCE_CODES,
  "urn:bro:bhrgt:Angularity": BHRGT_ANGULARITY_CODES,
  "urn:bro:bhrgt:VoidDistribution": BHRGT_VOID_DISTRIBUTION_CODES,
  "urn:bro:bhrg:TemporaryChange": BHRG_TEMPORARY_CHANGE_CODES,
  "urn:bro:bhrgt:SampleContainerVolume": BHRGT_SAMPLE_CONTAINER_VOLUME_CODES,
  "urn:bro:bhrgt:DeliveryContext": BHRGT_DELIVERY_CONTEXT_CODES,
  "urn:bro:bhrgt:SurveyPurpose": BHRGT_SURVEY_PURPOSE_CODES,
  "urn:bro:bhrgt:SurveyProcedure": BHRGT_SURVEY_PROCEDURE_CODES,
  "urn:bro:bhrgt:CarbonateContentClass": BHRGT_CARBONATE_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:Colour": BHRGT_COLOUR_CODES,
  "urn:bro:bhrgt:PositionOnGroundBody": BHRGT_POSITION_ON_GROUND_BODY_CODES,
  "urn:bro:bhrgt:LocalVerticalReferencePoint": BHRGT_LOCAL_VERTICAL_REFERENCE_POINT_CODES,
  "urn:bro:bhrgt:MakingMethod": BHRGT_MAKING_METHOD_CODES,
  "urn:bro:bhrgt:MassPercentageClass": BHRGT_MASS_PERCENTAGE_CLASS_CODES,
  "urn:bro:bhrgt:MediumCoarseGravelContentClass": BHRGT_MEDIUM_COARSE_GRAVEL_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:HorizontalPositioningMethod": BHRGT_HORIZONTAL_POSITIONING_METHOD_CODES,
  "urn:bro:bhrgt:FluidMudLayerPositioningMethod": BHRGT_FLUID_MUD_LAYER_POSITIONING_METHOD_CODES,
  "urn:bro:bhrgt:VerticalPositioningMethod": BHRGT_VERTICAL_POSITIONING_METHOD_CODES,
  "urn:bro:bhrgt:SampleQuality": BHRGT_SAMPLE_QUALITY_CODES,
  "urn:bro:bhrgt:SampleMoistness": BHRGT_SAMPLE_MOISTNESS_CODES,
  "urn:bro:bhrgt:EventName": BHRGT_EVENT_NAME_CODES,
  "urn:bro:bhrg:AppliedOpticalModel": BHRG_APPLIED_OPTICAL_MODEL_CODES,
  "urn:bro:bhrgt:Decomposition": BHRGT_DECOMPOSITION_CODES,
  "urn:bro:bhrgt:InfillMaterial": BHRGT_INFILL_MATERIAL_CODES,
  "urn:bro:bhrgt:OrganicMatterContentClass": BHRGT_ORGANIC_MATTER_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:OrganicMatterContentClassNEN5104": BHRGT_ORGANIC_MATTER_CONTENT_CLASS_NEN5104_CODES,
  "urn:bro:bhrgt:DepositionalAge": BHRGT_DEPOSITIONAL_AGE_CODES,
  "urn:bro:bhrgt:DrainageStripOrientation": BHRGT_DRAINAGE_STRIP_ORIENTATION_CODES,
  "urn:bro:bhrgt:NoDescriptionReason": BHRGT_NO_DESCRIPTION_REASON_CODES,
  "urn:bro:bhrgt:ResultIrregularity": BHRGT_RESULT_IRREGULARITY_CODES,
  "urn:bro:bhrgt:RingDiameter": BHRGT_RING_DIAMETER_CODES,
  "urn:bro:bhrgt:Roughness": BHRGT_ROUGHNESS_CODES,
  "urn:bro:bhrgt:Sphericity": BHRGT_SPHERICITY_CODES,
  "urn:bro:bhrgt:ParticularConstituentType": BHRGT_PARTICULAR_CONSTITUENT_TYPE_CODES,
  "urn:bro:bhrgt:CementType": BHRGT_CEMENT_TYPE_CODES,
  "urn:bro:bhrgt:RockType": BHRGT_ROCK_TYPE_CODES,
  "urn:bro:bhrgt:PeatType": BHRGT_PEAT_TYPE_CODES,
  "urn:bro:bhrgt:FlushingAdditive": BHRGT_FLUSHING_ADDITIVE_CODES,
  "urn:bro:bhrgt:Stability": BHRGT_STABILITY_CODES,
  "urn:bro:bhrgt:StepType": BHRGT_STEP_TYPE_CODES,
  "urn:bro:bhrgt:StrengthClass": BHRGT_STRENGTH_CLASS_CODES,
  "urn:bro:bhrgt:StiffnessClassMembrane": BHRGT_STIFFNESS_CLASS_MEMBRANE_CODES,
  "urn:bro:bhrgt:StopCriterion": BHRGT_STOP_CRITERION_CODES,
  "urn:bro:bhrgt:StopCriterionDetermination": BHRGT_STOP_CRITERION_DETERMINATION_CODES,
  "urn:bro:bhrgt:StopCriterionField": BHRGT_STOP_CRITERION_FIELD_CODES,
  "urn:bro:bhrgt:OrganicSoilTexture": BHRGT_ORGANIC_SOIL_TEXTURE_CODES,
  "urn:bro:bhrgt:TemporaryChange": BHRGT_TEMPORARY_CHANGE_CODES,
  "urn:bro:bhrgt:UsedOpticalModel": BHRGT_USED_OPTICAL_MODEL_CODES,
  "urn:bro:bhrgt:PeatTensileStrength": BHRGT_PEAT_TENSILE_STRENGTH_CODES,
  "urn:bro:bhrgt:AnalysisType": BHRGT_ANALYSIS_TYPE_CODES,
  "urn:bro:bhrgt:DiscontinuityType": BHRGT_DISCONTINUITY_TYPE_CODES,
  "urn:bro:bhrgt:ActivityType": BHRGT_ACTIVITY_TYPE_CODES,
  "urn:bro:bhrgt:MixingType": BHRGT_MIXING_TYPE_CODES,
  "urn:bro:bhrgt:Discipline": BHRGT_DISCIPLINE_CODES,
  "urn:bro:bhrgt:Discolouration": BHRGT_DISCOLOURATION_CODES,
  "urn:bro:bhrgt:VerticalDatum": BHRGT_VERTICAL_DATUM_CODES,
  "urn:bro:bhrgt:RemovedMaterial": BHRGT_REMOVED_MATERIAL_CODES,
  "urn:bro:bhrgt:PreTreatment": BHRGT_PRE_TREATMENT_CODES,
  "urn:bro:bhrgt:Preparation": BHRGT_PREPARATION_CODES,
  "urn:bro:bhrgt:SpecimenShape": BHRGT_SPECIMEN_SHAPE_CODES,
  "urn:bro:bhrgt:WallFrictionCorrectionMethod": BHRGT_WALL_FRICTION_CORRECTION_METHOD_CODES,
  "urn:bro:bhrgt:ExcavatedMaterial": BHRGT_EXCAVATED_MATERIAL_CODES,
  "urn:bro:bhrg:DiscontinuityType": BHRG_DISCONTINUITY_TYPE_CODES,
  "urn:bro:bhrg:ActivityType": BHRG_ACTIVITY_TYPE_CODES,
  "urn:bro:bhrgt:SandMedianClass": BHRGT_SAND_MEDIAN_CLASS_CODES,
  "urn:bro:bhrgt:SandSorting": BHRGT_SAND_SORTING_CODES,
  "urn:bro:bhrgt:SandSortingNEN5104": BHRGT_SAND_SORTING_NEN5104_CODES,
  "urn:bro:bhrgt:VeryCoarseGravelContentClass": BHRGT_VERY_COARSE_GRAVEL_CONTENT_CLASS_CODES,
  "urn:bro:bhrgt:LateralSupport": BHRGT_LATERAL_SUPPORT_CODES,
  "urn:bro:bhrgt:SaltCorrectionMethod": BHRGT_SALT_CORRECTION_METHOD_CODES,
  "urn:bro:bhrg:Discipline": BHRG_DISCIPLINE_CODES,
  "urn:bro:bhrg:VerticalDatum": BHRG_VERTICAL_DATUM_CODES,
  "urn:bro:bhrg:VerticalTrend": BHRG_VERTICAL_TREND_CODES,
  "urn:bro:bhrg:RemovedMaterial": BHRG_REMOVED_MATERIAL_CODES,
  "urn:bro:bhrg:RemovalMethodCarbonate": BHRG_REMOVAL_METHOD_CARBONATE_CODES,
  "urn:bro:bhrg:RemovalMethodOrganicMatter": BHRG_REMOVAL_METHOD_ORGANIC_MATTER_CODES,
  "urn:bro:bhrg:SaturationMethod": BHRG_SATURATION_METHOD_CODES,
  "urn:bro:bhrg:StainColour": BHRG_STAIN_COLOUR_CODES,
  "urn:bro:bhrg:VolumePercentageClass": BHRG_VOLUME_PERCENTAGE_CLASS_CODES,
  "urn:bro:bhrg:PreTreatment": BHRG_PRE_TREATMENT_CODES,
  "urn:bro:bhrg:Preparation": BHRG_PREPARATION_CODES,
  "urn:bro:bhrg:MaterialShape": BHRG_MATERIAL_SHAPE_CODES,
  "urn:bro:bhrg:ExcavatedMaterial": BHRG_EXCAVATED_MATERIAL_CODES,
  "urn:bro:bhrg:SandMedianClass": BHRG_SAND_MEDIAN_CLASS_CODES,
  "urn:bro:bhrg:SandMedianClass50to2000": BHRG_SAND_MEDIAN_CLASS50TO2000_CODES,
  "urn:bro:bhrg:SandSorting": BHRG_SAND_SORTING_CODES,
  "urn:bro:bhrg:VeryCoarseFractionContentClass": BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_CODES,
  "urn:bro:bhrg:VeryCoarseFractionContentClassArchive": BHRG_VERY_COARSE_FRACTION_CONTENT_CLASS_ARCHIVE_CODES,
  "urn:bro:bhrg:SaltCorrectionMethod": BHRG_SALT_CORRECTION_METHOD_CODES,
  "urn:bro:DateFormat": BRO_DATE_FORMAT_CODES,
  "urn:bro:Etrs89Transformation": BRO_ETRS89TRANSFORMATION_CODES,
  "urn:bro:HorizontalCrs": BRO_HORIZONTAL_CRS_CODES,
  "urn:bro:IndicationYesNo": BRO_INDICATION_YES_NO_CODES,
  "urn:bro:QualityRegime": BRO_QUALITY_REGIME_CODES,
  "urn:bro:CoordinateTransformation": BRO_COORDINATE_TRANSFORMATION_CODES,
  "urn:bro:cpt:CoordTransformation": CPT_COORD_TRANSFORMATION_CODES,
  "urn:bro:cpt:CorrectionReason": CPT_CORRECTION_REASON_CODES,
  "urn:bro:cpt:DeliveryContext": CPT_DELIVERY_CONTEXT_CODES,
  "urn:bro:cpt:HorizontalCrs": CPT_HORIZONTAL_CRS_CODES,
  "urn:bro:cpt:HorizontalPositioningMethod": CPT_HORIZONTAL_POSITIONING_METHOD_CODES,
  "urn:bro:cpt:LocalVerticalReferencePoint": CPT_LOCAL_VERTICAL_REFERENCE_POINT_CODES,
  "urn:bro:cpt:CPTMethod": CPT_CPT_METHOD_CODES,
  "urn:bro:cpt:QualityClass": CPT_QUALITY_CLASS_CODES,
  "urn:bro:cpt:RegistrationStatus": CPT_REGISTRATION_STATUS_CODES,
  "urn:bro:cpt:CPTStandard": CPT_CPT_STANDARD_CODES,
  "urn:bro:cpt:StopCriterion": CPT_STOP_CRITERION_CODES,
  "urn:bro:cpt:SurveyPurpose": CPT_SURVEY_PURPOSE_CODES,
  "urn:bro:cpt:VerticalDatum": CPT_VERTICAL_DATUM_CODES,
  "urn:bro:cpt:VerticalPositioningMethod": CPT_VERTICAL_POSITIONING_METHOD_CODES,
};
