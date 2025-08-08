import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: {
      concurrent: false,
    },
    environment: 'node',
    globals: true,
    setupFiles: ['test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
  },
});