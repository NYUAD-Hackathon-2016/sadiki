var _ = require('underscore');
var questions = require('../models/questions');
var volunteers = require('../models/volunteers');

function newForm(req, res) {
  res.render('new');
}

function thankYou(req, res) {
  res.render('thank_you');
}

function saveForm(req, res) {
  _.each(req.body.questions, function (question) {
    if (_.isEmpty(question.answer)) return;

    new questions({
      question: question.question,
      topic: question.question.split(' '),
      answer: question.answer
    }).save();
  });

  if (req.body['volunteer-name'] && req.body['volunteer-phone']) {
    new volunteers({name: req.body['volunteer-name'], phone: req.body['volunteer-phone']}).save();
  }

  if (!_.isEmpty(req.body.volunteer.name)) {
    var volunteer = req.body.volunteer;
    volunteer.topic = _.keys(req.body.topic);
    new volunteers(volunteer).save();
  }

  res.redirect('/thank_you');
}

module.exports = {
  'newForm': newForm,
  'thankYou': thankYou,
  'saveForm': saveForm
};
