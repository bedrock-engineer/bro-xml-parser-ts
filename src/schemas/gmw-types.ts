/**
 * GMW derived types — reconstructed from the generated {@link GMW_PRODUCER} by
 * indexed access (the generated schema is the single source of truth).
 *
 * A well carries one or more monitoring tubes, each with its own
 * materialUsed/screen/plainTubePart/sedimentSump/insertedPart sub-objects and its
 * geo-ohm cables → electrodes, plus a well-history log whose intermediate events
 * each carry an `eventData` change record.
 */

import type { Produced } from "../core/producer.js";
import type { GMW_PRODUCER } from "./gmw-schema.js";

type Well = Produced<typeof GMW_PRODUCER>;

/** One monitoring tube, with its material/screen/insert sub-objects. @internal */
export type MonitoringTube = Well["monitoringTube"][number];
/** One geo-ohm cable running along a monitoring tube. @internal */
export type GeoOhmCable = MonitoringTube["geoOhmCable"][number];
/** One electrode on a geo-ohm cable. @internal */
export type Electrode = GeoOhmCable["electrode"][number];

/** The well-history log (construction/removal dates + intermediate events). */
type WellHistory = NonNullable<Well["wellHistory"]>;
/** One dated well-history event, with its `eventData` change record. @internal */
export type GMWIntermediateEvent = WellHistory["intermediateEvent"][number];
