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

    const layers = bhrg.boreholeSampleDescription?.descriptiveBoreholeLog?.[0]?.layer ?? [];
    expect(layers.length).toBe(4);

    const firstLayer = layers[0];
    expect(firstLayer.upperBoundary).toBe(0.0);
    expect(firstLayer.lowerBoundary).toBe(0.5);
    expect(firstLayer.soil?.soilNameNEN5104?.code).toBe('klei');
    expect(firstLayer.soil?.colour?.code).toBe('bruin');
  });

  it('should extract optional layer properties', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    const layers = bhrg.boreholeSampleDescription?.descriptiveBoreholeLog?.[0]?.layer ?? [];

    // First layer has anthropogenic and rooted (tri-state → raw string)
    const firstLayer = layers[0];
    expect(firstLayer.anthropogenic).toBe('ja');
    expect(firstLayer.rooted).toBe('ja');
    expect(firstLayer.soil?.organicMatterContentClassNEN5104?.code).toBe('matigHumeusH2');

    // Second layer describes sand. The XSD nests sandMedianClass under
    // soil.sandFraction; this (IMBRO/A archive) fixture places it directly under
    // <soil>, so the schema-faithful path does not surface it.
    const secondLayer = layers[1];
    expect(secondLayer.soil?.soilNameNEN5104?.code).toBe('zand');
    expect(secondLayer.soil?.sandFraction?.sandMedianClass?.code).toBeUndefined();
    expect(secondLayer.soil?.colour?.code).toBe('geelbruin');

    // Third layer has gravel and carbonate content
    const thirdLayer = layers[2];
    expect(thirdLayer.soil?.soilNameNEN5104?.code).toBe('zandMetGrind');
    expect(thirdLayer.soil?.gravelContentClass?.code).toBe('zwakGrindigG1');
    expect(thirdLayer.soil?.carbonateContentClass?.code).toBe('kalkhoudendCa1');
  });

  it('should extract BHRG metadata', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.boreholeSampleDescription?.descriptionProcedure?.code).toBe('NEN5104');
    expect(bhrg.boring?.finalDepthBoring).toBe(8.5);
    expect(bhrg.boring?.finalDepthSampling).toBe(8.5);
    expect(bhrg.boring?.rockReached).toBe(false);
    expect(bhrg.boring?.boreholeCompleted).toBe('ja');
  });

  it('should extract location data', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    assertValidLocation(bhrg.deliveredLocation?.location ?? null);
    expect(bhrg.deliveredLocation?.location?.x).toBe(155000.0);
    expect(bhrg.deliveredLocation?.location?.y).toBe(463000.0);
    expect(bhrg.deliveredLocation?.location?.epsg).toBe('EPSG:28992');

    assertValidLocation(bhrg.standardizedLocation?.location ?? null);
    expect(bhrg.standardizedLocation?.location?.x).toBe(52.123456);
    expect(bhrg.standardizedLocation?.location?.y).toBe(5.234567);
    expect(bhrg.standardizedLocation?.location?.epsg).toBe('EPSG:4258');
  });

  it('should extract vertical position data', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.deliveredVerticalPosition?.offset).toBe(5.50);
    expect(bhrg.deliveredVerticalPosition?.verticalDatum?.code).toBe('NAP');
    expect(bhrg.deliveredVerticalPosition?.localVerticalReferencePoint?.code).toBe('maaiveld');
  });

  it('should extract research report date', () => {
    const xml = fixtures.bhrG.dispatch();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.researchReportDate).toBe('2024-01-10');
  });

  it('should extract boundary determination methods', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    const layers = bhrg.boreholeSampleDescription?.descriptiveBoreholeLog?.[0]?.layer ?? [];
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = layers[0];
    // These are coded values from urn:bro:bhrg:BoundaryPositioningMethod
    expect(firstLayer.upperBoundaryDetermination?.code).toBe('waargenomen');
    expect(firstLayer.lowerBoundaryDetermination?.code).toBe('onbekend');

    const secondLayer = layers[1];
    expect(secondLayer.lowerBoundaryDetermination?.code).toBe('voorbepaald');
  });

  // === Interval Arrays Tests ===

  it('should extract bored intervals', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.boring?.boredInterval).toBeDefined();
    expect(bhrg.boring!.boredInterval.length).toBeGreaterThan(0);

    const firstInterval = bhrg.boring!.boredInterval[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
    expect(firstInterval.boringTechnique).toBeTruthy();
  });

  it('should extract sampled intervals', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.boring?.sampledInterval).toBeDefined();
    expect(bhrg.boring!.sampledInterval.length).toBeGreaterThan(0);

    const firstInterval = bhrg.boring!.sampledInterval[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
  });

  it('should extract registration history', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.registrationHistory).toBeDefined();
    expect(typeof bhrg.registrationHistory!.objectRegistrationTime).toBe('string');
    expect(bhrg.registrationHistory!.registrationStatus).toBeTruthy();
    expect(bhrg.registrationHistory!.corrected).toBeTypeOf('boolean');
  });

  it('should extract report history', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.reportHistory).toBeDefined();
    // BHR-G uses event-based structure
    expect(bhrg.reportHistory!.event).toBeDefined();
    expect(bhrg.reportHistory!.event.length).toBeGreaterThan(0);
  });

  it('should extract top-level metadata fields', () => {
    const xml = fixtures.bhrG.dispatch2();
    const bhrg = parser.parseBHRG(xml);

    expect(bhrg.deliveryContext).toBeTruthy();
    expect(bhrg.surveyPurpose).toBeTruthy();
    expect(bhrg.discipline).toBeTruthy();
    expect(bhrg.nITGCode).toBeTruthy(); // BHR-G has legacy NITG code
  });
});
