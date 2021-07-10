import * as core from "@actions/core";
import fs from "fs";
import path from "path";

try {
  // `who-to-greet` input defined in action metadata file
  //default state is false
  core.setOutput("newer", false);
  const repoReference = core.getInput("repository");
  const folderReference = core.getInput("directory");
  const commitReference = core.getInput("ref");
  console.log(`${repoReference} ${folderReference} ${commitReference}!`);
  const files = fs.readFileSync("/");
  console.log(files);
  const fileBuffer: Buffer = fs.readFileSync(
    path.join(folderReference, "package.json")
  );
  const packageDescription = JSON.parse(fileBuffer.toString("utf8"));
  console.log(packageDescription);

  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  console.log(core.setFailed);
  console.log(error);
  core.setFailed(error.message);
}
