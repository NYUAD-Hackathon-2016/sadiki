module.exports = function analyzeText(text) {
  var topics = text.split(' ');

  if (text.indexOf("salam") > -1) {
    topics.push("salam");
  }

  return topics;
};
