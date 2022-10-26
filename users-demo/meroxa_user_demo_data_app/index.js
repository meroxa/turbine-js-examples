// Import any of your relevant dependencies
const stringHash = require("string-hash");

// Sample helper
function iAmHelping(str) {
  return `~~~${str}~~~`;
}

exports.App = class App {
  // Create a custom named function on the App to be applied to your records
  anonymize(records) {
    records.forEach((record) => {
      // Use record `get` and `set` to read and write to your data
      record.set(
        "customer_email",
        iAmHelping(stringHash(record.get("customer_email")))
      );
    });

    records.unwrap();

    return records;
  }

  async run(turbine) {

    let source = await turbine.resources("migration_users_app_pg");

    let records = await source.records("public.User");

    // let anonymized = await turbine.process(records, this.anonymize);

    let destination = await turbine.resources("migration_users_app_mongo");

    await destination.write(records, "user_table_from_postgres");
  }
};
