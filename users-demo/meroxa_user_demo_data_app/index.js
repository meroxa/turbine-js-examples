exports.App = class App {
  // Create a custom named function on the App to be applied to your records
  logRecord(records) {
    records.forEach((record) => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const timeStamp = `${yyyy}-${mm}-${dd} @ ${today.getHours()}:${today.getMinutes()}}`
      
      console.log(`${timeStamp} [DEBUG] Streaming Record To Destination ${JSON.stringify(record)}`)
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
