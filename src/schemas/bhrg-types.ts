/**
 * BHR-G derived types — reconstructed from the generated {@link BHRG_PRODUCER}
 * by indexed access (the generated schema is the single source of truth).
 *
 * BHR-G layers are soil-only (geological). Grain/shell/gravel/peat fractions and
 * their sub-structures live under each `layerComponent`'s `soil`.
 */

import type { Produced } from "../core/producer.js";
import type { BHRG_PRODUCER } from "./bhrg-schema.js";

type Bore = Produced<typeof BHRG_PRODUCER>;
type Logs = NonNullable<Bore["boreholeSampleDescription"]>["descriptiveBoreholeLog"];

/** One geological described layer. @internal */
export type BHRGLayer = Logs[number]["layer"][number];
/** One component of a layer's makeup. */
type LayerComponent = BHRGLayer["layerComponent"][number];
/** A component's soil description. */
type ComponentSoil = NonNullable<LayerComponent["soil"]>;
/** One thin stratum within a layer. @internal */
export type ThinStratum = BHRGLayer["thinStratum"][number];

/** Sand fraction of a soil. @internal */
export type SandFraction = NonNullable<ComponentSoil["sandFraction"]>;
/** One sand constituent. @internal */
export type SandConstituent = SandFraction["sandConstituent"][number];
/** Shell fraction of a soil. @internal */
export type ShellFraction = NonNullable<ComponentSoil["shellFraction"]>;
/** One shell constituent. @internal */
export type ShellConstituent = ShellFraction["shellConstituent"][number];
/** Gravel fraction of a soil. @internal */
export type GravelFraction = NonNullable<ComponentSoil["gravelFraction"]>;
/** One gravel constituent. @internal */
export type GravelConstituent = GravelFraction["gravelConstituent"][number];
/** Peat fraction of a soil. @internal */
export type PeatFraction = NonNullable<ComponentSoil["peatFraction"]>;
/** One peat constituent. @internal */
export type PeatConstituent = PeatFraction["peatConstituent"][number];

/** Munsell colour of a soil. @internal */
export type MunsellColour = NonNullable<ComponentSoil["munsellColour"]>;
/** One mottle. @internal */
export type Mottle = ComponentSoil["mottle"][number];
/** One chunk. @internal */
export type Chunk = ComponentSoil["chunk"][number];
/** Grain-size fraction distribution of a soil. @internal */
export type FractionDistribution = NonNullable<ComponentSoil["fractionDistribution"]>;
/** Fine-fraction distribution for an organic soil. @internal */
export type FineFractionDistributionOrganicSoil = NonNullable<
  FractionDistribution["fineFractionDistributionOrganicSoil"]
>;
/** Fine-fraction distribution for a shelly soil. @internal */
export type FineFractionDistributionShellySoil = NonNullable<
  FractionDistribution["fineFractionDistributionShellySoil"]
>;

/** BHR-G report history. @internal */
export type ReportHistory = NonNullable<Bore["reportHistory"]>;
/** One intermediate event in the report history. @internal */
export type IntermediateEvent = ReportHistory["event"][number];
