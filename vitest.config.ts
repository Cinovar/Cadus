import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "apps/frontend/vitest.config.ts",
      "apps/identity/vitest.config.ts"
    ],
  },
});