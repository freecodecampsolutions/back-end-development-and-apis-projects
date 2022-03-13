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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const tryDateParse = (dateParam) => {
  try {
    if (new Date(dateParam).getTime() > 0) return new Date(dateParam);
    if (new Date(parseInt(dateParam)).getTime() > 0) return new Date(parseInt(dateParam));
  } catch (e) {
    DebugApi(e);
  }
  return null;
}

const padZeros = n => String(n).padStart(2, '0');

const formatDate = (dateObj) => {
  console.log(dateObj)
  const dayMap = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthMap = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = dayMap[dateObj.getDay()];
  const date = padZeros(dateObj.getDate());
  const month = monthMap[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const hours = padZeros(dateObj.getHours());
  const minutes = padZeros(dateObj.getMinutes());
  const seconds = padZeros(dateObj.getSeconds());
  return `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`
}

const timeStampController = (req, res) => {
  const dateParam = req.params.date;
  const date = dateParam ? tryDateParse(dateParam) : new Date();
  if (date == null) {
    return res.status(500).send({error: 'Invalid Date'});
  }
  // formatDate(date);
  res.json({
    unix: date.getTime(),
    utc: formatDate(date).toString(),
  });
}

// your first API endpoint... 
app.get("/api/:date", timeStampController);
app.get("/api", timeStampController);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
