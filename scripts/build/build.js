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

// Production version (minified with sourcemap, argument validation removed)
let production = cmd + ` --file dist/webmidi.${type}.min.js ` +
  `--sourcemap ` +
  `--config ${__dirname}/rollup.config.${type}.production.js`;

// Development version (non-minified, with argument validation)
let development = cmd + ` --file dist/webmidi.${type}.js ` +
  `--config ${__dirname}/rollup.config.${type}.development.js`;

async function execute() {

  // Production build
  await system(production);

  console.info(
    "\x1b[32m", // green font
    `The "${type}" production build was saved to "dist/webmidi.${type}.min.js"`,
    "\x1b[0m"   // reset font
  );

  // Development build
  await system(development);

  console.info(
    "\x1b[32m", // green font
    `The "${type}" development build was saved to "dist/webmidi.${type}.js"`,
    "\x1b[0m"   // reset font
  );

  // Commit and push
  let message = "Built on: " + moment().format();
  await git.add(["dist"]);
  await git.commit(message, ["dist"]);
  await git.push();
  console.info("\x1b[32m", `Changes committed and pushed`, "\x1b[0m");

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
