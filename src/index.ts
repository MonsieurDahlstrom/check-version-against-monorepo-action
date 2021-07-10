import * as core from "@actions/core";
import { readPackageJson } from "./repository";

try {
  // `who-to-greet` input defined in action metadata file
  //default state is false
  core.setOutput("newer", false);
  const repoReference = core.getInput("repository");
  const commitReference = core.getInput("ref");
  console.log(`${repoReference} ${commitReference}!`);
  const nameAndVersion = readPackageJson();
  console.log(nameAndVersion);

  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
