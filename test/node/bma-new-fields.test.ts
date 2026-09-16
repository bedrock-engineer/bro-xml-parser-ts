import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';
import type { BHRGTData } from '@/types';

describe('BHR-GT-BMA newly added determination fields', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  const firstDetermination = <T>(bore: BHRGTData, key: string): T | undefined => {
    for (const interval of bore.analysis?.investigatedIntervals ?? []) {
      const value = (interval as unknown as Record<string, unknown>)[key];
      if (value) return value as T;
    }
    return undefined;
  };

  describe('scalar fields', () => {
    it('extracts conusType on consistency limits (fall-cone)', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const cl = firstDetermination<{ conusType: string }>(bore, 'consistencyLimitsDetermination');
      expect(cl?.conusType).toBe('zweedseConus30graden');
    });

    it('extracts penetrationDepth on plasticity data points', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const cl = firstDetermination<{
        plasticityAtSpecificWaterContent: Array<{ penetrationDepth?: number | null }>;
      }>(bore, 'consistencyLimitsDetermination');
      const withPenetration = cl?.plasticityAtSpecificWaterContent.find(
        (p) => p.penetrationDepth != null,
      );
      expect(withPenetration?.penetrationDepth).toBeTypeOf('number');
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
      const vmds = firstDetermination<{ sampleContainerVolume: string }>(
        bore,
        'volumetricMassDensityOfSolidsDetermination',
      );
      expect(vmds?.sampleContainerVolume).toBe('100ml');
    });
  });

  describe('nested containers', () => {
    it('extracts madeSpecimenForLoading on a remoulded triaxial specimen', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.triaxialMadeSpecimen());
      const tri = firstDetermination<
        Array<{ madeSpecimenForLoading?: { makingMethod: string; dryVolumetricMassDensity: number } }>
      >(bore, 'shearStressChangeDuringLoadingDetermination');
      const made = tri?.find((t) => t.madeSpecimenForLoading)?.madeSpecimenForLoading;
      expect(made?.makingMethod).toBe('samenstellenStampenVochtig');
      expect(made?.dryVolumetricMassDensity).toBe(1.763);
    });

    it('extracts saturationStageAtCompression on the oedometer test', () => {
      const bore = parser.parseBHRGT(fixtures.bhrGtBma.oedometerSaturation());
      const sc = firstDetermination<{
        saturationStageAtCompression?: {
          porousDiscWet: boolean;
          usedMedium: string;
          backPressure: number;
          constantHeight: boolean;
          specimenHeightAfterwards: number;
          disturbanceInduced: boolean;
        };
      }>(bore, 'settlementCharacteristicsDetermination');
      const sat = sc?.saturationStageAtCompression;
      expect(sat).toBeDefined();
      expect(sat?.porousDiscWet).toBe(true);
      expect(sat?.usedMedium).toBe('leidingwater');
      expect(sat?.backPressure).toBe(300);
      expect(sat?.specimenHeightAfterwards).toBe(21.8);
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
        fraction2to32um?: number | null;
        fraction0to2um?: number | null;
        fraction32to50um?: number | null;
      }>(bore, 'particleSizeDistributionDetermination');
      expect(psd?.fraction2to32um).toBe(2.7);
      expect(psd?.fraction0to2um).toBe(0);
      expect(psd?.fraction32to50um).toBe(5.1);
    });
  });
});
