import { describe, it, expect } from 'vitest';
import { SchemaParser } from '@/core/schema-parser';
import {
  object_,
  array,
  text,
  number_,
  custom,
  oneOf,
} from '@/core/producer';
import { NodeXMLAdapter } from '@/adapters/node-adapter';

/**
 * Direct unit tests for the deepened module's interface: `SchemaParser.produce`.
 *
 * These exercise the interpreter through synthetic (namespace-free) XML rather
 * than multi-MB BRO fixtures, so the recursion, the absence model, and the
 * `NodeLens` seam can be tested in isolation — the seams that GLD's declarative
 * schema does not itself reach (custom, oneOf, required failures).
 */

const adapter = new NodeXMLAdapter();
const parser = new SchemaParser(adapter, {});

/** Produce against `<root>{inner}</root>`, with `root` as the root element. */
function produce<T>(inner: string, root: Parameters<typeof parser.produce>[1]) {
  const doc = adapter.parseXML(`<doc><root>${inner}</root></doc>`);
  return parser.produce(doc, root as never, 'doc') as { value: T; warnings: string[] };
}

describe('SchemaParser.produce', () => {
  it('decodes scalars and recurses into nested objects', () => {
    const schema = object_({
      fields: {
        name: text('./name'),
        depth: number_('./depth'),
        location: object_({
          at: './loc',
          fields: { x: number_('./x'), y: number_('./y') },
        }),
      },
    });

    const { value } = produce<{
      name: string | null;
      depth: number | null;
      location: { x: number | null; y: number | null } | null;
    }>('<name>well</name><depth>12.5</depth><loc><x>1</x><y>2</y></loc>', schema);

    expect(value).toEqual({
      name: 'well',
      depth: 12.5,
      location: { x: 1, y: 2 },
    });
  });

  it('nulls a nested object whose container is absent (optional)', () => {
    const schema = object_({
      fields: {
        location: object_({ at: './loc', fields: { x: number_('./x') } }),
      },
    });
    const { value } = produce<{ location: unknown }>('<name>x</name>', schema);
    expect(value.location).toBeNull();
  });

  it('collects array items and yields [] when none match', () => {
    const schema = object_({
      fields: {
        nets: array({ each: './net', item: text('./id') }),
        empty: array({ each: './none', item: text('./id') }),
      },
    });
    const { value } = produce<{ nets: (string | null)[]; empty: unknown[] }>(
      '<net><id>A</id></net><net><id>B</id></net>',
      schema,
    );
    expect(value.nets).toEqual(['A', 'B']);
    expect(value.empty).toEqual([]);
  });

  describe('absence model', () => {
    it('nulls the nearest enclosing object when a nested required field is missing', () => {
      const schema = object_({
        fields: {
          tube: object_({
            at: './tube',
            fields: { id: text('./id', { presence: 'required' }) },
          }),
        },
      });
      // <tube> exists but its required <id> is absent -> the tube object nulls.
      const { value } = produce<{ tube: unknown }>('<tube><other>x</other></tube>', schema);
      expect(value.tube).toBeNull();
    });

    it('drops array items that fail a required field, recording a warning', () => {
      const schema = object_({
        fields: {
          rows: array({
            each: './row',
            item: object_({ fields: { v: number_('./v', { presence: 'required' }) } }),
          }),
        },
      });
      const { value, warnings } = produce<{ rows: Array<{ v: number | null }> }>(
        '<row><v>1</v></row><row><skip>1</skip></row><row><v>3</v></row>',
        schema,
      );
      expect(value.rows).toEqual([{ v: 1 }, { v: 3 }]);
      expect(warnings).toHaveLength(1);
      expect(warnings[0]).toMatch(/Dropped an item/);
    });

    it('throws only when a required field is missing at the document root', () => {
      const schema = object_({
        fields: { id: text('./id', { presence: 'required' }) },
      });
      expect(() => produce('<other>x</other>', schema)).toThrow(/Required field missing/);
    });

    it('omits a key entirely when presence is "omit" and the value is absent', () => {
      const schema = object_({
        fields: {
          id: text('./id'),
          note: text('./note', { presence: 'omit' }),
        },
      });
      const { value } = produce<Record<string, unknown>>('<id>x</id>', schema);
      expect(value).toEqual({ id: 'x' });
      expect('note' in value).toBe(false);
    });
  });

  describe('custom / NodeLens seam', () => {
    it('hands a custom producer a relative-only lens', () => {
      const schema = object_({
        fields: {
          csv: custom({
            at: './series',
            produce: (lens) => {
              const raw = lens.textAt('./values');
              const unit = lens.attr('./values/@uom');
              const labels = lens.all('./label').map((l) => l.text());
              return {
                points: raw ? raw.split(',').map(Number) : [],
                unit,
                labels,
              };
            },
          }),
        },
      });
      const { value } = produce<{
        csv: { points: number[]; unit: string | null; labels: (string | null)[] };
      }>(
        '<series><values uom="m">1,2,3</values><label>a</label><label>b</label></series>',
        schema,
      );
      expect(value.csv).toEqual({ points: [1, 2, 3], unit: 'm', labels: ['a', 'b'] });
    });
  });

  describe('oneOf discriminated union', () => {
    const schema = object_({
      fields: {
        layer: oneOf({
          at: './layer',
          tagAs: 'kind',
          base: { top: number_('./top') },
          branches: [
            { when: './soil', at: './soil', tag: 'soil', fields: { name: text('./name') } },
            { when: './rock', at: './rock', tag: 'rock', fields: { hardness: text('./hardness') } },
          ],
        }),
      },
    });

    it('selects the first matching branch and merges base + tag', () => {
      const { value } = produce<{ layer: Record<string, unknown> }>(
        '<layer><top>0.5</top><soil><name>zand</name></soil></layer>',
        schema,
      );
      expect(value.layer).toEqual({ kind: 'soil', top: 0.5, name: 'zand' });
    });

    it('picks the other branch by its `when` test', () => {
      const { value } = produce<{ layer: Record<string, unknown> }>(
        '<layer><top>1</top><rock><hardness>high</hardness></rock></layer>',
        schema,
      );
      expect(value.layer).toEqual({ kind: 'rock', top: 1, hardness: 'high' });
    });
  });
});
