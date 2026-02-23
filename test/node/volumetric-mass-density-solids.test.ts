/**
 * Tests for Volumetric Mass Density of Solids Determination Parsing
 *
 * Tests parsing of volumetricMassDensityOfSolidsDetermination data from BHR-GT-BMA files
 * using fixture BHR000000336088 (analysisType: basisparameter)
 */

import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { loadFixture } from '../helpers/fixture-loader';

describe('Volumetric Mass Density of Solids Determination Parsing', () => {
  const parser = new BROParser(new NodeXMLAdapter());

  it('should parse BHR000000336088 with volumetric mass density of solids', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000336088.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000336088');
    expect(bore.analysis).toBeDefined();
    expect(bore.analysis!.investigatedIntervals.length).toBe(2);
  });

  it('should parse the basisparameter interval (1.79-1.82m) with density of solids', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000336088.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) => i.beginDepth === 1.79
    );

    expect(interval).toBeDefined();
    expect(interval!.endDepth).toBe(1.82);
    expect(interval!.analysisType).toBe('basisparameter');
    expect(interval!.waterContentDetermined).toBe(true);
    expect(interval!.volumetricMassDensityDetermined).toBe(true);
    expect(interval!.volumetricMassDensitySolidsDetermined).toBe(true);
  });

  it('should parse volumetric mass density of solids values', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000336088.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) => i.beginDepth === 1.79
    );

    const det = interval!.volumetricMassDensityOfSolidsDetermination;
    expect(det).toBeDefined();
    expect(det!.determinationProcedure).toBe('ISO17892d3v2016');
    expect(det!.determinationMethod).toBe('pyknometerGas');
    expect(det!.volumetricMassDensityOfSolids).toBe(2.413);
  });

  it('should parse sibling volumetric mass density determination', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000336088.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) => i.beginDepth === 1.79
    );

    const det = interval!.volumetricMassDensityDetermination;
    expect(det).toBeDefined();
    expect(det!.determinationProcedure).toBe('ISO17892d2v2014');
    expect(det!.determinationMethod).toBe('volumeVoorbepaald');
    expect(det!.sampleMoistness).toBe('veldvochtig');
    expect(det!.volumetricMassDensity).toBe(1.386);
  });

  it('should parse korrelgrootteverdeling interval (1.65-1.75m) with particle size', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000336088.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) => i.beginDepth === 1.65
    );

    expect(interval).toBeDefined();
    expect(interval!.endDepth).toBe(1.75);
    expect(interval!.analysisType).toBe('korrelgrootteverdeling');

    // Particle size distribution
    const psd = interval!.particleSizeDistributionDetermination;
    expect(psd).toBeDefined();
    expect(psd!.determinationProcedure).toBe('ISO17892d4v2016enISO13317d3v2001');
    expect(psd!.fractionSmaller63um).toBe(41.2);
    expect(psd!.fractionLarger63um).toBe(58.8);

    // Water content
    expect(interval!.waterContentDetermination).toBeDefined();
    expect(interval!.waterContentDetermination!.waterContent).toBe(98.6);

    // Organic matter
    expect(interval!.organicMatterContentDetermination).toBeDefined();
    expect(interval!.organicMatterContentDetermination!.organicMatterContent).toBe(5.7);

    // Carbonate
    expect(interval!.carbonateContentDetermination).toBeDefined();
    expect(interval!.carbonateContentDetermination!.carbonateContent).toBe(3.4);
  });
});
