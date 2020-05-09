const fs = require("fs");
const pkg = require("../../package.json");
const rimraf = require("rimraf");
const system = require("system-commands");

// Path to jsdoc configuration file (will be temporarily written to disk)
const CONF_PATH = "./tools/documentation/.jsdoc.json";

// Path to menu image (we put it with other images in the docs directory)
const IMAGE_PATH = "./docs/images/webmidijs3-logo-40x40.png";

// Path to custom stylesheet linked in all pages
const CUSTOM_STYLESHEET = "https://djipco.github.io/webmidi/css/custom.css";

// Google Analytics configuration
const GA_CONFIG = {
  ua: "UA-162785934-1",
  domain: "https://djipco.github.io/webmidi"
};

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
    sort: "longname, linenum, version, since"

  }

};

// Write configuration to temporary file
fs.writeFileSync(CONF_PATH, JSON.stringify(config));

// Prepare command
const cmd = "./node_modules/.bin/jsdoc " +
  `--configure ${CONF_PATH} ` +
  `--destination ./docs/v${pkg.version}`;

// Execute command
system(cmd)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Documentation generated in folder "./docs/v${pkg.version}/"`);
  })
  .then(() => {
    rimraf(CONF_PATH, err => {
      if (err) console.error(err);
    });
  })
  .catch(error => console.error(error));
