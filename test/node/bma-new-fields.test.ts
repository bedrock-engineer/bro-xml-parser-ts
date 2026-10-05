import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import type { BHRGTData } from '@/types';
import type { Coded, Measure } from '@/core/producer';

describe('BHR-GT-BMA newly added determination fields', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  const firstDetermination = <T>(bore: BHRGTData, key: string): T | undefined => {
    for (const interval of bore.boreholeSampleAnalysis?.investigatedInterval ?? []) {
      const value = (interval as unknown as Record<string, unknown>)[key];
      if (value) return value as T;
    }
    return undefined;
  };

  describe('scalar fields', () => {
    it('extracts conusType on consistency limits (fall-cone)', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const cl = firstDetermination<{ conusType: Coded | null }>(bore, 'consistencyLimitsDetermination');
      expect(cl?.conusType?.code).toBe('zweedseConus30graden');
    });

    it('extracts penetrationDepth on plasticity data points', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const cl = firstDetermination<{
        plasticityAtSpecificWaterContent: Array<{ penetrationDepth?: Measure | null }>;
      }>(bore, 'consistencyLimitsDetermination');
      const withPenetration = cl?.plasticityAtSpecificWaterContent.find(
        (p) => p.penetrationDepth != null,
      );
      expect(withPenetration?.penetrationDepth?.value).toBeTypeOf('number');
    });

    it('extracts lutumCorrectionApplied on organic matter determination', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.organicMatterDensity());
      const om = firstDetermination<{ lutumCorrectionApplied: boolean }>(
        bore,
        'organicMatterContentDetermination',
      );
      expect(om?.lutumCorrectionApplied).toBe(true);
    });

    it('extracts sampleContainerVolume on density-of-solids determination', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.organicMatterDensity());
      const vmds = firstDetermination<{ sampleContainerVolume: Coded | null }>(
        bore,
        'volumetricMassDensityOfSolidsDetermination',
      );
      expect(vmds?.sampleContainerVolume?.code).toBe('100ml');
    });
  });

  describe('nested containers', () => {
    it('extracts madeSpecimenForLoading on a remoulded triaxial specimen', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.triaxialMadeSpecimen());
      const tri = firstDetermination<
        Array<{ madeSpecimenForLoading?: { makingMethod: Coded | null; dryVolumetricMassDensity: Measure | null } }>
      >(bore, 'shearStressChangeDuringLoadingDetermination');
      const made = tri?.find((t) => t.madeSpecimenForLoading)?.madeSpecimenForLoading;
      expect(made?.makingMethod?.code).toBe('samenstellenStampenVochtig');
      expect(made?.dryVolumetricMassDensity).toEqual({ value: 1.763, uom: 'g/cm3' });
    });

    it('extracts saturationStageAtCompression on the oedometer test', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const sc = firstDetermination<{
        saturationStageAtCompression?: {
          porousDiscWet: boolean;
          usedMedium: Coded | null;
          backPressure: Measure | null;
          constantHeight: boolean;
          specimenHeightAfterwards: Measure | null;
          disturbanceInduced: boolean;
        };
      }>(bore, 'settlementCharacteristicsDetermination');
      const sat = sc?.saturationStageAtCompression;
      expect(sat).toBeDefined();
      expect(sat?.porousDiscWet).toBe(true);
      expect(sat?.usedMedium?.code).toBe('leidingwater');
      expect(sat?.backPressure).toEqual({ value: 300, uom: 'kPa' });
      expect(sat?.specimenHeightAfterwards).toEqual({ value: 21.8, uom: 'mm' });
      expect(sat?.disturbanceInduced).toBe(false);
    });

    it('extracts stressChangeDuringSettlement time-series with 5 columns', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const sc = firstDetermination<{
        determinationSteps: Array<{
          stressChangeDuringSettlement?: Array<{
            elapsedTime: number;
            verticalStrain: number;
            excessPoreWaterPressure: number | null;
            verticalEffectiveStress: number | null;
            horizontalEffectiveStress: number | null;
          }>;
        }>;
      }>(bore, 'settlementCharacteristicsDetermination');
      const step = sc?.determinationSteps.find((s) => s.stressChangeDuringSettlement?.length);
      const series = step?.stressChangeDuringSettlement;
      expect(series && series.length).toBeGreaterThan(1000);
      expect(series?.[0]).toEqual({
        elapsedTime: 0,
        verticalStrain: 0.04,
        excessPoreWaterPressure: 0,
        verticalEffectiveStress: 2.02,
        horizontalEffectiveStress: null,
      });
    });
  });

  describe('particle size — standard <63µm distribution', () => {
    it('extracts fraction2to32um and the shared buckets from the coarse group', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.settlementPermeability());
      const psd = firstDetermination<{
        fraction2to32um?: Measure | null;
        fraction0to2um?: Measure | null;
        fraction32to50um?: Measure | null;
      }>(bore, 'particleSizeDistributionDetermination');
      expect(psd?.fraction2to32um).toEqual({ value: 2.7, uom: '%' });
      expect(psd?.fraction0to2um).toEqual({ value: 0, uom: '%' });
      expect(psd?.fraction32to50um).toEqual({ value: 5.1, uom: '%' });
    });
  });

  describe('coverage-gap fields (XSD-complete BMA)', () => {
    it('extracts performanceIrregularity as a coded list on the water content determination', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.organicMatterDensity());
      const wc = firstDetermination<{ performanceIrregularity: Array<Coded | null> }>(
        bore,
        'waterContentDetermination',
      );
      expect(wc?.performanceIrregularity[0]?.code).toBe('massaProefstuk');
    });

    // These containers occur in no archive fixture, so inject them into a real
    // dispatch (synthetic, like the GMW insertedPart fixture) and parse that.
    it('parses the injected madeSpecimenForHorizontalDeformation, investigatedMaterial and analysisOperator', () => {
      const xml = fixtures.bhrGtBma
        .oedometerSaturation()
        .replace(
          '<bhrgtcom:consolidationStageAtHorizontalDeformation>',
          '<bhrgtcom:madeSpecimenForHorizontalDeformation>' +
            '<bhrgtcom:makingMethod codeSpace="urn:bro:bhrgt:MakingMethod">samenstellenStampenVochtig</bhrgtcom:makingMethod>' +
            '<bhrgtcom:waterContent uom="%">24.5</bhrgtcom:waterContent>' +
            '<bhrgtcom:volumetricMassDensity uom="g/cm3">1.85</bhrgtcom:volumetricMassDensity>' +
            '</bhrgtcom:madeSpecimenForHorizontalDeformation>' +
            '<bhrgtcom:consolidationStageAtHorizontalDeformation>',
        )
        .replace(
          '<bhrgtcom:described>nee</bhrgtcom:described>',
          '<bhrgtcom:described>nee</bhrgtcom:described>' +
            '<bhrgtcom:investigatedMaterial>' +
            '<bhrgtcom:geotechnicalSoilName codeSpace="urn:bro:bhrgt:GeotechnicalSoilName">zwakZandigeKlei</bhrgtcom:geotechnicalSoilName>' +
            '<bhrgtcom:colour codeSpace="urn:bro:bhrgt:Colour">bruinGrijs</bhrgtcom:colour>' +
            '</bhrgtcom:investigatedMaterial>',
        )
        .replace(
          '</bhrgtcom:analysisProcedure>',
          '</bhrgtcom:analysisProcedure>' +
            '<bhrgtcom:analysisOperator>' +
            '<brocom:chamberOfCommerceNumber>12345678</brocom:chamberOfCommerceNumber>' +
            '</bhrgtcom:analysisOperator>',
        );

      const bore = parser.parseBHRGT(xml);
      const analysis = bore.boreholeSampleAnalysis!;
      expect(analysis.analysisOperator?.chamberOfCommerceNumber).toBe('12345678');

      const interval = analysis.investigatedInterval.find((i) => i.investigatedMaterial);
      expect(interval?.investigatedMaterial?.geotechnicalSoilName?.code).toBe('zwakZandigeKlei');
      expect(interval?.investigatedMaterial?.colour?.code).toBe('bruinGrijs');

      const shear = analysis.investigatedInterval
        .flatMap((i) => i.shearStressChangeDuringHorizontalDeformationDetermination ?? [])
        .find((d) => d.madeSpecimenForHorizontalDeformation);
      const made = shear?.madeSpecimenForHorizontalDeformation;
      expect(made?.makingMethod?.code).toBe('samenstellenStampenVochtig');
      expect(made?.waterContent).toEqual({ value: 24.5, uom: '%' });
      expect(made?.volumetricMassDensity).toEqual({ value: 1.85, uom: 'g/cm3' });
    });
  });
});
