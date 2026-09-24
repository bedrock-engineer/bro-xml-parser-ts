import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('Settlement & Permeability Determination Parsing', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHR-GT with the expected determination-type distribution', () => {
    const xml = fixtures.bhrGtBma.settlementPermeability();
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000377186');

    const counts = { waterContent: 0, particleSize: 0, settlement: 0, permeability: 0 };
    for (const interval of bore.analysis!.investigatedIntervals) {
      if (interval.waterContentDetermination) counts.waterContent++;
      if (interval.particleSizeDistributionDetermination) counts.particleSize++;
      if (interval.settlementCharacteristicsDetermination) counts.settlement++;
      if (interval.saturatedPermeabilityDetermination) counts.permeability++;
    }
    expect(counts).toEqual({ waterContent: 8, particleSize: 1, settlement: 2, permeability: 2 });
  });

  it('should extract 9 investigated intervals', () => {
    const xml = fixtures.bhrGtBma.settlementPermeability();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis?.investigatedIntervals).toBeDefined();
    expect(bore.analysis?.investigatedIntervals.length).toBe(9);
  });

  describe('Settlement Characteristics (Oedometer Test)', () => {
    it('should place settlement determinations in exactly intervals 5 and 6', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const withSettlement = bore.analysis!.investigatedIntervals
        .map((iv, i) => (iv.settlementCharacteristicsDetermination ? i : -1))
        .filter(i => i >= 0);
      // Exact set implies all other intervals (incl. the 4th) lack it
      expect(withSettlement).toEqual([5, 6]);

      expect(bore.analysis!.investigatedIntervals[5].beginDepth).toBe(2.59);
      expect(
        bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination
      ).toBeDefined();
    });

    it('should extract settlement metadata', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sc = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!;
      expect(sc.determinationProcedure?.code).toBe('ISO17892d5v2017');
      expect(sc.determinationMethod?.code).toBe('samendrukkenBelastinggestuurd');
      expect(sc.ringDiameter).toBe(63.5);
      expect(sc.sampleMoistness?.code).toBe('veldvochtig');
      expect(sc.filterPaperUsed).toBe(false);
      expect(sc.temperature).toBeDefined();
    });

    it('should extract boolean flags correctly', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sc = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!;
      expect(sc.apparatusDeformationApplied).toBe(true);
      expect(sc.bearingFrictionCorrectionApplied).toBe(false);
      expect(sc.irregularResult).toBe(false);
    });

    it('should extract 5 determination steps', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sc = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!;
      expect(sc.determinationSteps.length).toBe(5);
    });

    it('should parse step metadata correctly', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const steps = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!.determinationSteps;

      // First step (loading)
      expect(steps[0].stepNumber).toBe(1);
      expect(steps[0].stepType?.code).toBe('belastingstap');
      expect(steps[0].verticalStress).toBe(5.0);
      expect(steps[0].wetPerformed).toBe(true);
      expect(steps[0].swellObserved).toBe(false);

      // Second step
      expect(steps[1].stepNumber).toBe(2);
      expect(steps[1].verticalStress).toBe(10.0);

      // Fifth step (last loading step)
      expect(steps[4].stepNumber).toBe(5);
      expect(steps[4].stepType?.code).toBe('belastingstap');
      expect(steps[4].verticalStress).toBe(80.0);
    });

    it('should parse height change time-series data', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const steps = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!.determinationSteps;
      const firstStep = steps[0];

      // Should have 130+ data points
      expect(firstStep.heightChangeDuringSettlement.length).toBeGreaterThan(130);

      // First data point
      expect(firstStep.heightChangeDuringSettlement[0].time).toBe(0.0);
      expect(firstStep.heightChangeDuringSettlement[0].height).toBe(0.0);

      // Second data point
      expect(firstStep.heightChangeDuringSettlement[1].time).toBe(1.0);
      expect(firstStep.heightChangeDuringSettlement[1].height).toBeCloseTo(0.02);
    });

    it('should parse time-series data for all steps', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const steps = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!.determinationSteps;

      // Each step carries its own settlement time-series
      expect(steps.map(step => step.heightChangeDuringSettlement.length)).toEqual([
        131, 132, 132, 132, 132,
      ]);
    });
  });

  describe('Saturated Permeability (Hydraulic Conductivity)', () => {
    it('should place permeability determinations in exactly intervals 7 and 8', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const withPermeability = bore.analysis!.investigatedIntervals
        .map((iv, i) => (iv.saturatedPermeabilityDetermination ? i : -1))
        .filter(i => i >= 0);
      // Exact set implies all other intervals (incl. the 1st) lack it
      expect(withPermeability).toEqual([7, 8]);

      expect(bore.analysis!.investigatedIntervals[7].beginDepth).toBe(7.44);
      expect(
        bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination
      ).toBeDefined();
    });

    it('should extract permeability metadata', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sp = bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination!;
      expect(sp.determinationProcedure?.code).toBe('ISO17892d11v2019');
      expect(sp.determinationMethod?.code).toBe('constantHead');
      expect(sp.usedMedium?.code).toBe('leidingwater');
    });

    it('should extract boolean flags correctly', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sp = bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination!;
      expect(sp.specimenMade).toBe(false);
      expect(sp.saturatedWithCO2).toBe(false);
      expect(sp.verticallyDetermined).toBe(true);
      expect(sp.currentDownwards).toBe(false);
      expect(sp.waterDegassed).toBe(true);
    });

    it('should extract temperature and gradient', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sp = bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination!;
      expect(sp.temperature).toBe(17.0);
      expect(sp.maximumGradient).toBeCloseTo(6.1);
    });

    it('should extract permeability at specific density', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sp = bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination!;
      expect(sp.saturatedPermeabilityAtSpecificDensity).toHaveLength(1);

      const measurement = sp.saturatedPermeabilityAtSpecificDensity[0];
      expect(measurement.dryVolumetricMassDensity).toBe(1.7);
      expect(measurement.saturatedPermeability).toBe(0.000015);
    });
  });
});
