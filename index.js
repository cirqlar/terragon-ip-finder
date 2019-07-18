// Import readline for getting input from the command line
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});



// Get IP and return it to the user
readline.question("Enter an IP Address: ", (ipAddress) => {
    console.log(`Your IP Address was ${ipAddress}`);
    process.exit();
});

