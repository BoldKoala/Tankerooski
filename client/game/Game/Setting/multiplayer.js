//Multiplayer mode constructor
function Multiplayer(map,tanks,bullets){
	var counter = 0;
	
	//define event handler
	var eventHandlers = {
		//Messaging
		message: function(msg){
			console.log(msg);
		},
		//Console log broadcast message
		broadcast: function(msg){
			console.log(msg);
		},
		goodHit: function(hitter){
			console.log(hitter.from+" hit "+hitter.to);
		},
		killed: function(id){
			console.log(id + ' is dead');
			tanks[id].flip();
			tanks[id].hp = 0;
			setTimeout(function(){
				tanks[id].hp = 10;
				tanks[id].restore();
			},5000)
		},
		//Remove disconnected tank
		exit: function(id){
			console.log(id," exited")
			console.log('Currenlt there are '+ (--counter) +' users');
			map.scene.remove(tanks[id].tanker);
			delete tanks[id];
		},
		//Add bullets to all users
		addBullet: function(pos){
			var bullet = Bullet(-Math.sin(pos.direction), -Math.cos(pos.direction), 10);

	    bullet.bulleter.position.x = pos.x;
	    bullet.bulleter.position.y = pos.y;
	    bullet.bulleter.position.z = pos.z;

	    var dx = tanks[tanks._id].tanker.position.x - pos.x;
	    var dz = tanks[tanks._id].tanker.position.z - pos.z;

	    var dxdz = Math.sqrt(dx*dx+dz*dz);
	    var proximity = (dxdz/50)*100;

	    bullets.push(bullet);
	    bullet.fireSound(100-proximity);
	    map.scene.add(bullet.bulleter);
	    bullet._id = pos.id;

	    setTimeout(function(){
	      map.scene.remove(bullets.shift().bulleter);
	    },1000)
		},
		//Sync movements for all users
		move: function(state){
			if(!tanks[state.id]){
				tanks[state.id] = Tank({
					x:0.25,
					y:0.25,
					z:0.25, 
					color:state.color,
					speed: 0.1,
					onLoad: function(d){
						console.log('Currenlt there are '+ (++counter) +' users');
						map.scene.add(d);
						d.position.x = state.x;
						d.position.y = state.y;
						d.position.z = state.z;
						d.rotation.x = state.rx;
						d.rotation.y = state.ry;
						d.rotation.z = state.rz;
					}
				});
			} else if(tanks[state.id].tanker){
				tanks[state.id].tanker.position.x = state.x;
				tanks[state.id].tanker.position.y = state.y;
				tanks[state.id].tanker.position.z = state.z;
				tanks[state.id].tanker.rotation.x = state.rx;
				tanks[state.id].tanker.rotation.y = state.ry;
				tanks[state.id].tanker.rotation.z = state.rz;
				tanks[state.id].isDriving = state.isDriving;
				tanks[state.id].tanker.children[2].rotation.y = state.torretY;
			}
		},
		//send tanks._id to socket id
		id: function(id){
			var codes = 0;
			for(var i = 0; i<id.length; i++){
				codes += id.charCodeAt(i);
			}
			var r = codes % Math.floor(Math.random()*256);
			var g = codes % Math.floor(Math.random()*256);
			var b = codes % Math.floor(Math.random()*256);
			var rgb = 'rgb('+r+','+g+','+b+')';

			tanks[id] = Tank({
				x:0.25,
				y:0.25,
				z:0.25, 
				color:rgb, 
				speed:0.1, 
				onLoad:function(d){
					console.log('Currenlt there are '+ (++counter) +' users');
					map.scene.add(d);
				}
			});

			tanks._id = id;
		}
	};

	var multiplayer = {};

	//Instantiate socket
	multiplayer.socket = io();

	//Inject event handler to socket
	for(var event in eventHandlers){
		multiplayer.socket.on(event, eventHandlers[event]);
	}

	//Add events emitting functions
	multiplayer.sendMsg = function(msg){
	  multiplayer.socket.emit('send',msg)
	};

	//Syncing tank position and rotation
	multiplayer.sync = function(data){
		multiplayer.socket.emit('sync',data);
	};

	//Syncing tank position and rotation
	multiplayer.fire = function(data){
		multiplayer.socket.emit('syncBullet',data);
	};

	//Trigger bullet hit event
	multiplayer.hit = function(from, to){
		multiplayer.socket.emit('hit',{from:from, to:to});
	};

	//Trigger kill
	multiplayer.kill = function(dead){
		multiplayer.socket.emit('dead',dead);
	};

	return multiplayer;
}