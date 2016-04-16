var mongoose = require('mongoose');

var volunteersSchema = mongoose.Schema({
  locale: String,
  name: String,
  phone: String
});

var model = mongoose.model('Volunteers', volunteersSchema);

module.exports = model;
