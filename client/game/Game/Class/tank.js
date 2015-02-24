
function Tank(attr) {

	var tank = {};

	tank.x = attr.x;
	tank.y = attr.y;
	tank.z = attr.z;
	tank.color = attr.color;
	tank.speed = attr.speed;
	tank.hp = attr.hp;
	tank.damage = attr.damage;
	tank.isCollide = false;
	tank.bulletFreq = attr.bulletFreq;

	//direction system
	tank.currentSpeed = 0;
	tank.spin = 0
	tank.direction = Math.PI/2;

	//turret system
	tank.torretY = 0;
	tank.torretDirection = Math.PI/2;
	tank.cameraDirection = Math.PI/2;

	//Fire state
	tank.isFire = false;
	tank.noFire = false;

	tank.material = {
		tank: new THREE.MeshLambertMaterial({ color: tank.color })
	};

	tank.driveSound = new buzz.sound('./Sound/tank-driving-edited.ogg');

	// ====== Cube building (Legacy Code) ======
	// tank.tanker = new THREE.Mesh(new THREE.BoxGeometry(tank.x, tank.y, tank.z), tank.material.tank );

	// Position Cube
	// tank.tanker.position.y = tank.y/2;

	var loader = new THREE.ObjectLoader();
	tank.tanker = loader.parse(GermanTank);
  tank.tanker.children.forEach(function(part,i){
  	if(i === 1){
			tank.tanker.children[1].material.color.set(tank.color);			
  	} else if (i < 5){
			tank.tanker.children[i].material = TankTexture[i];		  	
  	}
  	tank.tanker.children[i].scale.set(tank.x, tank.y, tank.z);
  	tank.tanker.children[i].receiveShadow = true;
  	tank.tanker.children[i].castShadow = true;
  })

  attr.onLoad(tank.tanker);
	// Tank fire
	tank.fire = function(direction){
		bullet = Bullet(-Math.sin(direction), -Math.cos(direction), 10, this.tanker.position);
		bullet.bulleter.position.x = this.tanker.position.x - Math.cos(direction)*2;
		bullet.bulleter.position.y = this.tanker.position.y + this.y*2;
		bullet.bulleter.position.z = this.tanker.position.z - Math.sin(direction)*2;
		return bullet;
	};

	//tank flip
	tank.flip = function(){
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

	tank.restore = function(){
		this.tanker.rotation.x = 0;
		this.tanker.position.y = 0;
	}

	return tank;
}

