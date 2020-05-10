const pkg = require("../../package.json");
const git = require("simple-git")();

// Prepare commit message
let message = "Release v" + pkg.version;

// Commit and push to current branch
git.add(["dist"]).commit(message, ["dist", "package.json"]).push();
