// const {exec} = require("child_process");
const system = require("system-commands");

// Parse arguments (default type is esm). Use -t as type (if valid)
let type = "esm";
const argv = require("minimist")(process.argv.slice(2));
if (["cjs", "esm", "iife"].includes(argv.t)) type = argv.t;

// Prepare command
let cmd = `./node_modules/.bin/rollup ` +
  `--config ${__dirname}/rollup.config.${type}.js ` +
  `--input src/WebMidi.js ` +
  `--format ${type} ` +
  `--file dist/webmidi.${type}.min.js ` +
  `--sourcemap`;

// Additional arguments are needed for IIFE
if (type === "iife") cmd += ` --name webmidi --exports named`;

// Execute command
system(cmd)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`The "${type}" build was saved to "dist/webmidi.${type}.min.js"`);
  })
  .catch(error => console.error(error));
