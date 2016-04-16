var questions = require('./questions');
var volunteers = require('./volunteers');
var _ = require('underscore');

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

      // One or more possible answers were found, sorting them by "matchness".
      var sortedResults = _.sortBy(results, function (answer) {
        return _.intersection(answer.topic, topics).length;
      });

      var answer = {answer: sortedResults[0].answer};

      volunteers.find({topic: {$in: topics}}, function (err, volunteers) {
        if (err) return;

        if(results.length > 0) {
          var sortedVolunteers = _.sortBy(volunteers, function (volunteer) {
            return _.intersection(volunteer.topic || [], topics).length;
          });

          answer.answer += " OR you can contact " + sortedVolunteers[0].prettyPrint();
        }

        callback(answer);
      });

    }
  });
};
