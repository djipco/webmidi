// This script commits the 'dist' folder following a build of the library. It adds a commit message
// matching the release version.

// Modules
const git = require("simple-git")();
const pkg = require("../../package.json");

// Prepare commit message. commit and push to current branch
let message = "Release v" + pkg.version;
git.add(["dist"]).commit(message, ["dist", "package.json"]).push();
