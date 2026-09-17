import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturesDir = join(__dirname, '../fixtures');

export function loadFixture(
  category: 'cpt' | 'bhr-gt' | 'bhr-g' | 'BHR-GT-BMA' | 'gmw' | 'gld' | 'invalid',
  filename: string
): string {
  const path = join(fixturesDir, category, filename);
  return readFileSync(path, 'utf-8');
}

export const fixtures = {
  cpt: {
    example: () => loadFixture('cpt', 'example.xml'),
    imbro: () => loadFixture('cpt', 'example.xml'),
    imbro2: () => loadFixture('cpt', 'CPT000000179849.xml'),
    imbroa: () => loadFixture('cpt', 'CPT000000061388.xml'),
    // File whose values block is not ordered by penetration length
    unordered: () => loadFixture('cpt', 'CPT000000200287.xml'),
  },
  bhrGt: {
    dispatch: () => loadFixture('bhr-gt', 'BHR000000347577.xml'),
    BHR000000378222: () => loadFixture('bhr-gt', 'BHR000000378222.xml'),
    BHR000000380390: () => loadFixture('bhr-gt', 'BHR000000380390.xml'),
    BHR000000377186: () => loadFixture('bhr-gt', 'BHR000000377186.xml'),
    // Zeeland IMBRO/A archive borehole: geotechnicalSoilName is nil, soil is
    // described only via the NEN 5104 fields.
    zeelandImbroA: () => loadFixture('bhr-gt', 'BHR000000351618.xml'),
  },
  bhrGtBma: {
    dispatch: () => loadFixture('BHR-GT-BMA', 'BHR000000336089.xml'),
    atterberg: () => loadFixture('BHR-GT-BMA', 'BHR000000374632.xml'),
    atterberg2: () => loadFixture('BHR-GT-BMA', 'BHR000000374647.xml'),
    settlementPermeability: () => loadFixture('BHR-GT-BMA', 'BHR000000377186.xml'),
    // Oedometer with saturation stage + stressChangeDuringSettlement time-series and fall-cone Atterberg
    oedometerSaturation: () => loadFixture('BHR-GT-BMA', 'BHR000000339288.xml'),
    // Organic matter (lutum correction) + density-of-solids (sample container volume)
    organicMatterDensity: () => loadFixture('BHR-GT-BMA', 'BHR000000336088.xml'),
    // Triaxial test on a remoulded (made) specimen
    triaxialMadeSpecimen: () => loadFixture('BHR-GT-BMA', 'BHR000000380389.xml'),
    bmbOnly1: () => loadFixture('BHR-GT-BMA', 'BHR000000336062.xml'),
    bmbOnly2: () => loadFixture('BHR-GT-BMA', 'BHR000000336085.xml'),
    bmbOnly3: () => loadFixture('BHR-GT-BMA', 'BHR000000336086.xml'),
    bmbOnly4: () => loadFixture('BHR-GT-BMA', 'BHR000000431542.xml'),
  },
  bhrG: {
    dispatch: () => loadFixture('bhr-g', 'test_geological_borehole.xml'),
    dispatch2: () => loadFixture('bhr-g', 'BHR000000398575.xml'),
  },
  gmw: {
    // Single-tube well with full screen/plainTube/sedimentSump (GMW_PPO).
    singleTube: () => loadFixture('gmw', 'GMW000000048066.xml'),
    // Single tube with an intermediateEvent (well-history event log).
    withEvent: () => loadFixture('gmw', 'GMW000000012500.xml'),
    // Two-tube well (monitoring-tube array).
    multiTube: () => loadFixture('gmw', 'GMW000000040000.xml'),
    // Synthetic: exercises the optional insertedPart + geoOhmCable/electrode
    // branches, which are rare in public data. Hand-built from the dsgmw/1.1 XSD.
    synthetic: () => loadFixture('gmw', 'GMW-synthetic-geoohm.xml'),
  },
  gld: {
    // Real GLD trimmed to the first observation with its first 5 (of 3059) points.
    withObservations: () => loadFixture('gld', 'GLD000000010000.trimmed.xml'),
    // Tiny real GLD: registered, has a monitoringPoint but no observations yet.
    noObservations: () => loadFixture('gld', 'GLD000000030000.xml'),
  },
  invalid: {
    unsupportedVersion: () => loadFixture('invalid', 'unsupported-version.xml'),
  },
};
