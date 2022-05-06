// This script builds the bundled library files (both normal and minified with sourcemaps) and
// commits them to the 'dist' folder for later publishing. By default, CommonJS, ES Modules and IIFE
// versions are built.
//
// Calling this script with the -t argument allows building only of them. Options are: cjs, esm and
// iife.

// Modules
const system = require("system-commands");
const fs = require("fs");
const path = require("path");

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

async function execute(type) {

  // Write package.json file so proper versions are imported by Node
  if (type === "esm") {

    fs.writeFileSync(
      path.join(process.cwd(), "dist", "esm", "package.json"), '{"type": "module"}'
    );

    console.info(
      "\x1b[32m", // green font
      `Custom package.json file ("type": "module") saved to "dist/${type}/package.json"`,
      "\x1b[0m"   // reset font
    );

  } else if (type === "cjs") {

    fs.writeFileSync(
      path.join(process.cwd(), "dist", "cjs", "package.json"), '{"type": "commonjs"}'
    );

    console.info(
      "\x1b[32m", // green font
      `Custom package.json file ("type": "commonjs") saved to "dist/${type}/package.json"`,
      "\x1b[0m"   // reset font
    );

  }

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
}

// Execute and catch errors if any (in red)
execute(type).catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

