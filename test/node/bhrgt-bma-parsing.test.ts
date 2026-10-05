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

    expect(bore.boreholeSampleAnalysis).toBeDefined();
    expect(bore.boreholeSampleAnalysis?.analysisReportDate).toBe('2020-03-03');
    expect(bore.boreholeSampleAnalysis?.analysisProcedure?.code).toBe('geen');
  });

  it('should extract investigated intervals', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boreholeSampleAnalysis?.investigatedInterval).toBeDefined();
    expect(bore.boreholeSampleAnalysis?.investigatedInterval.length).toBe(1);

    const interval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(interval.beginDepth).toEqual({ value: 1.12, uom: 'm' });
    expect(interval.endDepth).toEqual({ value: 1.18, uom: 'm' });
    expect(interval.sampleQuality?.code).toBe('QM2');
    expect(interval.analysisType?.code).toBe('korrelgrootteverdeling');
  });

  it('should extract determination flags', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
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

    const interval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(interval.waterContentDetermination).toBeDefined();

    const wc = interval.waterContentDetermination!;
    expect(wc.determinationProcedure?.code).toBe('ISO17892d1v2014');
    expect(wc.determinationMethod?.code).toBe('drogen');
    expect(wc.sampleMoistness?.code).toBe('veldvochtig');
    expect(wc.removedMaterial[0]?.code).toBe('geen');
    expect(wc.waterContent).toEqual({ value: 31.6, uom: '%' });
    expect(wc.dryingTemperature?.code).toBe('105graden');
    expect(wc.dryingPeriod?.code).toBe('16tot24uur');
    expect(wc.saltCorrectionMethod?.code).toBe('nietToegepast');
  });

  it('should extract volumetric mass density determination', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(interval.volumetricMassDensityDetermination).toBeDefined();

    const vmd = interval.volumetricMassDensityDetermination!;
    expect(vmd.determinationProcedure?.code).toBe('ISO17892d2v2014');
    expect(vmd.determinationMethod?.code).toBe('volumeVoorbepaald');
    expect(vmd.sampleMoistness?.code).toBe('veldvochtig');
    expect(vmd.volumetricMassDensity).toEqual({ value: 1.779, uom: 'g/cm3' });
  });

  it('should extract particle size distribution determination', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const interval = bore.boreholeSampleAnalysis!.investigatedInterval[0];
    expect(interval.particleSizeDistributionDetermination).toBeDefined();

    const psd = interval.particleSizeDistributionDetermination!;
    expect(psd.determinationProcedure?.code).toBe('ISO17892d4v2016enISO13317d3v2001');
    expect(psd.determinationMethod?.code).toBe('natDroogZevenRoentgen');
    expect(psd.fractionDistribution?.code).toBe('uitgebreidStandaard');
    expect(psd.dispersionMethod?.code).toBe('roerenDispersiemiddel');
    expect(psd.removedMaterial[0]?.code).toBe('geen');
    expect(psd.equivalentMassDeterminationMethod?.code).toBe('massaAangenomen');
    expect(psd.equivalentMass).toEqual({ value: 2.65, uom: 'g/cm3' });
  });

  it('should extract particle size basic distribution', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.boreholeSampleAnalysis!.investigatedInterval[0].particleSizeDistributionDetermination!;
    expect(psd.fractionSmaller63um).toEqual({ value: 5, uom: '%' });
    expect(psd.fractionLarger63um).toEqual({ value: 95, uom: '%' });
  });

  it('should extract detailed distribution < 63μm', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.boreholeSampleAnalysis!.investigatedInterval[0].particleSizeDistributionDetermination!;
    expect(psd.fraction0to2um).toEqual({ value: 2.6, uom: '%' });
    expect(psd.fraction2to4um).toEqual({ value: 0.4, uom: '%' });
    expect(psd.fraction4to8um).toEqual({ value: 0.4, uom: '%' });
    expect(psd.fraction8to16um).toEqual({ value: 0.6, uom: '%' });
    expect(psd.fraction16to32um).toEqual({ value: 0.5, uom: '%' });
    expect(psd.fraction32to50um).toEqual({ value: 0.2, uom: '%' });
    expect(psd.fraction50to63um).toEqual({ value: 0.3, uom: '%' });
  });

  it('should extract standard distribution > 63μm', () => {
    const xml = fixtures.bhrGtBma.dispatch();
    const bore = parser.parseBHRGT(xml);

    const psd = bore.boreholeSampleAnalysis!.investigatedInterval[0].particleSizeDistributionDetermination!;
    expect(psd.fraction63to90um).toEqual({ value: 1, uom: '%' });
    expect(psd.fraction90to125um).toEqual({ value: 3.5, uom: '%' });
    expect(psd.fraction125to180um).toEqual({ value: 41.2, uom: '%' });
    expect(psd.fraction180to250um).toEqual({ value: 29.8, uom: '%' });
    expect(psd.fraction250to355um).toEqual({ value: 10.4, uom: '%' });
    expect(psd.fraction355to500um).toEqual({ value: 3.3, uom: '%' });
    expect(psd.fraction500to710um).toEqual({ value: 1.7, uom: '%' });
    expect(psd.fraction710to1000um).toEqual({ value: 1, uom: '%' });
    expect(psd.fraction1000to1400um).toEqual({ value: 0.6, uom: '%' });
    expect(psd.fraction1400umto2mm).toEqual({ value: 0.4, uom: '%' });
    expect(psd.fraction2to4mm).toEqual({ value: 0.3, uom: '%' });
    expect(psd.fraction4to8mm).toEqual({ value: 0.7, uom: '%' });
    expect(psd.fraction8to16mm).toEqual({ value: 1.1, uom: '%' });
    expect(psd.fraction16to31_5mm).toEqual({ value: 0, uom: '%' });
    expect(psd.fraction31_5to63mm).toEqual({ value: 0, uom: '%' });
    expect(psd.fractionLarger63mm).toEqual({ value: 0, uom: '%' });
  });

  it('should not have analysis data for BHR-GT without BMA', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.boreholeSampleAnalysis).toBeUndefined();
  });
});
