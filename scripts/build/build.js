const moment = require("moment");
const git = require("simple-git/promise")();
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

async function execute() {

  // Generate build
  await system(cmd);

  console.info(
    "\x1b[32m", // red font
    `The "${type}" build was saved to "dist/webmidi.${type}.min.js"`,
    "\x1b[0m"   // reset font
  );

  // Commit and push
  let message = "Built on: " + moment().format();
  await git.commit(message, ["dist"]);
  await git.push();
  console.info("\x1b[32m", `Changes committed and pushed`, "\x1b[0m");

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
