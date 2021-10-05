const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const path = require("path");
const process = require("process");
const jsdoc2md = require("jsdoc-to-markdown");
const os = require("os");
const replace = require("replace-in-file");
const rimraf = require("@alexbinary/rimraf");
const moment = require("moment");

const ROOT_PATH = process.cwd();
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
const TEMPLATE_DIR = path.join(__dirname, "markdown-template");

async function generate() {

  // Create temporary directory to host modified files
  const tempPath = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-markdown-"));

  const files = [
    path.join(ROOT_PATH, "src", "Enumerations.js"),
    path.join(ROOT_PATH, "src", "Input.js"),
    path.join(ROOT_PATH, "src", "InputChannel.js"),
    path.join(ROOT_PATH, "src", "Message.js"),
    path.join(ROOT_PATH, "src", "Note.js"),
    path.join(ROOT_PATH, "src", "Output.js"),
    path.join(ROOT_PATH, "src", "OutputChannel.js"),
    path.join(ROOT_PATH, "src", "Utilities.js"),
    path.join(ROOT_PATH, "src", "WebMidi.js"),

    path.join(ROOT_PATH, "scripts", "api-documentation", "djipevents", "EventEmitter.js"),
    path.join(ROOT_PATH, "scripts", "api-documentation", "djipevents", "Listener.js")
  ];

  // Get list of source files
  // let files = await fsPromises.readdir(SOURCE_PATH);

  // Copy source files to temp dir, strip out the import/export statements and create markdown file
  await files.forEach(async filepath => {

    const file = path.basename(filepath);

    // await fs.copy(path.join(SOURCE_PATH, file), path.join(tempPath, file), {overwrite: true});
    await fs.copy(filepath, path.join(tempPath, file), {overwrite: true});

    const options = {
      files: path.join(tempPath, file),
      from: [/^import .*\n/gm, /^export class /gm], // strip out import and export
      to: ["", "class "]
    };
    await replace(options);

    // Generate markdown from JSDoc comments
    const markdown = jsdoc2md.renderSync({
      files: path.join(tempPath, file),
      partial: [
        path.join(TEMPLATE_DIR, "all-docs", "docs", "header.hbs"),
        path.join(TEMPLATE_DIR, "all-docs", "docs", "body", "body.hbs"),
        path.join(TEMPLATE_DIR, "all-docs", "docs", "member-index", "member-index-grouped.hbs"),
      ],
      noCache: true,
      "heading-depth": 1,
      separators: true,

      // Format identifiers as code (wrap function/property/class/etc. names in backticks).
      "name-format": true,

      // "module-index-format": "dl", // none, grouped, table, dl
      // "global-index-format": "none" // none, grouped, table, dl
      "param-list-format": "table", // 'list' or 'table' (default)
      "property-list-format": "table", // 'list' or 'table' (default)
      "member-index-format": "grouped" // grouped, list
    });

    // Write the markdown file
    let filename = path.basename(file, ".js");
    fs.writeFileSync(path.join(TARGET_PATH, `${filename}.md`), markdown);
    console.info(`Saved markdown file to ${filename}.md`);

    // Commit generated files
    await git.add([path.join(TARGET_PATH, `${filename}.md`)]);
    await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
    await git.push();
    console.info(`File committed to git: ${filename}.md`);

    // Remove temporary file
    await rimraf(path.join(tempPath, file));

  });

}

// Execute and catch errors if any (in red)
generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
