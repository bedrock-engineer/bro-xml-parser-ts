/**
 * Tests for Triaxial (Shear Stress During Loading) Determination Parsing
 *
 * Tests parsing of shearStressChangeDuringLoadingDetermination data from BHR-GT-BMA files
 */

import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { loadFixture } from '../helpers/fixture-loader';

describe('Triaxial Test (Shear Stress During Loading) Parsing', () => {
  const parser = new BROParser(new NodeXMLAdapter());

  it('should parse BHR000000380415 with triaxial test data', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000380415');
    expect(bore.analysis).toBeDefined();

    if (!bore.analysis) {
      throw new Error('Analysis data should be present');
    }

    // Should have investigated intervals
    expect(bore.analysis.investigatedIntervals.length).toBeGreaterThan(0);

    // Find interval with triaxial test
    const intervalWithTriaxial = bore.analysis.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    expect(intervalWithTriaxial).toBeDefined();

    if (!intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination) {
      throw new Error('Triaxial test data should be present');
    }

    const triaxialTests = intervalWithTriaxial.shearStressChangeDuringLoadingDetermination;

    // Should have at least one triaxial test
    expect(triaxialTests.length).toBeGreaterThan(0);

    const test = triaxialTests[0];

    // Check main properties
    expect(test.determinationProcedure).toBe('ISO17892d9v2018');
    expect(test.determinationMethod).toBe('belastenGeconsolideerdOngedraineerd');
    expect(test.specimenDisturbed).toBe(false);
    expect(test.specimenTrimmed).toBe(true);
    expect(test.sampleMoistness).toBe('veldvochtig');
    expect(test.beginDiameter).toBe(50.0);
    expect(test.beginHeight).toBe(100.0);
    expect(test.topCapTiltable).toBe(true);
    expect(test.filterPaperUsed).toBe(false);
    expect(test.drainageStripsUsed).toBe(true);
    expect(test.membraneSaturatedBefore).toBe(false);
    expect(test.apparatusDeformationApplied).toBe(true);
    expect(test.cellDeformationApplied).toBe(true);
    expect(test.stopCriterion).toBe('einddoel');
  });

  it('should parse membrane correction data', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    const test = intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination?.[0];
    expect(test?.membraneCorrection).toBeDefined();
    expect(test?.membraneCorrection?.correctionMethod).toBe('Greeuw2001');
    expect(test?.membraneCorrection?.thickness).toBe(0.6);
    expect(test?.membraneCorrection?.stiffnessClass).toBe('1700kPa');
  });

  it('should parse drainage strip correction data', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    const test = intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination?.[0];
    expect(test?.drainageStripCorrection).toBeDefined();
    expect(test?.drainageStripCorrection?.correctionMethod).toBe('Greeuw2001');
    expect(test?.drainageStripCorrection?.orientation).toBe('verticaal');
    expect(test?.drainageStripCorrection?.coverage).toBe('40tot45');
  });

  it('should parse saturation stage data', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    const test = intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination?.[0];
    expect(test?.saturationStageAtLoading).toBeDefined();

    const saturation = test?.saturationStageAtLoading;
    expect(saturation?.porousDiscWet).toBe(true);
    expect(saturation?.porousDiscRough).toBe(true);
    expect(saturation?.usedMedium).toBe('gezuiverdWater');
    expect(saturation?.constantHeight).toBe(false);
    expect(saturation?.cellPressureAutomaticallyControlled).toBe(true);
    expect(saturation?.backPressure).toBe(300.0);
    expect(saturation?.effectivePressure).toBe(5.9);
    expect(saturation?.skemptonBCoefficient).toBe(0.99);
    expect(saturation?.disturbanceInduced).toBe(false);
  });

  it('should parse consolidation stage with volume change time series', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    const test = intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination?.[0];
    expect(test?.consolidationStageAtLoading).toBeDefined();

    const consolidation = test?.consolidationStageAtLoading;
    expect(consolidation?.drainageTwoSided).toBe(false);
    expect(consolidation?.consolidationMethod).toBe('isotroop');
    expect(consolidation?.verticalConsolidationStress).toBe(200.0);
    expect(consolidation?.horizontalConsolidationStress).toBe(200.0);
    expect(consolidation?.verticalStrain).toBe(10.81);
    expect(consolidation?.lateralEarthPressureCoefficient).toBe(1.0);

    // Check volume change time series data
    expect(consolidation?.volumeChangeDuringConsolidation).toBeDefined();
    expect(consolidation?.volumeChangeDuringConsolidation.length).toBeGreaterThan(0);

    const firstPoint = consolidation?.volumeChangeDuringConsolidation[0];
    expect(firstPoint?.time).toBe(0.0);
    expect(firstPoint?.volumeChange).toBe(0.0);
  });

  it('should parse load stage with shear stress time series', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380415.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );

    const test = intervalWithTriaxial?.shearStressChangeDuringLoadingDetermination?.[0];
    expect(test?.loadStage).toBeDefined();

    const loadStage = test?.loadStage;
    expect(loadStage?.deformationRate).toBe(0.9);
    expect(loadStage?.specimenShape).toBe('schuifvlakEnkel');

    // Check shear stress time series data
    expect(loadStage?.shearStressChangeDuringLoading).toBeDefined();
    expect(loadStage?.shearStressChangeDuringLoading.length).toBeGreaterThan(0);

    const firstMeasurement = loadStage?.shearStressChangeDuringLoading[0];
    expect(firstMeasurement?.time).toBe(32.0);
    expect(firstMeasurement?.axialStrain).toBe(0.01);
    expect(firstMeasurement?.deviatorStress).toBe(0.22);
    expect(firstMeasurement?.cellPressure).toBe(199.47);
    // pore pressure and volume change may be null (NaN in XML)
    expect(firstMeasurement?.porePressure).toBeNull();
    expect(firstMeasurement?.volumeChange).toBe(0.6);
  });

  it('should parse BHR000000380389 with particle size and triaxial tests', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380389.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000380389');
    expect(bore.analysis).toBeDefined();

    if (!bore.analysis) {
      throw new Error('Analysis data should be present');
    }

    // Should have intervals with particle size tests
    const intervalWithParticleSize = bore.analysis.investigatedIntervals.find(
      (interval) => interval.particleSizeDistributionDetermination
    );
    expect(intervalWithParticleSize).toBeDefined();

    // Should have intervals with triaxial tests
    const intervalWithTriaxial = bore.analysis.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 0
    );
    expect(intervalWithTriaxial).toBeDefined();
  });

  it('should handle multiple triaxial tests in same interval', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000380389.xml');
    const bore = parser.parseBHRGT(xml);

    const intervalWithMultipleTriaxial = bore.analysis?.investigatedIntervals.find(
      (interval) =>
        interval.shearStressChangeDuringLoadingDetermination &&
        interval.shearStressChangeDuringLoadingDetermination.length > 1
    );

    // If there are multiple tests, verify they're all parsed
    if (intervalWithMultipleTriaxial?.shearStressChangeDuringLoadingDetermination) {
      const tests = intervalWithMultipleTriaxial.shearStressChangeDuringLoadingDetermination;
      expect(tests.length).toBeGreaterThan(0);

      // Each test should have valid data
      tests.forEach((test) => {
        expect(test.determinationProcedure).toBeTruthy();
        expect(test.determinationMethod).toBeTruthy();
      });
    }
  });
});
