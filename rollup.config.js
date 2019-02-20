import typescriptPlugin from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import typescript from "typescript";

import pkg from "./package.json";

export default {
  input: "src/Alert/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    postcss({
      extract: true
    }),
    typescriptPlugin({
      typescript
    })
  ]
};
