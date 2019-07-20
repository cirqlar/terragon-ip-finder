// Obtained from https://www.regextester.com/95309
const IPv4Regex = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/;
// Obtained from https://www.regextester.com/104037
const IPv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

/**
 * Return true if ipAddress is a valid IPv4 address
 * Return false otherwise
 */
function validateIPv4Address (ipAddress) {
    return IPv4Regex.test(ipAddress);
}

/**
 * Return true if ipAddress is a valid IPv6 address
 * Return false otherwise
 */
function validateIPv6Address (ipAddress) {
    return IPv6Regex.test(ipAddress);
}

/**
 * Return true if ipAddress is a valid (IPv4 or IPv6)
 * Return false otherwise
 */
function validateIPAddress(ipAddress) {
    return validateIPv4Address(ipAddress) || validateIPv6Address(ipAddress);
}

module.exports = validateIPAddress;