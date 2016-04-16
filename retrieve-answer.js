var questions = require('./questions');
var _ = require('underscore');

module.exports = function retrieveAnswer(sender, topics) {
  questions.find({topic: { $in: topics }}, function (err, results) {
    if (err) return;

    var sortedResults = _.sortBy(results, function(answer){
      return _.intersection(answer.topic, topics).length;
    });

    callback(sortedResults[0]);
  });
};
