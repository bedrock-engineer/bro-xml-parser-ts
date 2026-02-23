import { defineConfig, defineProject } from 'vitest/config';
import { resolve } from 'path';
import { playwright } from '@vitest/browser-playwright';

const alias = {
  '@': resolve(__dirname, './src'),
  '@test': resolve(__dirname, './test'),
};

export default defineConfig({
  test: {
    globals: false, // Explicit imports for better IDE support
    passWithNoTests: false,
    testTimeout: 10000,
    hookTimeout: 10000,
    projects: [
      // Unit tests - run in Node environment, test individual functions
      defineProject({
        resolve: { alias },
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts'],
          environment: 'node',
        },
      }),

      // Node integration tests - test with NodeXMLAdapter
      defineProject({
        resolve: { alias },
        test: {
          name: 'node',
          include: ['test/node/**/*.test.ts'],
          environment: 'node',
          setupFiles: ['./test/node/setup.ts'],
        },
      }),

      // Browser integration tests - test with BrowserXMLAdapter using real Chromium
      defineProject({
        resolve: { alias },
        test: {
          name: 'browser',
          include: ['test/browser/**/*.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./test/browser/setup.ts'],
        },
      }),
    ],
  },
});
