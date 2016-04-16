var request = require('request');
var token = require('./facebook-token');
var app = require('express')();

module.exports = function extractTopic(query) {
    return analyzeText(query);
};

function analyzeQuery(query) {
 var keywords = ["مدرسة"];
 var answer = query;
 return answer;
}
