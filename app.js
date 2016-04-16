var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var sendTextMessage = require('./send-text-message');
var logInteraction = require('./log-interaction');
var mongoose = require('mongoose');
var chatHistory = require('./chat-history');
var app = express();

// mongoose.connect('mongodb://localhost/sadiki');
mongoose.connect('mongodb://sadiki:sadiki@ds011251.mlab.com:11251/heroku_r5lph6kn');

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'sadiki-nyuad-2016') {
      res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token')
});

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
          text = event.message.text;
          var answer = "Text received, echo: " + text.substring(0, 200);
          sendTextMessage(sender, answer);
          logInteraction({question: event.message.text, user_id: event.sender.id, answer: answer});
        }
    }
    res.sendStatus(200);
});

// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});

// Testing your database connection.
// var test = new chatHistory({user_id: 1, locale: 'en'});
// test.save();
