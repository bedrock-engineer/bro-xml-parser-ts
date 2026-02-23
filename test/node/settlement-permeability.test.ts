import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('Settlement & Permeability Determination Parsing', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHR-GT with settlement and permeability data', () => {
    const xml = fixtures.bhrGtBma.settlementPermeability();
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000377186');
    expect(bore.analysis).toBeDefined();
  });

  it('should extract 9 investigated intervals', () => {
    const xml = fixtures.bhrGtBma.settlementPermeability();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis?.investigatedIntervals).toBeDefined();
    expect(bore.analysis?.investigatedIntervals.length).toBe(9);
  });

  describe('Settlement Characteristics (Oedometer Test)', () => {
    it('should find settlement determination in fifth interval', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const fifthInterval = bore.analysis!.investigatedIntervals[5];
      expect(fifthInterval.settlementCharacteristicsDetermination).toBeDefined();
    });

    it('should extract settlement metadata', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sc = bore.analysis!.investigatedIntervals[5].settlementCharacteristicsDetermination!;
      expect(sc.determinationProcedure).toBe('ISO17892d5v2017');
      expect(sc.determinationMethod).toBe('samendrukkenBelastinggestuurd');
      expect(sc.ringDiameter).toBe(63.5);
      expect(sc.sampleMoistness).toBe('veldvochtig');
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
      expect(steps[0].stepType).toBe('belastingstap');
      expect(steps[0].verticalStress).toBe(5.0);
      expect(steps[0].wetPerformed).toBe(true);
      expect(steps[0].swellObserved).toBe(false);

      // Second step
      expect(steps[1].stepNumber).toBe(2);
      expect(steps[1].verticalStress).toBe(10.0);

      // Fifth step (last loading step)
      expect(steps[4].stepNumber).toBe(5);
      expect(steps[4].stepType).toBe('belastingstap');
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

      // All steps should have time-series data
      for (const step of steps) {
        expect(step.heightChangeDuringSettlement.length).toBeGreaterThan(0);
      }
    });

    it('should handle intervals without settlement determination', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      // Fourth interval doesn't have settlement determination
      const fourthInterval = bore.analysis!.investigatedIntervals[4];
      expect(fourthInterval.settlementCharacteristicsDetermination).toBeUndefined();
    });
  });

  describe('Saturated Permeability (Hydraulic Conductivity)', () => {
    it('should find permeability determination in seventh interval', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const seventhInterval = bore.analysis!.investigatedIntervals[7];
      expect(seventhInterval.saturatedPermeabilityDetermination).toBeDefined();
    });

    it('should extract permeability metadata', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      const sp = bore.analysis!.investigatedIntervals[7].saturatedPermeabilityDetermination!;
      expect(sp.determinationProcedure).toBe('ISO17892d11v2019');
      expect(sp.determinationMethod).toBe('constantHead');
      expect(sp.usedMedium).toBe('leidingwater');
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
      expect(sp.saturatedPermeabilityAtSpecificDensity.length).toBeGreaterThan(0);

      const measurement = sp.saturatedPermeabilityAtSpecificDensity[0];
      expect(measurement.dryVolumetricMassDensity).toBeDefined();
      expect(measurement.saturatedPermeability).toBeDefined();
      expect(measurement.saturatedPermeability).toBeGreaterThan(0);
    });

    it('should handle intervals without permeability determination', () => {
      const xml = fixtures.bhrGtBma.settlementPermeability();
      const bore = parser.parseBHRGT(xml);

      // First interval doesn't have permeability determination
      const firstInterval = bore.analysis!.investigatedIntervals[0];
      expect(firstInterval.saturatedPermeabilityDetermination).toBeUndefined();
    });
  });

  it('should parse intervals with multiple determination types', () => {
    const xml = fixtures.bhrGtBma.settlementPermeability();
    const bore = parser.parseBHRGT(xml);

    // Check that different intervals can have different combinations
    let hasWaterContent = 0;
    let hasParticleSize = 0;
    let hasSettlement = 0;
    let hasPermeability = 0;

    for (const interval of bore.analysis!.investigatedIntervals) {
      if (interval.waterContentDetermination) hasWaterContent++;
      if (interval.particleSizeDistributionDetermination) hasParticleSize++;
      if (interval.settlementCharacteristicsDetermination) hasSettlement++;
      if (interval.saturatedPermeabilityDetermination) hasPermeability++;
    }

    expect(hasWaterContent).toBeGreaterThan(0);
    expect(hasParticleSize).toBeGreaterThan(0);
    expect(hasSettlement).toBeGreaterThan(0);
    expect(hasPermeability).toBeGreaterThan(0);
  });
});
