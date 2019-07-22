// Require http for making API calls
const http = require('http');
// Require API key
const API_KEY = process.env.API_KEY;

/**
 * Return a promise that resolves to the IP data
 * or rejects with an error.
 */
function queryIPStack(ipAddress) {
  // Url to get
  let apiurl = `http://api.ipstack.com/${ipAddress}?access_key=${API_KEY}`;
  let data = '';

  return new Promise((resolve, reject) => {
    // Request
    const request = http.get(apiurl, response => {
      // Reject promise if response is bad
      if (response.statusCode < 200 || response.statusCode >= 300) {
        const error = new Error(`statusCode = ${response.statusCode}`);
        error.status = 500;
        console.log(error); // Log error to console
        reject(error);
      }

      // Store returned data in data variable
      response.on('data', chunk => {
        data += chunk;
      });

      // Resolve promise if request is successful
      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    // Reject promise if request errors
    request.on('error', error => {
      console.log(error); // log error
      reject(error);
    });

    request.end();
  });
}

module.exports = queryIPStack;
