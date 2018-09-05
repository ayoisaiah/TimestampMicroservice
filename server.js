// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  if (req.params.date_string) {
    var date_string = req.params.date_string

    // check the date_string can be parsed to integer
    if (!isNaN(date_string)){
      var date = new Date(parseInt(date_string));
    }
    else{
      var date = new Date(date_string);
    }
  }
  else{
    var date = new Date();
  }

  // check the date_string is invalid date
  if (isNaN(date.getTime())) {
    res.json({
      'error': "Invalid Date",
    })
  }
  else{
    var unix = date.getTime()
    var utc = date.toUTCString()

    res.json({
      'unix': unix,
      'utc': utc,
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});