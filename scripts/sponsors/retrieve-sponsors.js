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

  // data.forEach(d => {
  //   console.log(d.sponsorEntity.login, d.sponsorEntity.sponsorshipForViewerAsSponsorable);
  //   // console.log(d);
  // });

  let output = "";

  data.sort((a, b) => {
    a = a.sponsorEntity.sponsorshipForViewerAsSponsorable.tier.monthlyPriceInDollars;
    b = b.sponsorEntity.sponsorshipForViewerAsSponsorable.tier.monthlyPriceInDollars;

    if (a > b) return -1;
    if (a < b) return -1;
    return 0;

  });

  data.forEach(entity => {

    const sponsor = entity.sponsorEntity;

    if (sponsor.sponsorshipForViewerAsSponsorable.tier.monthlyPriceInDollars < 10) {
      return;
    }

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

});
