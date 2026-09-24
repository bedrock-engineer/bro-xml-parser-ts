import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import { project } from '@/core/select';
import { CPT_PRODUCER } from '@/schemas/cpt-schema';
import { BORE_PRODUCER } from '@/schemas/bore-schema';
import type { Coded } from '@/core/producer';

/**
 * The `project()` selector over the existing producer schemas: renaming, Coded
 * capture, deep (hoisted) selection, whole sub-objects, `.each` over real arrays,
 * and `.each` over a soil/rock `oneOf` layer array — all typed, no XPath strings.
 */
describe('project() selection', () => {
  let parser: BROParser;
  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('selects top-level leaves + Coded, renaming keys', () => {
    const sel = project(CPT_PRODUCER, (t) => ({
      id: t.broId,
      depth: t.conePenetrometerSurvey.trajectory.finalDepth,
      quality: t.conePenetrometerSurvey.qualityClass,
      transform: t.standardizedLocation.coordinateTransformation,
    }));
    const r = parser.parseSelection(fixtures.cpt.example(), sel, 'CPT');

    expectTypeOf(r.id).toEqualTypeOf<string | null>();
    expectTypeOf(r.depth).toEqualTypeOf<number | null>();
    expectTypeOf(r.quality).toEqualTypeOf<Coded | null>();

    expect(r.id).toBe('CPT000000099543');
    expect(r.depth).toBe(7.439);
    expect(r.quality).toEqual({ code: 'klasse2', codeSpace: 'urn:bro:cpt:QualityClass' });
    // Exactly the selected keys, plus meta.
    expect(Object.keys(r).sort()).toEqual(['depth', 'id', 'meta', 'quality', 'transform']);
  });

  it('hoists a deeply-nested coded field to a renamed top-level key', () => {
    const sel = project(CPT_PRODUCER, (t) => ({
      id: t.broId,
      status: t.registrationHistory.registrationStatus, // composed at-path
    }));
    const r = parser.parseSelection(fixtures.cpt.example(), sel, 'CPT');

    expectTypeOf(r.status).toEqualTypeOf<Coded | null>();
    expect(r.status?.code).toBe('voltooid');
    expect(r.status?.codeSpace).toBe('urn:bro:RegistrationStatus');
  });

  it('nested .each over per-log layers, descending into the soil object', () => {
    const sel = project(BORE_PRODUCER, (t) => ({
      id: t.broId,
      logs: t.boreholeSampleDescription.descriptiveBoreholeLog.each((log) => ({
        layers: log.layer.each((l) => ({
          top: l.upperBoundary,
          soil: l.soil.geotechnicalSoilName, // descend into the soil sub-object
        })),
      })),
    }));
    const r = parser.parseSelection(fixtures.bhrGt.dispatch(), sel, 'BHR-GT');

    expectTypeOf(r.logs).toEqualTypeOf<
      Array<{ layers: Array<{ top: number | null; soil: Coded | null }> }>
    >();
    expect(r.id).toBe('BHR000000347577');
    const firstLayer = r.logs[0]?.layers[0];
    expect(firstLayer?.top).toBeTypeOf('number');
    expect(firstLayer?.soil?.codeSpace).toBe('urn:bro:bhrgt:GeotechnicalSoilName');
  });

  it('warnings and meta flow through parseSelection', () => {
    const sel = project(CPT_PRODUCER, (t) => ({ id: t.broId }));
    const r = parser.parseSelection(fixtures.cpt.example(), sel, 'CPT');
    expect(r.meta.dataType).toBe('CPT');
    expect(Array.isArray(r.meta.warnings)).toBe(true);
  });
});
