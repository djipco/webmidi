const { graphql } = require("@octokit/graphql");

const token = "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";

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
