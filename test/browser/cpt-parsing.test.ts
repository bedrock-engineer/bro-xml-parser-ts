import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { BrowserXMLAdapter } from '@/adapters/browser-adapter';

// Note: Browser tests use inline XML to avoid fs dependencies
// This is a minimal valid CPT XML for testing browser functionality
const MINIMAL_CPT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<dispatchDataResponse xmlns="http://www.broservices.nl/xsd/dscpt/1.1"
  xmlns:brocom="http://www.broservices.nl/xsd/brocommon/3.0"
  xmlns:cptcommon="http://www.broservices.nl/xsd/cptcommon/1.1"
  xmlns:gml="http://www.opengis.net/gml/3.2">
  <brocom:responseType>dispatch</brocom:responseType>
  <brocom:dispatchTime>2023-10-17T15:41:11+02:00</brocom:dispatchTime>
  <dispatchDocument>
    <CPT_O gml:id="TEST">
      <brocom:broId>CPT000000099543</brocom:broId>
      <brocom:qualityRegime>IMBRO</brocom:qualityRegime>
    </CPT_O>
  </dispatchDocument>
</dispatchDataResponse>`;

describe('CPT Parsing (Browser)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new BrowserXMLAdapter());
  });

  it('should parse CPT using native browser APIs', () => {
    const cpt = parser.parseCPT(MINIMAL_CPT_XML);

    expect(cpt.broId).toBe('CPT000000099543');
    expect(cpt.qualityRegime).toBe('IMBRO');
  });

  it('should use native DOMParser and XPath', () => {
    // Just verify we can parse without errors using browser APIs
    expect(() => parser.parseCPT(MINIMAL_CPT_XML)).not.toThrow();
  });
});
