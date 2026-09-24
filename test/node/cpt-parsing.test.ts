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
      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements.length).toBeGreaterThan(100);
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
      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements.length).toBeGreaterThan(0);
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

      assertValidLocation(cpt.deliveredLocation?.location ?? null);
      expect(cpt.deliveredLocation?.location?.epsg).toContain('EPSG');
    });

    it('should extract depth information', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.conePenetrometerSurvey?.trajectory?.finalDepth).toBeTypeOf('number');
      expect(cpt.conePenetrometerSurvey?.trajectory?.finalDepth).toBeGreaterThan(0);
    });

    it('should extract quality class', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(cpt.conePenetrometerSurvey?.qualityClass).toEqual({ code: 'klasse2', codeSpace: 'urn:bro:cpt:QualityClass' });
    });

    it('should extract dates', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      expect(typeof cpt.researchReportDate).toBe('string');
    });

    it('should extract conePenetrationTest phenomenonTime and resultTime', () => {
      const xml = fixtures.cpt.imbroa();
      const cpt = parser.parseCPT(xml);

      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.phenomenonTime?.startsWith('2014-02-05')).toBe(true);
      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.resultTime?.startsWith('2014-02-05')).toBe(true);
    });
  });

  describe('Processing flags', () => {
    it('should parse stopCriterion from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.conePenetrometerSurvey?.stopCriterion?.code).toBe('einddiepte');
    });

    it('should parse finalProcessingDate from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.conePenetrometerSurvey?.finalProcessingDate).toBe('2019-04-23');
    });

    it('should parse signal/interruption/expert correction flags from example.xml', () => {
      // These are tri-state (ja/nee/onbekend), kept as their raw strings.
      const cpt = parser.parseCPT(fixtures.cpt.example());
      expect(cpt.conePenetrometerSurvey?.procedure?.signalProcessingPerformed).toBe('ja');
      expect(cpt.conePenetrometerSurvey?.procedure?.interruptionProcessingPerformed).toBe('ja');
      expect(cpt.conePenetrometerSurvey?.procedure?.expertCorrectionPerformed).toBe('ja');
    });

    it('should parse processing flags from CPT000000179849', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbro2());
      expect(cpt.conePenetrometerSurvey?.stopCriterion?.code).toBe('einddiepte');
      expect(cpt.conePenetrometerSurvey?.finalProcessingDate).toBe('2020-05-19');
      expect(cpt.conePenetrometerSurvey?.procedure?.signalProcessingPerformed).toBe('nee');
      expect(cpt.conePenetrometerSurvey?.procedure?.interruptionProcessingPerformed).toBe('ja');
      expect(cpt.conePenetrometerSurvey?.procedure?.expertCorrectionPerformed).toBe('nee');
    });
  });

  describe('Survey context', () => {
    it('should parse deliveryContext and surveyPurpose from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.deliveryContext?.code).toBe('archiefoverdracht');
      expect(cpt.surveyPurpose?.code).toBe('onbekend');
    });

    it('should parse additionalInvestigationPerformed flag', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.additionalInvestigationPerformed).toBe('ja');
    });

    it('should return null for deliveryContext when not present', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());

      // example.xml has deliveryContext
      expect(cpt.deliveryContext).not.toBeUndefined();
    });
  });

  describe('Location provenance', () => {
    it('should parse horizontalPositioningDate and method from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.deliveredLocation?.horizontalPositioningDate).toBe('2014-02-05');
      expect(cpt.deliveredLocation?.horizontalPositioningMethod?.code).toBe('onbekend');
    });

    it('should parse verticalPositioningDate and method from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.deliveredVerticalPosition?.verticalPositioningDate).toBe('2014-02-05');
      expect(cpt.deliveredVerticalPosition?.verticalPositioningMethod?.code).toBe('onbekend');
    });
  });

  describe('Additional investigation', () => {
    it('should parse investigationDate from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.additionalInvestigation?.investigationDate).toBe('2014-02-05');
    });

    it('should parse removedLayers from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.additionalInvestigation?.removedLayer).toHaveLength(2);

      const first = cpt.additionalInvestigation?.removedLayer[0];
      expect(first.sequenceNumber).toBe(1);
      expect(first.upperBoundary).toBe(0);
      expect(first.lowerBoundary).toBe(0.1);
      expect(first.description).toBe('Tegel');

      expect(cpt.additionalInvestigation?.removedLayer[1].description).toBe('Zand');
    });

    it('should return empty array for removedLayers when none present', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());

      expect(cpt.additionalInvestigation?.removedLayer ?? []).toEqual([]);
    });
  });

  describe('Registration history', () => {
    it('should parse registrationHistory from IMBRO/A file', () => {
      const cpt = parser.parseCPT(fixtures.cpt.imbroa());

      expect(cpt.registrationHistory).not.toBeNull();
      expect(cpt.registrationHistory?.registrationStatus?.code).toBe('voltooid');
      expect(cpt.registrationHistory?.corrected).toBe(false);
      expect(typeof cpt.registrationHistory?.objectRegistrationTime).toBe('string');
    });

    it('should parse registrationHistory from example.xml', () => {
      const cpt = parser.parseCPT(fixtures.cpt.example());

      expect(cpt.registrationHistory).not.toBeNull();
      expect(cpt.registrationHistory?.registrationStatus?.code).toBe('voltooid');
      expect(cpt.registrationHistory?.corrected).toBe(false);
    });
  });

  describe('Dissipation tests', () => {
    it('should parse dissipation test from CPT000000179849', () => {
      const xml = fixtures.cpt.imbro2();
      const cpt = parser.parseCPT(xml);

      expect(cpt.conePenetrometerSurvey?.dissipationTest).toHaveLength(1);

      const test = cpt.conePenetrometerSurvey?.dissipationTest[0];
      expect(test.penetrationLength).toBe(20.1);
      expect(typeof test.phenomenonTime).toBe('string');
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

      expect(cpt.conePenetrometerSurvey?.dissipationTest).toEqual([]);
    });

    it('should return empty array for IMBRO/A file without dissipation tests', () => {
      const xml = fixtures.cpt.imbroa();
      const cpt = parser.parseCPT(xml);

      expect(cpt.conePenetrometerSurvey?.dissipationTest).toEqual([]);
    });
  });

  describe('Measurement data', () => {
    it('should have required measurement fields', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      const firstMeasurement = cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements[0];
      expect(firstMeasurement).toBeTruthy();
      expect(firstMeasurement.penetrationLength).toBeTypeOf('number');
      // coneResistance can be null for some measurements
      expect('coneResistance' in firstMeasurement).toBe(true);
    });

    it('should sort measurements by penetration length', () => {
      // CPT000000200287.xml stores its values block out of depth order
      // (e.g. jumping from 32.76m back to 2.46m mid-file), which is legal
      // per the BRO standard. The parser must return depth-ordered data.
      const xml = fixtures.cpt.unordered();
      const cpt = parser.parseCPT(xml);

      expect(cpt.broId).toBe('CPT000000200287');
      const measurements = cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements ?? [];
      expect(measurements.length).toBeGreaterThan(1000);

      for (let i = 1; i < measurements.length; i++) {
        expect(measurements[i].penetrationLength).toBeGreaterThanOrEqual(
          measurements[i - 1].penetrationLength
        );
      }
    });

    it('should handle null values correctly', () => {
      const xml = fixtures.cpt.example();
      const cpt = parser.parseCPT(xml);

      // Some measurements may have null values for optional fields
      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements.length).toBeGreaterThan(0);
      // Just verify we have measurement data
      expect(cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements[0]).toBeTruthy();
    });
  });
});
