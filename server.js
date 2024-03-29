require("babel-register");
const express = require('express');
const app = express();
const routes = require('./app/routes');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', routes);
console.log("process.env.port = ", process.env.PORT)
const server = app.listen(process.env.PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('XML parser and SVG, JSON generator app listening at http://%s:%s', host, port);
});
