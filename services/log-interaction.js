var mongoose = require('mongoose');
var ChatHistory = mongoose.model('ChatHistory');

module.exports = function logInteraction(event, answer) {
  ChatHistory.create({
    question: event.message.text,
    user_id: event.sender.id,
    answer: answer.answer,
    success: answer.success
  });
};
