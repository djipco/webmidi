// Modules
const fs = require("fs-extra");
const git = require("simple-git/promise")();
const moment = require("moment");

const SOURCE_PATH = "docusaurus/build/*";
const TARGET_PATH = "."
const TARGET_ELEMENTS = [
  "assets",
  "blog",
  "docs",
  "img",
  "markdown-page",
  ".nojekyll",
  "404.html",
  "index.html",
  "sitemap.xml",
]

async function execute() {
  await fs.copy(SOURCE_PATH,  TARGET_PATH, {overwrite: true});
  log(`Copied files matching '${SOURCE_PATH}' to '${TARGET_PATH}'`);
  await git.add(TARGET_ELEMENTS);
  await git.commit("Built from Docusaurus and updated on: " + moment().format(), TARGET_ELEMENTS);
  // await git.push();
}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
