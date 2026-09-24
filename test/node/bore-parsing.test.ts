import { describe, it, expect, beforeEach } from "vitest";
import { BROParser } from "@/parser";
import { NodeXMLAdapter } from "@/adapters/node-adapter";
import { fixtures } from "@test/helpers/fixture-loader";
import {
  assertValidBore,
  assertValidLocation,
  asSoilLayer,
  isSoilLayer,
  firstLogLayers,
} from "@test/helpers/assertions";

describe("BORE Parsing (Node)", () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it("should parse BHR-GT dispatch format bore file", () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.boreholeSampleDescription?.descriptionProcedure).toBeTruthy();
  });

  it("should extract layer data", () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = asSoilLayer(layers[0]);
    expect(firstLayer.upperBoundary).toBe(0);
    expect(firstLayer.lowerBoundary).toBe(0.5);
    expect(firstLayer.soil.geotechnicalSoilName?.code).toBe("siltigZand");
  });

  it("should extract bore metadata", () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.finalDepthBoring).toBe(3);
    expect(bore.boring?.rockReached).toBe(false);
    // boreholeCompleted is tri-state (ja/nee/onbekend), kept as its raw string.
    expect(bore.boring?.boreholeCompleted).toBe('ja');
  });

  it("should include meta with schema version info", () => {
    const xml = fixtures.bhrGt.dispatch();
    const bore = parser.parseBHRGT(xml);

    expect(bore.meta).toBeDefined();
    expect(bore.meta.schemaVersion).toBe("2.1");
    expect(bore.meta.dataType).toBe("BHR-GT");
    expect(bore.meta.schemaNamespace).toBe("http://www.broservices.nl/xsd/dsbhr-gt/2.1");
    expect(bore.meta.warnings).toEqual([]);
  });

  it("should extract boundary determination methods", () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = layers[0];
    // These are coded values from urn:bro:bhrgt:BoundaryPositioningMethod
    expect(firstLayer.upperBoundaryDetermination?.code).toBe("voorbepaald");
    expect(firstLayer.lowerBoundaryDetermination?.code).toBe("voorbepaald");
  });

  it("should extract anthropogenic indicator", () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    // anthropogenic is tri-state; 'nee' in the test file is kept as the raw string
    const firstLayer = layers[0];
    expect(firstLayer.anthropogenic).toBe('nee');
  });

  it("should extract tertiary constituent", () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = asSoilLayer(layers[0]);
    // tertiaryConstituent is a coded value from urn:bro:bhrgt:TertiaryConstituent
    expect(firstLayer.soil.tertiaryConstituent?.[0]?.code).toBe("geen");
  });

  it("should extract grainshape nested object when present", () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    // Find a layer that has grainshape (layer at depth 2.90-3.20 has it in test file)
    const layers = firstLogLayers(bore);
    const layerWithGrainshape = layers
      .filter(isSoilLayer)
      .find((layer) => layer.soil.grainshape != null);

    expect(layerWithGrainshape).toBeDefined();
    expect(layerWithGrainshape!.soil.grainshape).toBeDefined();
    expect(layerWithGrainshape!.soil.grainshape!.sizeFraction?.code).toBe("zand");
    expect(layerWithGrainshape!.soil.grainshape!.angularity?.code).toBe("subhoekig");
    expect(layerWithGrainshape!.soil.grainshape!.sphericity?.code).toBe("bol");
  });

  it("should extract grainshape roughness when present (gravel fraction)", () => {
    const xml = fixtures.bhrGt.BHR000000377186();
    const bore = parser.parseBHRGT(xml);

    // Gravel (grind) grainshapes carry roughness; sand ones in this file do not
    const layers = firstLogLayers(bore);
    const gravelLayer = layers
      .filter(isSoilLayer)
      .find((layer) => layer.soil.grainshape?.sizeFraction?.code === "grind");
    expect(gravelLayer).toBeDefined();
    expect(gravelLayer!.soil.grainshape!.roughness?.code).toBe("ruw");

    const sandLayer = layers
      .filter(isSoilLayer)
      .find((layer) => layer.soil.grainshape?.sizeFraction?.code === "zand");
    expect(sandLayer).toBeDefined();
    expect(sandLayer!.soil.grainshape!.roughness).toBeNull();
  });

  it("should not include grainshape when absent", () => {
    const xml = fixtures.bhrGt.BHR000000378222();
    const bore = parser.parseBHRGT(xml);

    // First layer doesn't have grainshape
    const layers = firstLogLayers(bore);
    const firstLayer = asSoilLayer(layers[0]);
    expect(firstLayer.soil.grainshape).toBeNull();
  });

  it("should extract layer structure properties (slant, bedded, mixed, mottled)", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = asSoilLayer(layers[0]);
    expect(firstLayer.slant).toBe(false);
    expect(firstLayer.bedded).toBe(false);
    expect(firstLayer.soil.mixed).toBe(false);
  });

  it("should extract internal structure intact from layer", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer that has internalStructureIntact defined
    const layers = firstLogLayers(bore);
    const layerWithStructure = layers.find((layer) => layer.internalStructureIntact != null);

    expect(layerWithStructure).toBeDefined();
    expect(layerWithStructure!.upperBoundary).toBe(1.5);
    expect(layerWithStructure!.internalStructureIntact).toBe(true);
  });

  it("should extract fine soil consistency", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer with fineSoilConsistency
    const layers = firstLogLayers(bore);
    const layerWithConsistency = layers
      .filter(isSoilLayer)
      .find((layer) => layer.soil.fineSoilConsistency != null);

    expect(layerWithConsistency).toBeDefined();
    expect(layerWithConsistency!.soil.fineSoilConsistency?.code).toBe("stevig");
  });

  it("should extract carbonate content class", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Find a layer with carbonateContentClass
    const layers = firstLogLayers(bore);
    const layerWithCarbonate = layers
      .filter(isSoilLayer)
      .find((layer) => layer.soil.carbonateContentClass != null);

    expect(layerWithCarbonate).toBeDefined();
    // Values like 'kalkloos' or 'zwakKalkhoudend'
    expect(layerWithCarbonate!.soil.carbonateContentClass).toBeTruthy();
  });

  // === Boring Metadata Tests ===

  it("should extract boring execution details", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.boringStartDate).toBe("2024-04-09");
    expect(bore.boring?.boringProcedure?.[0]?.code).toBe("SIKB2101vanafV3.3");
  });

  it("should extract sampler details", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    const sampledInterval = bore.boring?.sampledInterval ?? [];
    const withSampler = sampledInterval.find((i) => i.sampler != null);
    expect(withSampler?.sampler?.samplerType?.code).toBe("steekbus");
    expect(sampledInterval[0]?.samplingQuality?.code).toBe("klasseE");
  });

  it("should extract sample container dimensions", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    // Container dimensions (diameter in mm, length in m)
    const sampler = bore.boring?.sampledInterval?.find((i) => i.sampler != null)?.sampler;
    expect(sampler?.sampleContainerDiameter).toBe(67);
    expect(sampler?.sampleContainerLength).toBe(0.4);
  });

  it("should extract description metadata", () => {
    const xml = fixtures.bhrGt.BHR000000380390();
    const bore = parser.parseBHRGT(xml);

    const log = bore.boreholeSampleDescription?.descriptiveBoreholeLog?.[0];
    expect(log?.descriptionQuality?.code).toBe("klasse2ongeroerd");
    expect(log?.descriptionLocation?.code).toBe("lab");
    expect(log?.continuouslySampled).toBe('ja');
  });

  // === Interval Arrays Tests ===

  it("should extract bored intervals", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.boredInterval).toBeDefined();
    expect(bore.boring!.boredInterval.length).toBeGreaterThan(0);

    const firstInterval = bore.boring!.boredInterval[0];
    expect(firstInterval.beginDepth).toBeTypeOf("number");
    expect(firstInterval.endDepth).toBeTypeOf("number");
    expect(firstInterval.boringTechnique?.code).toBeTypeOf("string");
    expect(firstInterval.boredDiameter).toBeTypeOf("number");
  });

  it("should extract sampled intervals with sampler details", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.sampledInterval).toBeDefined();
    expect(bore.boring!.sampledInterval.length).toBeGreaterThan(0);

    // Find an interval with sampler details
    const intervalWithSampler = bore.boring!.sampledInterval.find(
      (interval) => interval.sampler != null,
    );

    expect(intervalWithSampler).toBeDefined();
    expect(intervalWithSampler!.sampler!.samplerType).toBeTruthy();
    expect(intervalWithSampler!.sampler!.sampleContainerDiameter).toBeTypeOf("number");
  });

  it("should extract completed intervals", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.completedInterval).toBeDefined();
    expect(bore.boring!.completedInterval.length).toBeGreaterThan(0);

    const firstInterval = bore.boring!.completedInterval[0];
    expect(firstInterval.beginDepth).toBeTypeOf("number");
    expect(firstInterval.endDepth).toBeTypeOf("number");
    expect(firstInterval.backfillMaterial?.code).toBeTypeOf("string");
    expect(firstInterval.permanentCasingPresent).toBeTypeOf("boolean");
    expect(firstInterval.backfillMaterialCertified).toBeTypeOf("boolean");
  });

  it("should extract registration history", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.registrationHistory).toBeDefined();
    expect(typeof bore.registrationHistory!.objectRegistrationTime).toBe("string");
    expect(bore.registrationHistory!.registrationStatus).toBeTruthy();
    expect(bore.registrationHistory!.corrected).toBeTypeOf("boolean");
  });

  it("should extract report history with intermediate events", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.reportHistory).toBeDefined();
    expect(typeof bore.reportHistory!.reportStartDate).toBe("string");
    expect(bore.reportHistory!.intermediateEvent).toBeDefined();
    expect(bore.reportHistory!.intermediateEvent.length).toBeGreaterThan(0);

    const event = bore.reportHistory!.intermediateEvent[0];
    expect(event.eventName).toBeTruthy();
    expect(typeof event.eventDate).toBe("string");
  });

  it("should extract top-level metadata fields", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    expect(bore.deliveryContext).toBeTruthy();
    expect(bore.surveyPurpose).toBeTruthy();
    expect(bore.discipline).toBeTruthy();
    expect(bore.surveyProcedure).toBeTruthy();
  });
});
