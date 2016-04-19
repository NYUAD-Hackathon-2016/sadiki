var _ = require('underscore');
var request = require('request');
var sendTextMessage = require('../services/send-text-message');
var logInteraction = require('../services/log-interaction');
var retrieveAnswer = require('../services/retrieve-answer');
var analyzeText = require('../services/analyze-text');

function challenge(req, res) {
  if (req.query['hub.verify_token'] === 'sadiki-nyuad-2016') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token')
}

function reply(event, callback) {
  var sender = event.sender.id;

  if (event.message && event.message.text) {
    var topics = analyzeText(event.message.text);

    retrieveAnswer(sender, topics, function (error, answer) {
      if (error) return callback(error);

      logInteraction(event, answer);
      sendTextMessage(sender, answer.answer, function (error, data) {
        if (error) return callback(error);

        callback(null, data);
      });
    });
  }

}

function receiveMessages(req, res) {
  var messagingEvents = req.body.entry[0].messaging;
  var data = {errors: [], answers: []};

  _.each(messagingEvents, function (event) {
    reply(event, function (error, answer) {
      if (error) {
        data.errors.push(error);
      } else {
        data.answers.push(answer);
      }

      // Last callback was resolved.
      if (_.isEqual(data.errors.length + data.answers.length, messagingEvents.length)) {
        res.send(data);
      }
    });
  });
}

module.exports = {
  'challenge': challenge,
  'receiveMessages': receiveMessages
};
