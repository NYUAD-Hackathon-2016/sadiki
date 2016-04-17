var _ = require('underscore');
var tokenizer = require('./tokenizer');

module.exports = function analyzeText(text) {
  var topics = _.map(text.split(' '), function(word) {
    return word.toLowerCase().replace('?', '');
  });

  console.log("BEFORE");
  console.log(topics);
  console.log("\n");
  topics = topics.concat(tokenizer(text));
  console.log("AFTER");
  console.log(topics)
  console.log("\n");

  if (text.indexOf("salam") > -1) {
    topics.push("salam");
  }

  return topics;
};
