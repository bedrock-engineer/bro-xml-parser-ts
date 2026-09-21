import { describe, it, expect, vi } from 'vitest';
import {
  parseFloat,
  parseInt,
  parseBoolean,
  parseDate,
  parseQualityClass,
} from '@/decoders/type-decoders';

describe('parseFloat', () => {
  it('should parse valid float strings', () => {
    expect(parseFloat('123.45')).toBe(123.45);
    expect(parseFloat('0.001')).toBe(0.001);
    expect(parseFloat('-50.5')).toBe(-50.5);
  });

  it('should handle null sentinel value', () => {
    expect(parseFloat('-999999')).toBeNull();
  });

  it('should handle null/empty inputs', () => {
    expect(parseFloat(null)).toBeNull();
    expect(parseFloat('')).toBeNull();
    expect(parseFloat('  ')).toBeNull();
  });

  it('should handle invalid values', () => {
    expect(parseFloat('not a number')).toBeNull();
    expect(parseFloat('NaN')).toBeNull();
  });

  it('should treat the "NaN" missing-value marker as null without warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      expect(parseFloat('NaN')).toBeNull();
      expect(parseFloat(' nan ')).toBeNull();
      expect(parseInt('NaN')).toBeNull();
      expect(warn).not.toHaveBeenCalled();

      // genuine garbage should still warn
      expect(parseFloat('not a number')).toBeNull();
      expect(warn).toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });
});

describe('parseInt', () => {
  it('should parse valid integer strings', () => {
    expect(parseInt('123')).toBe(123);
    expect(parseInt('0')).toBe(0);
    expect(parseInt('-50')).toBe(-50);
  });

  it('should handle null sentinel value', () => {
    expect(parseInt('-999999')).toBeNull();
  });

  it('should handle null/empty inputs', () => {
    expect(parseInt(null)).toBeNull();
    expect(parseInt('')).toBeNull();
  });
});

describe('parseBoolean', () => {
  it('should parse Dutch "ja/nee" values', () => {
    expect(parseBoolean('ja')).toBe(true);
    expect(parseBoolean('nee')).toBe(false);
    expect(parseBoolean('JA')).toBe(true);
    expect(parseBoolean('NEE')).toBe(false);
  });

  it('should parse English "true/false" values', () => {
    expect(parseBoolean('true')).toBe(true);
    expect(parseBoolean('false')).toBe(false);
    expect(parseBoolean('TRUE')).toBe(true);
  });

  it('should parse numeric boolean values', () => {
    expect(parseBoolean('1')).toBe(true);
    expect(parseBoolean('0')).toBe(false);
  });

  it('should return null for invalid values', () => {
    expect(parseBoolean(null)).toBeNull();
    expect(parseBoolean('')).toBeNull();
    expect(parseBoolean('maybe')).toBeNull();
  });
});

describe('parseDate', () => {
  it('should return full dates unchanged', () => {
    expect(parseDate('2023-05-15')).toBe('2023-05-15');
  });

  it('should preserve partial-date precision', () => {
    expect(parseDate('2023-05')).toBe('2023-05'); // yearMonth
    expect(parseDate('2023')).toBe('2023'); // year
  });

  it('should return dateTime strings unchanged', () => {
    expect(parseDate('2023-05-15T14:30:00Z')).toBe('2023-05-15T14:30:00Z');
    expect(parseDate('2019-04-17T13:25:00+02:00')).toBe('2019-04-17T13:25:00+02:00');
  });

  it('should trim surrounding whitespace', () => {
    expect(parseDate('  2023-05-15  ')).toBe('2023-05-15');
  });

  it('should return null for voidReason codes and invalid input', () => {
    expect(parseDate('onbekend')).toBeNull();
    expect(parseDate('not a date')).toBeNull();
    expect(parseDate(null)).toBeNull();
    expect(parseDate('')).toBeNull();
  });
});

describe('parseQualityClass', () => {
  it('should parse "klasseN" format', () => {
    expect(parseQualityClass('klasse1')).toBe(1);
    expect(parseQualityClass('klasse2')).toBe(2);
    expect(parseQualityClass('Klasse3')).toBe(3);
  });

  it('should parse plain numbers', () => {
    expect(parseQualityClass('2')).toBe(2);
    expect(parseQualityClass('4')).toBe(4);
  });

  it('should return null for invalid values', () => {
    expect(parseQualityClass(null)).toBeNull();
    expect(parseQualityClass('')).toBeNull();
  });
});
