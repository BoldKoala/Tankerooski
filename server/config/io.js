var User = require('../models/userModel.js');

module.exports = function(io){

  var tanks = {};

  //Add Sockets Events Handler
  io.on('connection',function(socket, a, b){
    //On Connecting to Server
    socket.emit('login',socket.id);

    //On Spawning new tank
    socket.on('spawn',function(d){
      User.findById(d,function(err,tank){
        socket.emit('id',{id: socket.id,tank:tank});
      })
    });

    //On Sending Messages
    socket.on('send',function(d){
      socket.broadcast.emit('broadcast',d);
    });

    //On Syncing tanks movements
    socket.on('sync',function(state){
      socket.broadcast.emit('move',state)
    });

    //On Syncing Bullets
    socket.on('syncBullet',function(state){
      socket.broadcast.emit('addBullet',state)
    });

    //On tanks being hit
    socket.on('hit',function(hitter){
      socket.broadcast.emit('goodHit', hitter);
    });

    //On tanks dying
    socket.on('dead',function(kills){
      User.findById(kills.kill,function(err,tank){
        tank.player.kills++;
        tank.save();
      });

      User.findById(kills.death,function(err,tank){
        tank.player.killed++;
        tank.save();
      });

      socket.broadcast.emit('killed', kills);
    });

    //On client disconnecting
    socket.on('disconnect',function(){
      socket.broadcast.emit('exit',socket.id)
    });

    //On stat udpates
    socket.on('stat',function(d){
      User.findById(d.objectID,function(err,tank){
        if(tank.player.fired === undefined){
          tank.player.fired = 0;
        }
        if(tank.player.onTarget === undefined){
          tank.player.onTarget = 0;
        }
        tank.player.fired += d.fired;
        tank.player.onTarget += d.onTarget;
        tank.save();
      });
    })
  })

};