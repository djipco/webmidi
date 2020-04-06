const pkg = require("../package.json");
const {exec} = require("child_process");
const fs = require("fs");
const rimraf = require("rimraf");

// The path to the JSDoc configuration file that will be temporarily created
const CONF_PATH = "./.jsdoc.json";

// JSDoc configuration object to write as configuration file
const config = {

  tags: {
    allowUnknownTags: true
  },

  // The opts property is for command-line arguments passed directly in the config file
  opts: {
    template: "./node_modules/foodoc/template",
    readme: "./docs/HOME.md"
  },

  // Source files
  source: {
    include: ["./src/"]
  },

  sourceType: "module", // THIS WILL NEED TO BE CHANGED/KEPT DEPEDNING ON NEW CODE!!!

  plugins: [
    // "./node_modules/jsdoc-export-default-interop/dist/index.js",
    "plugins/markdown"
  ],

  // Those are configurations for the Foodoc template
  templates: {

    cleverLinks: false,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true
    },

    dateFormat: "MMMM Do YYYY, H:mm:ss",
    systemName: `${pkg.webmidi.name}`,
    systemSummary: pkg.webmidi.tagline,
    systemLogo: "./docs/images/webmidijs3-logo-40x40.png",
    copyright: `©${pkg.author.name}, 2015-${new Date().getFullYear()}. ` +
      `${pkg.webmidi.name} v${pkg.version} is released under the ${pkg.license} license.`,
    collapseSymbols: true,
    sort: "longname, linenum, version, since"

  }

};

fs.writeFileSync(CONF_PATH, JSON.stringify(config));

const cmd = "./node_modules/.bin/jsdoc " +
  "--configure " + CONF_PATH + " " +
  `--destination ./docs/v${pkg.version} `;

exec(cmd, (err, stdout, stderr) => {

  if (err) return;

  console.log(stdout);
  console.error(stderr);

  // Delete temporary configuration file
  rimraf(CONF_PATH, () => {});

});
