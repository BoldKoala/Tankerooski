var express = require('express');
var app = express();
var path = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(path));

app.use(express.static(__dirname));

var tanks = {};

io.on('connection',function(socket, a, b){
	socket.emit('id',socket.id);

	socket.on('send',function(d){
		socket.broadcast.emit('broadcast',d);
	});
	socket.on('sync',function(state){
		socket.broadcast.emit('move',state)
	});
	socket.on('syncBullet',function(state){
		socket.broadcast.emit('addBullet',state)
	});
	socket.on('hit',function(hitter){
		socket.broadcast.emit('goodHit', hitter);
	});
	socket.on('dead',function(id){
		socket.broadcast.emit('killed', id);
	});
	socket.on('disconnect',function(){
		socket.broadcast.emit('exit',socket.id)
	});

})

console.log('listening at Port: 8080...');
