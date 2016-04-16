var questions = require('./questions');
var _ = require('underscore');

module.exports = function retrieveAnswer(sender, topics, callback) {
  questions.find({topic: { $in: topics }}, function (err, results) {
    if (err) return;

    if(results.length === 0) {

      // No answer was found, returning default answer.
      questions.findOne({topic: "noanswer"}, function(err, result) {
        if (err) return;
        callback(result);
      });

    } else {

      // One or more possible answers were found, sorting them by "matchness".
      var sortedResults = _.sortBy(results, function(answer){
        return _.intersection(answer.topic, topics).length;
      });
      callback(sortedResults[0]);

    }
  });
};
