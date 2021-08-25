// Modules
const fs = require("fs-extra");
const path = require("path");
const os = require("os");

async function execute() {
  await fs.copy("docusaurus/build/*",  ".", {overwrite: true});
  log(`Switching from '${ORIGINAL_BRANCH}' branch to '${TARGET_BRANCH}' branch`);
}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
