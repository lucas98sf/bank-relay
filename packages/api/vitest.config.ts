import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    isolate: true,
    fileParallelism: false,
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/setup.ts"],
    },
  },
});
