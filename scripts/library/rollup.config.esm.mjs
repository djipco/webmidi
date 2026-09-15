import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import replace from "@rollup/plugin-replace";
import license from "rollup-plugin-license";
import stripCode from "rollup-plugin-strip-code";
import versionInjector from "rollup-plugin-version-injector";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BANNER = fs.readFileSync(path.join(__dirname, "..", "..", "BANNER.txt"), "utf8") + "\n\n\n";

export default {

  plugins: [
    versionInjector(),
    replace({__flavour__: "esm"}),
    stripCode({
      start_comment: "START-CJS",
      end_comment: "END-CJS"
    }),
    license({
      banner: BANNER
    })
  ]

};
