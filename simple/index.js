const stringHash = require("string-hash");

function iAmHelping(str) {
  return `~~~${str}~~~`;
}

exports.Anonymize = function Anonymize(records) {
  records.forEach((record) => {
    record.value.payload.customer_email = iAmHelping(
      stringHash(record.value.payload.customer_email).toString()
    );
  });

  return records;
};

exports.App = class App {
  async run(turbine) {
    let source = await turbine.resources("pg");

    let records = await source.records("customer_order");

    let anonymized = await turbine.process(records, exports.Anonymize);

    let destination = await turbine.resources("s3");

    await destination.write(anonymized, "customer_order");
  }
};
