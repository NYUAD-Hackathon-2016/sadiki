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

function reply(event, res) {
  var sender = event.sender.id;

  if (event.message && event.message.text) {
    var text = event.message.text;
    var topics = analyzeText(text);
    retrieveAnswer(sender, topics, function (error, answer) {
      if (error) return res.sendStatus(500);
      logInteraction({question: event.message.text, user_id: event.sender.id, answer: answer.answer, success: answer.success});
      sendTextMessage(sender, answer.answer, function (error, data) {
        if (error) return res.sendStatus(500);
        res.send(data);
      });
    });
  }

}

function receiveMessages(req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (var i = 0; i < messaging_events.length; i++) {
    reply(messaging_events[i], res);
  }
}

module.exports = {
  'challenge': challenge,
  'receiveMessages': receiveMessages
};
