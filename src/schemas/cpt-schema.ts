/**
 * CPT (Cone Penetration Test) schema.
 *
 * Maps the dscpt/1.1 registration object to {@link CPTData}. Most of the ~60
 * metadata fields are scalars; the embedded measurement CSV (`data`) and the
 * dissipation-test time-series (`dissipationTests`) are {@link custom} producers
 * driven by a {@link NodeLens}.
 *
 * Field coverage is verified against the official XSD with
 * `npm run check:xsd-coverage`.
 */

import type { NodeLens } from "../core/producer.js";
import type { CPTMeasurement, DissipationMeasurement } from "../types/index.js";
import {
  object_,
  array,
  custom,
  scalar,
  text,
  date,
  number_,
  integer,
  boolean_,
} from "../core/producer.js";
import {
  COMMON_REGISTRATION_PRODUCERS,
  REGISTRATION_HISTORY,
  gmlLocation,
} from "./common-fields.js";
import { decodeColumns, col, type ColumnSpec } from "../core/columns.js";
import { parseQualityClass, parseFloat } from "../resolvers/type-resolvers.js";

const SURVEY = "./dscpt:conePenetrometerSurvey";
const CONE = `${SURVEY}/cptcommon:conePenetrometer`;
const ZLM = `${CONE}/cptcommon:zeroLoadMeasurement`;
const VPOS = "./dscpt:deliveredVerticalPosition";

/** Fixed columns of a dissipation-test time-series. */
const DISSIPATION_COLUMNS: Array<ColumnSpec> = [
  { name: "elapsedTime", parse: col.num },
  { name: "coneResistance", parse: col.num, optional: true },
  { name: "porePressureU1", parse: col.num, optional: true },
  { name: "porePressureU2", parse: col.num, optional: true },
  { name: "porePressureU3", parse: col.num, optional: true },
];

/**
 * Parse the embedded measurement CSV from the `conePenetrometerSurvey` node.
 *
 * The `parameters` element flags (ja/nee) which columns are present, in
 * document order; the CSV in `values` always carries every column, so the
 * decode spec maps only the flagged positions (others are skipped with `null`).
 * Rows are then sorted by penetration length (BRO does not guarantee depth order
 * in the values block).
 */
function parseMeasurements(lens: NodeLens): Array<CPTMeasurement> {
  const enc = (attr: string, fallback: string): string =>
    lens.attr(`.//swe:encoding/swe:TextEncoding/@${attr}`) ?? fallback;
  const decimalSeparator = enc("decimalSeparator", ".");
  if (decimalSeparator !== ".") {
    console.warn(`Non-standard decimal separator: ${decimalSeparator} (expected ".")`);
  }

  // A spec entry per parameter position, in document order: a column for the
  // "ja" positions, `null` (skip) for the rest. Scope to the first `parameters`
  // block — dissipation tests carry their own values/encoding.
  const parameters = lens.all(".//cptcommon:parameters")[0];
  const spec: Array<ColumnSpec | null> = (parameters ? parameters.all("./*") : []).map((param) => {
    const columnName = param.name();
    const included = (param.text() ?? "").toLowerCase() === "ja";
    return columnName && included ? { name: columnName, parse: col.num } : null;
  });
  if (spec.every((c) => c === null)) {
    return [];
  }

  const rows = decodeColumns<CPTMeasurement>(lens.textAt(".//cptcommon:values"), spec, {
    rowSeparator: enc("blockSeparator", ";"),
    colSeparator: enc("tokenSeparator", ","),
  })
    // Drop all-null rows.
    .filter((m) => Object.values(m).some((v) => v !== null && v !== undefined));

  return rows.sort((a, b) => a.penetrationLength - b.penetrationLength);
}

/**
 * A dissipation test's pore-pressure decay CSV. Kept custom because the row/col
 * separators are read from the test's own `swe:TextEncoding`.
 */
const DISSIPATION_MEASUREMENTS = custom<Array<DissipationMeasurement>>({
  produce: (test) => {
    const enc = "./cptcommon:disResult/swe:encoding/swe:TextEncoding";
    return decodeColumns<DissipationMeasurement>(
      test.textAt("./cptcommon:disResult/cptcommon:values"),
      DISSIPATION_COLUMNS,
      {
        rowSeparator: test.attr(`${enc}/@blockSeparator`) ?? ";",
        colSeparator: test.attr(`${enc}/@tokenSeparator`) ?? ",",
      },
    );
  },
});

