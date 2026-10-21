import { describe, it, expect } from 'vitest';
import { SchemaParser } from '@/core/schema-parser';
import {
  object,
  array,
  text,
  number,
  code,
  measure,
  custom,
} from '@/core/producer';
import { NodeXMLAdapter } from '@/adapters/node-adapter';

/**
 * Direct unit tests for the deepened module's interface: `SchemaParser.produce`.
 *
 * These exercise the interpreter through synthetic (namespace-free) XML rather
 * than multi-MB BRO fixtures, so the recursion, the absence model, and the
 * `NodeLens` seam can be tested in isolation — the seams that GLD's declarative
 * schema does not itself reach (custom, required failures).
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
    const schema = object({
      fields: {
        name: text('./name'),
        depth: number('./depth'),
        location: object({
          at: './loc',
          fields: { x: number('./x'), y: number('./y') },
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
    const schema = object({
      fields: {
        location: object({ at: './loc', fields: { x: number('./x') } }),
      },
    });
    const { value } = produce<{ location: unknown }>('<name>x</name>', schema);
    expect(value.location).toBeNull();
  });

  it('collects array items and yields [] when none match', () => {
    const schema = object({
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
      const schema = object({
        fields: {
          tube: object({
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
      const schema = object({
        fields: {
          rows: array({
            each: './row',
            item: object({ fields: { v: number('./v', { presence: 'required' }) } }),
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
      const schema = object({
        fields: { id: text('./id', { presence: 'required' }) },
      });
      expect(() => produce('<other>x</other>', schema)).toThrow(/Required field missing/);
    });

    it('omits a key entirely when presence is "omit" and the value is absent', () => {
      const schema = object({
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

  describe('code leaf', () => {
    it('captures { code, codeSpace } from text + the codeSpace attribute', () => {
      const schema = object({
        fields: { quality: code('./qualityClass') },
      });
      const { value } = produce<{ quality: { code: string; codeSpace: string } | null }>(
        '<qualityClass codeSpace="urn:bro:cpt:QualityClass">klasse2</qualityClass>',
        schema,
      );
      expect(value.quality).toEqual({ code: 'klasse2', codeSpace: 'urn:bro:cpt:QualityClass' });
    });

    it('nulls an absent coded element (optional), keeping the key', () => {
      const schema = object({ fields: { quality: code('./qualityClass') } });
      const { value } = produce<{ quality: unknown }>('<other/>', schema);
      expect(value).toEqual({ quality: null });
    });

    it('drops empty coded items from an array without a warning', () => {
      const schema = object({
        fields: { codes: array({ each: './c', item: code() }) },
      });
      const { value, warnings } = produce<{ codes: Array<{ code: string; codeSpace: string }> }>(
        '<c codeSpace="urn:bro:X">a</c><c/><c codeSpace="urn:bro:X">b</c>',
        schema,
      );
      expect(value.codes).toEqual([
        { code: 'a', codeSpace: 'urn:bro:X' },
        { code: 'b', codeSpace: 'urn:bro:X' },
      ]);
      expect(warnings).toEqual([]);
    });

    it('omits a coded key entirely when presence is "omit" and it is absent', () => {
      const schema = object({
        fields: {
          id: text('./id'),
          quality: code('./qualityClass', { presence: 'omit' }),
        },
      });
      const { value } = produce<Record<string, unknown>>('<id>x</id>', schema);
      expect(value).toEqual({ id: 'x' });
      expect('quality' in value).toBe(false);
    });

    it('warns when text is present but the codeSpace attribute is missing', () => {
      const schema = object({ fields: { quality: code('./qualityClass') } });
      const { value, warnings } = produce<{ quality: unknown }>(
        '<qualityClass>klasse2</qualityClass>',
        schema,
      );
      expect(value.quality).toBeNull();
      expect(warnings).toEqual(['Coded value "klasse2" has no codeSpace attribute']);
    });
  });

  describe('measure leaf', () => {
    it('warns when the value parses but the uom attribute is missing', () => {
      const schema = object({ fields: { depth: measure('./depth') } });
      const { value, warnings } = produce<{ depth: unknown }>('<depth>7.4</depth>', schema);
      expect(value.depth).toBeNull();
      expect(warnings).toEqual(['Measured value "7.4" has no uom attribute']);
    });
  });

  describe('custom / NodeLens seam', () => {
    it('hands a custom producer a relative-only lens', () => {
      const schema = object({
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

});
