var app          = require('./server/server.js');
var port         = process.env.PORT || 9000;
var io           = require('socket.io').listen(app.listen(port));
var socketConfig = require('./server/config/io.js')(io);

console.log('I hear there is a party on port ' + port + '...');