import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // Unit tests - run in Node environment, test individual functions
  {
    extends: './vitest.config.ts',
    test: {
      name: 'unit',
      include: ['test/unit/**/*.test.ts'],
      environment: 'node',
      coverage: {
        enabled: true,
        reporter: ['text', 'html', 'json'],
        include: ['src/**/*.ts'],
        exclude: [
          'src/**/*.d.ts',
          'src/browser.ts',
          'src/node.ts',
          'src/index.ts',
        ],
      },
    },
  },

  // Node integration tests - test with NodeXMLAdapter
  {
    extends: './vitest.config.ts',
    test: {
      name: 'node',
      include: ['test/node/**/*.test.ts'],
      environment: 'node',
      setupFiles: ['./test/node/setup.ts'],
    },
  },

  // Browser integration tests - test with BrowserXMLAdapter
  {
    extends: './vitest.config.ts',
    test: {
      name: 'browser',
      include: ['test/browser/**/*.test.ts'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        headless: true,
      },
      setupFiles: ['./test/browser/setup.ts'],
    },
  },
]);
