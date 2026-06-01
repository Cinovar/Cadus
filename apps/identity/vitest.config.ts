import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "bun",
    include: ["src/**/*.test.ts"],
  },
});