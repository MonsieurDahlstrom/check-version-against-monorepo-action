"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("@actions/core"));
var github_1 = __importDefault(require("@actions/github"));
try {
    // `who-to-greet` input defined in action metadata file
    var commitReference = core_1.default.getInput("ref");
    console.log("Hello " + commitReference + "!");
    var time = new Date().toTimeString();
    core_1.default.setOutput("newer", false);
    // Get the JSON webhook payload for the event that triggered the workflow
    var payload = JSON.stringify(github_1.default.context.payload, undefined, 2);
    console.log("The event payload: " + payload);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
