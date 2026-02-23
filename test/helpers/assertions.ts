import { expect } from 'vitest';
import type { CPTData, BHRGTData, BHRGData, Location } from '@/types';

export function assertValidCPT(data: CPTData) {
  expect(data.broId).toBeTruthy();
  expect(data.broId).toMatch(/^CPT\d+$/);
  expect(data.qualityRegime).toMatch(/^IMBRO(\/A)?$/);
  expect(data.data).toBeInstanceOf(Array);
  expect(data.data.length).toBeGreaterThan(0);
}

export function assertValidBore(data: BHRGTData) {
  expect(data.broId).toBeTruthy();
  expect(data.data).toBeInstanceOf(Array);
  expect(data.data.length).toBeGreaterThan(0);
}

export function assertValidBHRG(data: BHRGData) {
  expect(data.broId).toBeTruthy();
  expect(data.data).toBeInstanceOf(Array);
  expect(data.data.length).toBeGreaterThan(0);
}

export function assertValidLocation(location: Location | null) {
  expect(location).not.toBeNull();
  if (location) {
    expect(location.x).toBeTypeOf('number');
    expect(location.y).toBeTypeOf('number');
    expect(location.epsg).toBeTruthy();
  }
}
