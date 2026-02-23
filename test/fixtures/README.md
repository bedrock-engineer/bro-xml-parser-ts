# Test Fixtures

Curated set of representative XML files from the BRO system.

## CPT Files (2 files)

### 1. example.xml (~71KB)

- **Quality Regime:** IMBRO
- **Purpose:** Standard CPT test, well-formed document
- **BRO ID:** CPT000000099543
- **Use Cases:** Basic parsing tests, metadata extraction, IMBRO regime validation

### 2. CPT000000061388.xml (~274KB)

- **Quality Regime:** IMBRO/A
- **Purpose:** Large file test, IMBRO/A regime
- **Use Cases:** Performance testing, IMBRO/A validation, large dataset handling

## BORE Files (1 file)

### 3. test_borehole.xml (~49KB)

- **Format:** BHR-GT (Geotechnical Borehole)
- **Schema:** Borehole registration/dispatch format
- **Purpose:** Standard borehole test
- **Use Cases:** Bore data parsing, soil layer extraction

## Invalid Files (1 file)

### 5. unsupported-version.xml

- **Schema Version:** 2.0 (unsupported - library supports 1.1)
- **Purpose:** Error handling test
- **Use Cases:** Version detection, error message validation, unsupported schema handling

## Coverage

These 4 focused files provide:

- **Quality regime diversity** - IMBRO and IMBRO/A
- **Size diversity** - Small (~71KB) to large (~274KB) files
- **Schema diversity** - CPT and BORE document types
- **Edge cases** - Error handling, version validation

## Adding New Fixtures

When adding new fixtures:

1. Choose representative examples that cover specific use cases
2. Keep file sizes reasonable (< 500KB if possible)
3. Document the purpose and unique characteristics
4. Update this README with fixture details
5. Add corresponding tests in appropriate test files
6. Avoid redundancy - we only need one file per unique scenario
