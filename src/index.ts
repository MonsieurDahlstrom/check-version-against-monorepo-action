import core from "@actions/core";
import github from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const commitReference = core.getInput("ref");
  console.log(`Hello ${commitReference}!`);
  const time = new Date().toTimeString();
  core.setOutput("newer", false);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
