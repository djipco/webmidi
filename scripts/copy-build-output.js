// Modules
const fs = require("fs-extra");
// const fsPromises =
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");

const SOURCE_DIR = "docusaurus/build/";
const TARGET_DIR = "."
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

  const files = fsPromises.readdir(SOURCE_DIR);

  for (const file of files) {
    const filename = path.basename(file);
    // await fs.copy(SOURCE_PATH,  TARGET_PATH, {overwrite: true});
    log(`Copied '${file}' to ` + path.join(TARGET_DIR, filename));
  }

  // await git.add(files);
  // await git.commit("Built from Docusaurus and updated on: " + moment().format(), files);
  // await git.push();

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
