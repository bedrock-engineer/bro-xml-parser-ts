import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('GLD Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('Basic GLD parsing', () => {
    it('parses a GLD with observations', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());

      expect(gld.broId).toBe('GLD000000010000');
      expect(gld.qualityRegime).toBe('IMBRO/A');
      expect(gld.meta.dataType).toBe('GLD');
      expect(gld.meta.schemaVersion).toBe('1.0');
      expect(gld.meta.warnings).toEqual([]);
    });

    it('auto-detects GLD via parse()', () => {
      const data = parser.parse(fixtures.gld.withObservations());
      expect(data.meta.dataType).toBe('GLD');
      expect(data.broId).toBe('GLD000000010000');
    });

    it('throws a helpful error when a CPT is passed to parseGLD', () => {
      expect(() => parser.parseGLD(fixtures.cpt.example())).toThrow(/expected GLD/i);
    });
  });

  describe('Scalar fields', () => {
    it('exposes researchFirstDate / researchLastDate', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());
      expect(gld.researchFirstDate).toBe('2019-03-26');
      expect(gld.researchLastDate).toBe('2026-05-12');
    });
  });

  describe('Monitoring point, nets and registration history', () => {
    it('parses the monitoring-point tube reference', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());
      expect(gld.monitoringPoint).toEqual({
        broId: 'GMW000000020142',
        tubeNumber: 1,
      });
    });

    it('parses groundwater monitoring net membership', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());
      expect(gld.groundwaterMonitoringNet).toEqual([{ broId: 'GMN000000000553' }]);
    });

    it('parses registration history', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());
      expect(gld.registrationHistory?.registrationStatus?.code).toBe('aangevuld');
      expect(gld.registrationHistory?.corrected).toBe(true);
      expect(gld.registrationHistory?.latestAdditionTime).toBe('2026-06-17T15:51:46+02:00');
    });
  });

  describe('Observation time-series', () => {
    it('parses observation metadata and points', () => {
      const gld = parser.parseGLD(fixtures.gld.withObservations());

      expect(gld.observation).toHaveLength(1);
      const obs = gld.observation[0];
      expect(obs.observationType).toBe('reguliereMeting');
      expect(obs.status).toBe('voorlopig');
      expect(obs.beginPosition).toBe('2021-10-11');
      expect(obs.endPosition).toBe('2022-02-15');
      expect(obs.resultTime).toBe('2022-02-15');
      expect(obs.airPressureCompensationType).toBeTypeOf('string');
      expect(obs.evaluationProcedure).toBeTypeOf('string');

      // Trimmed to the first 5 points.
      expect(obs.points).toHaveLength(5);
      expect(obs.points[0]).toEqual({
        time: '2021-10-11T01:00:00+02:00',
        value: 26.781,
        unit: 'm',
        qualifier: 'goedgekeurd',
      });
      // Every point should have a numeric value and a timestamp.
      for (const p of obs.points) {
        expect(p.time).toBeTypeOf('string');
        expect(p.value).toBeTypeOf('number');
      }
    });
  });

  describe('GLD without observations', () => {
    it('parses a registered GLD that has no observations yet', () => {
      const gld = parser.parseGLD(fixtures.gld.noObservations());

      expect(gld.broId).toBe('GLD000000030000');
      expect(gld.monitoringPoint).toEqual({
        broId: 'GMW000000063611',
        tubeNumber: 2,
      });
      expect(gld.observation).toEqual([]);
      expect(gld.groundwaterMonitoringNet).toEqual([]);
      expect(gld.researchFirstDate).toBeNull();
    });
  });
});
