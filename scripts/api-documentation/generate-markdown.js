// Imports
const fs = require("fs-extra");
// const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const path = require("path");
const process = require("process");
const jsdoc2md = require("jsdoc-to-markdown");
// const os = require("os");
// const replace = require("replace-in-file");
// const rimraf = require("@alexbinary/rimraf");
const moment = require("moment");
const Handlebars = require("handlebars");


// Paths
const ROOT_PATH = process.cwd();
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
// const TEMPLATE_DIR = path.join(__dirname, "markdown-template");
const TEMPLATE_DIR = path.resolve(ROOT_PATH, "scripts/api-documentation/templates/");

// Source files to document
const FILES = [
  path.resolve(ROOT_PATH, "node_modules/djipevents/src/djipevents.js"),
  path.resolve(ROOT_PATH, "src/Enumerations.js"),
  path.resolve(ROOT_PATH, "src/Input.js"),
  path.resolve(ROOT_PATH, "src/InputChannel.js"),
  path.resolve(ROOT_PATH, "src/Message.js"),
  path.resolve(ROOT_PATH, "src/Note.js"),
  path.resolve(ROOT_PATH, "src/Output.js"),
  path.resolve(ROOT_PATH, "src/OutputChannel.js"),
  path.resolve(ROOT_PATH, "src/Utilities.js"),
  path.resolve(ROOT_PATH, "src/WebMidi.js")
];

async function generate() {

  // Register some helpers
  Handlebars.registerHelper("getEventName", string => string.split(":")[1]);

  FILES.forEach(filepath => {
    const output = parseFile(filepath);
    const basename = path.basename(filepath, ".js");
    if (basename !== "djipevents") {
      fs.writeFileSync(path.resolve(TARGET_PATH, `${basename}.md`), output);
      console.info(`Saved markdown file to ${basename}.md`);
    }
  });

  // Commit generated files
  await git.add([TARGET_PATH]);
  await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
  console.info(`Files in ${TARGET_PATH} committed to git`);
  await git.push();
  console.info(`Files pushed to remote`);

}

function parseFile(filepath) {

  let output = "";
  let hbs;
  let filtered;

  const data = jsdoc2md.getTemplateDataSync({files: filepath});

  // Sort elements according to kind and then according to name
  const order = {class: 0, constructor: 1, function: 2, member: 3, event: 4, enum: 5, typedef: 6};
  data.sort((a, b) => {
    if (order[a.kind] === order[b.kind]) {
      return a.id.localeCompare(b.id);
    } else {
      return order[a.kind] < order[b.kind] ? -1 : 1;
    }
  });

  // Class
  filtered = data.filter(el => el.kind === "class")[0];
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `class.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Constructor
  filtered = data.filter(el => el.kind === "constructor")[0];
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `constructor.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Properties
  filtered = data.filter(el => el.kind === "member" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `properties.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Methods
  filtered = data.filter(el => el.kind === "function" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `methods.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Events
  filtered = data.filter(el => el.kind === "event" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `events.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Enums
  filtered = data.filter(el => el.kind === "enum" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `enumerations.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  return output;

}

generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));


// async function generate() {
//
//   // Create temporary directory to store the temporary input file
//   const tempPath = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-markdown-"));
//   const tempFilePath = path.join(tempPath, "All.js");
//
//   // Combine all source files into a single document (this is needed because jsdoc2md does not
//   // resolve parents across files)
//   FILES.forEach(filepath => {
//     fs.outputFileSync(tempFilePath, fs.readFileSync(filepath), {flag: "a"});
//   });
//
//   // Strip all import statements from the combined file and convert 'export class' to simply 'class'
//   const options = {
//     files: tempFilePath,
//     from: [/^import .*\n/gm, /^export class /gm], // strip out import and export
//     to: ["", "class "]
//   };
//   await replace(options);
//
//   // Get jsdoc JSON data by parsing the file containing all merged classes
//   const data = jsdoc2md.getTemplateDataSync({files: tempFilePath});
//
//   // Sort elements according to kind and then according to name
//   // typdef!!!
//   const order = {class: 0, constructor: 1, function: 2, enum: 3, member: 4, event: 5};
//   data.sort((a, b) => {
//
//     if (order[a.kind] === order[b.kind]) {
//       return a.id.localeCompare(b.id);
//     } else {
//       return order[a.kind] < order[b.kind] ? -1 : 1;
//     }
//
//   });
//
//   // Build an array of class names (to output one file per class)
//   const classNames = data.reduce((classNames, identifier) => {
//     if (identifier.kind === "class") classNames.push(identifier.name);
//     return classNames;
//   }, []);
//
//   // Define rendering options
//   const renderingOptions = {
//
//     data: data,
//
//     // template: path.resolve(TEMPLATE_DIR, "main.hbs"),
//
//     // partial: [
//     //   path.join(TEMPLATE_DIR, "all-docs", "docs", "header.hbs"),
//     //   path.join(TEMPLATE_DIR, "all-docs", "docs", "body", "body.hbs"),
//     //   path.join(TEMPLATE_DIR, "all-docs", "docs", "member-index", "member-index-grouped.hbs"),
//     // ],
//
//     noCache: true,
//     "heading-depth": 1,
//
//     separators: true, // Put <hr> breaks between identifiers
//
//     // Format identifiers as code (wrap function/property/class/etc. names in backticks).
//     "name-format": false,
//
//   };
//
//   // Create a separate documentation file for each class
//   for (const className of classNames) {
//
//     // Do not create files for EventEmitter and Listener
//     if (className === "EventEmitter" || className === "Listener") continue;
//
//     renderingOptions.template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
//     const output = jsdoc2md.renderSync(renderingOptions);
//     console.info(`Saved markdown file to ${className}.md`);
//     fs.writeFileSync(path.resolve(TARGET_PATH, `${className}.md`), output);
//     await git.add([path.join(TARGET_PATH, `${className}.md`)]);
//
//   }
//
//   // Commit generated files
//   await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
//   console.info(`Files in ${TARGET_PATH} committed to git`);
//   await git.push();
//   console.info(`Files pushed to remote`);
//
//   // Remove temporary directory
//   await rimraf(tempPath);
//
// }
// generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
