var ghpages = require("gh-pages");

ghpages.publish("docs", err => {
  if (err) console.error(err);
});
