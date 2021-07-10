import * as core from "@actions/core";
import { RetriveLatestPublishedVersion } from "./graphql";
import { readPackageJson } from "./repository";

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    //default state is false
    core.setOutput("newer", false);
    const repoReference = core.getInput("repository").split("/");
    const commitReference = core.getInput("ref");
    console.log(`${repoReference} ${commitReference}!`);
    const nameAndVersion = readPackageJson();
    await RetriveLatestPublishedVersion({
      repoOwner: repoReference[0],
      repoName: repoReference[1],
      packageName: nameAndVersion.name.split("/").reverse()[0],
    });
    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2);
    //console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
