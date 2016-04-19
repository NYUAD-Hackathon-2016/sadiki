// Controllers
var formController = require('../controllers/form-controller');
var chatController = require('../controllers/chat-controller');

module.exports = function configureRoutes(app) {
  app.get('/', formController.newForm);
  app.get('/thank_you', formController.thankYou);
  app.post("/answer", formController.saveForm);

  app.get('/webhook/', chatController.challenge);
  app.post('/webhook/', chatController.receiveMessages);
};
