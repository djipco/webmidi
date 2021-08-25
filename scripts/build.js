// Modules
const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");

const SOURCE_DIR = "docusaurus/build/";
const TARGET_DIR = "."

async function execute() {



  const files = await fsPromises.readdir(SOURCE_DIR);

  for (const file of files) {
    const source = path.join(SOURCE_DIR, file);
    const target = path.join(TARGET_DIR, file);
    await fs.copy(source,  target, {overwrite: true});
    log('Copied ' + source + ' to ' + target);
  }

  await git.add(files);
  await git.commit("Built from Docusaurus and updated on: " + moment().format(), files);
  // await git.push();

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
