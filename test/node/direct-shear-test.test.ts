/**
 * Tests for Shear Stress During Horizontal Deformation Determination Parsing (Direct Shear Test)
 *
 * Tests parsing of shearStressChangeDuringHorizontalDeformationDetermination data from BHR-GT-BMA files
 */

import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { loadFixture } from '../helpers/fixture-loader';

describe('Direct Shear Test (Horizontal Deformation) Parsing', () => {
  const parser = new BROParser(new NodeXMLAdapter());

  it('should parse BHR000000339288 with two direct shear tests in separate intervals', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    expect(bore.broId).toBe('BHR000000339288');
    expect(bore.analysis).toBeDefined();

    if (!bore.analysis) {
      throw new Error('Analysis data should be present');
    }

    // Find all intervals with direct shear tests
    const intervalsWithDirectShear = bore.analysis.investigatedIntervals.filter(
      (i) =>
        i.shearStressChangeDuringHorizontalDeformationDetermination &&
        i.shearStressChangeDuringHorizontalDeformationDetermination.length > 0
    );

    expect(intervalsWithDirectShear.length).toBe(2);
  });

  it('should parse main properties of first direct shear test (1.31-1.34m)', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) =>
        i.shearStressChangeDuringHorizontalDeformationDetermination &&
        i.shearStressChangeDuringHorizontalDeformationDetermination.length > 0 &&
        i.beginDepth === 1.31
    );

    expect(interval).toBeDefined();
    expect(interval!.endDepth).toBe(1.34);
    expect(interval!.analysisType).toBe('schuifspanningsverloopHorVervorming');

    const det = interval!.shearStressChangeDuringHorizontalDeformationDetermination![0];

    expect(det.determinationProcedure).toBe('ASTM_D6528v2017');
    expect(det.determinationMethod).toBe('horizontaalVervormenHoogtegestuurd');
    expect(det.specimenDisturbed).toBe(false);
    expect(det.sampleMoistness).toBe('veldvochtig');
    expect(det.specimenWaterSaturated).toBe(true);
    expect(det.porousDiscWet).toBe(true);
    expect(det.drained).toBe(true);
    expect(det.lateralSupport).toBe('ringenstapel');
    expect(det.beginDiameter).toBe(65.9);
    expect(det.beginHeight).toBe(27.7);
    expect(det.stopCriterion).toBe('einddoel');
    expect(det.membraneCorrectionApplied).toBe(true);
    expect(det.apparatusDeformationApplied).toBe(false);
    expect(det.bearingFrictionCorrectionApplied).toBe(false);
  });

  it('should parse consolidation stage with height change time series', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) =>
        i.shearStressChangeDuringHorizontalDeformationDetermination &&
        i.shearStressChangeDuringHorizontalDeformationDetermination.length > 0 &&
        i.beginDepth === 1.31
    );

    const det = interval!.shearStressChangeDuringHorizontalDeformationDetermination![0];

    expect(det.consolidationStageAtHorizontalDeformation).toBeDefined();

    const consolidation = det.consolidationStageAtHorizontalDeformation!;
    expect(consolidation.pedestalFixed).toBe(false);
    expect(consolidation.consolidationSteps.length).toBe(1);

    const step = consolidation.consolidationSteps[0];
    expect(step.stepNumber).toBe(1);
    expect(step.verticalStress).toBe(21.0);

    // Check height change time series
    expect(step.heightChangeDuringConsolidation.length).toBeGreaterThan(0);
    expect(step.heightChangeDuringConsolidation.length).toBe(9278);

    const firstPoint = step.heightChangeDuringConsolidation[0];
    expect(firstPoint.time).toBe(0.0);
    expect(firstPoint.height).toBe(0.0);

    const secondPoint = step.heightChangeDuringConsolidation[1];
    expect(secondPoint.time).toBe(10.0);
    expect(secondPoint.height).toBe(1.32);
  });

  it('should parse shear stage with horizontal deformation time series', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) =>
        i.shearStressChangeDuringHorizontalDeformationDetermination &&
        i.shearStressChangeDuringHorizontalDeformationDetermination.length > 0 &&
        i.beginDepth === 1.31
    );

    const det = interval!.shearStressChangeDuringHorizontalDeformationDetermination![0];

    expect(det.shearStage).toBeDefined();

    const shearStage = det.shearStage!;
    expect(shearStage.deformationRate).toBe(1.02);
    expect(shearStage.activeHeightControl).toBe(false);

    // Check shear stress time series
    expect(shearStage.shearStressChangeDuringHorizontalDeformation.length).toBeGreaterThan(0);
    expect(shearStage.shearStressChangeDuringHorizontalDeformation.length).toBe(3691);

    const firstMeasurement = shearStage.shearStressChangeDuringHorizontalDeformation[0];
    expect(firstMeasurement.time).toBe(92771.0);
    expect(firstMeasurement.horizontalDisplacement).toBe(0.0);
    expect(firstMeasurement.shearStress).toBe(0.0);
    expect(firstMeasurement.verticalStress).toBe(20.98);
  });

  it('should parse second direct shear test (5.27-5.30m) with different consolidation stress', () => {
    const xml = loadFixture('BHR-GT-BMA', 'BHR000000339288.xml');
    const bore = parser.parseBHRGT(xml);

    const interval = bore.analysis!.investigatedIntervals.find(
      (i) =>
        i.shearStressChangeDuringHorizontalDeformationDetermination &&
        i.shearStressChangeDuringHorizontalDeformationDetermination.length > 0 &&
        i.beginDepth === 5.27
    );

    expect(interval).toBeDefined();
    expect(interval!.endDepth).toBe(5.3);

    const det = interval!.shearStressChangeDuringHorizontalDeformationDetermination![0];

    expect(det.beginHeight).toBe(28.6);

    // Different consolidation stress than first test
    const step = det.consolidationStageAtHorizontalDeformation!.consolidationSteps[0];
    expect(step.verticalStress).toBe(190.89);
    expect(step.heightChangeDuringConsolidation.length).toBe(17011);

    // Shear stage
    expect(det.shearStage!.shearStressChangeDuringHorizontalDeformation.length).toBe(2878);

    const firstMeasurement = det.shearStage!.shearStressChangeDuringHorizontalDeformation[0];
    expect(firstMeasurement.time).toBe(170140.0);
    expect(firstMeasurement.verticalStress).toBe(190.83);
  });
});
