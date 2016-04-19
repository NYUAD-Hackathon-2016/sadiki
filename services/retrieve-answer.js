var questions = require('./../models/questions');
var volunteers = require('./../models/volunteers');
var _ = require('underscore');

function bestForTopics(models, topics) {
  var sorted = _.sortBy(models, function (model) {
    return _.intersection(model.topic, topics).length;
  });

  return sorted[0];
}

// XXX This should be rewritten.
module.exports = function retrieveAnswer(sender, topics, callback) {
  questions.find({topic: {$in: topics}}, function (err, results) {
    if (err) return;

    if (results.length === 0) {

      // If no answer was found, put them in contact with a volunteer.
      volunteers.findOne(function (err, volunteer) {
        if (err) return;
        questions.findOne({topic: "noanswer"}, function (err, result) {
          if (err) return;
          callback({answer: result.answer + volunteer.prettyPrint()});
        });
      });

    } else {

      var answer = {answer: bestForTopics(results, topics).answer};

      volunteers.find({topic: {$in: topics}}, function (err, volunteers) {
        if (err) return;

        if (volunteers.length > 0) {
          answer.answer += " OR you can contact " + bestForTopics(volunteers, topics).prettyPrint();
        }

        callback(answer);
      });

    }
  });
};
