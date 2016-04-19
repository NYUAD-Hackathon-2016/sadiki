var request = require('request');
var accessToken = require('./../config/secrets').accessToken;
var app = require('express')();

module.exports = function sendTextMessage(sender, text, callback) {
  var payload = {
    recipient: {id: sender},
    message: {text: text}
  };

  if (app.get('env') === 'production') {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: accessToken},
      method: 'POST',
      json: payload
    }, function (error, response) {
      if (error) {
        console.log('Error sending messages: ', error);
        callback(error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
        callback(response.body.error);
      } else {
        callback(null, payload)
      }
    });
  } else {
    callback(null, payload)
  }
};
