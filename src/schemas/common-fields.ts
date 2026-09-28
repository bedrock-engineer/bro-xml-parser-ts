/**
 * Shared domain producer for the BRO schemas.
 *
 * `gmlLocation` maps a GML `Point` element to a {@link Location}. The codegen
 * emits it wherever the XSD types a node as `PointType`, and it is re-exported on
 * the `producers` authoring surface for custom schemas.
 */

import type { Location } from "../types/index.js";
import { custom } from "../core/producer.js";
import type { CustomProducer } from "../core/producer.js";

/**
 * A GML `Point` location → {@link Location}, as a custom producer.
 *
 * Reads the EPSG code from the `srsName` attribute (on the location element or a
 * nested `gml:Point`) and the `gml:pos` coordinates. Returns `null` when the CRS
 * or coordinates are absent/unparseable. `at` is the relative XPath to the
 * location element (differs per domain).
 */
export function gmlLocation(at: string): CustomProducer<Location | null> {
  return custom<Location | null>({
    at,
    produce: (lens) => {
      const srsName = lens.attr("./@srsName") ?? lens.attr(".//gml:Point/@srsName");
      if (!srsName) {
        return null;
      }
      const epsgMatch = /EPSG::?(\d+)/i.exec(srsName);
      const epsg = epsgMatch?.[1] ? `EPSG:${epsgMatch[1]}` : srsName;

      const posText = lens.textAt(".//gml:pos");
      if (!posText) {
        return null;
      }
      const coords = posText.split(/\s+/).map(Number);
      const [x, y] = coords;
      if (x === undefined || y === undefined || isNaN(x) || isNaN(y)) {
        return null;
      }
      return { x, y, epsg };
    },
  });
}
