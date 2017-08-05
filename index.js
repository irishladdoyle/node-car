var express = require('express');
var Data = require('./Data');
var bodyParser = require('body-parser');

var app = module.exports = express();

// Configuration -----

app.use(bodyParser.json());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//--------------------

app.get('/cars', function(req, res) {
  console.log('Cars: ', Data.Cars);
  res.json(Data.Cars);
});

/* istanbul ignore next */
if (!module.parent) {
	  app.listen(4000);
	  console.log('Express started on port 4000');
}
