// const { formatPhone, googleMapsLookup, generateAddressObject } = require('./helpers.js');
// import sha256 from 'crypto-js/sha256';


exports.App = class App {
  processData(records) {
    for (const record of records) {
      const dateTimeGmt = new Date().toGMTString()
      console.log(`[DEBUG] Streaming Record To Destination: ${dateTimeGmt}`)

      // Encrypt data using a 3rd party library or package
      // record.set(
      //   'secretcode',
      //   sha256(record.get('secretcode'))
      // );

      // Format Data via a custom function
      // record.set('phone_number', formatPhone(record.get('phone_number')))
      
      // Enrich Data via an API
      // const addressLookupResults = await googleMapsLookup(record.get('address'))
      // const addressMetaData = generateAddressObject(addressLookupResults)
      // record.set('address_metadata', addressMetaData);
    }

    records.unwrap();
    return records;
  }

  async run(turbine) {
    // First, identify your PostgreSQL source name as configured in Step 1
    // In our case we named it pg_db
    let source = await turbine.resources("pg_db");

    // Second, specify the table you want to access in your PostgreSQL DB
    let records = await source.records("User");

		// Third, Process each record that comes in!
    let processed = await turbine.process(records, this.processData);

    // Fourth, identify your MongoDB destination resource configured in Step 1
    let destination = await turbine.resources("mdb");

    // Finally, specify which "collection" in mongo to write to. If none exists, it will be created
    await destination.write(processed, "user_copy");
  }
};
