import { describe, it, expect, beforeEach } from "vitest";
import { BROParser } from "@/parser";
import { NodeXMLAdapter } from "@/adapters/node-adapter";
import { fixtures } from "@test/helpers/fixture-loader";
import { asSoilLayer, assertValidBore, firstLogLayers } from "@test/helpers/assertions";

describe("BHR-GT with BMB Only (No Laboratory Analysis)", () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it("should parse BHR-GT file with only visual description (BHR000000336062)", () => {
    const xml = fixtures.bhrGtBma.bmbOnly1();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.broId).toBe("BHR000000336062");
    expect(bore.qualityRegime).toBe("IMBRO");
  });

  it("should have undefined analysis field when no BMA data present", () => {
    const xml = fixtures.bhrGtBma.bmbOnly1();
    const bore = parser.parseBHRGT(xml);

    expect(bore.analysis).toBeUndefined();
  });

  it("should extract bore description layers from BMB data", () => {
    const xml = fixtures.bhrGtBma.bmbOnly1();
    const bore = parser.parseBHRGT(xml);

    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);

    const firstLayer = asSoilLayer(layers[0]);
    expect(firstLayer.upperBoundary).toBeTypeOf("number");
    expect(firstLayer.lowerBoundary).toBeTypeOf("number");
    expect(firstLayer.soil.geotechnicalSoilName?.code).toBeTypeOf("string");
  });

  it("should parse large BMB-only file (BHR000000336085 - 101KB)", () => {
    const xml = fixtures.bhrGtBma.bmbOnly2();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.broId).toBe("BHR000000336085");
    expect(bore.analysis).toBeUndefined();
    const layers = firstLogLayers(bore);
    expect(layers.length).toBeGreaterThan(0);
  });

  it("should parse BHR000000336086 BMB-only file", () => {
    const xml = fixtures.bhrGtBma.bmbOnly3();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.broId).toBe("BHR000000336086");
    expect(bore.analysis).toBeUndefined();
  });

  it("should parse BHR000000431542 BMB-only file", () => {
    const xml = fixtures.bhrGtBma.bmbOnly4();
    const bore = parser.parseBHRGT(xml);

    assertValidBore(bore);
    expect(bore.broId).toBe("BHR000000431542");
    expect(bore.analysis).toBeUndefined();
  });

  it("should extract bore metadata from BMB-only files", () => {
    const xml = fixtures.bhrGtBma.bmbOnly1();
    const bore = parser.parseBHRGT(xml);

    expect(bore.boring?.finalDepthBoring).toBeTypeOf("number");
    expect(bore.boring?.rockReached).toBeTypeOf("boolean");
    // boreholeCompleted is tri-state (ja/nee/onbekend) → raw string, not boolean.
    expect(bore.boring?.boreholeCompleted).toBeTypeOf("string");
    expect(bore.boreholeSampleDescription?.descriptionProcedure).toBeTruthy();
  });

  it("should differentiate BMB-only from BMA files", () => {
    const bmbOnlyXml = fixtures.bhrGtBma.bmbOnly1();
    const bmaXml = fixtures.bhrGtBma.dispatch();

    const bmbOnly = parser.parseBHRGT(bmbOnlyXml);
    const withBma = parser.parseBHRGT(bmaXml);

    // BMB-only file should NOT have analysis
    expect(bmbOnly.analysis).toBeUndefined();

    // BMA file should HAVE analysis
    expect(withBma.analysis).toBeDefined();
    expect(withBma.analysis?.investigatedIntervals).toBeDefined();
  });
});
