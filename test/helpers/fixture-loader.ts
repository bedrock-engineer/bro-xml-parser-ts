import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturesDir = join(__dirname, '../fixtures');

export function loadFixture(
  category: 'cpt' | 'bhr-gt' | 'bhr-g' | 'BHR-GT-BMA' | 'invalid',
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
  },
  bhrGt: {
    dispatch: () => loadFixture('bhr-gt', 'BHR000000347577.xml'),
    BHR000000378222: () => loadFixture('bhr-gt', 'BHR000000378222.xml'),
    BHR000000380390: () => loadFixture('bhr-gt', 'BHR000000380390.xml'),
  },
  bhrGtBma: {
    dispatch: () => loadFixture('BHR-GT-BMA', 'BHR000000336089.xml'),
    atterberg: () => loadFixture('BHR-GT-BMA', 'BHR000000374632.xml'),
    atterberg2: () => loadFixture('BHR-GT-BMA', 'BHR000000374647.xml'),
    settlementPermeability: () => loadFixture('BHR-GT-BMA', 'BHR000000377186.xml'),
    bmbOnly1: () => loadFixture('BHR-GT-BMA', 'BHR000000336062.xml'),
    bmbOnly2: () => loadFixture('BHR-GT-BMA', 'BHR000000336085.xml'),
    bmbOnly3: () => loadFixture('BHR-GT-BMA', 'BHR000000336086.xml'),
    bmbOnly4: () => loadFixture('BHR-GT-BMA', 'BHR000000431542.xml'),
  },
  bhrG: {
    dispatch: () => loadFixture('bhr-g', 'test_geological_borehole.xml'),
    dispatch2: () => loadFixture('bhr-g', 'BHR000000398575.xml'),
  },
  invalid: {
    unsupportedVersion: () => loadFixture('invalid', 'unsupported-version.xml'),
  },
};
