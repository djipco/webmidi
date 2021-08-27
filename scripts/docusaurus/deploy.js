// Importation
const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");
const os = require("os");

// Configuration
const TARGET_BRANCH = "gh-pages";
const SOURCE_DIR = path.join(process.cwd(), "website", "build");

async function execute() {

  const TMP_DIR = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-website-"));

  // Get list of files and directories inside the Docusaurus build directory
  const files = await fsPromises.readdir(SOURCE_DIR);

  // Copy files to tmp directory
  for (const file of files) {
    const source = path.join(SOURCE_DIR, file);
    const target = path.join(TMP_DIR, file);
    await fs.copy(source, target, {overwrite: true});
  }
  log("Copied files to temp dir: " + TMP_DIR);

  // Get current branch (so we can come back to it later)
  let results = await git.branch();
  const ORIGINAL_BRANCH = results.current;

  // Switch to target branch
  log(`Switching from '${ORIGINAL_BRANCH}' branch to '${TARGET_BRANCH}' branch`);
  await git.checkout(TARGET_BRANCH);

  // Copy content of tmp dir to final destination and commit
  for (const file of files) {
    const source = path.join(TMP_DIR, file);
    const target = path.join(process.cwd(), file);
    await fs.copy(source, target, {overwrite: true});
    await git.add([target]);
    await git.commit("Updated on: " + moment().format(), [target]);
  }

  // await git.push();
  log(`Changes committed to '${TARGET_BRANCH}' branch and pushed to remote`);

  // Come back to original branch
  log(`Switching back to '${ORIGINAL_BRANCH}' branch`);
  await git.checkout(ORIGINAL_BRANCH);

}

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}

// Execution
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
