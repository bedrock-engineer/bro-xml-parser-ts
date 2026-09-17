import { describe, it, expect } from 'vitest';
import { decodeColumns, col, columns } from '@/core/columns';
import { object_ } from '@/core/producer';
import { SchemaParser } from '@/core/schema-parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';

/**
 * Direct unit tests for the leaf-content decoder. The whole interface is a
 * (string, spec) pair → typed rows, so these need no XML at all.
 */
describe('decodeColumns', () => {
  it('decodes space-separated rows of comma-delimited columns', () => {
    const rows = decodeColumns<{ time: number | null; height: number | null }>(
      '0,10.5 1,9.8 2,9.1',
      [
        { name: 'time', parse: col.num },
        { name: 'height', parse: col.num },
      ],
    );
    expect(rows).toEqual([
      { time: 0, height: 10.5 },
      { time: 1, height: 9.8 },
      { time: 2, height: 9.1 },
    ]);
  });

  it('applies the -999999 / NaN sentinel rule in one place', () => {
    const rows = decodeColumns<{ t: number | null; v: number | null }>(
      '1,-999999 2,NaN 3,4.2',
      [
        { name: 't', parse: col.num },
        { name: 'v', parse: col.num },
      ],
    );
    expect(rows).toEqual([
      { t: 1, v: null },
      { t: 2, v: null },
      { t: 3, v: 4.2 },
    ]);
  });

  it('drops rows shorter than the required column count', () => {
    const rows = decodeColumns<{ a: number | null; b: number | null; c: number | null }>(
      '1,2,3 4,5 6,7,8',
      [
        { name: 'a', parse: col.num },
        { name: 'b', parse: col.num },
        { name: 'c', parse: col.num },
      ],
    );
    // The "4,5" row is dropped (only 2 of 3 required cells).
    expect(rows).toEqual([
      { a: 1, b: 2, c: 3 },
      { a: 6, b: 7, c: 8 },
    ]);
  });

  it('keeps short rows when the trailing column is optional', () => {
    const rows = decodeColumns<{ a: number | null; note: string | null }>(
      '1,hi 2',
      [
        { name: 'a', parse: col.num },
        { name: 'note', parse: col.str, optional: true },
      ],
    );
    expect(rows).toEqual([
      { a: 1, note: 'hi' },
      { a: 2, note: null },
    ]);
  });

  it('supports mixed parsers and custom separators', () => {
    const rows = decodeColumns<{ n: number | null; label: string | null; on: boolean | null }>(
      '1|zand|ja;2|klei|nee',
      [
        { name: 'n', parse: col.num },
        { name: 'label', parse: col.str },
        { name: 'on', parse: col.bool },
      ],
      { rowSeparator: ';', colSeparator: '|' },
    );
    expect(rows).toEqual([
      { n: 1, label: 'zand', on: true },
      { n: 2, label: 'klei', on: false },
    ]);
  });

  it('skips positions marked null (column mask)', () => {
    // Only columns 0 and 2 are wanted; column 1 is skipped.
    const rows = decodeColumns<{ depth: number | null; cone: number | null }>(
      '0.5,99,1.2 1.0,99,1.4',
      [{ name: 'depth', parse: col.num }, null, { name: 'cone', parse: col.num }],
    );
    expect(rows).toEqual([
      { depth: 0.5, cone: 1.2 },
      { depth: 1.0, cone: 1.4 },
    ]);
  });

  it('returns [] for empty/absent text', () => {
    expect(decodeColumns('', [{ name: 'a', parse: col.num }])).toEqual([]);
    expect(decodeColumns(null, [{ name: 'a', parse: col.num }])).toEqual([]);
    expect(decodeColumns('   ', [{ name: 'a', parse: col.num }])).toEqual([]);
  });
});

describe('columns() producer bridge', () => {
  const adapter = new NodeXMLAdapter();
  const parser = new SchemaParser(adapter, {});

  it('reads and decodes a values leaf into typed rows', () => {
    const schema = object_({
      fields: {
        series: columns<{ time: number | null; value: number | null }>('./values', [
          { name: 'time', parse: col.num },
          { name: 'value', parse: col.num },
        ]),
      },
    });
    const doc = adapter.parseXML('<doc><root><values>0,1.5 1,2.5</values></root></doc>');
    const { value } = parser.produce(doc, schema as never, 'doc') as {
      value: { series: Array<{ time: number | null; value: number | null }> };
    };
    expect(value.series).toEqual([
      { time: 0, value: 1.5 },
      { time: 1, value: 2.5 },
    ]);
  });

  it('yields [] when the values leaf is absent', () => {
    const schema = object_({
      fields: {
        series: columns<{ time: number | null }>('./values', [{ name: 'time', parse: col.num }]),
      },
    });
    const doc = adapter.parseXML('<doc><root><other/></root></doc>');
    const { value } = parser.produce(doc, schema as never, 'doc') as {
      value: { series: unknown[] };
    };
    expect(value.series).toEqual([]);
  });
});
