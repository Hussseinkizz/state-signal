import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"], // Adjust as needed
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  esbuildOptions(options) {
    options.jsx = "automatic"; // Keeps JSX in the bundle for React
  },
});
