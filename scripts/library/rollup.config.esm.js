import stripCode from "rollup-plugin-strip-code";

const fs = require("fs");
const license = require("rollup-plugin-license");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";

export default {

  plugins: [
    stripCode({
      start_comment: "START-NODE.JS",
      end_comment: "END-NODE.JS"
    }),
    license({
      banner: BANNER
    })
  ]

};
