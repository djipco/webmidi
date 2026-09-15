import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import license from "rollup-plugin-license";
import stripCode from "rollup-plugin-strip-code";
import versionInjector from "rollup-plugin-version-injector";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BANNER = fs.readFileSync(path.join(__dirname, "..", "..", "BANNER.txt"), "utf8") + "\n\n\n";

export default {
  plugins: [
    versionInjector(),
    replace({__flavour__: "cjs"}),
    stripCode({
      start_comment: "START-ESM",
      end_comment: "END-ESM"
    }),
    babel({babelHelpers: "bundled"}),
    terser(),
    license({banner: BANNER}),
  ]
};
