import babel from "@rollup/plugin-babel";
import stripCode from "rollup-plugin-strip-code";
import replace from "@rollup/plugin-replace";

const fs = require("fs");
const license = require("rollup-plugin-license");
const versionInjector = require("rollup-plugin-version-injector");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";

export default {

  output: {
    name: "window",       // WebMidi and Note will be added to window
    extend: true,         // important!
    exports: "named"
  },

  plugins: [
    versionInjector(),
    replace({__flavour__: "iife"}),
    stripCode({
      start_comment: "START-CJS",
      end_comment: "END-CJS"
    }),
    stripCode({
      start_comment: "START-ESM",
      end_comment: "END-ESM"
    }),
    babel(),
    license({
      banner: BANNER
    })
  ]

};
