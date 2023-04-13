// index.js
// where your node app starts
var dotenv = require("dotenv").config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (request, response) => {
  const date = request.params.date;

  let utcDate = new Date(date);

  if (utcDate.toString() === "Invalid Date") {
    utcDate = new Date(date * 1000);
  }

  const unixTime = Math.floor(utcDate.getTime() / 1000);

  response.json({ unix: unixTime, utc: utcDate.toUTCString() });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
