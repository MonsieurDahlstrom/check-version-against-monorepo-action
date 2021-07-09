import { setFailed, getInput, setOutput } from "@actions/core";
import github from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const repoReference = getInput("repository");
  const folderReference = getInput("directory");
  const commitReference = getInput("ref");
  console.log(`${repoReference} ${folderReference} ${commitReference}!`);
  setOutput("newer", false);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  console.log(setFailed);
  console.log(error);
  setFailed(error.message);
}
