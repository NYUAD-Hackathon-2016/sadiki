module.exports = function analyzeText(text){
  var topics =[];
  if(text.indexOf("salam")> -1)
  //salam is on the text
  topics.push("salam");

  return topics;
};
