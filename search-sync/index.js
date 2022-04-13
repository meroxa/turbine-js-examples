// Call relevant dependencies to the data app
const { updateIndex } = require('./algolia.js');

const SendToAlgolia = function Anonymize(records) {
  const requests = records.map(record => {
    return updateIndex(record);
  });
  Promise.all(requests).then((values) => {
    console.log(values);
  });
};

exports.App = class App {
  async run(turbine) {
    
    let source = await turbine.resources('source_name');
    console.log(source);
    let records = await source.records("User");
    console.log(records);
    await turbine.process(records, SendToAlgolia);
  }
};