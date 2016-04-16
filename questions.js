var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    locale: String,
    question: String,
    topic: [String],
    answer: String
});

var model = mongoose.model('Questions', questionsSchema);

new model({locale: 'en', question: 'Salam', topic: ['salam'], answer: 'salam'}).save();
new model({locale: 'en', question: 'سلام', topic: ['سلام'], answer: 'سلام'}).save();
new model({locale: 'en', question: 'Can i sign my kids to school?', topic: ['kids', 'school', 'sign'], answer: 'Yes you can, but they have to speak turkish.'}).save();
new model({locale: 'en', question: 'فيني سجل اولادي بالمدرسة ؟ ', topic: ['اولادي', 'المدرسة', 'سجل'], answer: 'اي فيك , بس لازم يحكو تركي'}).save();
new model({locale: 'en', question: 'where can i teach them turkish? ', topic: ['where', 'teach', 'turkish'], answer: 'Bahceshir university recently launched a program to teach 300000 syrian students how to speak turkish and this is contact info'}).save();
new model({locale: 'en', question: 'وين فيني علم ولادي تركي ؟ ', topic: ['وين', 'علم', 'تركي'], answer: 'جامعة Bahcesehir University أطلقت برنامج تعليمي ل تعليم 300,000 طالب سوري اللغة التركية , فيك تروح وتسأل ,وهدا العنوان Çırağan Caddesi, Osmanpaşa Mektebi Sokak No: 4 - 6, 34349'}).save();

module.exports = model;
