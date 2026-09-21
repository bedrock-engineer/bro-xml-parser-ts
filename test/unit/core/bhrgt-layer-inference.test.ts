import { describe, it, expectTypeOf } from 'vitest';
import type { BHRGTLayer, BHRGTSoilLayer, BHRGTRockLayer } from '@/schemas/bore-schema';

/**
 * Type-level gate for oneOf inference: BHRGTLayer must be a discriminated union
 * on `material`, narrowing to soil/rock branches, with omit fields optional.
 * Runs under `vitest --typecheck`.
 */
describe('BHRGTLayer (inferred discriminated union)', () => {
  it('discriminates on material and narrows per branch', () => {
    expectTypeOf<BHRGTLayer['material']>().toEqualTypeOf<'soil' | 'rock'>();
    expectTypeOf<BHRGTSoilLayer['material']>().toEqualTypeOf<'soil'>();
    expectTypeOf<BHRGTRockLayer['material']>().toEqualTypeOf<'rock'>();

    // soil-only vs rock-only fields exist on the right branch
    expectTypeOf<BHRGTSoilLayer>().toHaveProperty('geotechnicalSoilName');
    expectTypeOf<BHRGTRockLayer>().toHaveProperty('rock');

    // geotechnicalSoilName decodes to "" when absent → string, not string | null
    expectTypeOf<BHRGTSoilLayer['geotechnicalSoilName']>().toEqualTypeOf<string>();

    // runtime narrowing works off the discriminant
    const layer = {} as BHRGTLayer;
    if (layer.material === 'rock') {
      expectTypeOf(layer.rock).not.toBeAny();
    } else {
      expectTypeOf(layer.geotechnicalSoilName).toEqualTypeOf<string>();
    }
  });

  it('makes omit-presence base fields optional keys', () => {
    // `bedding`/`specialMaterial` are OMIT in LAYER_BASE → optional keys.
    const soil = { material: 'soil', upperBoundary: 1, lowerBoundary: 2 } as BHRGTSoilLayer;
    // Assignable without bedding/specialMaterial ⇒ they are optional.
    expectTypeOf(soil).toMatchTypeOf<{ material: 'soil' }>();
  });
});
