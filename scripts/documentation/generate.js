// Modules
const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const pkg = require("../../package.json");
const moment = require("moment");
const path = require("path");
const os = require("os");
const rimraf = require("@alexbinary/rimraf");
const system = require("system-commands");

// Some paths
const CUSTOM_CSS = "../css/custom.css";
const LOGO_PATH = "./scripts/documentation/webmidijs3-logo-40x40.png";
const TARGET_BRANCH = "gh-pages";
const TARGET_PATH = "./api/v" + pkg.version.split(".")[0];

// Google Analytics configuration
const GA_CONFIG = {
  ua: "UA-162785934-1",
  domain: "https://djipco.github.io/webmidi"
};

// JSDoc configuration object to write as configuration file
const configOLD = {

  tags: {
    allowUnknownTags: true
  },

  // The opts property is for command-line arguments passed directly in the config file
  opts: {
    template: "./node_modules/foodoc/template",
    readme: "./scripts/documentation/HOME.md"
  },

  // Source files
  source: {
    include: [
      "./src/WebMidi.js",
      "./src/Output.js",
      "./src/Input.js",
      "./src/OutputChannel.js",
      "./src/InputChannel.js",
      "./src/Note.js"
    ]
  },

  sourceType: "module",

  plugins: [
    "plugins/markdown"
  ],

  // Configurations for the Foodoc template
  templates: {

    systemName: `${pkg.webmidi.name} API`,
    systemSummary: pkg.webmidi.tagline,
    systemLogo: LOGO_PATH,
    systemColor: "#ffcf09",

    copyright: `© <a href="${pkg.author.url}">${pkg.author.name}</a>, ` +
      `2015-${new Date().getFullYear()}. ` +
      `${pkg.webmidi.name} v${pkg.version} is released under the ${pkg.license} license.`,

    navMembers: [
      {kind: "class", title: "Classes", summary: "All documented classes."},
      {kind: "external", title: "Externals", summary: "All documented external members."},
      // {kind: "global", title: "Globals", summary: "All documented globals."},
      {kind: "mixin", title: "Mixins", summary: "All documented mixins."},
      {kind: "interface", title: "Interfaces", summary: "All documented interfaces."},
      {kind: "module", title: "Modules", summary: "All documented modules."},
      {kind: "namespace", title: "Namespaces", summary: "All documented namespaces."},
      {kind: "tutorial", title: "Tutorials", summary: "All available tutorials."}
    ],

    analytics: GA_CONFIG,

    stylesheets: [
      CUSTOM_CSS
    ],

    dateFormat: "MMMM Do YYYY @ H:mm:ss",
    sort: "longname, linenum, version, since",

    collapseSymbols: true

  }

};

const config = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ["jsdoc"]
  },
  source: {
    include: ["lib", "package.json", "README.md"],
    includePattern: ".js$",
    excludePattern: "(node_modules/|docs)"
  },
  plugins: [
    "plugins/markdown"
  ],
  templates: {
    referenceTitle: "My SDK Name",
    disableSort: false,
    collapse: true,
    resources: {
      google: "https://www.google.com/"
    }
  },
  opts: {
    destination: "./docs/",
    encoding: "utf8",
    private: true,
    recurse: true,
    template: "./node_modules/jsdoc-template"
  }
};

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}

async function execute() {

  // Temporary target folder
  const TMP_SAVE_PATH = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-doc-"));
  const CONF_PATH = TMP_SAVE_PATH + "/.jsdoc.json";

  // Write temporary configuration file
  fs.writeFileSync(CONF_PATH, JSON.stringify(config));

  // Prepare jsdoc command and generate documentation
  const cmd = "./node_modules/.bin/jsdoc " +
    `--configure ${CONF_PATH} ` +
    `--destination ${TMP_SAVE_PATH}`;
  await system(cmd);
  log(`Documentation temporarily generated in "${TMP_SAVE_PATH}"`);

  // Remove temporary configuration file
  await rimraf(CONF_PATH);

  // Get current branch (so we can come back to it later)
  let results = await git.branch();
  const ORIGINAL_BRANCH = results.current;

  // Switch to target branch
  log(`Switching from '${ORIGINAL_BRANCH}' branch to '${TARGET_BRANCH}' branch`);
  await git.checkout(TARGET_BRANCH);

  // Move dir to final destination and commit
  await fs.move(TMP_SAVE_PATH, TARGET_PATH, {overwrite: true});
  await git.add([TARGET_PATH]);
  await git.commit("Updated on: " + moment().format(), [TARGET_PATH]);
  await git.push();
  log(`Changes committed to '${TARGET_BRANCH}' branch and pushed to remote`);

  // Come back to original branch
  log(`Switching back to '${ORIGINAL_BRANCH}' branch`);
  await git.checkout(ORIGINAL_BRANCH);

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
