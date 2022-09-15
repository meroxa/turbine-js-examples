const stringHash = require("string-hash");

function iAmHelping(str) {
  return `~~~${str}~~~`;
}

function isAttributePresent(attr) {
  return typeof attr !== "undefined" && attr !== null;
}

exports.App = class App {
  anonymize(records) {
    records.forEach((record) => {
      let payload = record.value.payload;
      if (
        isAttributePresent(payload.after) &&
        isAttributePresent(payload.after.customer_email)
      ) {
        payload.after.customer_email = iAmHelping(
          stringHash(payload.after.customer_email).toString()
        );
      }
    });

    return records;
  }

  async run(turbine) {
    let source = await turbine.resources("pg");

    let records = await source.records("customer_order");

    let anonymized = await turbine.process(records, this.anonymize);

    let destination = await turbine.resources("s3");

    await destination.write(anonymized, "customer_order");
  }
};
