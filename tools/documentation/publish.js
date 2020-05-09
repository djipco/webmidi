const moment = require("moment");
const ghpages = require("gh-pages");
const git = require("simple-git")();

// Prepare commit message
let message = "Updated on: " + moment().format();

// Commit and push to current branch
git.commit(message, ["docs"]).push();

// Commit and push to GitHub pages
ghpages.publish("docs", {message: message}, err => {
  if (err) console.error(err);
});
