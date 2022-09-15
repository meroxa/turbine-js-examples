// Call relevant dependencies to the data app
const { updateIndex } = require("./algolia.js");

exports.App = class App {
  sendToAlgolia(records) {
    records.forEach((record) => {
      updateIndex(record);
    });
    return records;
  }

  async run(turbine) {
    let source = await turbine.resources("postgresql");

    let records = await source.records("User");

    await turbine.process(records, this.sendToAlgolia, {
      ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
      ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
      ALGOLIA_INDEX: process.env.ALGOLIA_INDEX,
    });
  }
};
