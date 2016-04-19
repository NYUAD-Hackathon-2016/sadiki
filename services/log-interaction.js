var mongoose = require('mongoose');
var ChatHistory = mongoose.model('ChatHistory');

module.exports = function logInteraction(options) {
  console.log(options);
  var interaction = new ChatHistory(options);
  interaction.save();
};
