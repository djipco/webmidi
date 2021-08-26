// Modules
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");
const replace = require("replace-in-file");
const system = require("system-commands");

const OUT_DIR = "dist";

let targets = [];

let type = "all";
const argv = require("minimist")(process.argv.slice(2));
if (["CommonJS", "ES2020"].includes(argv.t)) type = argv.t;

if (type === "all" || type === "CommonJS")
  targets.push({source: "webmidi.cjs.js", type: "CommonJS"});

if (type === "all" || type === "ES2020")
  targets.push({source: "webmidi.esm.js", type: "ES2020"});

async function execute() {

  targets.forEach(async target => {

    // Generate declaration file
    const cmd = "npx -p typescript tsc " + path.join(OUT_DIR, target.source) +
      " --declaration --allowJs --emitDeclarationOnly" +
      " --module " + target.type +
      " --lib ES2020,DOM --outDir " + OUT_DIR;
    await system(cmd);

    // Remove readonly flag
    const file = path.join(OUT_DIR, target.source.replace(".js", ".d.ts"));
    const options = {
      files: [file],
      from: /readonly /g,
      to: ""
    };
    await replace(options);
    log("Saved " + target.type + " TypeScript declaration file to '" + file+ "'");

    // Commit
    await git.add([file]);
    await git.commit("Generated from TypeScript compiler on " + moment().format());
    await git.push();

  });

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
