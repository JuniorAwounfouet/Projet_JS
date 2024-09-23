import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10000, // Définit le timeout global à 10 secondes
  },
});