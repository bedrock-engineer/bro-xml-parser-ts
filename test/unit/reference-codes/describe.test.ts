import { describe, it, expect } from 'vitest';
import { prettifyBroCode } from '@/reference-codes/describe';

describe('prettifyBroCode', () => {
  it('splits a plain camelCase code into a spaced, capitalised label', () => {
    expect(prettifyBroCode('kleiigZand')).toBe('Kleiig zand');
  });

  it('leaves a code carrying an acronym unchanged', () => {
    expect(prettifyBroCode('ISO22476D1')).toBe('ISO22476D1');
  });

  it('leaves a code carrying digits unchanged', () => {
    expect(prettifyBroCode('RTKGPS5tot10cm')).toBe('RTKGPS5tot10cm');
  });

  it('returns the input for an empty string', () => {
    expect(prettifyBroCode('')).toBe('');
  });
});
