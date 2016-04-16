var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    locale: String,
    question: String,
    topic: [String],
    answer: String
});

var model = mongoose.model('Questions', questionsSchema);

module.exports = model;
