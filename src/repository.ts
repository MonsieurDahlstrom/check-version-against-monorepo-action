import * as core from "@actions/core";
import fs from "fs";
import path from "path";

export function readPackageJson(): {
  name: string;
  version: string;
} {
  const fileBuffer: Buffer = fs.readFileSync(
    path.join(core.getInput("directory"), "package.json")
  );
  const { name, version } = JSON.parse(fileBuffer.toString("utf8"));
  return { name, version };
}
