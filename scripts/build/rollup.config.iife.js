import babel from "rollup-plugin-babel";
const fs = require("fs");
const license = require("rollup-plugin-license");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";
const LICENSE = fs.readFileSync(__dirname + "/../../LICENSE.txt", "utf8");

export default {

  output: {
    name: "window",       // WebMidi and Note will be added to window
    extend: true,         // important!
    exports: "named"
  },

  plugins: [
    babel(),
    license({banner: BANNER + LICENSE})
  ]

};
