var request = require('request');
var token = require('./facebook-token');
var app = require('express')();

module.exports = function sendTextMessage(sender, text, res) {
  // We should get the answer here.
  messageData = {
    text: text
  };

  if (app.get('env') === 'production') {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: token},
      method: 'POST',
      json: {
        recipient: { id: sender },
        message: messageData
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    });
  } else {
    console.log("sendTextMessage", messageData);
  }
};
