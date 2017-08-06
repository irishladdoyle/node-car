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

// Utils ------------------------

function hasCarID(carID) {
  return Cars.some(function (car) {
    return car.id == carID;
  });
}

function hasEmail(email) {
  return Customers.some(function (customer) {
    return customer.email === email;
  });
}

function nextCarID(Cars) {
  if (!Cars) return 0;
  var max = 0;
  Cars.forEach(function (car) {
    if (car.id > max)
      max = car.id;
  })
  return max + 1;
}

function nextOrderID(Orders) {
  if (!Orders) return 0;
  var max = 0;
  Orders.forEach(function (order) {
    if (order.id > max)
      max = order.id;
  })
  return max + 1;
}

// ------------------------------

app.get('/cars', function(req, res) {
  console.log('Cars: ', Data.Cars);
  res.json(Data.Cars);
});

app.get('/cars/:id', function(req, res) {
  var car = Data.Cars.find(function (car) {
    return car.id == req.params.id;
  });

  console.log('Car: ', car);
  res.json(car);
});

app.get('/rents', function(req, res) {
  var rents = Data.Orders.filter(function (order) {
    return order.customerEmail === req.query.email;
  });

  console.log('Rents: ', rents);
  res.json(rents);
});

app.get('/rents/:id', function(req, res) {
  var rent = Data.Orders.filter(function (order) {
    return order.id == req.params.id;
  });

  console.log('Rent: ', rent);
  res.json(rent[0]);
});



/* istanbul ignore next */
if (!module.parent) {
	  app.listen(4000);
	  console.log('Express started on port 4000');
}
