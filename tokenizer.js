var shelljs = require('shelljs');
var _ = require('underscore');
module.exports = function tokenizer(text) {
  var result = shelljs.exec('sh tokenizer.sh "'+ text + '"', {silent:true});
  var tokens = result.stdout.split(/\s|\//);
  return _.uniq(tokens);
}