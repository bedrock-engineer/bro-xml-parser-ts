import { describe, it, expectTypeOf } from 'vitest';
import type {
  HeightAtSpecificTime,
  ShearStressAtSpecificStrain,
} from '@/schemas/bhrgt-analysis';

/**
 * Type-level gate for columns inference: a row type is inferred from its column
 * spec — every column a required key typed as its cell parser's return
 * (`col.num` → `number | null`). This corrects the old hand-written types, which
 * over-claimed non-null and marked always-present columns optional.
 * Runs under `vitest --typecheck`.
 */
describe('RowOf (inferred column-spec rows)', () => {
  it('every column is a required key typed number | null', () => {
    expectTypeOf<HeightAtSpecificTime>().toEqualTypeOf<{
      time: number | null;
      height: number | null;
    }>();
  });

  it('optional-column entries are still present keys (decoder assigns null)', () => {
    // porePressure/volumeChange are `optional: true` in the spec, but the decoder
    // always assigns the key ⇒ present, number | null (not an optional `?` key).
    expectTypeOf<ShearStressAtSpecificStrain>().toEqualTypeOf<{
      time: number | null;
      axialStrain: number | null;
      deviatorStress: number | null;
      cellPressure: number | null;
      porePressure: number | null;
      volumeChange: number | null;
    }>();
  });
});
