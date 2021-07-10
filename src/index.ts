import * as core from "@actions/core";
import { RetriveLatestPublishedVersion } from "./graphql";
import { readPackageJson } from "./repository";
import semver from "semver";

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    //default state is false
    core.setOutput("newer", false);
    const repoReference = core.getInput("repository").split("/");
    const nameAndVersion = readPackageJson();
    const latestVersion = await RetriveLatestPublishedVersion({
      repoOwner: repoReference[0],
      repoName: repoReference[1],
      packageName: nameAndVersion.name.split("/").reverse()[0],
    });
    if (nameAndVersion.version && latestVersion)
      core.setOutput("newer", semver.gt(nameAndVersion.version, latestVersion));
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
