require("babel-register");
var express = require('express');
var app = express();
var svgRenderer = require('./scripts/svg_renderer').default;
var routes = require('./api/details');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/svg', function (req, res) {
var svg = svgRenderer(req.body.data);
res.send(svg);
});

app.get('/', function (req, res) {
  res.send("Server is working fine.");
  });

app.use('/api', routes);
console.log("process.env.port 3000==", process.env.port)
var server = app.listen(process.env.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
