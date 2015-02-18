var app = require('./server/server.js');
var port = process.env.PORT || 9000;

// Launch
app.listen(port);
console.log('I hear there is a party on port ' + port + '...');