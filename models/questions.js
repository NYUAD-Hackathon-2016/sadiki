var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
  locale: String,
  question: String,
  topic: [String],
  answer: String
});

var model = mongoose.model('Questions', questionsSchema);

// new model({
//   locale: 'en',
//   question: 'can i sign my kids into school?',
//   topic: ['school', 'education', 'kids', 'kid'],
//   answer: 'yes but they must speak turkish'
// }).save();
//
// new model({
//   locale: 'en',
//   question: 'where can i teach them turkish?',
//   topic: ['language', 'turkish'],
//   answer: 'Bahceshir university recently launched a program to teach 300000 syrian students how to speak turkish.'
// }).save();
//
// new model({
//   locale: 'en',
//   question: 'Where can i buy makdoos',
//   topic: ['makdoos'],
//   answer: 'Yousuf street is full of syrian restaurants OR call RAMA at 07678765. She makes makdoos every friday.'
// }).save();
//
// new model({
//   locale: 'ar',
//   question: 'فيني سجل اولادي بالمدرسة؟',
//   topic: ['بالمدرسة', 'اولادي'],
//   answer: 'اي فيك , بس لازم يحكو تركي'
// }).save();
//
// new model({
//   locale: 'ar',
//   question: 'وين فيني علم ولادي تركي؟',
//   topic: ['التركية', 'تركي'],
//   answer: 'جامعة Bahcesehir University أطلقت برنامج تعليمي ل تعليم 300,000 طالب سوري اللغة التركية , فيك تروح وتسأل ,وهدا العنوان Çırağan Caddesi, Osmanpaşa Mektebi Sokak No: 4 - 6, 34349 Beşiktaş/İstanbul, Turkey الهاتف : +90 444 2 864'
// }).save();
//
// new model({
//   locale: 'ar',
//   question: 'وين فيني اشتري قطرميز مكدوس',
//   topic: ['مكدوس'],
//   answer: 'في فوق ال 10 مطاعم سورية في شارع يوسف باشا بتقدر تروح هنيك , أو ! "راما" بتعمل مكدوس كل جمعة , هاي الرقم 05356789'
// }).save();

module.exports = model;
