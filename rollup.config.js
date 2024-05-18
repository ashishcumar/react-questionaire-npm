import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "react-questionaire",
  },
  external: [
    "react",
    "react-dom",
    "@chakra-ui/react",
    "chakra-react-select",
    "react-hook-form",
  ],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
});
