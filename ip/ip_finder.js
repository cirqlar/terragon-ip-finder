// Require IP validation module
const validator = require('./ip_validator').validateIPAddress;
// Require cache manager
const cache = require('../cache/IPcache');
// Require ipstack module
const queryIPStack = require('./ipstack');


/**
 * Recieves the data object and sets the properties accordingly
 */
function transformData(data) {
    return {
        ip: data.ip,
        continent: data.continent_name,
        country: data.country_name,
        state: data.region_name,
        latitude: data.latitude,
        longitude: data.longitude,
    };
}

/**
 * Get IP address and Validate it, Return false if invalid.
 * Return Sample return value
 */
async function findIP(ipAddress) {
    // Validate IP address
    if (!validator(ipAddress)) {
        const error = new Error(`The IP Address ${ipAddress} is invalid`);
        error.status = 400;
        throw error;
    }

    /**
     * Get IP from cache
     * If not, query ipstack, save data to cache
     * return data
     */
    return await cache.getIP(ipAddress)
        .catch( (ipAddress) => {
            return queryIPStack(ipAddress)
                .then(transformData)
                .then((data) => {
                    return cache.setIP(ipAddress, data);
                });
        });
}

module.exports = findIP;