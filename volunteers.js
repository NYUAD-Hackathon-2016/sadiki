var mongoose = require('mongoose');
var _ = require('underscore');

var volunteersSchema = mongoose.Schema({
  locale: String,
  name: String,
  country: String,
  city: String,
  address: String,
  phone: String,
  topic: [String]
});

volunteersSchema.methods.prettyPrint = function () {
  var prettyPrint = '';

  prettyPrint += this.name + ', ';
  if (!_.isEmpty(this.address)) {
    prettyPrint += this.address + ', '
  }
  if (!_.isEmpty(this.city) && !_.isEmpty(this.country)) {
    prettyPrint += this.city + ', ' + this.country;
  }
  if (!_.isEmpty(this.phone)) {
    prettyPrint += this.phone;
  }
  prettyPrint += '.';

  return prettyPrint;
};

var model = mongoose.model('Volunteers', volunteersSchema);

module.exports = model;
