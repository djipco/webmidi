// This script injects a few dynamic properties into the source TypeScript declaration file and
// copies it to the ./dist/esm and ./dist/cjs directories.

// Modules
const path = require("path");
const replace = require("replace-in-file");
const pkg = require("../../package.json");
const fs = require("fs-extra");

// Path to source declaration file
const SOURCE_FILE = path.join(__dirname, "../../typescript", "webmidi.d.ts");

// Output directory
const OUTPUT_DIR = "dist";

// Console arguments
const argv = require("minimist")(process.argv.slice(2));

// Get targets to save the file for
let targets = [];
let type = "all";
if (["cjs", "esm"].includes(argv.t)) type = argv.t;

if (type === "all" || type === "cjs")
  targets.push({path: "webmidi.cjs.d.ts", name: "cjs", type: "CommonJS"});

if (type === "all" || type === "esm")
  targets.push({path: "webmidi.esm.d.ts", name: "esm", type: "ES2020"});

async function execute() {

  targets.forEach(async target => {

    const FILE = path.join(OUTPUT_DIR, target.name, target.path);

    // Copy the file to the target directory
    await fs.copy(SOURCE_FILE, FILE, {overwrite: true});

    // Insert dynamic data
    replace.sync({
      files: FILE,
      from: ["{{LIBRARY}}", "{{VERSION}}", "{{HOMEPAGE}}", "{{AUTHOR_NAME}}", "{{AUTHOR_URL}}"],
      to: [pkg.webmidi.name, pkg.version, pkg.homepage, pkg.author.name, pkg.author.url]
    });

    log(`Saved ${target.type} TypeScript declaration file to '${FILE}'`);

  });

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
