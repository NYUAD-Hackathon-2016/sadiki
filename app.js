var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var questions = require('./questions');
var sendTextMessage = require('./send-text-message');
var logInteraction = require('./log-interaction');
var retrieveAnswer = require('./retrieve-answer');
var mongoose = require('mongoose');
var app = express();
var analyzeText = require('./analyze-text');

// Connections depend on environment.
if ( app.get('env') === 'production' ) {
  mongoose.connect('mongodb://sadiki:sadiki@ds011251.mlab.com:11251/heroku_r5lph6kn');
} else {
  mongoose.connect('mongodb://localhost/sadiki');
}

app.set('port', (process.env.PORT || 5000));

// Jade templating
app.set('view engine', 'ejs');

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.render('new');
});

app.post("/answer", function(req, res) {
    console.log(req.body);
    var model = new questions({question: req.body.hospitalQuestion, answer: req.body.hospitalAnswer});
    model.save()
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
          var topics = analyzeText(text);
          retrieveAnswer(sender, topics, function(answer) {
            if (answer) {
              logInteraction({question: event.message.text, user_id: event.sender.id, answer: answer});
              sendTextMessage(sender, answer.answer, res);
            }
          });
        }
    }
    res.sendStatus(200);
});

// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
