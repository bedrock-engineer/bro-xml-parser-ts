import { describe, it, expect } from 'vitest';
import {
  BRO_NAMESPACES,
  namespaceFamily,
  adaptNamespacesToDocument,
} from '@/namespaces';

describe('namespaceFamily', () => {
  it('strips a major.minor version suffix', () => {
    expect(namespaceFamily('http://www.broservices.nl/xsd/dsbhrg/3.1')).toBe(
      'http://www.broservices.nl/xsd/dsbhrg'
    );
  });

  it('strips a bare-major version suffix', () => {
    expect(namespaceFamily('http://www.broservices.nl/xsd/dsbhrg/3')).toBe(
      'http://www.broservices.nl/xsd/dsbhrg'
    );
  });

  it('leaves a version-free URI unchanged', () => {
    expect(namespaceFamily('http://www.w3.org/1999/xlink')).toBe(
      'http://www.w3.org/1999/xlink'
    );
  });
});

describe('adaptNamespacesToDocument', () => {
  it('re-points prefixes at the document versions, matching by family', () => {
    // A bare-major BHR-G delivery: dsbhrg/bhrgcommon are /3, brocommon is /3.
    const declared = [
      'http://www.broservices.nl/xsd/dsbhrg/3',
      'http://www.broservices.nl/xsd/bhrgcommon/3',
      'http://www.broservices.nl/xsd/brocommon/3',
      'http://www.opengis.net/gml/3.2',
    ];
    const adapted = adaptNamespacesToDocument(BRO_NAMESPACES, declared);

    expect(adapted.dsbhrg).toBe('http://www.broservices.nl/xsd/dsbhrg/3');
    expect(adapted.bhrgcom).toBe('http://www.broservices.nl/xsd/bhrgcommon/3');
    expect(adapted.brocom).toBe('http://www.broservices.nl/xsd/brocommon/3');
    // gml matches the default exactly — unchanged.
    expect(adapted.gml).toBe(BRO_NAMESPACES.gml);
  });

  it('leaves prefixes whose family is not declared at their default', () => {
    const adapted = adaptNamespacesToDocument(BRO_NAMESPACES, [
      'http://www.broservices.nl/xsd/dsbhrg/3',
    ]);

    // Only the dsbhrg family was declared; CPT prefixes keep their defaults.
    expect(adapted.dsbhrg).toBe('http://www.broservices.nl/xsd/dsbhrg/3');
    expect(adapted.dscpt).toBe(BRO_NAMESPACES.dscpt);
    expect(adapted.cptcommon).toBe(BRO_NAMESPACES.cptcommon);
  });

  it('does not mutate the defaults', () => {
    const snapshot = { ...BRO_NAMESPACES };
    adaptNamespacesToDocument(BRO_NAMESPACES, [
      'http://www.broservices.nl/xsd/dsbhrg/3',
    ]);
    expect(BRO_NAMESPACES).toEqual(snapshot);
  });
});
