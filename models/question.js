var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  locale: String,
  question: String,
  topic: [String],
  answer: String
});

module.exports = mongoose.model('Question', questionSchema);
