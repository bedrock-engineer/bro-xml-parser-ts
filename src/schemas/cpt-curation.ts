/**
 * CPT curation — the irreducible warts the XSD generator can't produce, consulted
 * by the schema codegen at keyed nodes (see `scripts/codegen-schema.ts`):
 *
 *   - the embedded measurement CSV (`swe:DataArray`, opaque to the XSD walk),
 *   - each dissipation test's own pore-pressure decay CSV,
 *   - the OGC O&M observation timestamps.
 *
 * Everything else in the CPT schema is generated from the XSD.
 */

import type { NodeLens, Produced } from "../core/producer.js";
import type { CPTMeasurement, DissipationMeasurement } from "../types/index.js";
import { object, array, custom, scalar, date } from "../core/producer.js";
import { decodeColumns, col, type ColumnSpec } from "../core/columns.js";
import { parseFloat } from "../decoders/type-decoders.js";

/** Fixed columns of a dissipation-test time-series. */
const DISSIPATION_COLUMNS: Array<ColumnSpec> = [
  { name: "elapsedTime", parse: col.num },
  { name: "coneResistance", parse: col.num, optional: true },
  { name: "porePressureU1", parse: col.num, optional: true },
  { name: "porePressureU2", parse: col.num, optional: true },
  { name: "porePressureU3", parse: col.num, optional: true },
];

/**
 * Parse the embedded measurement CSV. Mounted on the `conePenetrationTest`
 * observation node: the CSV `values` live inside it, while the `parameters`
 * ja/nee column flags are a sibling under the survey — reached via the parent
 * axis (`../`). The flags say which columns the CSV carries (in document order);
 * `values` always carries every column, so unflagged positions are skipped.
 * Rows are sorted by penetration length (BRO does not guarantee depth order).
 */
function parseMeasurements(lens: NodeLens): Array<CPTMeasurement> {
  const enc = (attr: string, fallback: string): string =>
    lens.attr(`.//swe:encoding/swe:TextEncoding/@${attr}`) ?? fallback;
  const decimalSeparator = enc("decimalSeparator", ".");
  if (decimalSeparator !== ".") {
    console.warn(`Non-standard decimal separator: ${decimalSeparator} (expected ".")`);
  }

  const parameters = lens.all("../cptcommon:parameters")[0];
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
  }).filter((m) => Object.values(m).some((v) => v !== null && v !== undefined));

  return rows.sort((a, b) => a.penetrationLength - b.penetrationLength);
}

/**
 * The cone-penetration-test observation, XSD-faithful: its OGC O&M timestamps
 * plus the decoded measurement time-series (BRO's `cptResult` values). Replaces
 * the raw `conePenetrationTest` node the codegen otherwise leaves opaque.
 */
export const CONE_PENETRATION_TEST = object({
  at: "./cptcommon:conePenetrationTest",
  fields: {
    phenomenonTime: date("./om:phenomenonTime/gml:TimeInstant/gml:timePosition"),
    resultTime: date("./om:resultTime/gml:TimeInstant/gml:timePosition"),
    measurements: custom<Array<CPTMeasurement>>({ produce: parseMeasurements }),
  },
});

/** One dissipation test's pore-pressure decay CSV (its own `swe:TextEncoding`). */
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

/** One dissipation test (pore-pressure decay time-series at a fixed depth). */
const DISSIPATION_TEST = object({
  fields: {
    penetrationLength: scalar<number>({
      at: "./cptcommon:penetrationLength",
      decode: (raw) => parseFloat(raw) ?? 0,
    }),
    phenomenonTime: date("./om:phenomenonTime//gml:timePosition"),
    measurements: DISSIPATION_MEASUREMENTS,
  },
});

/** The dissipation-test array, mounted on the `conePenetrometerSurvey` node. */
export const DISSIPATION_TESTS = array({
  each: ".//cptcommon:dissipationTest",
  item: DISSIPATION_TEST,
});

/** One dissipation test (pore-pressure decay). Inferred from the curated producer. */
export type DissipationTest = Produced<typeof DISSIPATION_TEST>;
