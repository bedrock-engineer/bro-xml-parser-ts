import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import * as producers from '@/producers';
import * as presets from '@/schema-presets';
import type { Producer } from '@/core/producer';
import type { ParseMeta, Location } from '@/types/index';

/**
 * `parseCustom` returns `{ meta, ...data }` where `data` has exactly the keys
 * declared in the schema (unmatched fields resolve to null, they are never
 * omitted). So the strongest proof that a preset actually restricts output is
 * that the result's own keys are exactly the schema's keys plus `meta` — no
 * `data`, no `finalDepth`, no other full-parse fields leak through.
 */
function expectExactKeys(result: object, fields: Record<string, Producer<unknown>>) {
  expect(Object.keys(result).sort()).toEqual(['meta', ...Object.keys(fields)].sort());
}

describe('Custom Schema Parsing', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  describe('CPT custom schemas', () => {
    it('ID_ONLY preset extracts only id + regime, nothing else', () => {
      const result = parser.parseCustom(fixtures.cpt.example(), presets.CPT_ID_ONLY, 'CPT');

      expectExactKeys(result, presets.CPT_ID_ONLY);
      expect(result.broId).toBe('CPT000000099543');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.meta.dataType).toBe('CPT');
    });

    it('LOCATION_ONLY preset extracts only location fields with exact coordinates', () => {
      const result = parser.parseCustom(fixtures.cpt.example(), presets.CPT_LOCATION_ONLY, 'CPT');

      // Preset field types are inferred from each producer's output type.
      expectTypeOf(result.broId).toEqualTypeOf<string | null>();
      expectTypeOf(result.deliveredLocation).toEqualTypeOf<Location | null>();
      expectTypeOf(result.deliveredVerticalPositionOffset).toEqualTypeOf<number | null>();

      expectExactKeys(result, presets.CPT_LOCATION_ONLY);
      expect(result.broId).toBe('CPT000000099543');

      const delivered = result.deliveredLocation as { x: number; y: number; epsg: string };
      expect(delivered.x).toBe(170112.2);
      expect(delivered.y).toBe(486406.5);
      expect(delivered.epsg).toBe('EPSG:28992');

      const standardized = result.standardizedLocation as { x: number; y: number; epsg: string };
      expect(standardized.x).toBe(52.36533659);
      expect(standardized.y).toBe(5.60907955);
      expect(standardized.epsg).toBe('EPSG:4258');

      expect(result.deliveredVerticalPositionOffset).toBe(4.41);
    });

    it('METADATA_ONLY preset extracts metadata but not measurement data', () => {
      const result = parser.parseCustom(fixtures.cpt.example(), presets.CPT_METADATA_ONLY, 'CPT');

      expectExactKeys(result, presets.CPT_METADATA_ONLY);
      // No measurement array leaked in
      expect((result as Record<string, unknown>).data).toBeUndefined();

      expect(result.broId).toBe('CPT000000099543');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.researchReportDate).toBe('2019-04-23');
      expect(result.cptStandard).toBe('ISO22476D1');
      expect(result.qualityClass).toBe(2);
      expect(result.finalDepth).toBe(7.439);
      expect((result.deliveredLocation as { epsg: string }).epsg).toBe('EPSG:28992');
    });

    it('fully custom schema infers field types from producers (no manual annotation)', () => {
      // An inline producer map: each field's output type flows into the result.
      const mySchema = {
        id: producers.text('brocom:broId'),
        depth: producers.number(
          './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth'
        ),
        reportDate: producers.date('./dscpt:researchReportDate'),
      };

      // No type argument — the output type is inferred from the map.
      const result = parser.parseCustom(fixtures.cpt.example(), mySchema, 'CPT');

      // Inference: each producer's output type flows through.
      expectTypeOf(result.id).toEqualTypeOf<string | null>();
      expectTypeOf(result.depth).toEqualTypeOf<number | null>();
      expectTypeOf(result.reportDate).toEqualTypeOf<string | null>();
      expectTypeOf(result.meta).toEqualTypeOf<ParseMeta>();

      expectExactKeys(result, mySchema);
      expect(result.id).toBe('CPT000000099543');
      expect(result.depth).toBe(7.439);
      expect(result.reportDate).toBe('2019-04-23');
    });
  });

  describe('BHR-GT custom schemas', () => {
    it('ID_ONLY preset extracts only id + regime, nothing else', () => {
      const result = parser.parseCustom(fixtures.bhrGt.dispatch(), presets.BORE_ID_ONLY, 'BHR-GT');

      expectExactKeys(result, presets.BORE_ID_ONLY);
      expect(result.broId).toBe('BHR000000347577');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.meta.dataType).toBe('BHR-GT');
    });

    it('LOCATION_ONLY preset extracts only location fields with exact coordinates', () => {
      const result = parser.parseCustom(
        fixtures.bhrGt.dispatch(),
        presets.BORE_LOCATION_ONLY,
        'BHR-GT'
      );

      expectExactKeys(result, presets.BORE_LOCATION_ONLY);
      expect(result.broId).toBe('BHR000000347577');

      const delivered = result.deliveredLocation as { x: number; y: number; epsg: string };
      expect(delivered.x).toBe(183218.1);
      expect(delivered.y).toBe(334573.6);
      expect(delivered.epsg).toBe('EPSG:28992');

      const standardized = result.standardizedLocation as { x: number; y: number; epsg: string };
      expect(standardized.x).toBe(51.00011252);
      expect(standardized.y).toBe(5.78917526);
      expect(standardized.epsg).toBe('EPSG:4258');

      expect(result.deliveredVerticalPositionOffset).toBe(51.0);
    });

    it('METADATA_ONLY preset extracts metadata but not layer data', () => {
      const result = parser.parseCustom(
        fixtures.bhrGt.dispatch(),
        presets.BORE_METADATA_ONLY,
        'BHR-GT'
      );

      expectExactKeys(result, presets.BORE_METADATA_ONLY);
      // No layer array leaked in
      expect((result as Record<string, unknown>).data).toBeUndefined();

      expect(result.broId).toBe('BHR000000347577');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.researchReportDate).toBe('2021-09-20');
      expect(result.descriptionProcedure).toBe('ISO14688d1v2019c2020');
      expect(result.finalBoreDepth).toBe(3);
      expect(result.boreRockReached).toBe(false);
      expect((result.deliveredLocation as { epsg: string }).epsg).toBe('EPSG:28992');
    });
  });

  describe('BHR-G custom schemas', () => {
    it('ID_ONLY preset extracts only id + regime, nothing else', () => {
      const result = parser.parseCustom(fixtures.bhrG.dispatch(), presets.BHRG_ID_ONLY, 'BHR-G');

      expectExactKeys(result, presets.BHRG_ID_ONLY);
      expect(result.broId).toBe('BHR000000123456');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.meta.dataType).toBe('BHR-G');
    });

    it('LOCATION_ONLY preset extracts only location fields with exact coordinates', () => {
      const result = parser.parseCustom(
        fixtures.bhrG.dispatch(),
        presets.BHRG_LOCATION_ONLY,
        'BHR-G'
      );

      expectExactKeys(result, presets.BHRG_LOCATION_ONLY);
      expect(result.broId).toBe('BHR000000123456');

      const delivered = result.deliveredLocation as { x: number; y: number; epsg: string };
      expect(delivered.x).toBe(155000.0);
      expect(delivered.y).toBe(463000.0);
      expect(delivered.epsg).toBe('EPSG:28992');

      const standardized = result.standardizedLocation as { x: number; y: number; epsg: string };
      expect(standardized.x).toBe(52.123456);
      expect(standardized.y).toBe(5.234567);
      expect(standardized.epsg).toBe('EPSG:4258');

      expect(result.deliveredVerticalPositionOffset).toBe(5.5);
    });

    it('METADATA_ONLY preset extracts metadata but not layer data', () => {
      const result = parser.parseCustom(
        fixtures.bhrG.dispatch(),
        presets.BHRG_METADATA_ONLY,
        'BHR-G'
      );

      expectExactKeys(result, presets.BHRG_METADATA_ONLY);
      expect((result as Record<string, unknown>).data).toBeUndefined();

      expect(result.broId).toBe('BHR000000123456');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.researchReportDate).toBe('2024-01-10');
      expect(result.descriptionProcedure).toBe('NEN5104');
      expect(result.finalBoreDepth).toBe(8.5);
      expect(result.boreRockReached).toBe(false);
    });
  });

  describe('Auto-detect data type', () => {
    it('should auto-detect CPT data type when not specified', () => {
      const result = parser.parseCustom(fixtures.cpt.example(), presets.CPT_ID_ONLY);

      expect(result.meta.dataType).toBe('CPT');
      expect(result.broId).toBe('CPT000000099543');
      expect(result.qualityRegime).toBe('IMBRO');
    });

    it('should auto-detect BHR-GT data type when not specified', () => {
      const result = parser.parseCustom(fixtures.bhrGt.dispatch(), presets.BORE_ID_ONLY);

      expect(result.meta.dataType).toBe('BHR-GT');
      expect(result.broId).toBe('BHR000000347577');
    });
  });

  describe('Extending presets', () => {
    it('should allow extending a preset with additional fields', () => {
      const extendedSchema = {
        ...presets.CPT_ID_ONLY,
        finalDepth: producers.number(
          './dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth'
        ),
      };

      const result = parser.parseCustom(fixtures.cpt.example(), extendedSchema, 'CPT');

      // Exactly the preset's keys plus the one we added
      expectExactKeys(result, extendedSchema);
      expect(result.broId).toBe('CPT000000099543');
      expect(result.qualityRegime).toBe('IMBRO');
      expect(result.finalDepth).toBe(7.439);
    });
  });
});
