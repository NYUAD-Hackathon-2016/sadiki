var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    locale: String,
    question: String,
    topic: [String],
    answer: String
});

var model = mongoose.model('Questions', questionsSchema);

var test = new model({locale: 'en', question: 'How are you?', topic: ['sim-card'], answer: 'T-Mobile'});
test.save();

module.exports = model;
