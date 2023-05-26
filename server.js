// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
/* Dependencies */
const bodyParser = require('body-parser');
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8001;
// Spin up the server
// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => { console.log(`running on localhost:${port}`); });

// Callback to debug
function listening() {
  console.log('server running');
  console.log('running on localhost: {$port}');
};
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
  res.send(projectData);
});

// Post Route
// This request should trigger external request to weather map and store the result in "projectData" variable
app.post('/weather', callBack);

async function callBack(req, res) {
  const responseFromWeatherApp = await fetch(req.body.weatherUrl);
  // get weather from final website and provide answer in response

  const responseJSON = await responseFromWeatherApp.json();
  projectData.feelings = req.body.feelings;
  projectData.temp = responseJSON.main.temp;
  projectData.date = new Date();

  res.send(responseJSON);
};
