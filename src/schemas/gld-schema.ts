/**
 * GLD (Grondwaterstandonderzoek / groundwater level research) schema.
 *
 * Maps the dsgld/1.0 registration object (`GLD_O`) to {@link GLDData}. The OGC
 * `om:OM_Observation` / WaterML2 subtrees live outside the BRO namespaces, so the
 * coverage checker treats `dsgld:observation` as one opaque leaf; this schema
 * reaches into their internals directly.
 *
 * Coverage is verified with `npm run check:xsd-coverage`.
 */

import { object, array, text, date, number, integer, scalar } from "../core/producer.js";
import type { Produced } from "../core/producer.js";
import {
  COMMON_REGISTRATION_PRODUCERS,
  REGISTRATION_HISTORY,
} from "./common-fields.js";

/** Tail of a BRO URN code (`urn:bro:gld:StatusCode:voorlopig` -> `voorlopig`). */
function urnTail(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const parts = value.split(":");
  return parts[parts.length - 1] ?? null;
}

/** Select a WaterML2 NamedValue parameter by its `om:name/@xlink:href` key. */
function namedValue(href: string): string {
  return `om:NamedValue[om:name/@xlink:href='${href}']/om:value`;
}

/** One `{time, value, qualifier}` point of an observation's time-series. */
const OBSERVATION_POINT = object({
  fields: {
    time: date("./wml2:time"),
    value: number("./wml2:value"),
    unit: text("./wml2:value/@uom"),
    qualifier: text(
      "./wml2:metadata/wml2:TVPMeasurementMetadata/wml2:qualifier/swe:Category/swe:value",
    ),
  },
});

/** One groundwater level observation (an OGC `om:OM_Observation`). */
const OBSERVATION = object({
  fields: {
    observationId: text("./@gml:id"),
    observationType: text(
      "./om:metadata/wml2:ObservationMetadata/wml2:parameter/" +
        namedValue("urn:bro:gld:ObservationMetadata:observationType"),
    ),
    status: scalar({
      at: "./om:metadata/wml2:ObservationMetadata/wml2:status/@xlink:href",
      decode: urnTail,
    }),
    beginPosition: date("./om:phenomenonTime/gml:TimePeriod/gml:beginPosition"),
    endPosition: date("./om:phenomenonTime/gml:TimePeriod/gml:endPosition"),
    resultTime: date("./om:resultTime/gml:TimeInstant/gml:timePosition"),
    airPressureCompensationType: text(
      "./om:procedure/wml2:ObservationProcess/wml2:parameter/" +
        namedValue("urn:bro:gld:ObservationProcess:airPressureCompensationType"),
    ),
    evaluationProcedure: text(
      "./om:procedure/wml2:ObservationProcess/wml2:parameter/" +
        namedValue("urn:bro:gld:ObservationProcess:evaluationProcedure"),
    ),
    points: array({
      each: "./om:result/wml2:MeasurementTimeseries/wml2:point/wml2:MeasurementTVP",
      item: OBSERVATION_POINT,
    }),
  },
});

/** The GMW tube a GLD research pertains to. */
const MONITORING_POINT = object({
  at: "./dsgld:monitoringPoint/gldcommon:GroundwaterMonitoringTube",
  fields: {
    broId: text("./gldcommon:broId"),
    tubeNumber: integer("./gldcommon:tubeNumber"),
  },
});

export const GLD_PRODUCER = object({
  fields: {
    // === Core identification (shared brocom fields) ===
    ...COMMON_REGISTRATION_PRODUCERS,

    // === Scalar fields ===
    researchFirstDate: date("./dsgld:researchFirstDate"),
    researchLastDate: date("./dsgld:researchLastDate"),

    // === Monitoring point (the GMW tube this research pertains to) ===
    monitoringPoint: MONITORING_POINT,

    // === Groundwater monitoring nets (GMN membership) ===
    groundwaterMonitoringNets: array({
      each: "./dsgld:groundwaterMonitoringNet/gldcommon:GroundwaterMonitoringNet",
      item: text("./gldcommon:broId"),
    }),

    // === Observation time-series ===
    observations: array({
      each: "./dsgld:observation/om:OM_Observation",
      item: OBSERVATION,
    }),

    // === Administrative history ===
    registrationHistory: REGISTRATION_HISTORY,
  },
});

/** The GMW tube reference a GLD pertains to. Inferred from {@link MONITORING_POINT}. @internal */
export type GroundwaterMonitoringTubeRef = Produced<typeof MONITORING_POINT>;
/** One `{time, value, qualifier}` point of an observation series. Inferred from {@link OBSERVATION_POINT}. @internal */
export type GLDObservationPoint = Produced<typeof OBSERVATION_POINT>;
/** One groundwater level observation. Inferred from {@link OBSERVATION}. @internal */
export type GLDObservation = Produced<typeof OBSERVATION>;
