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
    expect(bore.boreholeSampleAnalysis).toBeDefined();

    if (!bore.boreholeSampleAnalysis) {
      throw new Error('Analysis data should be present');
    }

    // Find interval with undrained shear strength (3.00-3.10m)
    const interval = bore.boreholeSampleAnalysis.investigatedInterval.find(
      (i) => i.maximumUndrainedShearStrengthDetermination
    );

    expect(interval).toBeDefined();
    expect(interval?.beginDepth).toEqual({ value: 3, uom: 'm' });
    expect(interval?.endDepth).toEqual({ value: 3.1, uom: 'm' });
    expect(interval?.analysisType?.code).toBe('maximaleSchuifsterkte');

    const det = interval!.maximumUndrainedShearStrengthDetermination!;
    expect(det.determinationProcedure?.code).toBe('ISO14688d2v2019');
    expect(det.determinationMethod?.code).toBe('handvinDraaien');
    expect(det.determinationDiameter?.code).toBe('TVstandaard');
    expect(det.verticallyDetermined).toBe(true);
    expect(det.sampleMoistness?.code).toBe('veldvochtig');
    expect(det.maximumUndrainedShearStrength).toEqual({ value: 16, uom: 'kPa' });
  });

  it('should parse BHR000000339288 with multiple undrained shear strength determinations', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000339288');
    expect(bore.boreholeSampleAnalysis).toBeDefined();

    if (!bore.boreholeSampleAnalysis) {
      throw new Error('Analysis data should be present');
    }

    // Find all intervals with undrained shear strength
    const intervalsWithShearStrength = bore.boreholeSampleAnalysis.investigatedInterval.filter(
      (i) => i.maximumUndrainedShearStrengthDetermination
    );

    expect(intervalsWithShearStrength.length).toBe(2);

    // First occurrence: 0.82-0.87m, 46.5 kPa
    const first = intervalsWithShearStrength[0];
    expect(first.beginDepth).toEqual({ value: 0.82, uom: 'm' });
    expect(first.endDepth).toEqual({ value: 0.87, uom: 'm' });
    expect(first.maximumUndrainedShearStrengthDetermination!.maximumUndrainedShearStrength).toEqual({ value: 46.5, uom: 'kPa' });

    // Second occurrence: 1.10-1.31m, 22.0 kPa
    const second = intervalsWithShearStrength[1];
    expect(second.beginDepth).toEqual({ value: 1.1, uom: 'm' });
    expect(second.endDepth).toEqual({ value: 1.31, uom: 'm' });
    expect(second.maximumUndrainedShearStrengthDetermination!.maximumUndrainedShearStrength).toEqual({ value: 22, uom: 'kPa' });
  });
});
