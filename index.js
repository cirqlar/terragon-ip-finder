// Import IP finder
const ipFinder = require("./ip_finder");
// Import readline for getting input from the command line
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});



// Get IP and delegate to ipFinder
readline.question("Enter an IP Address: ", (ipAddress) => {
    ipFinder(ipAddress);
    process.exit();
});

