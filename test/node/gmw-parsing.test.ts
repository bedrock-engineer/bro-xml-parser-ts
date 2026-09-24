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
      expect(gmw.monitoringTube).toBeInstanceOf(Array);
      expect(gmw.monitoringTube).toHaveLength(1);
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

      expect(gmw.deliveryContext?.code).toBe('publiekeTaak');
      expect(gmw.constructionStandard?.code).toBe('RWSgwmon');
      expect(gmw.initialFunction?.code).toBe('stand');
      expect(gmw.withPrehistory).toBe(false);
      expect(gmw.removed).toBe(false);
      // groundLevelStable is tri-state (ja/nee/onbekend), kept as its raw string.
      expect(gmw.groundLevelStable).toBe('ja');
      expect(gmw.wellCode).toBe('GMW44D129400');
      expect(gmw.owner).toBe('27364178');
      expect(gmw.wellHeadProtector?.code).toBe('geen');
    });

    it('extracts locations and vertical position', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      assertValidLocation(gmw.deliveredLocation?.location ?? null);
      expect(gmw.deliveredLocation?.location?.epsg).toBe('EPSG:28992');
      assertValidLocation(gmw.standardizedLocation?.location ?? null);
      expect(gmw.standardizedLocation?.location?.epsg).toBe('EPSG:4258');
      expect(gmw.standardizedLocation?.coordinateTransformation?.code).toBe('RDNAPTRANS2008');

      expect(gmw.deliveredVerticalPosition?.verticalDatum?.code).toBe('NAP');
      expect(gmw.deliveredVerticalPosition?.localVerticalReferencePoint?.code).toBe('NAP');
      expect(gmw.deliveredVerticalPosition?.offset).toBe(0);
      expect(gmw.deliveredVerticalPosition?.groundLevelPosition).toBeCloseTo(6.84, 3);
      expect(gmw.deliveredVerticalPosition?.groundLevelPositioningMethod?.code).toBe(
        'RTKGPS10tot20cm'
      );
    });

    it('parses registration history and construction date', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());

      expect(gmw.registrationHistory?.registrationStatus?.code).toBe('geregistreerd');
      expect(gmw.registrationHistory?.objectRegistrationTime).toBe(
        '2021-05-31T16:56:39+02:00'
      );
      expect(gmw.registrationHistory?.deregistered).toBe(false);
      // Partial-date wrapper preserved as an ISO string.
      expect(gmw.wellHistory?.wellConstructionDate).toBe('1900-01-01');
    });
  });

  describe('Monitoring tubes', () => {
    it('nests materialUsed / screen / plainTubePart / sedimentSump', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());
      const tube = gmw.monitoringTube[0];

      expect(tube.tubeNumber).toBe(1);
      expect(tube.tubeType?.code).toBe('standaardbuis');
      // Tri-state indicators keep their raw ja/nee/onbekend string.
      expect(tube.artesianWellCapPresent).toBe('nee');
      expect(tube.sedimentSumpPresent).toBe('ja');
      expect(tube.numberOfGeoOhmCables).toBe(0);
      expect(tube.tubeTopDiameter).toBe(32);
      expect(tube.variableDiameter).toBe('nee');
      expect(tube.tubeInUse).toBe('onbekend');

      // materialUsed
      expect(tube.materialUsed?.tubeMaterial?.code).toBe('peHighDensity');
      expect(tube.materialUsed?.tubePackingMaterial?.code).toBe('bentonietFiltergrind');
      expect(tube.materialUsed?.glue?.code).toBe('ongespecificeerd');

      // screen
      expect(tube.screen?.screenLength).toBeCloseTo(1.0, 3);
      expect(tube.screen?.sockMaterial?.code).toBe('nylon');
      expect(tube.screen?.screenTopPosition).toBeCloseTo(3.44, 3);
      expect(tube.screen?.screenBottomPosition).toBeCloseTo(2.44, 3);

      // plainTubePart / sedimentSump
      expect(tube.plainTubePart?.plainTubePartLength).toBeCloseTo(3.4, 3);
      expect(tube.sedimentSump?.sedimentSumpLength).toBeCloseTo(0.5, 3);

      // no cables on this tube
      expect(tube.geoOhmCable).toEqual([]);
    });

    it('parses a multi-tube well (GMW000000040000)', () => {
      const gmw = parser.parseGMW(fixtures.gmw.multiTube());

      expect(gmw.numberOfMonitoringTubes).toBe(2);
      expect(gmw.monitoringTube).toHaveLength(2);
      expect(gmw.monitoringTube.map((t) => t.tubeNumber)).toEqual([1, 2]);
    });
  });

  describe('Well-history events', () => {
    it('extracts the intermediate-event log (GMW000000012500)', () => {
      const gmw = parser.parseGMW(fixtures.gmw.withEvent());

      expect(gmw.wellHistory?.wellConstructionDate).toBe('2014-10-07');
      const events = gmw.wellHistory?.intermediateEvent ?? [];
      expect(events).toHaveLength(1);
      expect(events[0].eventName?.code).toBe('nieuweInmetingPosities');
      expect(events[0].eventDate).toBe('2016-08-22');
      // The per-event change record is now surfaced faithfully.
      expect(events[0].eventData?.tubeData[0]?.tubeNumber).toBe(1);
    });

    it('has an empty event log when there are no events', () => {
      const gmw = parser.parseGMW(fixtures.gmw.singleTube());
      expect(gmw.wellHistory?.intermediateEvent).toEqual([]);
    });
  });

  describe('Inserted parts and geo-ohm cables (synthetic fixture)', () => {
    it('parses insertedPart and geoOhmCable/electrode branches', () => {
      const gmw = parser.parseGMW(fixtures.gmw.synthetic());
      const tube = gmw.monitoringTube[0];

      expect(tube.tubePartInserted).toBe(true);
      expect(tube.insertedPart?.insertedPartLength).toBeCloseTo(1.2, 3);
      expect(tube.insertedPart?.insertedPartDiameter).toBe(32);
      expect(tube.insertedPart?.insertedPartMaterial?.code).toBe('rvs');

      expect(tube.numberOfGeoOhmCables).toBe(1);
      expect(tube.geoOhmCable).toHaveLength(1);
      const cable = tube.geoOhmCable[0];
      expect(cable.cableNumber).toBe(1);
      expect(cable.cableInUse).toBe('ja');
      expect(cable.electrode).toHaveLength(2);
      expect(cable.electrode[0].electrodeNumber).toBe(1);
      expect(cable.electrode[0].electrodePackingMaterial?.code).toBe('filtergrind');
      expect(cable.electrode[0].electrodeStatus?.code).toBe('gebruiksklaar');
      expect(cable.electrode[0].electrodePosition).toBe(-9.0);
      expect(cable.electrode[1].electrodePosition).toBeCloseTo(-9.5, 3);
    });
  });

  describe('Wrong document type', () => {
    it('throws a helpful error when a CPT is passed to parseGMW', () => {
      expect(() => parser.parseGMW(fixtures.cpt.example())).toThrow(/expected GMW/i);
    });
  });
});
