var mongoose = require('mongoose');

var volunteersSchema = mongoose.Schema({
  locale: String,
  contact_info: String
});

var model = mongoose.model('Volunteers', volunteersSchema);

new model({locale: 'en', contact_info: 'Gonzalo Beviglia. 1558930931'}).save();

module.exports = model;
