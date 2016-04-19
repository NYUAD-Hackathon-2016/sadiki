var app = require('express')();

require('./config/database')(app);
require('./config/setup')(app);
require('./config/routes')(app);

// Spin up the server
app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
});
