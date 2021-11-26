// This script builds the bundled library files (both normal and minified with sourcemaps) and
// commits them to the 'dist' folder for later publishing. By default, CommonJS, ES Modules and IIFE
// versions are built. Calling this script with the -t argument building only of them. Options are:
// cjs, esm and iife

// Modules
const moment = require("moment");
const git = require("simple-git/promise")();
const system = require("system-commands");

// Parse arguments (default type is esm). Use -t as type (if valid)
let type = "esm";
const argv = require("minimist")(process.argv.slice(2));
if (["cjs", "esm", "iife"].includes(argv.t)) type = argv.t;

// Prepare general command
let cmd = `./node_modules/.bin/rollup ` +
  `--input src/WebMidi.js ` +
  `--format ${type} `;

// Minified version (with sourcemap)
let minified = cmd + ` --file dist/${type}/webmidi.${type}.min.js ` +
  `--sourcemap ` +
  `--config ${__dirname}/rollup.config.${type}.min.js`;

// Non-minified version
let normal = cmd + ` --file dist/${type}/webmidi.${type}.js ` +
  `--config ${__dirname}/rollup.config.${type}.js`;

async function execute() {

  // Production build
  await system(minified);

  console.info(
    "\x1b[32m", // green font
    `The "${type}" minified build was saved to "dist/${type}/webmidi.${type}.min.js"`,
    "\x1b[0m"   // reset font
  );

  // Development build
  await system(normal);

  console.info(
    "\x1b[32m", // green font
    `The "${type}" non-minified build was saved to "dist/${type}/webmidi.${type}.js"`,
    "\x1b[0m"   // reset font
  );

  // Commit and push
  let message = "Built on " + moment().format();
  await git.add(["dist"]);
  await git.commit(message, ["dist"]);
  await git.push();
  console.info("\x1b[32m", `Changes committed and pushed`, "\x1b[0m");

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
