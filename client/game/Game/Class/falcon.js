
function Falcon(attr) {

	var falcon = {};

	falcon.x = attr.x;
	falcon.y = attr.y;
	falcon.z = attr.z;
	falcon.color = attr.color;
	falcon.speed = attr.speed;
	falcon.hp = attr.hp;
	falcon.maxHP = attr.hp;
	falcon.name = attr.name;
	falcon.objectID = attr.objectID;
	falcon.damage = attr.damage;
	falcon.isCollide = false;
  falcon.bulletFreq = attr.bulletFreq;
	falcon.fired = 0;
	falcon.onTarget = 0;
	falcon.kills = 0;
	falcon.deaths = 0;

	//direction system
	falcon.currentSpeed = 0;
	falcon.spin = 0
	falcon.direction = Math.PI/2;

	//turret system
	falcon.torretY = 0;
	falcon.torretDirection = Math.PI/2;
	falcon.cameraDirection = Math.PI/2;

	//Fire state
	falcon.isFire = false;
	falcon.noFire = false;

	falcon.material = {
		falcon: new THREE.MeshLambertMaterial({ color: falcon.color }),
		hp: new THREE.MeshBasicMaterial({ color: 'green'}),
		reload: new THREE.MeshBasicMaterial({ color: 'blue'})
	};

	falcon.driveSound = new buzz.sound('./Sound/tank-driving-edited.ogg');

	//HP Bar
	falcon.hpbar = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.5), falcon.material.hp );

	//Reload Bar
	falcon.reloadBar = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.5), falcon.material.reload);

	//Reload Sound
	falcon.reloadSound = playTankReload;

	var loader = new THREE.ObjectLoader();
	falcon.tanker = loader.parse(Falcon);
  falcon.tanker.children.forEach(function(part,i){
  	if(i === 1){
			falcon.tanker.children[1].material.color.set(falcon.color);			
  	} else if (i < 5){ // Apply texture to each body, look in children to see order
			falcon.tanker.children[i].material = TankTexture[i];		  	
  	}
  	falcon.tanker.children[i].scale.set(falcon.x, falcon.y, falcon.z);
  	falcon.tanker.children[i].receiveShadow = true;
  	falcon.tanker.children[i].castShadow = true;
  })

  falcon.tanker.children.push(falcon.hpbar)
  falcon.tanker.children.push(falcon.reloadBar)
  attr.onLoad(falcon.tanker);

  falcon.reload = function(){
  	setTimeout(falcon.reloadSound, falcon.bulletFreq - 1200)
  	falcon.reloadBar.scale.z = 0;
  	falcon.reloadBar.material.color.set('red')
  	var loading = function(){
  		if (falcon.reloadBar.scale.z < 1){
	  		falcon.reloadBar.scale.z += 1/(falcon.bulletFreq/(20 - (falcon.bulletFreq - 1200)/160));
  		}
  		if (falcon.reloadBar.scale.z > 0.4 && falcon.reloadBar.scale.z !== 1){
  			falcon.reloadBar.material.color.set('yellow')
  		}
  		if (falcon.reloadBar.scale.z > 0.7 && falcon.reloadBar.scale.z !== 1){
  			falcon.reloadBar.material.color.set('orange')
  		}
  	}
  	var loadingInterval = setInterval(loading, 10)

  	setTimeout(function() {
  		clearInterval(loadingInterval)
  		falcon.reloadBar.material.color.set('blue')
  		falcon.reloadBar.scale.z = 1;
  	}, falcon.bulletFreq - 100)
  }
  
	Tank fire
	falcon.fire = function(direction){
		falcon.reload();
		bullet = Bullet(-Math.sin(direction), -Math.cos(direction), 10, this.tanker.position);
		bullet.bulleter.position.x = this.tanker.position.x - Math.cos(direction)*2;
		bullet.bulleter.position.y = this.tanker.position.y + this.y*2;
		bullet.bulleter.position.z = this.tanker.position.z - Math.sin(direction)*2;
		return bullet;
	};

	//tank flip
	falcon.flip = function(){
		var tankctx = this;
		var flip = setInterval(function(){
			tankctx.tanker.rotation.x += 0.2;
			if(tankctx.tanker.rotation.x > Math.PI/2){
				tankctx.tanker.position.y -= 0.2;
			} else {
				tankctx.tanker.position.y += 0.4;
			}
			if(tankctx.tanker.rotation.x > Math.PI){
				clearInterval(flip);
				tankctx.tanker.position.y = attr.y*2;
			}
		},30)
	}

	falcon.restore = function(){
		this.tanker.rotation.x = 0;
		this.tanker.position.y = 0;
	}

	return tank;
}

