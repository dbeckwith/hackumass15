var PORT = 8080;

var express = require('express');
var bodyParser = require('body-parser');
var submitCandy = require('./submitCandy');
var getBestHouse = require('./getBestHouse');
var getAllData = require('./getAllData');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  console.log('API request: ' + req.method + ' ' + req.path);
  res.set('Access-Control-Allow-Origin', 'halloweenapp.cloudapp.net');
  next();
});

app.post('/submit_candy', function (req, res) {
  submitCandy(req.body, function (address) {
    res.send(address);
  });
});

app.get('/best_house', function (req, res) {
  res.type('text/plain');
  getBestHouse(req.body, function (bestHouse) {
    res.send(bestHouse);
  });
});

app.get('/all_data', function (req, res) {
  res.type('application/json');
  getAllData(function (data) {
    res.send(data);
  });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Halloween app listening at http://%s:%s', host, port);
});
