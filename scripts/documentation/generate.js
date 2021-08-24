const fs = require("fs");
const git = require("simple-git/promise")();
const pkg = require("../../package.json");
const moment = require("moment");
const mv = require("mv");
const rimraf = require("@alexbinary/rimraf");
const system = require("system-commands");

// Path to jsdoc configuration file (will be temporarily written to disk)
const CONF_PATH = "./scripts/documentation/.jsdoc.json";

// Name of the branch where the documentation will be committed
const TARGET_BRANCH = "gh-pages";

// Path to menu image (it is automatically copied into the documentation)
const IMAGE_PATH = "./scripts/documentation/webmidijs3-logo-40x40.png";

// Path to custom stylesheet linked in all pages
const CUSTOM_STYLESHEET = "./css/custom.css";

// Google Analytics configuration
const GA_CONFIG = {
  ua: "UA-162785934-1",
  domain: "https://djipco.github.io/webmidi"
};

// Major version
const VERSION = pkg.version.split(".")[0];

// Target folder to save the doc in
const TMP_SAVE_PATH = `./.api/v${VERSION}`;
const FINAL_SAVE_PATH = `./api/v${VERSION}`;

// JSDoc configuration object to write as configuration file
const config = {

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

    systemName: `${pkg.webmidi.name}`,
    systemSummary: pkg.webmidi.tagline,
    systemLogo: IMAGE_PATH,
    systemColor: "#ffcf09",

    copyright: `©<a href="${pkg.author.url}">${pkg.author.name}</a>, ` +
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
      CUSTOM_STYLESHEET
    ],

    dateFormat: "MMMM Do YYYY @ H:mm:ss",
    sort: "longname, linenum, version, since",

    collapseSymbols: true

  }

};

// Prepare jsdoc command
const cmd = "./node_modules/.bin/jsdoc " +
  `--configure ${CONF_PATH} ` +
  `--destination ${TMP_SAVE_PATH}`;

async function execute() {

  // Write temporary configuration file
  fs.writeFileSync(CONF_PATH, JSON.stringify(config));

  // Generate documentation
  await system(cmd);

  // Print success to console
  console.info(
    "\x1b[32m",
    `Documentation temporarily generated in folder "${TMP_SAVE_PATH}/`,
    "\x1b[0m"
  );

  // Remove temporary configuration file
  await rimraf(CONF_PATH);

  // Get current branch
  let results = await git.branch();
  const ORIGINAL_BRANCH = results.current;

  // Switch to gh-pages
  console.info("\x1b[32m", `Switching from '${ORIGINAL_BRANCH}' to '${TARGET_BRANCH}'`, "\x1b[0m");
  await git.checkout(TARGET_BRANCH);

  mv(TMP_SAVE_PATH, FINAL_SAVE_PATH, {mkdirp: true}, async function(err) {

    if (err) {
      console.error(err);
      return;
    }

    await git.add([FINAL_SAVE_PATH]);
    let message = "Updated on: " + moment().format();
    await git.commit(message, [FINAL_SAVE_PATH]);
    console.info("\x1b[32m", `Changes committed to ${TARGET_BRANCH} branch`, "\x1b[0m");

    // Push changes
    await git.push();
    console.info("\x1b[32m", `Changes pushed to remote`, "\x1b[0m");

    // Come back to original branch
    console.info("\x1b[32m", `Switching back to '${ORIGINAL_BRANCH}' branch`, "\x1b[0m");
    await git.checkout(ORIGINAL_BRANCH);

  });

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));
