import { expect } from 'vitest';
import type { CPTData, BHRGTData, BHRGData, Location } from '@/types';
import type { BHRGTLayer, BHRGTSoilLayer } from '@/schemas/bore-types';

/**
 * The layers of a BHR-GT sample's first descriptive log. A borehole can carry up
 * to 3 independent descriptions (`descriptiveBoreholeLog`), each with its own
 * layers; tests use the first log unless they assert otherwise.
 */
export function firstLogLayers(bore: BHRGTData): Array<BHRGTLayer> {
  return bore.boreholeSampleDescription?.descriptiveBoreholeLog?.[0]?.layer ?? [];
}

/** Type guard narrowing a layer to one describing soil (its `soil` is present). */
export function isSoilLayer(layer: BHRGTLayer): layer is BHRGTSoilLayer {
  return layer.soil != null;
}

/**
 * Assert a layer is present and describes soil, returning it narrowed so tests can
 * read `layer.soil.*` without repeated null-checks.
 */
export function asSoilLayer(layer: BHRGTLayer | undefined): BHRGTSoilLayer {
  if (!layer || layer.soil == null) {
    throw new Error('expected a soil layer (layer.soil present), got none');
  }
  return layer as BHRGTSoilLayer;
}

export function assertValidCPT(data: CPTData) {
  expect(data.broId).toBeTruthy();
  expect(data.broId).toMatch(/^CPT\d+$/);
  expect(data.qualityRegime).toMatch(/^IMBRO(\/A)?$/);
  const measurements = data.conePenetrometerSurvey?.conePenetrationTest?.measurements ?? [];
  expect(measurements).toBeInstanceOf(Array);
  expect(measurements.length).toBeGreaterThan(0);
}

export function assertValidBore(data: BHRGTData) {
  expect(data.broId).toBeTruthy();
  const layers = firstLogLayers(data);
  expect(layers).toBeInstanceOf(Array);
  expect(layers.length).toBeGreaterThan(0);
}

export function assertValidBHRG(data: BHRGData) {
  expect(data.broId).toBeTruthy();
  const layers = data.boreholeSampleDescription?.descriptiveBoreholeLog?.[0]?.layer ?? [];
  expect(layers).toBeInstanceOf(Array);
  expect(layers.length).toBeGreaterThan(0);
}

export function assertValidLocation(location: Location | null) {
  expect(location).not.toBeNull();
  if (location) {
    expect(location.x).toBeTypeOf('number');
    expect(location.y).toBeTypeOf('number');
    expect(location.epsg).toBeTruthy();
  }
}
