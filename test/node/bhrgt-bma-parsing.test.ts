import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { assertValidBore, assertValidLocation } from '@test/helpers/assertions';

describe('BHR-GT-BMA Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHR-GT with BMA analysis data', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.broId).toBe('BHR000000336089');
    expect(bore.qualityRegime).toBe('IMBRO');
  });

  it('should extract analysis metadata', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis).toBeDefined();
    expect(bore.analysis?.analysisReportDate).toBe('2020-03-03');
    expect(bore.analysis?.analysisProcedure?.code).toBe('geen');
  });

  it('should extract investigated intervals', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis?.investigatedIntervals).toBeDefined();
    expect(bore.analysis?.investigatedIntervals.length).toBe(1);

    const interval = bore.analysis!.investigatedIntervals[0];
    expect(interval.beginDepth).toBe(1.12);
    expect(interval.endDepth).toBe(1.18);
    expect(interval.sampleQuality?.code).toBe('QM2');
    expect(interval.analysisType?.code).toBe('korrelgrootteverdeling');
  });

  it('should extract determination flags', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals[0];
    expect(interval.waterContentDetermined).toBe(true);
    expect(interval.organicMatterContentDetermined).toBe(false);
    expect(interval.carbonateContentDetermined).toBe(false);
    expect(interval.volumetricMassDensityDetermined).toBe(true);
    expect(interval.volumetricMassDensitySolidsDetermined).toBe(false);
    expect(interval.described).toBe(false);
  });

  it('should extract water content determination', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals[0];
    expect(interval.waterContentDetermination).toBeDefined();

    const wc = interval.waterContentDetermination!;
    expect(wc.determinationProcedure?.code).toBe('ISO17892d1v2014');
    expect(wc.determinationMethod?.code).toBe('drogen');
    expect(wc.sampleMoistness?.code).toBe('veldvochtig');
    expect(wc.removedMaterial?.code).toBe('geen');
    expect(wc.waterContent).toBe(31.6);
    expect(wc.dryingTemperature?.code).toBe('105graden');
    expect(wc.dryingPeriod?.code).toBe('16tot24uur');
    expect(wc.saltCorrectionMethod?.code).toBe('nietToegepast');
  });

  it('should extract volumetric mass density determination', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals[0];
    expect(interval.volumetricMassDensityDetermination).toBeDefined();

    const vmd = interval.volumetricMassDensityDetermination!;
    expect(vmd.determinationProcedure?.code).toBe('ISO17892d2v2014');
    expect(vmd.determinationMethod?.code).toBe('volumeVoorbepaald');
    expect(vmd.sampleMoistness?.code).toBe('veldvochtig');
    expect(vmd.volumetricMassDensity).toBe(1.779);
  });

  it('should extract particle size distribution determination', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals[0];
    expect(interval.particleSizeDistributionDetermination).toBeDefined();

    const psd = interval.particleSizeDistributionDetermination!;
    expect(psd.determinationProcedure?.code).toBe('ISO17892d4v2016enISO13317d3v2001');
    expect(psd.determinationMethod?.code).toBe('natDroogZevenRoentgen');
    expect(psd.fractionDistribution?.code).toBe('uitgebreidStandaard');
    expect(psd.dispersionMethod?.code).toBe('roerenDispersiemiddel');
    expect(psd.removedMaterial?.code).toBe('geen');
    expect(psd.equivalentMassDeterminationMethod?.code).toBe('massaAangenomen');
    expect(psd.equivalentMass).toBe(2.65);
  });

  it('should extract particle size basic distribution', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.analysis!.investigatedIntervals[0].particleSizeDistributionDetermination!;
    expect(psd.fractionSmaller63um).toBe(5.0);
    expect(psd.fractionLarger63um).toBe(95.0);
  });

  it('should extract detailed distribution < 63μm', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.analysis!.investigatedIntervals[0].particleSizeDistributionDetermination!;
    expect(psd.fraction0to2um).toBe(2.6);
    expect(psd.fraction2to4um).toBe(0.4);
    expect(psd.fraction4to8um).toBe(0.4);
    expect(psd.fraction8to16um).toBe(0.6);
    expect(psd.fraction16to32um).toBe(0.5);
    expect(psd.fraction32to50um).toBe(0.2);
    expect(psd.fraction50to63um).toBe(0.3);
  });

  it('should extract standard distribution > 63μm', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.analysis!.investigatedIntervals[0].particleSizeDistributionDetermination!;
    expect(psd.fraction63to90um).toBe(1);
    expect(psd.fraction90to125um).toBe(3.5);
    expect(psd.fraction125to180um).toBe(41.2);
    expect(psd.fraction180to250um).toBe(29.8);
    expect(psd.fraction250to355um).toBe(10.4);
    expect(psd.fraction355to500um).toBe(3.3);
    expect(psd.fraction500to710um).toBe(1.7);
    expect(psd.fraction710to1000um).toBe(1);
    expect(psd.fraction1000to1400um).toBe(0.6);
    expect(psd.fraction1400umto2mm).toBe(0.4);
    expect(psd.fraction2to4mm).toBe(0.3);
    expect(psd.fraction4to8mm).toBe(0.7);
    expect(psd.fraction8to16mm).toBe(1.1);
    expect(psd.fraction16to31_5mm).toBe(0);
    expect(psd.fraction31_5to63mm).toBe(0);
    expect(psd.fractionLarger63mm).toBe(0);
  });

  it('should not have analysis data for BHR-GT without BMA', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.analysis).toBeUndefined();
  });
});
