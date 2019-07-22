const ipFinder = require('./ip/ip_finder');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Exit if API key is not set
if (!process.env.API_KEY) {
  console.log('Please set your API key');
  process.exit();
}

// Route for get endpoint
app.get('/:ipAddress', (req, res) => {
  ipFinder(req.params.ipAddress)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      let resObj = {};
      resObj.status = error.status == 400 ? error.status : 500;
      resObj.message =
        error.status == 400 ? error.message : 'Internal Server Error';
      res.status(resObj.status).json(resObj);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
