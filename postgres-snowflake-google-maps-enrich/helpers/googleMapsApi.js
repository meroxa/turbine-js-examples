require('dotenv').config();
const request = require('request');
const util = require('util')
const requestAsync = util.promisify(request)

async function googleMapsLookup(address) {
  const apiKey = process.env.API_KEY;

  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
    header: {
      'Content-Type': 'application/json',
    },
  };

  try {
      const response = await requestAsync(options);
      const parsedBody = JSON.parse(response.body)
      console.log(`[googleMapsLookup] parsedBody:`, parsedBody)
      if (parsedBody && parsedBody.results && parsedBody.results.length > 0) {
          return parsedBody.results[0]
      }
  } catch (err) {
      console.log(`[googleMapsLookup] err:`, err)
      return null
  }
}

function generateAddressObject(json) {
  let metadata = {
    city: "",
    region: "",
    state: "",
    country: "",
    postal_code: "",
    formatted_address: "",
    lat: "",
    lng: "",
    place_id: "",
    types: ""
  };
  
  if (json && json.address_components) {
    metadata.city = json.address_components[0] && json.address_components[0].long_name || "";
    metadata.region = json.address_components[1] && json.address_components[1].long_name || "";
    metadata.state = json.address_components[2] && json.address_components[2].long_name || "";
    metadata.country = json.address_components[3] && json.address_components[3].long_name || "";
    metadata.postal_code = json.address_components[4] && json.address_components[4].long_name || "";
  }
  
  if (json && json.formatted_address) {
    metadata.formatted_address = json.formatted_address;
  }
  
  if (json && json.geometry && json.geometry.location) {
    metadata.lat = json.geometry.location.lat || "";
    metadata.lng = json.geometry.location.lng || "";
  }
  
  if (json && json.place_id) {
    metadata.place_id = json.place_id;
  }
  
  if (json && json.types) {
    metadata.types = json.types;
  }
  
  return metadata;
}


module.exports = {
  googleMapsLookup,
  generateAddressObject
};
