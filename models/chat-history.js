var mongoose = require('mongoose');

var chatHistorySchema = mongoose.Schema({
  user_id: String,
  locale: String,
  question: String,
  answer: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
