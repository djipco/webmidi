const moment = require("moment");
const ghpages = require("gh-pages");

// Commit and push to current branch
let message = "Updated on: " + moment().format();

// Commit and push to GitHub pages
ghpages.publish("docs", {message: message}, err => {
  if (err) console.error(err);
});
