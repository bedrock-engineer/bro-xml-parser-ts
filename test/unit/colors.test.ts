import { describe, it, expect } from 'vitest';
import type { Coded } from '@/core/producer';
import { getSoilColor } from '@/colors';

const coded = (code: string): Coded => ({ code, codeSpace: 'urn:bro:bhrgt:Colour' });

describe('getSoilColor', () => {
  it('resolves a coded colour value to its hex', () => {
    expect(getSoilColor(coded('lichtBruin'))).toBe('#b79a77');
  });

  it('is case-insensitive on the code', () => {
    expect(getSoilColor(coded('LICHTBRUIN'))).toBe('#b79a77');
  });

  it('returns null for an absent colour', () => {
    expect(getSoilColor(null)).toBeNull();
    expect(getSoilColor(undefined)).toBeNull();
  });

  it('returns null for an unrecognised code', () => {
    expect(getSoilColor(coded('nietBestaand'))).toBeNull();
  });

  it('falls back to the default colour when absent or unknown', () => {
    expect(getSoilColor(null, '#808080')).toBe('#808080');
    expect(getSoilColor(coded('nietBestaand'), '#808080')).toBe('#808080');
  });
});
