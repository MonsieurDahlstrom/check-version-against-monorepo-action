import core from "@actions/core";
import github from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const repoReference = core.getInput("repository");
  const folderReference = core.getInput("directory");
  const commitReference = core.getInput("ref");
  console.log(`${repoReference} ${folderReference} ${commitReference}!`);
  core.setOutput("newer", false);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
