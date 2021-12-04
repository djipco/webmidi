const { graphql } = require("@octokit/graphql");
const { token } = require("../../.credentials/sponsors.js");
const replace = require("replace-in-file");
const path = require("path");

const TARGET = path.join(process.cwd(), "website", "src", "pages", "sponsors", "index.md");

async function getSponsors() {

  const query = `{

    user (login: "djipco") {
      sponsorshipsAsMaintainer(first: 100, includePrivate: true) {
        totalCount
        nodes {
          sponsorEntity {
          ... on User {
            login
            name
            avatarUrl
            url
            sponsorshipForViewerAsSponsorable {
                isOneTimePayment
                privacyLevel
                tier {
                  id
                  name
                  monthlyPriceInDollars
                }
              }
            }
          }
        }
      }
    }

  }`;

  const {user} = await graphql(
    query,
    { headers: { authorization: `token ${token}` } }
  );

  return user.sponsorshipsAsMaintainer.nodes;

}

getSponsors().then(async data => {

  let output = "";

  data.forEach(entity => {

    const sponsor = entity.sponsorEntity;

    if (sponsor.sponsorshipForViewerAsSponsorable.privacyLevel === "PUBLIC") {
      const name = sponsor.name || sponsor.login;
      output += `<a href="${sponsor.url}" title="${name}">\n`;
      output += `\t<img class="user-icon" src="${sponsor.avatarUrl}" `;
      output += `alt="${name}" width="100" height="100" />\n`;
      output += `</a>\n\n`;
    } else {
      output += `<img class="user-icon" src="/img/sponsors/user.png" `;
      output += `alt="Anonymous" width="100" height="100" />\n\n`;
    }

  });

  const options = {
    files: TARGET,
    from: /<!-- SPONSOR START -->.*<!-- SPONSOR END -->/sgm,
    to: "<!-- SPONSOR START -->\n\n" + output + "<!-- SPONSOR END -->",
  };

  const results = await replace(options);
  // console.log("Replacement results:", results[0]);

});
