var chatHistory = require('./../models/chat-history');

module.exports = function logInteraction(options) {
  var interaction = new chatHistory(options);
  interaction.save();
};
