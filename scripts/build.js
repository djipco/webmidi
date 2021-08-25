// Importation
const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");
const process = require("process");

// Configuration
const TARGET_DIR = process.cwd();
const DOCUSAURUS_DIR = path.join(TARGET_DIR, "docusaurus");
const SOURCE_DIR = path.join(DOCUSAURUS_DIR, "build");

// Execution
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

async function execute() {

  // Get files inside the Docusaurus build directory
  process.chdir(DOCUSAURUS_DIR);
  const files = await fsPromises.readdir(SOURCE_DIR);

  for (const file of files) {
    const source = path.join(SOURCE_DIR, file);
    const target = path.join(TARGET_DIR, file);
    await fs.copy(source,  target, {overwrite: true});
    log('Copied ' + source + ' to ' + target);
  }

  await git.add(files);
  await git.commit("Updated from Docusaurus build (" + moment().format("MMMM Do YYYY") + ")", files);
  await git.push();

}

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
