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
			var tr = document.createElement('tr');
			var username = document.createElement('td');
			username.setAttribute('id','chatbox-username');
			username.innerHTML = msg.id;
			var message = document.createElement('td');
			message.setAttribute('id','chatbox-message');
			message.innerHTML = msg.message;
			tr.appendChild(username);
			tr.appendChild(message)

			var table = document.getElementById('chatbox-table')
			table.appendChild(tr);
			table.scrollTop = table.scrollHeight;
		},
		goodHit: function(hitter){
			if(hitter.from === tanks._id){
				tanks[tanks._id].onTarget++;
			}
		},
		killed: function(id){
			if(id.kill === tanks[tanks._id].objectID){
				tanks[tanks._id].kills++;
			}
			tanks[id.to].flip();
			tanks[id.to].hp = 0;
			setTimeout(function(){
				tanks[id.to].hp = 10;
				tanks[id.to].restore();
			},5000)
		},
		//Remove disconnected tank
		exit: function(id){
			console.log(id," exited")
			console.log('Currenlyt there are '+ (--counter) +' users');
			map.scene.remove(tanks[id].tanker);
			delete tanks[id];
		},
		//Add bullets to all users
		addBullet: function(pos){
			if(tanks[tanks._id]){
				if(tanks[tanks._id].tanker){
					
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
				}
			}
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
					name: state.name,
					objectID: state.objectID,
					onLoad: function(d){
						console.log('Currently there are '+ (++counter) +' users');
						map.scene.add(d);
						d.position.x = state.x;
						d.position.y = state.y;
						d.position.z = state.z;
						d.rotation.x = state.rx;
						d.rotation.y = state.ry;
						d.rotation.z = state.rz;
					}
				});
			} else if(tanks[state.id].tanker && tanks[tanks._id]){
				tanks[state.id].tanker.position.x = state.x;
				tanks[state.id].tanker.position.y = state.y;
				tanks[state.id].tanker.position.z = state.z;
				tanks[state.id].tanker.rotation.x = state.rx;
				tanks[state.id].tanker.rotation.y = state.ry;
				tanks[state.id].tanker.rotation.z = state.rz;
				tanks[state.id].hp                = state.hp;
        tanks[state.id].hpbar.position.x  = state.x;
        tanks[state.id].hpbar.position.y  = state.y+1;
        tanks[state.id].hpbar.position.z  = state.z;
        tanks[state.id].hpbar.rotation.y  = -tanks[tanks._id].cameraDirection;
        tanks[state.id].hpbar.scale.z     = state.hp === 0 ? 0.01 : state.hp/state.maxHP;	
        tanks[state.id].fired             = state.fired;
        tanks[state.id].onTarget          = state.onTarget;
        tanks[state.id].kills 					  = state.kills;
        tanks[state.id].deaths 						= state.deaths;
        if(tanks[state.id].hp >= 10){
          tanks[state.id].hpbar.material.color.set('green');
        }
        if(tanks[state.id].hp <= 7){
          tanks[state.id].hpbar.material.color.set('yellow');
        }
        if(tanks[state.id].hp <= 5){
          tanks[state.id].hpbar.material.color.set('orange');
        }
        if(tanks[state.id].hp <= 2){
          tanks[state.id].hpbar.material.color.set('red');
        }
				tanks[state.id].isDriving = state.isDriving;
				tanks[state.id].tanker.children[2].rotation.y = state.torretY;
			}
		},
		//send tanks._id to socket id
		id: function(data){
			var codes = 0;
			for(var i = 0; i<data.tank._id.length; i++){
				codes += data.tank._id.charCodeAt(i);
			}
			var r = codes % Math.floor(Math.random()*256);
			var g = codes % Math.floor(Math.random()*256);
			var b = codes % Math.floor(Math.random()*256);
			var rgb = 'rgb('+r+','+g+','+b+')';

			tanks[data.id] = Tank({
				x: 0.25,
				y: 0.25,
				z: 0.25, 
				color: rgb, 
				speed: data.tank.tank.speed, 
				hp: data.tank.tank.HP,
				bulletFreq: data.tank.tank.bulletFreq,
				damage: data.tank.tank.damage,
				name: data.tank.google.givenName,
				objectID: data.tank._id,
				onLoad:function(tanker){
					console.log('Currently there are '+ (++counter) +' users');
					map.scene.add(tanker);
				}
			});

			tanks._id = data.id;
			document.getElementById('tank-color').innerHTML = '<img src="'+data.tank.google.picture+'"></img>';
		}
	};

	var multiplayer = {};

	//Instantiate socket
	multiplayer.socket = io();

	//Inject event handler to socket
	for(var event in eventHandlers){
		multiplayer.socket.on(event, eventHandlers[event]);
	}

	multiplayer.socket.on('login',function(){
		multiplayer.socket.emit('spawn',window.localStorage.getItem('com.tankerooski.id'));
	})

	//Add events emitting functions
	multiplayer.sendMsg = function(id,msg){
	  multiplayer.socket.emit('send',{id:id,message:msg});
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
	multiplayer.kill = function(kills){
		multiplayer.socket.emit('dead',kills);
	};

	multiplayer.updateHit = function(stat){
		multiplayer.socket.emit('stat', stat)
	}

	return multiplayer;
}