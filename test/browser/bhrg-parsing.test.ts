import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { BrowserXMLAdapter } from '@/adapters/browser-adapter';

// Note: Browser tests use inline XML to avoid fs dependencies
const MINIMAL_BHRG_XML = `<?xml version="1.0" encoding="UTF-8"?>
<dispatchDataResponse xmlns="http://www.broservices.nl/xsd/dsbhrg/3.1"
                      xmlns:brocom="http://www.broservices.nl/xsd/brocommon/3.0"
                      xmlns:bhrgcom="http://www.broservices.nl/xsd/bhrgcommon/3.1"
                      xmlns:dsbhrg="http://www.broservices.nl/xsd/dsbhrg/3.1"
                      xmlns:gml="http://www.opengis.net/gml/3.2">
  <brocom:responseType>dispatch</brocom:responseType>
  <brocom:dispatchTime>2024-01-15T10:30:00+01:00</brocom:dispatchTime>
  <brocom:dispatchDocument>
    <BHR_G_CompleteReport>
      <brocom:broId>BHR000000789012</brocom:broId>
      <brocom:qualityRegime>IMBRO</brocom:qualityRegime>

      <dsbhrg:researchReportDate>
        <brocom:date>2024-01-10</brocom:date>
      </dsbhrg:researchReportDate>

      <dsbhrg:boreholeSampleDescription>
        <bhrgcom:BoreholeSampleDescription>
          <bhrgcom:descriptionProcedure codeSpace="urn:bro:bhrgcommon:DescriptionProcedure">NEN5104</bhrgcom:descriptionProcedure>

          <bhrgcom:descriptiveBoreholeLog>
            <bhrgcom:DescriptiveBoreholeLog>
              <bhrgcom:layer>
                <bhrgcom:Layer>
                  <bhrgcom:upperBoundary uom="m">0.0</bhrgcom:upperBoundary>
                  <bhrgcom:lowerBoundary uom="m">1.0</bhrgcom:lowerBoundary>
                  <bhrgcom:soil>
                    <bhrgcom:soilNameNEN5104 codeSpace="urn:bro:bhrgcommon:SoilNameNEN5104">zand</bhrgcom:soilNameNEN5104>
                  </bhrgcom:soil>
                </bhrgcom:Layer>
              </bhrgcom:layer>
            </bhrgcom:DescriptiveBoreholeLog>
          </bhrgcom:descriptiveBoreholeLog>
        </bhrgcom:BoreholeSampleDescription>
      </dsbhrg:boreholeSampleDescription>

    </BHR_G_CompleteReport>
  </brocom:dispatchDocument>
</dispatchDataResponse>`;

describe('BHRG Parsing (Browser)', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new BrowserXMLAdapter());
  });

  it('should parse BHRG files in browser', () => {
    const bhrg = parser.parseBHRG(MINIMAL_BHRG_XML);

    expect(bhrg.broId).toBe('BHR000000789012');
    expect(bhrg.qualityRegime).toBe('IMBRO');
    expect(bhrg.descriptionProcedure).toBe('NEN5104');
    expect(bhrg.data.length).toBeGreaterThan(0);
  });
});
