import { describe, it, expect } from 'vitest';
import {
  detectAndValidateVersion,
  SUPPORTED_VERSIONS,
} from '@/core/version-detector';
import { BROParseError } from '@/types';

function createMockDocument(namespace: string | null): Document {
  return {
    documentElement: {
      getAttribute: (name: string) => (name === 'xmlns' ? namespace : null),
    },
  } as unknown as Document;
}

describe('detectAndValidateVersion', () => {
  it('should accept valid CPT version 1.1', () => {
    const doc = createMockDocument(SUPPORTED_VERSIONS.CPT.namespace);
    const result = detectAndValidateVersion(doc, 'CPT');
    expect(result.version).toBe('1.1');
    expect(result.dataType).toBe('CPT');
    expect(result.warnings).toHaveLength(0);
  });

  it('should accept valid BHR-GT version 2.1', () => {
    const doc = createMockDocument(SUPPORTED_VERSIONS['BHR-GT'].namespace);
    const result = detectAndValidateVersion(doc, 'BHR-GT');
    expect(result.version).toBe('2.1');
    expect(result.dataType).toBe('BHR-GT');
    expect(result.warnings).toHaveLength(0);
  });

  it('should accept valid BHR-G version 3.1', () => {
    const doc = createMockDocument(SUPPORTED_VERSIONS['BHR-G'].namespace);
    const result = detectAndValidateVersion(doc, 'BHR-G');
    expect(result.version).toBe('3.1');
    expect(result.dataType).toBe('BHR-G');
    expect(result.warnings).toHaveLength(0);
  });

  it('should parse same major version with warning', () => {
    // CPT 1.0 is same major version as supported 1.1
    const doc = createMockDocument('http://www.broservices.nl/xsd/dscpt/1.0');
    const result = detectAndValidateVersion(doc, 'CPT');
    expect(result.version).toBe('1.0');
    expect(result.dataType).toBe('CPT');
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain('1.0');
    expect(result.warnings[0]).toContain('1.1');
  });

  it('should parse unknown same major version with warning', () => {
    // CPT 1.9 is unknown but same major version
    const doc = createMockDocument('http://www.broservices.nl/xsd/dscpt/1.9');
    const result = detectAndValidateVersion(doc, 'CPT');
    expect(result.version).toBe('1.9');
    expect(result.dataType).toBe('CPT');
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain('Unknown schema version');
  });

  it('should throw for different major version', () => {
    const doc = createMockDocument('http://www.broservices.nl/xsd/dscpt/2.0');
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(BROParseError);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(
      /Incompatible schema major version/
    );
  });

  it('should throw for wrong document type', () => {
    const doc = createMockDocument(SUPPORTED_VERSIONS['BHR-GT'].namespace);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(BROParseError);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(
      /Wrong document type/
    );
  });

  it('should throw for missing namespace', () => {
    const doc = createMockDocument(null);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(BROParseError);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(
      /No namespace found/
    );
  });

  it('should throw for completely unknown namespace', () => {
    const doc = createMockDocument('http://example.com/unknown/schema');
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(BROParseError);
    expect(() => detectAndValidateVersion(doc, 'CPT')).toThrow(
      /Unsupported schema/
    );
  });

  it('should provide helpful error details', () => {
    const doc = createMockDocument('http://www.broservices.nl/xsd/dscpt/2.0');
    try {
      detectAndValidateVersion(doc, 'CPT');
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(BROParseError);
      if (error instanceof BROParseError) {
        expect(error.code).toBe('INCOMPATIBLE_VERSION');
        expect(error.details).toBeTruthy();
        expect(error.details.detectedVersion).toBe('2.0');
        expect(error.details.supportedVersion).toBe('1.1');
      }
    }
  });
});
