/**
 * GLD structural wart — the observation time-series.
 *
 * `dsgld:observation` is an OGC `om:OM_Observation` whose result is an untyped
 * (`xs:anyType`) WaterML2 `MeasurementTimeseries`, and whose per-observation
 * metadata is carried as `om:NamedValue` parameters distinguished only by their
 * `om:name/@xlink:href` URN *value* — a BRO profiling convention the XSD does not
 * express as structure. The codegen can't synthesise the value-predicate XPaths or
 * walk the untyped result, so the observation array is hand-written and injected as
 * curation (the codegen collapses the raw node to an opaque leaf and hides it).
 */

import { object, array, text, date, number, scalar } from "../core/producer.js";

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

/** The repeated groundwater-level observations (curated OGC/WaterML2 subtree). */
export const OBSERVATIONS = array({
  each: "./dsgld:observation/om:OM_Observation",
  item: OBSERVATION,
});
