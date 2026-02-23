/**
 * Tests for Maximum Undrained Shear Strength Determination Parsing
 *
 * Tests parsing of maximumUndrainedShearStrengthDetermination data from BHR-GT-BMA files
 */

import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { loadFixture } from '../helpers/fixture-loader';

describe('Maximum Undrained Shear Strength Determination Parsing', () => {
  const parser = new BROParser(new NodeXMLAdapter());

  it('should parse BHR000000347394 with single undrained shear strength determination', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000347394.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000347394');
    expect(bore.analysis).toBeDefined();

    if (!bore.analysis) {
      throw new Error('Analysis data should be present');
    }

    // Find interval with undrained shear strength (3.00-3.10m)
    const interval = bore.analysis.investigatedIntervals.find(
      (i) => i.maximumUndrainedShearStrengthDetermination
    );

    expect(interval).toBeDefined();
    expect(interval?.beginDepth).toBe(3.0);
    expect(interval?.endDepth).toBe(3.1);
    expect(interval?.analysisType).toBe('maximaleSchuifsterkte');

    const det = interval!.maximumUndrainedShearStrengthDetermination!;
    expect(det.determinationProcedure).toBe('ISO14688d2v2019');
    expect(det.determinationMethod).toBe('handvinDraaien');
    expect(det.determinationDiameter).toBe('TVstandaard');
    expect(det.verticallyDetermined).toBe(true);
    expect(det.sampleMoistness).toBe('veldvochtig');
    expect(det.maximumUndrainedShearStrength).toBe(16.0);
  });

  it('should parse BHR000000339288 with multiple undrained shear strength determinations', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000339288');
    expect(bore.analysis).toBeDefined();

    if (!bore.analysis) {
      throw new Error('Analysis data should be present');
    }

    // Find all intervals with undrained shear strength
    const intervalsWithShearStrength = bore.analysis.investigatedIntervals.filter(
      (i) => i.maximumUndrainedShearStrengthDetermination
    );

    expect(intervalsWithShearStrength.length).toBe(2);

    // First occurrence: 0.82-0.87m, 46.5 kPa
    const first = intervalsWithShearStrength[0];
    expect(first.beginDepth).toBe(0.82);
    expect(first.endDepth).toBe(0.87);
    expect(first.maximumUndrainedShearStrengthDetermination!.maximumUndrainedShearStrength).toBe(46.5);

    // Second occurrence: 1.10-1.31m, 22.0 kPa
    const second = intervalsWithShearStrength[1];
    expect(second.beginDepth).toBe(1.1);
    expect(second.endDepth).toBe(1.31);
    expect(second.maximumUndrainedShearStrengthDetermination!.maximumUndrainedShearStrength).toBe(22.0);
  });
});
