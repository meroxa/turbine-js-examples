const { sendSlackMessage } = require("./alert.js");

exports.App = class App {
  sendAlert(records) {
    records.forEach((record) => {
      let payload = record.value.payload;
      sendSlackMessage(payload);
    });

    return records;
  }

  async run(turbine) {
    let source = await turbine.resources("pg");

    let records = await source.records("customer_order");

    let data = await turbine.process(records, this.sendAlert);

    let destination = await turbine.resources("snowflake");

    await destination.write(data, "customer_order");
  }
};
