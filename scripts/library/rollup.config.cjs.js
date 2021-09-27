import babel from "rollup-plugin-babel";
const fs = require("fs");
const license = require("rollup-plugin-license");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";

export default {
  plugins: [
    babel(),
    license({banner: BANNER})
  ]
};
