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
    expect(bore.analysis).toBeDefined();
  });

  it('should extract 4 investigated intervals', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis?.investigatedIntervals).toBeDefined();
    expect(bore.analysis?.investigatedIntervals.length).toBe(4);
  });

  it('should find consistency limits in first interval', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const firstInterval = bore.analysis!.investigatedIntervals[0];
    expect(firstInterval.consistencyLimitsDetermination).toBeDefined();
  });

  it('should extract Atterberg limits metadata', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.analysis!.investigatedIntervals[0].consistencyLimitsDetermination!;
    expect(cl.determinationProcedure).toBe('ISO17892d12v2018');
    expect(cl.determinationMethod).toBe('casagrandeKleistaaf');
    expect(cl.fractionLarger500um).toBe(7.60);
    expect(cl.usedMedium).toBe('leidingwater');
    expect(cl.performanceIrregularity).toBe('massaProefstukVloeigrens');
  });

  it('should extract calculated limit values', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.analysis!.investigatedIntervals[0].consistencyLimitsDetermination!;
    expect(cl.liquidLimit).toBe(32.2);
    expect(cl.plasticLimit).toBe(17.14);
    expect(cl.plasticityIndex).toBe(15.05);
  });

  it('should extract 4 plasticity data points for Casagrande chart', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.analysis!.investigatedIntervals[0].consistencyLimitsDetermination!;
    expect(cl.plasticityAtSpecificWaterContent.length).toBe(4);
  });

  it('should parse plasticity data points correctly', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const cl = bore.analysis!.investigatedIntervals[0].consistencyLimitsDetermination!;
    const points = cl.plasticityAtSpecificWaterContent;

    // First point
    expect(points[0].waterContent).toBe(28.7);
    expect(points[0].numberOfFalls).toBe(49);

    // Second point
    expect(points[1].waterContent).toBe(29.9);
    expect(points[1].numberOfFalls).toBe(38);

    // Third point
    expect(points[2].waterContent).toBe(32.3);
    expect(points[2].numberOfFalls).toBe(25);

    // Fourth point
    expect(points[3].waterContent).toBe(34.3);
    expect(points[3].numberOfFalls).toBe(16);
  });

  it('should parse second Atterberg limits file', () => {
    const xml = fixtures.bhrGtBma.atterberg2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000374647');
    expect(bore.analysis).toBeDefined();
    expect(bore.analysis?.investigatedIntervals.length).toBe(4);

    const firstInterval = bore.analysis!.investigatedIntervals[0];
    expect(firstInterval.consistencyLimitsDetermination).toBeDefined();
  });

  it('should handle intervals without Atterberg limits', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    // Other intervals don't have consistency limits
    const secondInterval = bore.analysis!.investigatedIntervals[1];
    expect(secondInterval.consistencyLimitsDetermination).toBeUndefined();

    const thirdInterval = bore.analysis!.investigatedIntervals[2];
    expect(thirdInterval.consistencyLimitsDetermination).toBeUndefined();

    const fourthInterval = bore.analysis!.investigatedIntervals[3];
    expect(fourthInterval.consistencyLimitsDetermination).toBeUndefined();
  });

  it('should validate first interval has all determination types', () => {
    const xml = fixtures.bhrGtBma.atterberg();
    const bore = parser.parseBHRGT(xml);

    const firstInterval = bore.analysis!.investigatedIntervals[0];

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
