# BRO Parser Test Suite

Comprehensive test suite using Vitest with browser mode, node mode, and unit tests.

## Structure

- `fixtures/` - Test XML files (focused subset of representative files)
  - `cpt/` - 2 CPT test files (IMBRO, IMBRO/A)
  - `bore/` - 1 Borehole test file
  - `invalid/` - 1 invalid XML file for error testing
- `helpers/` - Shared test utilities
  - `fixture-loader.ts` - Load XML fixtures easily
  - `assertions.ts` - Custom assertions for CPT/Bore data validation
- `unit/` - Unit tests for individual functions
  - `resolvers/` - Type conversion functions
  - `core/` - Version detection, schema parsing
- `node/` - Node.js integration tests
  - Uses NodeXMLAdapter with @xmldom/xmldom and fontoxpath
- `browser/` - Browser integration tests
  - Uses BrowserXMLAdapter with native DOMParser and XPath

## Running Tests

```bash
# Run all tests
npm test

# Run with watch mode
npm run test:watch

# Run specific test suites
npm run test:unit      # Unit tests only
npm run test:node      # Node integration tests only
npm run test:browser   # Browser integration tests only

# Run with UI
npm run test:ui
npm run test:browser:ui

# Generate coverage report
npm run test:coverage
```

## Test Categories

### Unit Tests

Test individual functions in isolation:

- **Type resolvers** - parseFloat, parseInt, parseBoolean, parseDate, parseQualityClass, lowerText
- **Version detection** - Schema version validation, error handling
- **Core modules** - Schema parsing logic

### Node Integration Tests

End-to-end tests in Node.js environment:

- **CPT parsing** - Full CPT document parsing with metadata and measurements
- **BORE parsing** - Borehole data with soil layers
- **Quality regime detection** - IMBRO vs IMBRO/A
- **Error handling** - Malformed XML, unsupported versions, wrong document types

### Browser Integration Tests

End-to-end tests in browser environment:

- **Native API usage** - Tests using native DOMParser and document.evaluate
- **Bundle isolation** - Verifies no Node.js dependencies leaked into browser bundle
- **CPT/BORE parsing** - Full document parsing in browser context
- **Large file handling** - Performance with larger XML files

## Fixtures

Test fixtures are curated from the original test files:

- **2 CPT files** - IMBRO (71KB) and IMBRO/A (274KB)
- **1 BORE file** - Registration format test file
- **1 invalid file** - Unsupported version for error testing

See `fixtures/README.md` for details on each file.

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { parseFloat } from '@/resolvers/type-resolvers';

describe('parseFloat', () => {
  it('should parse valid floats', () => {
    expect(parseFloat('123.45')).toBe(123.45);
  });
});
```

### Integration Test Example

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { BROParser } from '@/parser';
import { NodeXMLAdapter } from '@/adapters/node-adapter';
import { fixtures } from '@test/helpers/fixture-loader';

describe('My Test', () => {
  let parser: BROParser;

  beforeEach(() => {
    parser = new BROParser(new NodeXMLAdapter());
  });

  it('should parse CPT', () => {
    const xml = fixtures.cpt.example();
    const cpt = parser.parseCPT(xml);
    expect(cpt.bro_id).toBeTruthy();
  });
});
```

## Path Aliases

Tests use TypeScript path aliases for cleaner imports:

- `@/` - Points to `src/` directory
- `@test/` - Points to `test/` directory

Example:

```typescript
import { BROParser } from '@/parser'; // Instead of '../../../src/parser'
import { fixtures } from '@test/helpers/fixture-loader'; // Instead of '../../helpers/fixture-loader'
```

## Coverage

Coverage reports are generated for unit tests and include:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

View coverage report after running:

```bash
npm run test:coverage
open coverage/index.html
```
