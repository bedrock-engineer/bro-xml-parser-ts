import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { assertValidCPT, assertValidLocation } from '@test/helpers/assertions';

describe('CPT Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('Basic CPT parsing', () => {
    it('should parse example.xml successfully', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      assertValidCPT(cpt);
      expect(cpt.qualityRegime).toBe('IMBRO');
    });

    it('should include meta with schema version info', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.meta).toBeDefined();
      expect(cpt.meta.schemaVersion).toBe('1.1');
      expect(cpt.meta.dataType).toBe('CPT');
      expect(cpt.meta.schemaNamespace).toBe(
        'http://www.broservices.nl/xsd/dscpt/1.1'
      );
      expect(cpt.meta.warnings).toEqual([]);
    });

    it('should parse large IMBRO/A CPT file', () => {
      const xml = fixtures.cpt.imbroa();
      const cpt = parser.parseCPT(xml);

      assertValidCPT(cpt);
      expect(cpt.data.length).toBeGreaterThan(100);
    });

    it('should parse IMBRO/A file', () => {
      const xml = fixtures.cpt.imbroa();
      const cpt = parser.parseCPT(xml);

      assertValidCPT(cpt);
      expect(cpt.qualityRegime).toBe('IMBRO/A');
    });

    it('should parse second IMBRO CPT file (CPT000000179849)', () => {
      const xml = fixtures.cpt.imbro2();
      const cpt = parser.parseCPT(xml);

      assertValidCPT(cpt);
      expect(cpt.broId).toBe('CPT000000179849');
      expect(cpt.qualityRegime).toBe('IMBRO');
      expect(cpt.data.length).toBeGreaterThan(0);
    });
  });

  describe('Metadata extraction', () => {
    it('should extract BRO ID', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.broId).toMatch(/^CPT\d+$/);
    });

    it('should extract location data', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      assertValidLocation(cpt.deliveredLocation);
      expect(cpt.deliveredLocation?.epsg).toContain('EPSG');
    });

    it('should extract depth information', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.finalDepth).toBeTypeOf('number');
      expect(cpt.finalDepth).toBeGreaterThan(0);
    });

    it('should extract quality class', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      if (cpt.qualityClass !== null) {
        expect(cpt.qualityClass).toBeGreaterThanOrEqual(1);
        expect(cpt.qualityClass).toBeLessThanOrEqual(4);
      }
    });

    it('should extract dates', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.researchReportDate).toBeInstanceOf(Date);
    });
  });

  describe('Processing flags', () => {
    it('should parse stopCriterion from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.stopCriterion).toBe('einddiepte');
    });

    it('should parse finalProcessingDate from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.finalProcessingDate).toBeInstanceOf(Date);
      expect(cpt.finalProcessingDate?.toISOString().startsWith('2019-04-23')).toBe(true);
    });

    it('should parse signal/interruption/expert correction flags from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.signalProcessingPerformed).toBe(true);
      expect(cpt.interruptionProcessingPerformed).toBe(true);
      expect(cpt.expertCorrectionPerformed).toBe(true);
    });

    it('should parse processing flags from CPT000000179849', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbro2());
      expect(cpt.stopCriterion).toBe('einddiepte');
      expect(cpt.finalProcessingDate?.toISOString().startsWith('2020-05-19')).toBe(true);
      expect(cpt.signalProcessingPerformed).toBe(false);
      expect(cpt.interruptionProcessingPerformed).toBe(true);
      expect(cpt.expertCorrectionPerformed).toBe(false);
    });
  });

  describe('Dissipation tests', () => {
    it('should parse dissipation test from CPT000000179849', () => {
      const xml = fixtures.cpt.imbro2();
      const cpt = parser.parseCPT(xml);

      expect(cpt.dissipationTests).toHaveLength(1);

      const test = cpt.dissipationTests[0];
      expect(test.penetrationLength).toBe(20.1);
      expect(test.phenomenonTime).toBeInstanceOf(Date);
      expect(test.measurements).toHaveLength(317);

      // First measurement
      const first = test.measurements[0];
      expect(first.elapsedTime).toBe(1);
      expect(first.coneResistance).toBe(19.3);
      expect(first.porePressureU1).toBeNull();
      expect(first.porePressureU2).toBe(0.141);
      expect(first.porePressureU3).toBeNull();
    });

    it('should return empty array when no dissipation tests present', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.dissipationTests).toEqual([]);
    });

    it('should return empty array for IMBRO/A file without dissipation tests', () => {
      const xml = fixtures.cpt.imbroa();
      const cpt = parser.parseCPT(xml);

      expect(cpt.dissipationTests).toEqual([]);
    });
  });

  describe('Measurement data', () => {
    it('should have required measurement fields', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      const firstMeasurement = cpt.data[0];
      expect(firstMeasurement).toBeTruthy();
      expect(firstMeasurement.penetrationLength).toBeTypeOf('number');
      // coneResistance can be null for some measurements
      expect('coneResistance' in firstMeasurement).toBe(true);
    });

    it('should handle null values correctly', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      // Some measurements may have null values for optional fields
      expect(cpt.data.length).toBeGreaterThan(0);
      // Just verify we have measurement data
      expect(cpt.data[0]).toBeTruthy();
    });
  });
});
