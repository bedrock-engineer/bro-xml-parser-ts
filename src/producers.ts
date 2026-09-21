/**
 * The public authoring surface for custom schemas.
 *
 * One import carrying every building block the library uses internally to
 * describe how an XML node becomes a typed value:
 *
 *   - the leaf combinators (`text`, `date`, `number_`, `integer`, `boolean_`,
 *     `qualityClass`) and the structural combinators (`object_`, `array`,
 *     `oneOf`, and the `custom` / `scalar` escape hatches),
 *   - the domain helpers `gmlLocation` (GML `Point` → {@link Location}) and
 *     `columns` / `col` (BRO's column time-series CSVs),
 *   - the shared field-maps `COMMON_REGISTRATION_PRODUCERS` and
 *     `REGISTRATION_HISTORY`, ready to spread into a custom schema.
 *
 * Pass a bare fields map built from these to {@link BROParser.parseCustom}; its
 * return type is inferred as `ProducedFields<F> & { meta }`.
 *
 * @example
 * ```typescript
 * import { BROParser, producers as p } from "@bedrock-engineer/bro-xml-parser";
 *
 * const parser = new BROParser(new XMLAdapter());
 * const result = parser.parseCustom(xml, {
 *   ...p.COMMON_REGISTRATION_PRODUCERS,
 *   depth: p.number_("./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth"),
 *   location: p.gmlLocation("./dscpt:deliveredLocation/cptcommon:location"),
 * }, "CPT");
 * result.depth;    // number | null — inferred, no casts
 * result.location; // Location | null
 * ```
 */

export {
  scalar,
  text,
  date,
  number_,
  integer,
  boolean_,
  qualityClass,
  object_,
  array,
  custom,
  oneOf,
} from "./core/producer.js";

export { columns, col } from "./core/columns.js";

export {
  gmlLocation,
  REGISTRATION_HISTORY,
  COMMON_REGISTRATION_PRODUCERS,
} from "./schemas/common-fields.js";
