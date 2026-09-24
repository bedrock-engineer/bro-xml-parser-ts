import { describe, it, expect, beforeEach } from "vitest";
import { BROParser } from "@/parser";
import { NodeXMLAdapter } from "@/adapters/node-adapter";
import { fixtures } from "@test/helpers/fixture-loader";
import { asSoilLayer, isSoilLayer, firstLogLayers } from "@test/helpers/assertions";

describe("BHR-GT newly added fields", () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe("NEN 5104 soil fields on IMBRO/A archive data", () => {
    it("extracts NEN 5104 soil description when geotechnicalSoilName is nil (Zeeland)", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());

      expect(bore.broId).toBe("BHR000000351618");
      expect(bore.qualityRegime).toBe("IMBRO/A");
      const layers = firstLogLayers(bore);
      expect(layers.length).toBe(6);

      const firstLayer = asSoilLayer(layers[0]);
      // geotechnicalSoilName is nil in this archive record → null (coded absence)...
      expect(firstLayer.soil.geotechnicalSoilName).toBeNull();
      // ...but the soil is described via the NEN 5104 fields.
      expect(firstLayer.soil.soilNameNEN5104?.code).toBe("zwakZandigeKlei");
      expect(firstLayer.soil.gravelContentClassNEN5104?.code).toBe("nietGrindig");
      expect(firstLayer.soil.organicMatterContentClassNEN5104?.code).toBe("matigHumeus");
    });
  });

  describe("layer detail fields", () => {
    it("extracts gravelMedianClass (trimmed)", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000377186());
      const layers = firstLogLayers(bore);
      const withGravelMedian = layers
        .filter(isSoilLayer)
        .find((l) => l.soil.gravelMedianClass != null);
      expect(withGravelMedian?.soil.gravelMedianClass?.code).toBe("middelgrof");
    });

    it("extracts activityType and geotechnicalDepositionalCharacteristic", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000380390());
      const layers = firstLogLayers(bore);
      const withActivity = layers.find((l) => l.activityType != null);
      expect(withActivity?.activityType?.code).toBe("nietBepaald");
      const withDepositional = layers
        .filter(isSoilLayer)
        .find((l) => l.soil.geotechnicalDepositionalCharacteristic != null);
      expect(withDepositional?.soil.geotechnicalDepositionalCharacteristic?.code).toBe(
        "nietBepaald",
      );
    });

    it("omits NEN 5104 / detail fields on layers that do not have them", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000380390());
      const layers = firstLogLayers(bore);
      // Layers without an NEN 5104 description carry a null value for it.
      const layerWithoutNen = layers
        .filter(isSoilLayer)
        .find((l) => l.soil.soilNameNEN5104 == null);
      expect(layerWithoutNen).toBeDefined();
    });
  });

  describe("document-level fields", () => {
    it("extracts deliveryAccountableParty", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      expect(bore.deliveryAccountableParty).toBe("27364178");
    });

    it("extracts boring flags (temporaryCasingUsed, preparation)", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      expect(bore.boring?.temporaryCasingUsed).toBe(false);
      expect(bore.boring?.preparation?.code).toBe("geen");
    });

    it("extracts flushingMediumUsed (tri-state string)", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000378222());
      expect(bore.boring?.flushingMediumUsed).toBe('nee');
    });

    it("extracts soilUse from site characteristic", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000377186());
      expect(bore.siteCharacteristic?.soilUse?.code).toBe("akker");
    });

    it("extracts mean groundwater levels from the descriptive borehole log", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.bmbOnly1());
      const log = bore.boreholeSampleDescription?.descriptiveBoreholeLog?.[0];
      expect(log?.meanHighestGroundwaterLevel).toBe(0.6);
      expect(log?.meanLowestGroundwaterLevel).toBe(1.0);
    });

    it("defaults document-level fields to null when absent", () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      // siteCharacteristic is absent here, so soilUse resolves nullish.
      expect(bore.siteCharacteristic?.soilUse ?? null).toBeNull();
      const log = bore.boreholeSampleDescription?.descriptiveBoreholeLog?.[0];
      expect(log?.meanHighestGroundwaterLevel).toBeNull();
    });
  });
});
