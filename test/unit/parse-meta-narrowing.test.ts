import { describe, it, expectTypeOf } from 'vitest';
import type { BROData, CPTData, BHRGTData, BHRGData, GMWData, GLDData } from '@/types/index';

/**
 * Type-level gate: each `*Data` carries a top-level `dataType` literal, so a
 * `switch (data.dataType)` narrows the {@link BROData} union. (TypeScript does
 * not narrow on a nested discriminant like `data.meta.dataType`.) Runs under
 * `vitest --typecheck`.
 */
describe('BROData discrimination', () => {
  it('narrows the union on the top-level dataType', () => {
    const narrow = (data: BROData) => {
      switch (data.dataType) {
        case 'CPT':
          expectTypeOf(data).toEqualTypeOf<CPTData>();
          break;
        case 'BHR-GT':
          expectTypeOf(data).toEqualTypeOf<BHRGTData>();
          break;
        case 'BHR-G':
          expectTypeOf(data).toEqualTypeOf<BHRGData>();
          break;
        case 'GMW':
          expectTypeOf(data).toEqualTypeOf<GMWData>();
          break;
        case 'GLD':
          expectTypeOf(data).toEqualTypeOf<GLDData>();
          break;
      }
    };
    void narrow;
  });
});
