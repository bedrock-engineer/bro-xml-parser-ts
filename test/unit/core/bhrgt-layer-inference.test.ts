import { describe, it, expectTypeOf } from 'vitest';
import type {
  BHRGTLayer,
  BHRGTSoilLayer,
  BHRGTRockLayer,
  BHRGTLayerBase,
  SoilDescription,
  RockDescription,
} from '@/schemas/bore-types';
import type { Coded } from '@/core/producer';

/**
 * Type-level gate for the XSD-faithful layer shape. A described layer has no
 * `material` tag: it is `{ …shared, soil, rock }` where the soil/rock
 * descriptions carry the branch-specific fields. A "soil layer" is one narrowed
 * to a present `soil` description; a "rock layer" one narrowed to a present
 * `rock`. Soil-specific fields (e.g. geotechnicalSoilName) live under `.soil`.
 * Runs under `vitest --typecheck`.
 */
describe('BHRGTLayer (soil/rock structural distinction)', () => {
  it('carries soil and rock as distinct sub-descriptions, not a material tag', () => {
    // There is no `material` discriminant any more.
    expectTypeOf<BHRGTLayer>().not.toHaveProperty('material');

    // The layer exposes `soil` and `rock` sub-objects that hold the
    // branch-specific fields; presence of one vs the other is what tells a
    // soil layer from a rock layer.
    expectTypeOf<BHRGTLayer>().toHaveProperty('soil');
    expectTypeOf<BHRGTLayer>().toHaveProperty('rock');

    // The narrowed branches guarantee their own sub-description.
    expectTypeOf<BHRGTSoilLayer['soil']>().toEqualTypeOf<SoilDescription>();
    expectTypeOf<BHRGTRockLayer['rock']>().toEqualTypeOf<RockDescription>();

    // Soil-specific fields now live under `.soil`, not on the layer itself.
    expectTypeOf<BHRGTLayer>().not.toHaveProperty('geotechnicalSoilName');
    expectTypeOf<BHRGTSoilLayer['soil']>().toHaveProperty('geotechnicalSoilName');

    // geotechnicalSoilName is a coded value: Coded | null
    expectTypeOf<
      BHRGTSoilLayer['soil']['geotechnicalSoilName']
    >().toEqualTypeOf<Coded | null>();

    // rock-only fields live under `.rock`, soil-only under `.soil` — they don't
    // bleed across branches.
    expectTypeOf<RockDescription>().not.toHaveProperty('geotechnicalSoilName');
    expectTypeOf<SoilDescription>().not.toHaveProperty('rockType');
    expectTypeOf<RockDescription>().toHaveProperty('rockType');
  });

  it('keeps shared coded fields on the layer base, not under soil/rock', () => {
    // `bedding`/`specialMaterial` are shared base fields (a coded value each),
    // living on the layer base rather than inside a soil/rock description.
    expectTypeOf<BHRGTLayerBase['bedding']>().toEqualTypeOf<Coded | null>();
    expectTypeOf<BHRGTLayerBase['specialMaterial']>().toEqualTypeOf<Coded | null>();
    // They are not part of the soil sub-description.
    expectTypeOf<SoilDescription>().not.toHaveProperty('bedding');
    expectTypeOf<SoilDescription>().not.toHaveProperty('specialMaterial');
  });
});
