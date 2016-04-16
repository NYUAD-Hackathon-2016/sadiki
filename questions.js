var mongoose = requre('mongoose');

var questionsSchema = mongoose.Schema({
    locale: String,
    question: String,
    topic: [String],
    answer: String,
});

module.exports = mongoose.model('Questions', questionsSchema);
