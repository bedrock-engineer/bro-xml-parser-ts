import { describe, it, expect } from 'vitest';
import {
  parseFloat,
  parseInt,
  parseBoolean,
  parseDate,
  parseQualityClass,
  lowerText,
} from '@/resolvers/type-resolvers';

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
  it('should parse ISO date strings', () => {
    const date = parseDate('2023-05-15');
    expect(date).toBeInstanceOf(Date);
    expect(date?.getFullYear()).toBe(2023);
    expect(date?.getMonth()).toBe(4); // May = 4
    expect(date?.getDate()).toBe(15);
  });

  it('should parse ISO datetime strings', () => {
    const date = parseDate('2023-05-15T14:30:00Z');
    expect(date).toBeInstanceOf(Date);
  });

  it('should return null for invalid dates', () => {
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

describe('lowerText', () => {
  it('should convert to lowercase and trim', () => {
    expect(lowerText('HELLO')).toBe('hello');
    expect(lowerText('  World  ')).toBe('world');
  });

  it('should handle null', () => {
    expect(lowerText(null)).toBeNull();
  });
});
