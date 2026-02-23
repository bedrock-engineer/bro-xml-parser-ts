import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('Quality Regime Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should detect IMBRO quality regime', () => {
    const xml = fixtures.cpt.imbro();
    const cpt = parser.parseCPT(xml);

    expect(cpt.qualityRegime).toBe('IMBRO');
  });

  it('should detect IMBRO/A quality regime', () => {
    const xml = fixtures.cpt.imbroa();
    const cpt = parser.parseCPT(xml);

    expect(cpt.qualityRegime).toBe('IMBRO/A');
  });

  it('should parse both regimes without errors', () => {
    const imbroXml = fixtures.cpt.imbro();
    const imbroaXml = fixtures.cpt.imbroa();

    const imbro = parser.parseCPT(imbroXml);
    const imbroa = parser.parseCPT(imbroaXml);

    expect(imbro.broId).toBeTruthy();
    expect(imbroa.broId).toBeTruthy();
    expect(imbro.data.length).toBeGreaterThan(0);
    expect(imbroa.data.length).toBeGreaterThan(0);
  });
});
