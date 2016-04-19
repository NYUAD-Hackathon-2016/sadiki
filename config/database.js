var mongoose = require('mongoose');

module.exports = function configDatabase(app) {
  var mongoUri;

  // Connections depend on environment.
  if (app.get('env') === 'production') {
    mongoUri = 'mongodb://sadiki:sadiki@ds011251.mlab.com:11251/heroku_r5lph6kn';
  } else {
    mongoUri = 'mongodb://localhost/sadiki';
  }

  mongoose.connect(mongoUri);
};
