const stringHash = require("string-hash");

function iAmHelping(str) {
  return `~~~${str}~~~`;
}

exports.Anonymize = function Anonymize(records) {
  records.forEach((record) => {
    record.value.payload.after.email = iAmHelping(
      stringHash(record.value.payload.after.email).toString()
    );
  });

  return records;
};

exports.App = class App {
  async run(turbine) {
    let sourceDB = await turbine.resources("demopg");

    // Create source connector
    let records = await sourceDB.records("user_activity");

    // Deploy function with source as input
    let anonymized = await turbine.process(records, exports.Anonymize);

    // Get destination resource
    let destinationDB = await turbine.resources("s3");

    // Create destination connector with function output as input
    await destinationDB.write(anonymized, "data-app-archive");
  }
};
