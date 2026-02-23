import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import * as resolvers from '@/resolvers';
import * as presets from '@/schema-presets';
import type { Schema } from '@/types/index';

describe('Custom Schema Parsing', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('CPT custom schemas', () => {
    it('should parse with ID_ONLY preset', () => {
      const xml = fixtures.cpt.example();
      const result = parser.parseCustom(xml, presets.CPT_ID_ONLY, 'CPT');

      expect(result.broId).toBeTruthy();
      expect(result.qualityRegime).toBeTruthy();
      expect(result.meta.dataType).toBe('CPT');
      // Should not have other fields
      expect((result as any).finalDepth).toBeUndefined();
    });

    it('should parse with LOCATION_ONLY preset', () => {
      const xml = fixtures.cpt.example();
      const result = parser.parseCustom(xml, presets.CPT_LOCATION_ONLY, 'CPT');

      expect(result.broId).toBeTruthy();
      expect(result.deliveredLocation).toBeDefined();
      expect(result.deliveredLocation.x).toBeTypeOf('number');
      expect(result.deliveredLocation.y).toBeTypeOf('number');
    });

    it('should parse with METADATA_ONLY preset', () => {
      const xml = fixtures.cpt.example();
      const result = parser.parseCustom(xml, presets.CPT_METADATA_ONLY, 'CPT');

      expect(result.broId).toBeTruthy();
      expect(result.finalDepth).toBeTypeOf('number');
      expect(result.qualityClass).toBeTypeOf('number');
      // Should not have measurement data
      expect((result as any).data).toBeUndefined();
    });

    it('should parse with fully custom schema', () => {
      const xml = fixtures.cpt.example();

      const mySchema: Schema = {
        id: { xpath: 'brocom:broId' },
        depth: {
          xpath: './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth',
          resolver: resolvers.parseFloat,
        },
        reportDate: {
          xpath: './dscpt:researchReportDate/brocom:date',
          resolver: resolvers.parseDate,
        },
      };

      const result = parser.parseCustom<{
        id: string;
        depth: number;
        reportDate: Date;
      }>(xml, mySchema, 'CPT');

      expect(result.id).toBeTruthy();
      expect(result.depth).toBeTypeOf('number');
      expect(result.reportDate).toBeInstanceOf(Date);
    });
  });

  describe('BHR-GT custom schemas', () => {
    it('should parse with ID_ONLY preset', () => {
      const xml = fixtures.bhrGt.dispatch();
      const result = parser.parseCustom(xml, presets.BORE_ID_ONLY, 'BHR-GT');

      expect(result.broId).toBeTruthy();
      expect(result.qualityRegime).toBeTruthy();
      expect(result.meta.dataType).toBe('BHR-GT');
    });

    it('should parse with LOCATION_ONLY preset', () => {
      const xml = fixtures.bhrGt.dispatch();
      const result = parser.parseCustom(xml, presets.BORE_LOCATION_ONLY, 'BHR-GT');

      expect(result.broId).toBeTruthy();
      expect(result.deliveredLocation).toBeDefined();
    });

    it('should parse with METADATA_ONLY preset', () => {
      const xml = fixtures.bhrGt.dispatch();
      const result = parser.parseCustom(xml, presets.BORE_METADATA_ONLY, 'BHR-GT');

      expect(result.broId).toBeTruthy();
      expect(result.finalBoreDepth).toBeTypeOf('number');
      // Should not have layer data
      expect((result as any).data).toBeUndefined();
    });
  });

  describe('BHR-G custom schemas', () => {
    it('should parse with ID_ONLY preset', () => {
      const xml = fixtures.bhrG.dispatch();
      const result = parser.parseCustom(xml, presets.BHRG_ID_ONLY, 'BHR-G');

      expect(result.broId).toBeTruthy();
      expect(result.qualityRegime).toBeTruthy();
      expect(result.meta.dataType).toBe('BHR-G');
    });

    it('should parse with METADATA_ONLY preset', () => {
      const xml = fixtures.bhrG.dispatch();
      const result = parser.parseCustom(xml, presets.BHRG_METADATA_ONLY, 'BHR-G');

      expect(result.broId).toBeTruthy();
      expect(result.finalBoreDepth).toBeTypeOf('number');
    });
  });

  describe('Auto-detect data type', () => {
    it('should auto-detect CPT data type when not specified', () => {
      const xml = fixtures.cpt.example();
      const result = parser.parseCustom(xml, presets.CPT_ID_ONLY);

      expect(result.meta.dataType).toBe('CPT');
      expect(result.broId).toBeTruthy();
    });

    it('should auto-detect BHR-GT data type when not specified', () => {
      const xml = fixtures.bhrGt.dispatch();
      const result = parser.parseCustom(xml, presets.BORE_ID_ONLY);

      expect(result.meta.dataType).toBe('BHR-GT');
    });
  });

  describe('Extending presets', () => {
    it('should allow extending a preset with additional fields', () => {
      const xml = fixtures.cpt.example();

      const extendedSchema: Schema = {
        ...presets.CPT_ID_ONLY,
        finalDepth: {
          xpath: './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth',
          resolver: resolvers.parseFloat,
        },
      };

      const result = parser.parseCustom(xml, extendedSchema, 'CPT');

      expect(result.broId).toBeTruthy();
      expect(result.qualityRegime).toBeTruthy();
      expect(result.finalDepth).toBeTypeOf('number');
    });
  });
});
