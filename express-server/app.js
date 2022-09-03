const express = require('express');

const api = require('./routes/api');
const lessons = require('./routes/lessons');
const students = require('./routes/students');
const cors = require('./tools/cors');

module.exports = function(port) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors);

  app.use('/', api);
  app.use('/', lessons);
  app.use('/', students);

  app.set('port', port);
  return app;
}
