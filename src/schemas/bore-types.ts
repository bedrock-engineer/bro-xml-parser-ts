/**
 * BHR-GT derived types — reconstructed from the generated {@link BORE_PRODUCER}
 * by indexed access (the generated schema is the single source of truth).
 *
 * The described layer is no longer a discriminated union: the XSD `LayerType` is a
 * sequence with optional `soil`/`rock` siblings, so a layer is
 * `{ …shared, soil?, rock? }`. A "soil layer" is simply one whose `soil` is present.
 */

import type { Produced } from "../core/producer.js";
import type { BORE_PRODUCER } from "./bore-schema.js";

type Bore = Produced<typeof BORE_PRODUCER>;
type Logs = NonNullable<Bore["boreholeSampleDescription"]>["descriptiveBoreholeLog"];
type Boring = NonNullable<Bore["boring"]>;

/** One described layer: shared fields plus optional `soil`/`rock`. */
export type BHRGTLayer = Logs[number]["layer"][number];
/** The `soil` description of a soil layer. */
export type SoilDescription = NonNullable<BHRGTLayer["soil"]>;
/** The `rock` description of a rock layer. */
export type RockDescription = NonNullable<BHRGTLayer["rock"]>;
/** A layer that describes soil (its `soil` is present). */
export type BHRGTSoilLayer = BHRGTLayer & { soil: SoilDescription };
/** A layer that describes rock (its `rock` is present). */
export type BHRGTRockLayer = BHRGTLayer & { rock: RockDescription };
/** Fields common to every layer, regardless of soil/rock. */
export type BHRGTLayerBase = Omit<BHRGTLayer, "soil" | "rock">;
/** Grain-shape properties of a sand/gravel fraction. */
export type Grainshape = NonNullable<SoilDescription["grainshape"]>;
/** Three-axis rock weathering degree. */
export type RockWeatheringDegree = NonNullable<RockDescription["weatheringDegree"]>;

/** One bored interval. */
export type BoredInterval = Boring["boredInterval"][number];
/** One sampled interval. */
export type SampledInterval = Boring["sampledInterval"][number];
/** Sampler details of a sampled interval. */
export type SamplerDetails = NonNullable<SampledInterval["sampler"]>;
/** Core-recovery details of a sampled interval. */
export type CoreRecovery = NonNullable<SampledInterval["coreRecovery"]>;
/** One completed interval. */
export type CompletedInterval = Boring["completedInterval"][number];
/** One excavated layer. */
export type ExcavatedLayer = Boring["excavatedLayer"][number];
/** One borehole boring-velocity measurement. */
export type BoringVelocityMeasurement = Boring["boringVelocity"][number];
/** A post-sedimentary discontinuity. */
export type PostSedimentaryDiscontinuity = Logs[number]["postSedimentaryDiscontinuity"][number];
/** One not-described interval. */
export type NotDescribedInterval = Logs[number]["notDescribedInterval"][number];
/** A fluid-mud layer. */
export type FluidMudLayer = NonNullable<Bore["fluidMudLayer"]>;
