// Import IP finder
const ipFinder = require("./ip_finder");
// Import readline for getting input from the command line
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});



// Get IP and delegate to ipFinder
function question() {
    readline.question("Enter an IP Address: ", (ipAddress) => {
        ipAddress = ipAddress.trim(); //Trim white space
        ipFinder(ipAddress)
            .then( (returnValue) => {
                    console.log(returnValue);
                    question();
                }
            )
            .catch( (error) => {
                    console.log('An error occurred:', error.message);
                    question();
                }
            );
    });
}

question();

process.on('SIGINT', () => {
    readline.close();
    console.log("Exiting...\n");
    process.exit();
});