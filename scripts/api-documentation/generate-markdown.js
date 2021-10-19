// Imports
const djipHelpers = require("./templates/helpers/djip-helpers.js");
const fs = require("fs-extra");
const git = require("simple-git/promise")();
const Handlebars = require("handlebars");
const jsdoc2md = require("jsdoc-to-markdown");
const moment = require("moment");
const path = require("path");
const process = require("process");

// Paths
const ROOT_PATH = process.cwd();
const SOURCE_DIR = path.resolve(ROOT_PATH, "src");
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
const TEMPLATE_DIR = path.resolve(ROOT_PATH, "scripts/api-documentation/templates/");
const DJIPEVENTS = path.resolve(ROOT_PATH, "node_modules/djipevents/src/djipevents.js");

// Register some Handlebars helpers
Handlebars.registerHelper({
  eventName: djipHelpers.eventName,
  stripNewlines: djipHelpers.stripNewlines,
  inlineLinks: djipHelpers.inlineLinks,
  methodSignature: djipHelpers.methodSignature,
  eq: djipHelpers.eq,
  ne: djipHelpers.ne,
  lt: djipHelpers.lt,
  gt: djipHelpers.gt,
  lte: djipHelpers.lte,
  gte: djipHelpers.gte,
  and: djipHelpers.and,
  or: djipHelpers.or,
  curly: djipHelpers.curly,
});

async function generate() {

  // Get source files list
  let files = await fs.readdir(SOURCE_DIR);
  files = files.map(file => path.resolve(SOURCE_DIR, file));
  files.push(DJIPEVENTS);

  // Compute JSON from JSDoc
  const data = jsdoc2md.getTemplateDataSync({files: files});

  // Build list of classes (explicitly adding Listener and EventEmitter)
  let classes = files.map(file => path.basename(file, ".js")).filter(file => file !== "djipevents");
  classes.push("Listener", "EventEmitter");

  // Parse each class file and save parsed output
  classes.forEach(filepath => {

    const basename = path.basename(filepath, ".js");
    const filtered = data.filter(x => x.memberof === basename || x.id === basename);

    // Save markdown files
    fs.writeFileSync(
      path.resolve(TARGET_PATH, `${basename}.md`),
      parseFile(filtered)
    );
    console.info(`Saved markdown file to ${basename}.md`);

  });

  // Commit generated files
  await git.add([TARGET_PATH]);
  await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
  console.info(`Files in ${TARGET_PATH} committed to git`);
  await git.push();
  console.info(`Files pushed to remote`);

}

function parseFile(data) {

  let output = "";
  let hbs;
  let filtered;

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
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/class.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Constructor
  filtered = data.filter(el => el.kind === "constructor")[0];
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/constructor.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Members
  filtered = data.filter(el => el.kind === "member" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/properties.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Methods
  filtered = data.filter(el => el.kind === "function" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/methods.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Events
  filtered = data.filter(el => el.kind === "event" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/events.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Enums
  filtered = data.filter(el => el.kind === "enum" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/enumerations.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Strip out links to Listener class
  // output = output.replaceAll("[**Listener**](Listener)", "`Listener`");
  // output = output.replaceAll("[Listener](Listener)", "`Listener`");
  // output = output.replaceAll("[**arguments**](Listener#arguments)", "`arguments`");

  return output;

}

generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
