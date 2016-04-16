var chatHistory = require('./chat-history');

module.exports = function logInteraction(options) {
  var interaction = new chatHistory(options);
  interaction.save();
};
