import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('Atterberg Limits (Consistency Limits) Parsing', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHR-GT with Atterberg limits data', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000374632');
    expect(bore.boreholeSampleAnalysis).toBeDefined();
  });

  it('should extract 4 investigated intervals', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boreholeSampleAnalysis?.investigatedInterval).toBeDefined();
    expect(bore.boreholeSampleAnalysis?.investigatedInterval.length).toBe(4);
  });

  it('should find consistency limits in first interval', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const firstInterval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(firstInterval.consistencyLimitsDetermination).toBeDefined();
  });

  it('should extract Atterberg limits metadata', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.boreholeSampleAnalysis!.investigatedInterval[0].consistencyLimitsDetermination!;
    expect(cl.determinationProcedure?.code).toBe('ISO17892d12v2018');
    expect(cl.determinationMethod?.code).toBe('casagrandeKleistaaf');
    expect(cl.fractionLarger500um).toEqual({ value: 7.6, uom: '%' });
    expect(cl.usedMedium?.code).toBe('leidingwater');
    expect(cl.performanceIrregularity[0]?.code).toBe('massaProefstukVloeigrens');
  });

  it('should extract calculated limit values', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.boreholeSampleAnalysis!.investigatedInterval[0].consistencyLimitsDetermination!;
    expect(cl.liquidLimit).toEqual({ value: 32.2, uom: '%' });
    expect(cl.plasticLimit).toEqual({ value: 17.14, uom: '%' });
    expect(cl.plasticityIndex).toEqual({ value: 15.05, uom: '%' });
  });

  it('should extract 4 plasticity data points for Casagrande chart', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.boreholeSampleAnalysis!.investigatedInterval[0].consistencyLimitsDetermination!;
    expect(cl.plasticityAtSpecificWaterContent.length).toBe(4);
  });

  it('should parse plasticity data points correctly', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.boreholeSampleAnalysis!.investigatedInterval[0].consistencyLimitsDetermination!;
    const points = cl.plasticityAtSpecificWaterContent;

    // First point
    expect(points[0].waterContent).toEqual({ value: 28.7, uom: '%' });
    expect(points[0].numberOfFalls).toBe(49);

    // Second point
    expect(points[1].waterContent).toEqual({ value: 29.9, uom: '%' });
    expect(points[1].numberOfFalls).toBe(38);

    // Third point
    expect(points[2].waterContent).toEqual({ value: 32.3, uom: '%' });
    expect(points[2].numberOfFalls).toBe(25);

    // Fourth point
    expect(points[3].waterContent).toEqual({ value: 34.3, uom: '%' });
    expect(points[3].numberOfFalls).toBe(16);
  });

  it('should parse second Atterberg limits file', () => {
    const xml = fixtures.bhrGtBma.atterberg2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000374647');
    expect(bore.boreholeSampleAnalysis).toBeDefined();
    expect(bore.boreholeSampleAnalysis?.investigatedInterval.length).toBe(4);

    const firstInterval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(firstInterval.consistencyLimitsDetermination).toBeDefined();
  });

  it('should handle intervals without Atterberg limits', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    // Other intervals don't have consistency limits
    const secondInterval = bore.boreholeSampleAnalysis!.investigatedInterval[1];
    expect(secondInterval.consistencyLimitsDetermination).toBeUndefined();

    const thirdInterval = bore.boreholeSampleAnalysis!.investigatedInterval[2];
    expect(thirdInterval.consistencyLimitsDetermination).toBeUndefined();

    const fourthInterval = bore.boreholeSampleAnalysis!.investigatedInterval[3];
    expect(fourthInterval.consistencyLimitsDetermination).toBeUndefined();
  });

  it('should validate first interval has all determination types', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const firstInterval = bore.boreholeSampleAnalysis!.investigatedInterval[0];

    // Should have these determinations
    expect(firstInterval.waterContentDetermination).toBeDefined();
    expect(firstInterval.organicMatterContentDetermination).toBeDefined();
    expect(firstInterval.carbonateContentDetermination).toBeDefined();
    expect(firstInterval.particleSizeDistributionDetermination).toBeDefined();
    expect(firstInterval.consistencyLimitsDetermination).toBeDefined();

    // Should NOT have these
    expect(firstInterval.volumetricMassDensityDetermination).toBeUndefined();
    expect(firstInterval.volumetricMassDensityOfSolidsDetermination).toBeUndefined();
  });
});
