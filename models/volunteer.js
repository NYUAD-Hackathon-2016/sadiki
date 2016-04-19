var mongoose = require('mongoose');
var _ = require('underscore');

var volunteerSchema = mongoose.Schema({
  locale: String,
  name: String,
  country: String,
  city: String,
  address: String,
  phone: String,
  topic: [String]
});

volunteerSchema.methods.prettyPrint = function () {
  var contactInfo = _.pick(this, 'name', 'address', 'city', 'country', 'phone');
  var values = _.reject(_.values(contactInfo), function(value) {
    return _.isEmpty(value);
  });
  return values.join(', ');
};

module.exports = mongoose.model('Volunteer', volunteerSchema);
