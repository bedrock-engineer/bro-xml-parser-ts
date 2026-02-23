# BHR-GT-BMA Test Fixtures

This directory contains real-world BRO XML files for testing BHR-GT-BMA (Borehole Sample Analysis) parsing functionality.

## Fixture Overview

| File | Size | BMB | BMA | Determination Types |
|------|------|-----|-----|---------------------|
| BHR000000336062.xml | 34 KB | ✓ | - | None |
| BHR000000336085.xml | 101 KB | ✓ | - | None |
| BHR000000336086.xml | 63 KB | ✓ | - | None |
| BHR000000336089.xml | 22 KB | ✓ | ✓ | Particle Size, Water Content, Bulk Density |
| BHR000000431542.xml | 16 KB | ✓ | - | None |

**Legend:**
- **BMB**: boreholeSampleDescription (visual/textural soil description) - ALREADY SUPPORTED
- **BMA**: boreholeSampleAnalysis (laboratory measurements) - TO BE IMPLEMENTED

## BHR000000336089.xml - Primary BMA Test File

This file contains the most complete laboratory analysis data:

### Investigation Metadata
- BRO ID: BHR000000336089
- Analysis Report Date: 2020-03-03
- Analysis Procedure: geen (none specified)
- Investigation Interval: 1.12m - 1.18m depth
- Sample Quality: QM2
- Analysis Type: korrelgrootteverdeling (particle size distribution)

### Determination Flags
- waterContentDetermined: ja
- organicMatterContentDetermined: nee
- carbonateContentDetermined: nee
- volumetricMassDensityDetermined: ja
- volumetricMassDensitySolidsDetermined: nee
- described: nee

### 1. Particle Size Distribution Determination

The most complex determination type with detailed grain size fractions.

**Procedure**: ISO17892d4v2016enISO13317d3v2001
**Method**: natDroogZevenRoentgen (wet/dry sieving + X-ray)
**Fraction Distribution**: uitgebreidStandaard (extended standard)

**Data Structure:**
- Equivalent mass: 2.6500 g/cm³
- Basic distribution:
  - Fraction < 63μm: 5.0%
  - Fraction > 63μm: 95.0%
- Detailed distribution < 63μm (7 fractions):
  - 0-2μm: 2.6%
  - 2-4μm: 0.4%
  - 4-8μm: 0.4%
  - 8-16μm: 0.6%
  - 16-32μm: 0.5%
  - 32-50μm: 0.2%
  - 50-63μm: 0.3%
- Standard distribution > 63μm (16 fractions):
  - 63-90μm through >63mm
  - Total of 23 grain size fractions

### 2. Water Content Determination

**Procedure**: ISO17892d1v2014
**Method**: drogen (drying)
**Sample Moistness**: veldvochtig (field moist)

**Result:**
- Water Content: 31.6%
- Drying Temperature: 105°C
- Drying Period: 16-24 hours
- Salt Correction Method: nietToegepast (not applied)

### 3. Volumetric Mass Density Determination

**Procedure**: ISO17892d2v2014
**Method**: volumeVoorbepaald (predetermined volume)
**Sample Moistness**: veldvochtig (field moist)

**Result:**
- Volumetric Mass Density: 1.779 g/cm³

## Schema Information

All files use:
- **Schema**: http://www.broservices.nl/xsd/dsbhr-gt/2.1
- **Common Schema**: http://www.broservices.nl/xsd/bhrgtcommon/2.1
- **GML**: http://www.opengis.net/gml/3.2
- **SWE**: http://www.opengis.net/swe/2.0

## Implementation Priority

Based on these fixtures, the initial BMA implementation should support:

1. **Phase 1 - Simple Determinations** (Start Here):
   - waterContentDetermination
   - volumetricMassDensityDetermination
   - organicMatterContentDetermination (structure similar to water content)
   - carbonateContentDetermination (structure similar to water content)

2. **Phase 2 - Complex Determinations**:
   - particleSizeDistributionDetermination (23 fractions)
   - volumetricMassDensityOfSolidsDetermination

3. **Phase 3 - Mechanical Properties** (Not in current fixtures):
   - undrainedShearStrengthDetermination
   - settlementCharacteristicsDetermination
   - atterbergLimitsDetermination
   - shearStressDuringLoadingDetermination (triaxial)
   - shearStressDuringShearingDetermination (direct shear)
   - permeabilityDetermination

## Notes

- Most files contain only BMB (description) data without laboratory analysis
- Real-world BMA data is less common than BMB data
- The particle size distribution is the most data-rich determination type
- All files are minified (single line XML)
