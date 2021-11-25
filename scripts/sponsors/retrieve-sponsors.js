const { graphql } = require("@octokit/graphql");
const { token } = require("../../.credentials/sponsors.js");

console.log(token);

async function test() {

  const { repository } = await graphql(
    `
    {
      repository(owner: "djipco", name: "webmidi") {
        issues(last: 3) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `,
    {
      headers: {
        authorization: `token ${token}`,
      },
    }
  );

  return repository;

}

test().then(data => console.info(data));
