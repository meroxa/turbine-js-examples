exports.App = class App {
  // Create a custom named function on the App to be applied to your records
  logRecord(records) {
    records.forEach((record) => {
      const dateTimeGmt = new Date().toGMTString()
      
      console.log(`${dateTimeGmt} [DEBUG] Streaming Record To Destination ${JSON.stringify(record)}`)
    });

    records.unwrap();

    return records;
  }

  async run(turbine) {

    let source = await turbine.resources("pg_db");

    let records = await source.records("User");

    let logger = await turbine.process(records, this.logRecord);

    let destination = await turbine.resources("mongo_db");

    await destination.write(logger, "user_table_from_pg");
  }
};
