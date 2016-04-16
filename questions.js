var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
  locale: String,
  question: String,
  topic: [String],
  answer: String
});

var model = mongoose.model('Questions', questionsSchema);

new model({
  locale: 'en',
  question: 'وين فيني اشتري قطرميز مكدوس',
  topic: ['اشتري', 'اكل', 'طعام', 'مكدوس'],
  answer: 'في فوق ال 10 مطاعم سورية في شارع يوسف باشا بتقدر تروح هنيك , أو ! "راما" بتعمل مكدوس كل جمعة , هاي الرقم 05356789'
}).save();

new model({
  locale: 'en',
  question: 'Where can i buy makdoos',
  topic: ['where', 'buy', 'makdoos', 'food', 'jar'],
  answer: 'Yousuf street is full of syrian restaurants OR call Rama at 05356789, she makes makdoos every friday'
}).save();

module.exports = model;
