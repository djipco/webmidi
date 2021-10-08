// Imports
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

// Paths
const ROOT_PATH = process.cwd();
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
const TEMPLATE_DIR = path.join(__dirname, "markdown-template");

// Source files to document
const FILES = [
  path.join(ROOT_PATH, "node_modules", "djipevents", "src", "djipevents.js"),
  path.join(ROOT_PATH, "src", "Enumerations.js"),
  path.join(ROOT_PATH, "src", "Input.js"),
  path.join(ROOT_PATH, "src", "InputChannel.js"),
  path.join(ROOT_PATH, "src", "Message.js"),
  path.join(ROOT_PATH, "src", "Note.js"),
  path.join(ROOT_PATH, "src", "Output.js"),
  path.join(ROOT_PATH, "src", "OutputChannel.js"),
  path.join(ROOT_PATH, "src", "Utilities.js"),
  path.join(ROOT_PATH, "src", "WebMidi.js")
];

async function generate() {

  // Create temporary directory to store temporary file
  const tempPath = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-markdown-"));
  const tempFilePath = path.join(tempPath, "All.js");

  // Combine all source files into a single document (this is needed because jsdoc2md does not
  // resolve parents accross files)
  FILES.forEach(filepath => {
    fs.outputFileSync(tempFilePath, fs.readFileSync(filepath), {flag: "a"});
  });

  // Strip all import statements from the combined file
  const options = {
    files: tempFilePath,
    from: [/^import .*\n/gm, /^export class /gm], // strip out import and export
    to: ["", "class "]
  };
  await replace(options);

  // Get template data by parsing the file with all classes
  const templateData = jsdoc2md.getTemplateDataSync({files: tempFilePath});



  // Sort data according to kind (member, function, event) and then according to name
  const order = {class: 0, constructor: 1, function: 2, member: 3, event: 4};
  templateData.sort((a, b) => {

    // if (order[a.kind] === order[b.kind]) {
    //   return a.id.localeCompare(b.id);
    // } else if (order[a.kind] < order[b.kind]) {
    //   return -1;
    // } else {
    //   return 1;
    // }

    if (order[a.kind] === order[b.kind]) {
      return a.id.localeCompare(b.id);
    } else {
      return order[a.kind] < order[b.kind] ? -1 : 1;
    }

  });


  // fs.writeJsonSync(TARGET_PATH + "test.json", templateData);


  // Build an array of class names (to output one  file per class)
  const classNames = templateData.reduce((classNames, identifier) => {
    if (identifier.kind === "class") classNames.push(identifier.name);
    return classNames;
  }, []);

  // Define rendering options
  const renderingOptions = {
    data: templateData,

    partial: [
      path.join(TEMPLATE_DIR, "all-docs", "docs", "header.hbs"),
      path.join(TEMPLATE_DIR, "all-docs", "docs", "body", "body.hbs"),
      path.join(TEMPLATE_DIR, "all-docs", "docs", "member-index", "member-index-grouped.hbs"),
    ],
    noCache: true,
    "heading-depth": 1,

    separators: true, // Put <hr> breaks between identifiers

    // Format identifiers as code (wrap function/property/class/etc. names in backticks).
    "name-format": false,

    // "module-index-format": "dl", // none, grouped, table, dl
    // "global-index-format": "none" // none, grouped, table, dl
    "param-list-format": "table", // 'list' or 'table' (default)
    "property-list-format": "table", // 'list' or 'table' (default)
    "member-index-format": "grouped" // grouped, list
  };

  // Create a separate documentation file for each class
  for (const className of classNames) {

    // Do not create files for EventEmitter and Listener
    if (className === "EventEmitter" || className === "Listener") continue;

    renderingOptions.template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
    const output = jsdoc2md.renderSync(renderingOptions);
    console.info(`Saved markdown file to ${className}.md`);
    fs.writeFileSync(path.resolve(TARGET_PATH, `${className}.md`), output);
    await git.add([path.join(TARGET_PATH, `${className}.md`)]);
  }

  // Commit generated files
  await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
  console.info(`Files in ${TARGET_PATH} committed to git`);
  await git.push();
  console.info(`Files pushed to remote`);

  // Remove temporary directory
  await rimraf(tempPath);

}

// Execute and catch errors if any (in red)
generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