/**
 * One dissipation test (pore-pressure decay time-series at a fixed depth), a
 * sibling of the cone-penetration test inside `conePenetrometerSurvey`.
 */
const DISSIPATION_TEST = object_({
  fields: {
    penetrationLength: scalar<number>({
      at: "./cptcommon:penetrationLength",
      decode: (raw) => parseFloat(raw) ?? 0,
    }),
    phenomenonTime: date("./om:phenomenonTime//gml:timePosition"),
    measurements: DISSIPATION_MEASUREMENTS,
  },
});

export const CPT_PRODUCER = object_({
  fields: {
    // === Core identification (shared brocom fields) ===
    ...COMMON_REGISTRATION_PRODUCERS,

    researchOperator: text("./dscpt:researchOperator"),
    researchReportDate: date("./dscpt:researchReportDate"),

    // Measurement timing (OGC O&M timestamps on the conePenetrationTest observation)
    conePenetrationTestPhenomenonTime: date(
      `${SURVEY}/cptcommon:conePenetrationTest/om:phenomenonTime/gml:TimeInstant/gml:timePosition`,
    ),
    conePenetrationTestResultTime: date(
      `${SURVEY}/cptcommon:conePenetrationTest/om:resultTime/gml:TimeInstant/gml:timePosition`,
    ),
    cptStandard: text("./dscpt:cptStandard"),

    // === Location ===
    deliveredLocation: gmlLocation("./dscpt:deliveredLocation/cptcommon:location"),
    standardizedLocation: gmlLocation("./dscpt:standardizedLocation/brocom:location"),
    coordinateTransformation: text("./dscpt:standardizedLocation/brocom:coordinateTransformation"),
    horizontalPositioningDate: date("./dscpt:deliveredLocation/cptcommon:horizontalPositioningDate"),
    horizontalPositioningMethod: text(
      "./dscpt:deliveredLocation/cptcommon:horizontalPositioningMethod",
    ),
    horizontalPositioningOperator: text(
      "./dscpt:deliveredLocation/cptcommon:horizontalPositioningOperator",
    ),

    // === Vertical position ===
    deliveredVerticalPositionOffset: number_(`${VPOS}/cptcommon:offset`),
    deliveredVerticalPositionDatum: text(`${VPOS}/cptcommon:verticalDatum`),
    deliveredVerticalPositionReferencePoint: text(`${VPOS}/cptcommon:localVerticalReferencePoint`),
    waterDepth: number_(`${VPOS}/cptcommon:waterDepth`),
    verticalPositioningDate: date(`${VPOS}/cptcommon:verticalPositioningDate`),
    verticalPositioningMethod: text(`${VPOS}/cptcommon:verticalPositioningMethod`),
    verticalPositioningOperator: text(`${VPOS}/cptcommon:verticalPositioningOperator`),

    // === Survey context ===
    deliveryContext: text("./dscpt:deliveryContext"),
    surveyPurpose: text("./dscpt:surveyPurpose"),
    additionalInvestigationPerformed: boolean_("./dscpt:additionalInvestigationPerformed"),

    // === Test metadata ===
    cptMethod: text(`${SURVEY}/cptcommon:cptMethod`),
    stopCriterion: text(`${SURVEY}/cptcommon:stopCriterion`),
    sensorAzimuth: number_(`${SURVEY}/cptcommon:sensorAzimuth`),
    dissipationtestPerformed: boolean_(`${SURVEY}/cptcommon:dissipationTestPerformed`),
    qualityClass: scalar({
      at: `${SURVEY}/cptcommon:qualityClass`,
      decode: parseQualityClass,
    }),
    groundwaterLevel: number_("./dscpt:additionalInvestigation/cptcommon:groundwaterLevel"),

    // === Additional investigation ===
    investigationDate: date("./dscpt:additionalInvestigation/cptcommon:investigationDate"),
    conditions: text("./dscpt:additionalInvestigation/cptcommon:conditions"),
    surfaceDescription: text("./dscpt:additionalInvestigation/cptcommon:surfaceDescription"),
    removedLayers: array({
      each: "./dscpt:additionalInvestigation/cptcommon:removedLayer",
      item: object_({
        fields: {
          sequenceNumber: integer("./cptcommon:sequenceNumber"),
          upperBoundary: number_("./cptcommon:upperBoundary"),
          lowerBoundary: number_("./cptcommon:lowerBoundary"),
          description: text("./cptcommon:description"),
        },
      }),
    }),
    predrilledDepth: number_(`${SURVEY}/cptcommon:trajectory/cptcommon:predrilledDepth`),
    finalDepth: number_(`${SURVEY}/cptcommon:trajectory/cptcommon:finalDepth`),

    // === Processing flags ===
    finalProcessingDate: date(`${SURVEY}/cptcommon:finalProcessingDate`),
    signalProcessingPerformed: boolean_(
      `${SURVEY}/cptcommon:procedure/cptcommon:signalProcessingPerformed`,
    ),
    interruptionProcessingPerformed: boolean_(
      `${SURVEY}/cptcommon:procedure/cptcommon:interruptionProcessingPerformed`,
    ),
    expertCorrectionPerformed: boolean_(
      `${SURVEY}/cptcommon:procedure/cptcommon:expertCorrectionPerformed`,
    ),

    // === Equipment specifications ===
    cptDescription: text(`${CONE}/cptcommon:description`),
    cptType: text(`${CONE}/cptcommon:conePenetrometerType`),
    coneSurfaceArea: integer(`${CONE}/cptcommon:coneSurfaceArea`),
    coneDiameter: integer(`${CONE}/cptcommon:coneDiameter`),
    coneSurfaceQuotient: number_(`${CONE}/cptcommon:coneSurfaceQuotient`),
    coneToFrictionSleeveDistance: integer(`${CONE}/cptcommon:coneToFrictionSleeveDistance`),
    coneToFrictionSleeveSurfaceArea: integer(`${CONE}/cptcommon:frictionSleeveSurfaceArea`),
    coneToFrictionSleeveSurfaceQuotient: number_(`${CONE}/cptcommon:frictionSleeveSurfaceQuotient`),

    // === Zero-load measurements (equipment calibration) ===
    zlmConeResistanceBefore: number_(`${ZLM}/cptcommon:coneResistanceBefore`),
    zlmConeResistanceAfter: number_(`${ZLM}/cptcommon:coneResistanceAfter`),
    zlmInclinationEwBefore: integer(`${ZLM}/cptcommon:inclinationEWBefore`),
    zlmInclinationEwAfter: integer(`${ZLM}/cptcommon:inclinationEWAfter`),
    zlmInclinationNsBefore: integer(`${ZLM}/cptcommon:inclinationNSBefore`),
    zlmInclinationNsAfter: integer(`${ZLM}/cptcommon:inclinationNSAfter`),
    zlmInclinationResultantBefore: integer(`${ZLM}/cptcommon:inclinationResultantBefore`),
    zlmInclinationResultantAfter: integer(`${ZLM}/cptcommon:inclinationResultantAfter`),
    zlmLocalFrictionBefore: number_(`${ZLM}/cptcommon:localFrictionBefore`),
    zlmLocalFrictionAfter: number_(`${ZLM}/cptcommon:localFrictionAfter`),
    zlmPorePressureU1Before: number_(`${ZLM}/cptcommon:porePressureU1Before`),
    zlmPorePressureU1After: number_(`${ZLM}/cptcommon:porePressureU1After`),
    zlmPorePressureU2Before: number_(`${ZLM}/cptcommon:porePressureU2Before`),
    zlmPorePressureU2After: number_(`${ZLM}/cptcommon:porePressureU2After`),
    zlmPorePressureU3Before: number_(`${ZLM}/cptcommon:porePressureU3Before`),
    zlmPorePressureU3After: number_(`${ZLM}/cptcommon:porePressureU3After`),
    zlmElectricalConductivityBefore: number_(`${ZLM}/cptcommon:electricalConductivityBefore`),
    zlmElectricalConductivityAfter: number_(`${ZLM}/cptcommon:electricalConductivityAfter`),

    // === Measurement data (embedded CSV) ===
    data: custom({ at: SURVEY, produce: parseMeasurements }),

    // === Dissipation tests ===
    dissipationTests: array({ at: SURVEY, each: ".//cptcommon:dissipationTest", item: DISSIPATION_TEST }),

    // === Administrative history ===
    registrationHistory: REGISTRATION_HISTORY,
  },
});
