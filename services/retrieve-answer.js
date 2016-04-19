var _ = require('underscore');
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Volunteer = mongoose.model('Volunteer');

function bestForTopics(models, topics) {
  var sorted = _.sortBy(models, function (model) {
    return _.intersection(model.topic, topics).length;
  });

  return sorted[0];
}

// XXX This should be rewritten.
module.exports = function retrieveAnswer(sender, topics, callback) {
  Question.where('topic').in(topics).exec(function (err, questions) {
    if (err) return callback(err);

    if (questions.length === 0) {

      // If no answer was found, put them in contact with a volunteer.
      Volunteer.findOne(function (err, volunteer) {
        if (err) return callback(err);
        Question.findOne({topic: 'noanswer'}, function (err, question) {
          if (err) return callback(err);
          callback(null, {answer: question.answer + volunteer.prettyPrint(), success: false});
        });
      });

    } else {

      var answer = {answer: bestForTopics(questions, topics).answer, success: true};

      Volunteer.find({topic: {$in: topics}}, function (err, volunteers) {
        if (err) return callback(err);

        if (volunteers.length > 0) {
          answer.answer += " OR you can contact " + bestForTopics(volunteers, topics).prettyPrint();
        }

        callback(null, answer);
      });

    }
  });
};
