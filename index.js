require("babel-register");
const express = require('express');
const app = express();
const svgRenderer = require('./scripts/svg_renderer').default;
const routes = require('./api/details');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/svg', function (req, res) {
const svg = svgRenderer(req.body.data);
res.send(svg);
});

app.get('/', function (req, res) {
  res.send("Server is working fine.");
  });

app.use('/api', routes);
console.log("process.env.port = ", process.env.PORT)
const server = app.listen(process.env.PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
