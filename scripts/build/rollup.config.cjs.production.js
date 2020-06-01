import babel from "rollup-plugin-babel";
const fs = require("fs");
const license = require("rollup-plugin-license");
import {terser} from "rollup-plugin-terser";
import stripCode from "rollup-plugin-strip-code";

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";
const LICENSE = fs.readFileSync(__dirname + "/../../LICENSE.txt", "utf8");

export default {
  plugins: [
    stripCode({
      start_comment: "START.VALIDATION",
      end_comment: "END.VALIDATION"
    }),
    babel(),
    terser(),
    license({banner: BANNER + LICENSE}),
  ]
};
