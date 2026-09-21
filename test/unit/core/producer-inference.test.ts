import { describe, it, expectTypeOf } from 'vitest';
import { object_, text, number_, array } from '@/core/producer';
import type { Produced } from '@/core/producer';

/**
 * Type-level gate for presence-aware inference: a `presence: "omit"` field must
 * become an OPTIONAL key (`key?:`), everything else a required key. Runs under
 * `vitest --typecheck`.
 */
describe('presence-aware ProducedFields', () => {
  it('maps omit → optional key, keeps others required', () => {
    const P = object_({
      fields: {
        keep: text('a'),
        drop: text('b', { presence: 'omit' }),
        num: number_('c'),
        list: array({ each: 'd', item: text(), presence: 'omit' }),
      },
    });
    type Out = Produced<typeof P>;

    expectTypeOf<Out>().toEqualTypeOf<{
      keep: string | null;
      num: number | null;
      drop?: string | null;
      list?: Array<string | null>;
    }>();
  });
});
