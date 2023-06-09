"use strict";

module.exports = {
  diff: true,
  extension: ["js, ts"],
  package: "./package.json",
  reporter: "mocha-junit-reporter",
  reporterOptions: {
    mochaFile: '../TEST-RESULTS.xml'
  },
  require: "ts-node/register",
  slow: 75,
  timeout: 2000,
  ui: "bdd",
};