var bodyParser = require('body-parser');
var express = require('express');

module.exports = function setUpApp(app) {
  app.set('port', (process.env.PORT || 5000));

  // Ejs templating
  app.set('view engine', 'ejs');

  // Serve public assets.
  app.use(express.static(__dirname + '../public'));

  // Process application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));

  // Process application/json
  app.use(bodyParser.json());
};
