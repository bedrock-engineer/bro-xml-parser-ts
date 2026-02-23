import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { assertValidBHRG, assertValidLocation } from '@test/helpers/assertions';

describe('BHRG Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHRG dispatch format file', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    assertValidBHRG(bhrg);
    expect(bhrg.broId).toBe('BHR000000123456');
    expect(bhrg.qualityRegime).toBe('IMBRO');
  });

  it('should parse second BHRG file (BHR000000398575)', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    assertValidBHRG(bhrg);
    expect(bhrg.broId).toBe('BHR000000398575');
    expect(bhrg.qualityRegime).toBe('IMBRO/A');
  });

  it('should include meta with schema version info', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.meta).toBeDefined();
    expect(bhrg.meta.schemaVersion).toBe('3.1');
    expect(bhrg.meta.dataType).toBe('BHR-G');
    expect(bhrg.meta.schemaNamespace).toBe(
      'http://www.broservices.nl/xsd/dsbhrg/3.1'
    );
    expect(bhrg.meta.warnings).toEqual([]);
  });

  it('should extract layer data', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.data.length).toBe(4);

    const firstLayer = bhrg.data[0];
    expect(firstLayer.upperBoundary).toBe(0.0);
    expect(firstLayer.lowerBoundary).toBe(0.5);
    expect(firstLayer.soilNameNEN5104).toBe('klei');
    expect(firstLayer.color).toBe('bruin');
  });

  it('should extract optional layer properties', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    // First layer has anthropogenic and rooted
    const firstLayer = bhrg.data[0];
    expect(firstLayer.anthropogenic).toBe('ja');
    expect(firstLayer.rooted).toBe('ja');
    expect(firstLayer.organicMatterContentClassNEN5104).toBe('matigHumeusH2');

    // Second layer has sand median class
    const secondLayer = bhrg.data[1];
    expect(secondLayer.soilNameNEN5104).toBe('zand');
    expect(secondLayer.sandMedianClass).toBe('fijn');
    expect(secondLayer.color).toBe('geelbruin');

    // Third layer has gravel and carbonate content
    const thirdLayer = bhrg.data[2];
    expect(thirdLayer.soilNameNEN5104).toBe('zandMetGrind');
    expect(thirdLayer.gravelContentClass).toBe('zwakGrindigG1');
    expect(thirdLayer.carbonateContentClass).toBe('kalkhoudendCa1');
  });

  it('should extract BHRG metadata', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.descriptionProcedure).toBe('NEN5104');
    expect(bhrg.finalBoreDepth).toBe(8.5);
    expect(bhrg.finalSampleDepth).toBe(8.5);
    expect(bhrg.boreRockReached).toBe(false);
    expect(bhrg.boreHoleCompleted).toBe('ja');
  });

  it('should extract location data', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    assertValidLocation(bhrg.deliveredLocation);
    expect(bhrg.deliveredLocation?.x).toBe(155000.0);
    expect(bhrg.deliveredLocation?.y).toBe(463000.0);
    expect(bhrg.deliveredLocation?.epsg).toBe('EPSG:28992');

    assertValidLocation(bhrg.standardizedLocation);
    expect(bhrg.standardizedLocation?.x).toBe(52.123456);
    expect(bhrg.standardizedLocation?.y).toBe(5.234567);
    expect(bhrg.standardizedLocation?.epsg).toBe('EPSG:4258');
  });

  it('should extract vertical position data', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.deliveredVerticalPositionOffset).toBe(5.50);
    expect(bhrg.deliveredVerticalPositionDatum).toBe('nap');
    expect(bhrg.deliveredVerticalPositionReferencePoint).toBe('maaiveld');
  });

  it('should extract research report date', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.researchReportDate).toBeInstanceOf(Date);
    expect(bhrg.researchReportDate?.toISOString().split('T')[0]).toBe('2024-01-10');
  });

  it('should extract boundary determination methods', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.data.length).toBeGreaterThan(0);

    const firstLayer = bhrg.data[0];
    // These are coded values from urn:bro:bhrg:BoundaryPositioningMethod
    expect(firstLayer.upperBoundaryDetermination).toBe('waargenomen');
    expect(firstLayer.lowerBoundaryDetermination).toBe('onbekend');

    const secondLayer = bhrg.data[1];
    expect(secondLayer.lowerBoundaryDetermination).toBe('voorbepaald');
  });

  // === Interval Arrays Tests ===

  it('should extract bored intervals', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.boredIntervals).toBeDefined();
    expect(bhrg.boredIntervals.length).toBeGreaterThan(0);

    const firstInterval = bhrg.boredIntervals[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
    expect(firstInterval.boringTechnique).toBeTruthy();
  });

  it('should extract sampled intervals', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.sampledIntervals).toBeDefined();
    expect(bhrg.sampledIntervals.length).toBeGreaterThan(0);

    const firstInterval = bhrg.sampledIntervals[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
  });

  it('should extract registration history', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.registrationHistory).toBeDefined();
    expect(bhrg.registrationHistory!.objectRegistrationTime).toBeInstanceOf(Date);
    expect(bhrg.registrationHistory!.registrationStatus).toBeTruthy();
    expect(bhrg.registrationHistory!.corrected).toBeTypeOf('boolean');
  });

  it('should extract report history', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.reportHistory).toBeDefined();
    // BHR-G uses event-based structure
    expect(bhrg.reportHistory!.intermediateEvents).toBeDefined();
    expect(bhrg.reportHistory!.intermediateEvents.length).toBeGreaterThan(0);
  });

  it('should extract top-level metadata fields', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.deliveryContext).toBeTruthy();
    expect(bhrg.surveyPurpose).toBeTruthy();
    expect(bhrg.discipline).toBeTruthy();
    expect(bhrg.nitgCode).toBeTruthy(); // BHR-G has legacy NITG code
  });
});
