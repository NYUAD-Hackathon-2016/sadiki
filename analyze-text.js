var _ = require('underscore')

module.exports = function analyzeText(text) {
  var topics = _.map(text.split(' '), function(word) {
    return word.toLowerCase().replace('?', '');
  });

  if (text.indexOf("salam") > -1) {
    topics.push("salam");
  }

  return topics;
};
