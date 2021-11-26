import babel from "rollup-plugin-babel";
import stripCode from "rollup-plugin-strip-code";
const fs = require("fs");
const license = require("rollup-plugin-license");
const versionInjector = require("rollup-plugin-version-injector");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";

export default {
  plugins: [
    versionInjector(),
    stripCode({
      start_comment: "START-ESM",
      end_comment: "END-ESM"
    }),
    babel(),
    license({banner: BANNER})
  ]
};
