import { gql, GraphQLClient } from "graphql-request";
import * as core from "@actions/core";

const endpoint = "https://api.github.com/graphql";

const token = core.getInput("token");

const query = gql`
  query ($name: String!, $owner: String!, $packageName: String!) {
    repository(name: $name, owner: $owner) {
      packages(names: [$packageName], last: 1) {
        nodes {
          name
          latestVersion {
            version
          }
        }
      }
    }
  }
`;

export async function RetriveLatestPublishedVersion({
  repoOwner,
  repoName,
  packageName,
}: {
  repoOwner: string;
  repoName: string;
  packageName: string;
}) {
  console.log("RetriveLatestPublishedVersion", token);
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const variables = {
    name: repoName,
    owner: repoOwner,
    packageName,
  };
  const response = await graphQLClient.request(query, variables);
  console.log(response);
}
