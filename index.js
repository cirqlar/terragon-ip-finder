// Import IP finder
const ipFinder = require("./ip/ip_finder");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.API_KEY) {
    console.log("Please set your API key");
}

app.get("/:ipAddress", (req, res) => {
    ipFinder(req.params.ipAddress)
        .then( (returnValue) => {
                res.status(200).json(returnValue);
            }
        )
        .catch( (error) => {
                let resObj = {};
                resObj.status = (error.status == 400) ? error.status : 500;
                resObj.message = (error.status == 400) ? error.message : "Internal Server Error";
                res.status(resObj.status).json(resObj);
            }
        );
});

app.listen(PORT, () => {
    console.log("Server started?");
});