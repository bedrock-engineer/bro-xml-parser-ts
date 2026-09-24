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

/** One described layer: shared fields plus optional `soil`/`rock`. @internal */
export type BHRGTLayer = Logs[number]["layer"][number];
/** The `soil` description of a soil layer. @internal */
export type SoilDescription = NonNullable<BHRGTLayer["soil"]>;
/** The `rock` description of a rock layer. @internal */
export type RockDescription = NonNullable<BHRGTLayer["rock"]>;
/** A layer that describes soil (its `soil` is present). @internal */
export type BHRGTSoilLayer = BHRGTLayer & { soil: SoilDescription };
/** A layer that describes rock (its `rock` is present). @internal */
export type BHRGTRockLayer = BHRGTLayer & { rock: RockDescription };
/** Fields common to every layer, regardless of soil/rock. @internal */
export type BHRGTLayerBase = Omit<BHRGTLayer, "soil" | "rock">;
/** Grain-shape properties of a sand/gravel fraction. @internal */
export type Grainshape = NonNullable<SoilDescription["grainshape"]>;
/** Three-axis rock weathering degree. @internal */
export type RockWeatheringDegree = NonNullable<RockDescription["weatheringDegree"]>;

/** One bored interval. @internal */
export type BoredInterval = Boring["boredInterval"][number];
/** One sampled interval. @internal */
export type SampledInterval = Boring["sampledInterval"][number];
/** Sampler details of a sampled interval. @internal */
export type SamplerDetails = NonNullable<SampledInterval["sampler"]>;
/** Core-recovery details of a sampled interval. @internal */
export type CoreRecovery = NonNullable<SampledInterval["coreRecovery"]>;
/** One completed interval. @internal */
export type CompletedInterval = Boring["completedInterval"][number];
/** One excavated layer. @internal */
export type ExcavatedLayer = Boring["excavatedLayer"][number];
/** One borehole boring-velocity measurement. @internal */
export type BoringVelocityMeasurement = Boring["boringVelocity"][number];
/** A post-sedimentary discontinuity. @internal */
export type PostSedimentaryDiscontinuity = Logs[number]["postSedimentaryDiscontinuity"][number];
/** One not-described interval. @internal */
export type NotDescribedInterval = Logs[number]["notDescribedInterval"][number];
/** A fluid-mud layer. @internal */
export type FluidMudLayer = NonNullable<Bore["fluidMudLayer"]>;
