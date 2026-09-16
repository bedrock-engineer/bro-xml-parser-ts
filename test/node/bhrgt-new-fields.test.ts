import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('BHR-GT newly added fields', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('NEN 5104 soil fields on IMBRO/A archive data', () => {
    it('extracts NEN 5104 soil description when geotechnicalSoilName is nil (Zeeland)', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());

      expect(bore.broId).toBe('BHR000000351618');
      expect(bore.qualityRegime).toBe('IMBRO/A');
      expect(bore.data.length).toBe(6);

      const firstLayer = bore.data[0];
      // geotechnicalSoilName is nil in this archive record...
      expect(firstLayer.geotechnicalSoilName).toBe('');
      // ...but the soil is described via the NEN 5104 fields.
      expect(firstLayer.soilNameNEN5104).toBe('zwakZandigeKlei');
      expect(firstLayer.gravelContentClassNEN5104).toBe('nietGrindig');
      expect(firstLayer.organicMatterContentClassNEN5104).toBe('matigHumeus');
    });
  });

  describe('layer detail fields', () => {
    it('extracts gravelMedianClass (trimmed)', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000377186());
      const withGravelMedian = bore.data.find((l) => l.gravelMedianClass != null);
      expect(withGravelMedian?.gravelMedianClass).toBe('middelgrof');
    });

    it('extracts activityType and geotechnicalDepositionalCharacteristic', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000380390());
      const withActivity = bore.data.find((l) => l.activityType != null);
      expect(withActivity?.activityType).toBe('nietBepaald');
      const withDepositional = bore.data.find(
        (l) => l.geotechnicalDepositionalCharacteristic != null,
      );
      expect(withDepositional?.geotechnicalDepositionalCharacteristic).toBe('nietBepaald');
    });

    it('omits NEN 5104 / detail fields on layers that do not have them', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000380390());
      // These optional fields use omitIfEmpty, so absent values must not appear as keys.
      const layerWithoutNen = bore.data.find((l) => !('soilNameNEN5104' in l));
      expect(layerWithoutNen).toBeDefined();
    });
  });

  describe('document-level fields', () => {
    it('extracts deliveryAccountableParty', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      expect(bore.deliveryAccountableParty).toBe('27364178');
    });

    it('extracts boring flags (temporaryCasingUsed, preparation)', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      expect(bore.temporaryCasingUsed).toBe(false);
      expect(bore.preparation).toBe('geen');
    });

    it('extracts flushingMediumUsed as boolean', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000378222());
      expect(bore.flushingMediumUsed).toBe(false);
    });

    it('extracts soilUse from site characteristic', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.BHR000000377186());
      expect(bore.soilUse).toBe('akker');
    });

    it('extracts mean groundwater levels from the descriptive borehole log', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.bmbOnly1());
      expect(bore.meanHighestGroundwaterLevel).toBe(0.6);
      expect(bore.meanLowestGroundwaterLevel).toBe(1.0);
    });

    it('defaults document-level fields to null when absent', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGt.zeelandImbroA());
      expect(bore.soilUse).toBeNull();
      expect(bore.meanHighestGroundwaterLevel).toBeNull();
    });
  });
});
