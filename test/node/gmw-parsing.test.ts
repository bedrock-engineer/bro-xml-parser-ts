import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { assertValidLocation } from '@test/helpers/assertions';

describe('GMW Parsing (Node)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('Basic GMW parsing', () => {
    it('parses a single-tube well (GMW000000048066)', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      expect(gmw.broId).toBe('GMW000000048066');
      expect(gmw.qualityRegime).toBe('IMBRO');
      expect(gmw.numberOfMonitoringTubes).toBe(1);
      expect(gmw.monitoringTubes).toBeInstanceOf(Array);
      expect(gmw.monitoringTubes).toHaveLength(1);
    });

    it('includes meta with schema version info', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      expect(gmw.meta.schemaVersion).toBe('1.1');
      expect(gmw.meta.dataType).toBe('GMW');
      expect(gmw.meta.schemaNamespace).toBe('http://www.broservices.nl/xsd/dsgmw/1.1');
      expect(gmw.meta.warnings).toEqual([]);
    });

    it('auto-detects GMW via parse()', () => {
      const data = parser.parse(fixtures.gmw.singleTube());
      expect(data.meta.dataType).toBe('GMW');
      expect(data.broId).toBe('GMW000000048066');
    });
  });

  describe('Well-level metadata', () => {
    it('extracts construction/context/ownership fields', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      expect(gmw.deliveryContext).toBe('publiekeTaak');
      expect(gmw.constructionStandard).toBe('RWSgwmon');
      expect(gmw.initialFunction).toBe('stand');
      expect(gmw.withPrehistory).toBe(false);
      expect(gmw.removed).toBe(false);
      expect(gmw.groundLevelStable).toBe('ja');
      expect(gmw.wellCode).toBe('GMW44D129400');
      expect(gmw.owner).toBe('27364178');
      expect(gmw.wellHeadProtector).toBe('geen');
    });

    it('extracts locations and vertical position', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      assertValidLocation(gmw.deliveredLocation);
      expect(gmw.deliveredLocation?.epsg).toBe('EPSG:28992');
      assertValidLocation(gmw.standardizedLocation);
      expect(gmw.standardizedLocation?.epsg).toBe('EPSG:4258');
      expect(gmw.coordinateTransformation).toBe('RDNAPTRANS2008');

      expect(gmw.deliveredVerticalPositionDatum).toBe('NAP');
      expect(gmw.deliveredVerticalPositionReferencePoint).toBe('NAP');
      expect(gmw.deliveredVerticalPositionOffset).toBe(0);
      expect(gmw.groundLevelPosition).toBeCloseTo(6.84, 3);
      expect(gmw.groundLevelPositioningMethod).toBe('RTKGPS10tot20cm');
    });

    it('parses registration history and construction date', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      expect(gmw.registrationHistory?.registrationStatus).toBe('geregistreerd');
      expect(gmw.registrationHistory?.objectRegistrationTime).toBe(
        '2021-05-31T16:56:39+02:00'
      );
      expect(gmw.registrationHistory?.deregistered).toBe(false);
      // Partial-date wrapper preserved as an ISO string.
      expect(gmw.wellConstructionDate).toBe('1900-01-01');
    });
  });

  describe('Monitoring tubes', () => {
    it('flattens materialUsed / screen / plainTubePart / sedimentSump', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());
      const tube = gmw.monitoringTubes[0];

      expect(tube.tubeNumber).toBe(1);
      expect(tube.tubeType).toBe('standaardbuis');
      expect(tube.artesianWellCapPresent).toBe(false);
      expect(tube.sedimentSumpPresent).toBe(true);
      expect(tube.numberOfGeoOhmCables).toBe(0);
      expect(tube.tubeTopDiameter).toBe(32);
      expect(tube.variableDiameter).toBe(false);
      expect(tube.tubeInUse).toBe('onbekend');

      // materialUsed
      expect(tube.tubeMaterial).toBe('peHighDensity');
      expect(tube.tubePackingMaterial).toBe('bentonietFiltergrind');
      expect(tube.glue).toBe('ongespecificeerd');

      // screen
      expect(tube.screenLength).toBeCloseTo(1.0, 3);
      expect(tube.sockMaterial).toBe('nylon');
      expect(tube.screenTopPosition).toBeCloseTo(3.44, 3);
      expect(tube.screenBottomPosition).toBeCloseTo(2.44, 3);

      // plainTubePart / sedimentSump
      expect(tube.plainTubePartLength).toBeCloseTo(3.4, 3);
      expect(tube.sedimentSumpLength).toBeCloseTo(0.5, 3);

      // no cables on this tube
      expect(tube.geoOhmCables).toEqual([]);
    });

    it('parses a multi-tube well (GMW000000040000)', () => {
      const gmw = parser.parseGMW(fixtures.gmw.multiTube());

      expect(gmw.numberOfMonitoringTubes).toBe(2);
      expect(gmw.monitoringTubes).toHaveLength(2);
      expect(gmw.monitoringTubes.map((t) => t.tubeNumber)).toEqual([1, 2]);
    });
  });

  describe('Well-history events', () => {
    it('extracts the intermediate-event log (GMW000000012500)', () => {
      const gmw = parser.parseGMW(fixtures.gmw.withEvent());

      expect(gmw.wellConstructionDate).toBe('2014-10-07');
      expect(gmw.intermediateEvents).toHaveLength(1);
      expect(gmw.intermediateEvents[0]).toEqual({
        eventName: 'nieuweInmetingPosities',
        eventDate: '2016-08-22',
      });
    });

    it('has an empty event log when there are no events', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());
      expect(gmw.intermediateEvents).toEqual([]);
    });
  });

  describe('Inserted parts and geo-ohm cables (synthetic fixture)', () => {
    it('parses insertedPart and geoOhmCable/electrode branches', () => {
      const gmw = parser.parseGMW(fixtures.gmw.synthetic());
      const tube = gmw.monitoringTubes[0];

      expect(tube.tubePartInserted).toBe(true);
      expect(tube.insertedPartLength).toBeCloseTo(1.2, 3);
      expect(tube.insertedPartDiameter).toBe(32);
      expect(tube.insertedPartMaterial).toBe('rvs');

      expect(tube.numberOfGeoOhmCables).toBe(1);
      expect(tube.geoOhmCables).toHaveLength(1);
      const cable = tube.geoOhmCables[0];
      expect(cable.cableNumber).toBe(1);
      expect(cable.cableInUse).toBe('ja');
      expect(cable.electrodes).toHaveLength(2);
      expect(cable.electrodes[0]).toEqual({
        electrodeNumber: 1,
        electrodePackingMaterial: 'filtergrind',
        electrodeStatus: 'gebruiksklaar',
        electrodePosition: -9.0,
      });
      expect(cable.electrodes[1].electrodePosition).toBeCloseTo(-9.5, 3);
    });
  });

  describe('Wrong document type', () => {
    it('throws a helpful error when a CPT is passed to parseGMW', () => {
      expect(() => parser.parseGMW(fixtures.cpt.example())).toThrow(/expected GMW/i);
    });
  });
});
