const Debug = require('debug');
const DebugApi = Debug("api:server");

// server.js
// where your node app starts

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


tryDateParse = (dateParam) => {
  try {
    if (new Date(dateParam).getTime() > 0) return new Date(dateParam);
    if (new Date(parseInt(dateParam)).getTime() > 0) return new Date(parseInt(dateParam));
  } catch (e) {
    DebugApi(e);
  }
  return null;
}

const timeStampController = (req, res) => {
  const dateParam = req.params?.date;
  console.log(dateParam);
  const date = dateParam ? tryDateParse(dateParam) : new Date();
  if (date == null) {
    res.status(500).send({error: 'Invalid Date'});
  }
  res.json({
    unix: date.getTime(),
    utc: date.toString()
  });
}

// your first API endpoint... 
app.get("/api/:date", timeStampController);
app.get("/api", timeStampController);



// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
