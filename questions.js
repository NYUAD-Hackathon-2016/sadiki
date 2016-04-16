var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    locale: String,
    question: String,
    topic: [String],
    answer: String
});

var model = mongoose.model('Questions', questionsSchema);

// new model({locale: 'en', question: 'Salam', topic: ['salam'], answer: 'salam'}).save();
// new model({locale: 'en', question: 'can i sign my kids into school? ', topic: ['kids', 'school', 'sign'], answer: 'yes but they must speak turkish'}).save();
// new model({locale: 'en', question: 'where can i teach them turkish? ', topic: ['where', 'teach', 'turkish'], answer: 'Bahceshir university recently launched a program to teach 300000 syrian students how to speak turkish and this is contact info'}).save();

module.exports = model;
