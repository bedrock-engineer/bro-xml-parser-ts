import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { BROParseError } from '@/types';
import { fixtures } from '@test/helpers/fixture-loader';

describe('Error Handling (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should throw on malformed XML', () => {
    const malformed = '<root><unclosed>';
    expect(() => parser.parseCPT(malformed)).toThrow();
  });

  it('should throw on empty string', () => {
    expect(() => parser.parseCPT('')).toThrow();
  });

  it('should throw on incompatible major version', () => {
    const wrongVersion = fixtures.invalid.unsupportedVersion();

    expect(() => parser.parseCPT(wrongVersion)).toThrow(BROParseError);
    expect(() => parser.parseCPT(wrongVersion)).toThrow(
      /Incompatible schema major version/
    );
  });

  it.skip('should throw on wrong document type', () => {
    // TODO: Need a proper dispatch format bore file to test this
    // Current testBorehole.xml uses registration format with prefixed namespaces
    const boreDoc = fixtures.bore.registration();

    expect(() => parser.parseCPT(boreDoc)).toThrow(BROParseError);
    expect(() => parser.parseCPT(boreDoc)).toThrow(/Wrong document type/);
  });

  it('should provide helpful error details', () => {
    const wrongVersion = fixtures.invalid.unsupportedVersion();

    try {
      parser.parseCPT(wrongVersion);
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(BROParseError);
      if (error instanceof BROParseError) {
        expect(error.code).toBeTruthy();
        expect(error.details).toBeTruthy();
      }
    }
  });
});
