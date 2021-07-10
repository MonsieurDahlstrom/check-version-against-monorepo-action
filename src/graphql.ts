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
}): Promise<string | void> {
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
  const discoveredNodes = response.repository.packages.nodes;
  if (discoveredNodes.length != 1) {
    core.setFailed(
      `Expected one matched package but received ${discoveredNodes.length}`
    );
    return;
  }
  const latestVersion = discoveredNodes[0].latestVersion;
  return latestVersion.version;
}
