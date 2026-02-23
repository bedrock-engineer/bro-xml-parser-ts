import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { BrowserXMLAdapter } from '@/adapters/browser-adapter';

// Note: Browser tests use inline XML to avoid fs dependencies
const MINIMAL_BORE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<dispatchDataResponse xmlns="http://www.broservices.nl/xsd/dsbhr-gt/2.1"
  xmlns:brocom="http://www.broservices.nl/xsd/brocommon/3.0"
  xmlns:gml="http://www.opengis.net/gml/3.2">
  <brocom:responseType>dispatch</brocom:responseType>
  <brocom:dispatchTime>2023-10-17T15:41:11+02:00</brocom:dispatchTime>
  <dispatchDocument>
    <BHR_GT gml:id="TEST">
      <brocom:broId>BHR000000123456</brocom:broId>
      <brocom:qualityRegime>IMBRO</brocom:qualityRegime>
    </BHR_GT>
  </dispatchDocument>
</dispatchDataResponse>`;

describe('BORE Parsing (Browser)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new BrowserXMLAdapter());
  });

  it('should parse bore files in browser', () => {
    const bore = parser.parseBHRGT(MINIMAL_BORE_XML);

    expect(bore.broId).toBe('BHR000000123456');
    expect(bore.qualityRegime).toBe('IMBRO');
  });
});
