const {exec} = require("child_process");

// Parse arguments (default type is esm)
let type = "esm";

// Parse arguments and use -t as type (if valid)
const argv = require("minimist")(process.argv.slice(2));
if (["cjs", "esm", "iife"].includes(argv.t)) type = argv.t;

// Prepare command
let cmd = `./node_modules/.bin/rollup ` +
  `--config ${__dirname}/rollup.config.${type}.js ` +
  `--input src/index.js ` +
  `--format ${type} ` +
  `--file dist/webmidi.${type}.min.js ` +
  `--sourcemap`;

// Additional arguments are needed for IIFE
if (type === "iife") cmd += ` --name WebMidi --exports named`;

// Execute command
exec(cmd, (err, stdout, stderr) => {

  if (err) {
    console.error(err);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(stdout);
  console.error(stderr);

});
