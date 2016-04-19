var _ = require('underscore');

module.exports = function analyzeText(text) {
  var topics = _.map(text.split(' '), function (word) {
    return word.toLowerCase().replace('?', '');
  });

  return topics;
};
