const fs = require("fs");
const license = require("rollup-plugin-license");
import { terser } from "rollup-plugin-terser";

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";
const LICENSE = fs.readFileSync(__dirname + "/../../LICENSE.txt", "utf8");

export default {

  plugins: [
    terser(),
    license({banner: BANNER + LICENSE})
  ]

};
