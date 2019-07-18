// Require http for making API calls
const http = require('http');
// Require API key
const API_KEY = require('./API');
// Obtained from https://www.regextester.com/95309
const IPv4Regex = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/;
// Obtained from https://www.regextester.com/104037
const IPv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
// Create Options object


/**
 * Return true if ipAddress is a valid IPv4 address
 * Return false otherwise
 */
function validateIPv4Address (ipAddress) {
    return IPv4Regex.test(ipAddress);
}

function validateIPv6Address (ipAddress) {
    return IPv6Regex.test(ipAddress);
}

/**
 * Return a promise that resolves to the IP data
 * or rejects with an error.
 */
function queryIPStack(ipAddress) {
    // Url to get
    let apiurl = `http://api.ipstack.com/${ipAddress}?access_key=${API_KEY}`;
    let data = '';

    return new Promise(
        (resolve, reject) => {
            // Request
            const request = http.get(apiurl, (response) => {
                // Reject promise if response is bad
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    reject(new Error(`statusCode = ${response.statusCode}`));
                }

                // Store returned data in data variable
                response.on('data', (chunk) => {
                    data += chunk;
                })
                
                // Resolve promise if request is successful
                response.on('end', () => {
                    resolve(data);
                })
            });
            
            // Reject promise if request errors
            request.on('error', (error) => {
                reject(error);
            });
        
            request.end();
        }
    );
}

/**
 * Get IP address and Validate it, Return false if invalid.
 * Return Sample return value
 */
async function findIP(ipAddress) {
    // Validate IP address
    if (!validateIPv4Address(ipAddress) && !validateIPv6Address(ipAddress)) {
        return false;
    }

    console.log(`Your ipAddress was ${ipAddress}`);

    // Get data from ipstack
    try {
        let data = await queryIPStack(ipAddress);
        return data;
    } catch (error) {
        console.log("An error occured", error)
        return false
    }
}

module.exports = findIP;