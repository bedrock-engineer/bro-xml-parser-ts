import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { WorkersXMLAdapter } from '@/adapters/workers-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

/**
 * Parity suite: the WorkersXMLAdapter (@xmldom/xmldom + xpath, XPath 1.0)
 * must produce byte-identical parse results to the NodeXMLAdapter
 * (@xmldom/xmldom + fontoxpath) on every fixture. Any drift between the
 * two XPath engines (namespace resolution, text-node handling, document
 * order) surfaces here as a deep-equality failure.
 */

const { invalid, ...valid } = fixtures;

const validFixtures = Object.entries(valid).flatMap(([category, entries]) =>
  Object.entries(entries).map(
    ([name, load]) => [`${category}.${name}`, load] as const,
  ),
);

describe('WorkersXMLAdapter parity with NodeXMLAdapter', () => {
  it.each(validFixtures)('parses %s identically', (_label, load) => {
    const xml = load();

    const nodeResult = new BROParser(new NodeXMLAdapter()).parse(xml);
    const workersResult = new BROParser(new WorkersXMLAdapter()).parse(xml);

    expect(workersResult).toEqual(nodeResult);
  });

  it('rejects invalid input like the node adapter does', () => {
    const xml = invalid.unsupportedVersion();

    expect(() => new BROParser(new NodeXMLAdapter()).parse(xml)).toThrow();
    expect(() => new BROParser(new WorkersXMLAdapter()).parse(xml)).toThrow();
  });
});
