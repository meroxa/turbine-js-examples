const {
  googleMapsLookup,
  generateAddressObject,
} = require("./helpers/googleMapsApi");

exports.App = class App {
  async transform(records) {
    for (const record of records) {
      const customer_address = record.get("customer_address");
      console.log("[DEBUG] customer_address ===> ", customer_address);

      if (!customer_address || customer_address.length === 0) {
        console.log("[ERR] customer_address ===> ", customer_address);
        return;
      }

      const googleMapsLookupResponse = await googleMapsLookup(customer_address);
      console.log(
        "[DEBUG] googleMapsLookupResponse ===> ",
        JSON.stringify(googleMapsLookupResponse)
      );

      if (!googleMapsLookupResponse) {
        console.log(
          "[ERR] googleMapsLookupResponse ===> ",
          JSON.stringify(googleMapsLookupResponse)
        );
        return;
      }

      const address_metadata = generateAddressObject(googleMapsLookupResponse);
      console.log("[DEBUG] address_metadata ===> ", address_metadata);

      record.set("address_metadata", address_metadata);

      for (var key in address_metadata) {
        record.set(key, address_metadata[key]);
      }
    }

    records.unwrap();

    return records;
  }

  async run(turbine) {
    // First, identify your PostgreSQL resource name
    // In our case we named it pg_db
    let source = await turbine.resources("pg_db");

    // Second, specify the table you want to read in your PostgreSQL DB
    let records = await source.records("customers");

    // Optional, Process each record that comes in!
    let transformed = await turbine.process(records, this.transform);

    // Third, identify your Snwoflake resource name
    let destination = await turbine.resources("snowflake");

    // Finally, specify which table to write that data to
    await destination.write(transformed, "customers_address_enriched");
  }
};
