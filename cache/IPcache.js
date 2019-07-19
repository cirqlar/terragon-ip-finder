const Redis = require("async-redis");
const client = Redis.createClient();
const PREPEND = "IPKEY_";
const LIFETIME = process.env.LIFETIME || 300;

/**
 * Check if data is stored in cache and return
 * if not, throw Ip address to be used in catch block
 */
async function getIP(ipAddress) {
    let key = PREPEND + ipAddress;
    let data = await client.get(key);
    
    if (data)
        return JSON.parse(data);
    
    throw ipAddress;
}

/**
 * Sets an IP key and return data
 */
async function setIP(ipAddress, data) {
    let key = PREPEND + ipAddress;
    await client.set(key, JSON.stringify(data), 'EX', LIFETIME);
    return data;
}

module.exports = {
    getIP,
    setIP,
}