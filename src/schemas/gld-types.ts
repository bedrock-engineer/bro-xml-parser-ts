/**
 * GLD derived types — reconstructed from the generated {@link GLD_PRODUCER} by
 * indexed access (the generated schema is the single source of truth; the
 * observation subtree flows in from {@link OBSERVATIONS} in ./gld-curation.ts).
 */

import type { Produced } from "../core/producer.js";
import type { GLD_PRODUCER } from "./gld-schema.js";

type Research = Produced<typeof GLD_PRODUCER>;

/** The GMW tube reference a GLD pertains to. @internal */
export type GroundwaterMonitoringTubeRef = NonNullable<Research["monitoringPoint"]>;
/** One groundwater level observation. @internal */
export type GLDObservation = Research["observation"][number];
/** One `{time, value, qualifier}` point of an observation series. @internal */
export type GLDObservationPoint = GLDObservation["points"][number];
