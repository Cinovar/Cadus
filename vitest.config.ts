import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "apps/frontend/vitest.config.ts",
      "apps/register-pacient/vitest.config.ts"
    ],
  },
});