import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { assertValidBore, assertValidLocation } from '@test/helpers/assertions';

describe('BORE Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse BHR-GT dispatch format bore file', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.descriptionProcedure).toBeTruthy();
  });

  it('should extract layer data', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.data.length).toBeGreaterThan(0);

    const firstLayer = bore.data[0];
    expect(firstLayer.upperBoundary).toBe(0);
    expect(firstLayer.lowerBoundary).toBe(0.5);
    expect(firstLayer.geotechnicalSoilName).toBe('siltigZand');
  });

  it('should extract bore metadata', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.finalBoreDepth).toBe(3);
    expect(bore.boreRockReached).toBe(false);
    expect(bore.boreHoleCompleted).toBe(true);
  });

  it('should include meta with schema version info', () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.meta).toBeDefined();
    expect(bore.meta.schemaVersion).toBe('2.1');
    expect(bore.meta.dataType).toBe('BHR-GT');
    expect(bore.meta.schemaNamespace).toBe(
      'http://www.broservices.nl/xsd/dsbhr-gt/2.1'
    );
    expect(bore.meta.warnings).toEqual([]);
  });

  it('should extract boundary determination methods', () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    expect(bore.data.length).toBeGreaterThan(0);

    const firstLayer = bore.data[0];
    // These are coded values from urn:bro:bhrgt:BoundaryPositioningMethod
    expect(firstLayer.upperBoundaryDetermination).toBe('voorbepaald');
    expect(firstLayer.lowerBoundaryDetermination).toBe('voorbepaald');
  });

  it('should extract anthropogenic indicator', () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    expect(bore.data.length).toBeGreaterThan(0);

    // anthropogenic is 'nee' in the test file, should parse to false
    const firstLayer = bore.data[0];
    expect(firstLayer.anthropogenic).toBe(false);
  });

  it('should extract tertiary constituent', () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    expect(bore.data.length).toBeGreaterThan(0);

    const firstLayer = bore.data[0];
    // tertiaryConstituent is a coded value from urn:bro:bhrgt:TertiaryConstituent
    expect(firstLayer.tertiaryConstituent).toBe('geen');
  });

  it('should extract grainshape nested object when present', () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    // Find a layer that has grainshape (layer at depth 2.90-3.20 has it in test file)
    const layerWithGrainshape = bore.data.find(
      layer => layer.grainshape !== undefined
    );

    expect(layerWithGrainshape).toBeDefined();
    expect(layerWithGrainshape!.grainshape).toBeDefined();
    expect(layerWithGrainshape!.grainshape!.sizeFraction).toBe('zand');
    expect(layerWithGrainshape!.grainshape!.angularity).toBe('subhoekig');
    expect(layerWithGrainshape!.grainshape!.sphericity).toBe('bol');
  });

  it('should extract grainshape roughness when present (gravel fraction)', () => {
    const xml = fixtures.bhrGt.BHR000000377186();
    const bore = parser.parseBHRGT(xml);

    // Gravel (grind) grainshapes carry roughness; sand ones in this file do not
    const gravelLayer = bore.data.find(
      layer => layer.grainshape?.sizeFraction === 'grind'
    );
    expect(gravelLayer).toBeDefined();
    expect(gravelLayer!.grainshape!.roughness).toBe('ruw');

    const sandLayer = bore.data.find(
      layer => layer.grainshape?.sizeFraction === 'zand'
    );
    expect(sandLayer).toBeDefined();
    expect(sandLayer!.grainshape!.roughness).toBeNull();
  });

  it('should not include grainshape when absent', () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    // First layer doesn't have grainshape
    const firstLayer = bore.data[0];
    expect(firstLayer.grainshape).toBeUndefined();
  });

  it('should extract layer structure properties (slant, bedded, mixed, mottled)', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    expect(bore.data.length).toBeGreaterThan(0);

    const firstLayer = bore.data[0];
    expect(firstLayer.slant).toBe(false);
    expect(firstLayer.bedded).toBe(false);
    expect(firstLayer.mixed).toBe(false);
  });

  it('should extract internal structure intact from layer', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer that has internalStructureIntact defined
    const layerWithStructure = bore.data.find(
      layer => layer.internalStructureIntact !== null && layer.internalStructureIntact !== undefined
    );

    expect(layerWithStructure).toBeDefined();
    expect(layerWithStructure!.upperBoundary).toBe(1.5);
    expect(layerWithStructure!.internalStructureIntact).toBe(true);
  });

  it('should extract fine soil consistency', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer with fineSoilConsistency
    const layerWithConsistency = bore.data.find(
      layer => layer.fineSoilConsistency !== null && layer.fineSoilConsistency !== undefined
    );

    expect(layerWithConsistency).toBeDefined();
    expect(layerWithConsistency!.fineSoilConsistency).toBe('stevig');
  });

  it('should extract carbonate content class', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer with carbonateContentClass
    const layerWithCarbonate = bore.data.find(
      layer => layer.carbonateContentClass !== null && layer.carbonateContentClass !== undefined
    );

    expect(layerWithCarbonate).toBeDefined();
    // Values like 'kalkloos' or 'zwakKalkhoudend'
    expect(layerWithCarbonate!.carbonateContentClass).toBeTruthy();
  });

  // === Boring Metadata Tests ===

  it('should extract boring execution details', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boringStartDate).toBe('2024-04-09');
    expect(bore.boringProcedure).toBe('SIKB2101vanafV3.3');
  });

  it('should extract sampler details', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    expect(bore.samplerType).toBe('steekbus');
    expect(bore.samplingQuality).toBe('klasseE');
  });

  it('should extract sample container dimensions', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Container dimensions (diameter in mm, length in m)
    expect(bore.sampleContainerDiameter).toBe(67);
    expect(bore.sampleContainerLength).toBe(0.4);
  });

  it('should extract description metadata', () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    expect(bore.descriptionQuality).toBe('klasse2ongeroerd');
    expect(bore.descriptionLocation).toBe('lab');
    expect(bore.continuouslySampled).toBe(true);
  });

  // === Interval Arrays Tests ===

  it('should extract bored intervals', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boredIntervals).toBeDefined();
    expect(bore.boredIntervals.length).toBeGreaterThan(0);

    const firstInterval = bore.boredIntervals[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
    expect(firstInterval.boringTechnique).toBeTypeOf('string');
    expect(firstInterval.boredDiameter).toBeTypeOf('number');
  });

  it('should extract sampled intervals with sampler details', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.sampledIntervals).toBeDefined();
    expect(bore.sampledIntervals.length).toBeGreaterThan(0);

    // Find an interval with sampler details
    const intervalWithSampler = bore.sampledIntervals.find(
      interval => interval.sampler !== undefined
    );

    expect(intervalWithSampler).toBeDefined();
    expect(intervalWithSampler!.sampler!.samplerType).toBeTruthy();
    expect(intervalWithSampler!.sampler!.sampleContainerDiameter).toBeTypeOf('number');
  });

  it('should extract completed intervals', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.completedIntervals).toBeDefined();
    expect(bore.completedIntervals.length).toBeGreaterThan(0);

    const firstInterval = bore.completedIntervals[0];
    expect(firstInterval.beginDepth).toBeTypeOf('number');
    expect(firstInterval.endDepth).toBeTypeOf('number');
    expect(firstInterval.backfillMaterial).toBeTypeOf('string');
    expect(firstInterval.permanentCasingPresent).toBeTypeOf('boolean');
    expect(firstInterval.backfillMaterialCertified).toBeTypeOf('boolean');
  });

  it('should extract registration history', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.registrationHistory).toBeDefined();
    expect(typeof bore.registrationHistory!.objectRegistrationTime).toBe('string');
    expect(bore.registrationHistory!.registrationStatus).toBeTruthy();
    expect(bore.registrationHistory!.corrected).toBeTypeOf('boolean');
  });

  it('should extract report history with intermediate events', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.reportHistory).toBeDefined();
    expect(typeof bore.reportHistory!.reportStartDate).toBe('string');
    expect(bore.reportHistory!.intermediateEvents).toBeDefined();
    expect(bore.reportHistory!.intermediateEvents.length).toBeGreaterThan(0);

    const event = bore.reportHistory!.intermediateEvents[0];
    expect(event.eventName).toBeTruthy();
    expect(typeof event.eventDate).toBe('string');
  });

  it('should extract top-level metadata fields', () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.deliveryContext).toBeTruthy();
    expect(bore.surveyPurpose).toBeTruthy();
    expect(bore.discipline).toBeTruthy();
    expect(bore.surveyProcedure).toBeTruthy();
  });
});
