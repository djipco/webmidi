const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const path = require("path");
const process = require("process");
const jsdoc2md = require("jsdoc-to-markdown");
const os = require("os");
const replace = require("replace-in-file");
const rimraf = require("@alexbinary/rimraf");

const SOURCE_PATH = path.join(process.cwd(), "src");
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
const TEMPLATE_DIR = path.join(__dirname, "markdown-template");

async function generate() {

  // Create temporary directory to host modified files
  const tempPath = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-markdown-"));

  // Get list of source files
  let files = await fsPromises.readdir(SOURCE_PATH);

  // Copy source files to temp dir, strip out the import/export statements and create markdown file
  await files.forEach(async file => {

    await fs.copy(path.join(SOURCE_PATH, file), path.join(tempPath, file), {overwrite: true});

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
      "name-format": true,
      // "module-index-format": "dl", // none, grouped, table, dl
      // "global-index-format": "none" // none, grouped, table, dl
      "param-list-format": "table", // 'list' or 'table' (default)
      "property-list-format": "table", // 'list' or 'table' (default)
      "member-index-format": "grouped" // grouped, list
    });

    fs.writeFileSync("test.json", JSON.stringify(jsdocDat));

    // write the markdown file
    let filename = path.basename(file, ".js");
    fs.writeFileSync(path.join(TARGET_PATH, `${filename}.md`), markdown);
    console.info(`Saved markdown file to ${filename}.md`);

    await rimraf(path.join(tempPath, file));

  });

}

// Execute and catch errors if any (in red)
generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
