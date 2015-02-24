function Bullet(dir1, dir2, speed, position) {
  var bullet = {};

  bullet.radius = 0.2;
  bullet.speed = speed;
  bullet.zSpeed = dir1 * speed;
  bullet.xSpeed = dir2 * speed;
  bullet.isHit = false;
  bullet.hitTower = false;

  bullet.material = {
    bullet: new THREE.MeshBasicMaterial({ color: 'red' })
  };


  bullet.fireSound = playTankFire;

  // ======>> Bullet building
  bullet.bulleter = new THREE.Mesh(new THREE.SphereGeometry(bullet.radius), bullet.material.bullet );

  bullet.move = function(){
    if (!this.hitTower){
      this.bulleter.position.z += this.zSpeed/10;
      this.bulleter.position.x += this.xSpeed/10;
    }
  };

  bullet.hit = function(tanks,towers,cb){
    if(tanks[tanks._id] && tanks[tanks._id].tanker){
      for(var tank in tanks){
        if(tank !== '_id' && tanks[tank].tanker){
          var dx = Math.abs(tanks[tank].tanker.position.x - this.bulleter.position.x) - (tanks[tank].x*5)/2.5;
          var dy = Math.abs(tanks[tank].tanker.position.y - this.bulleter.position.y) - (tanks[tank].x*5)/2.5;
          var dz = Math.abs(tanks[tank].tanker.position.z - this.bulleter.position.z) - (tanks[tank].x*5)/2.5;
          if(dx < tanks[tank].x && dy < tanks[tank].y && dz < tanks[tank].z && !this.isHit){
            this.isHit = true;
            // bulletExplosion(this.bulleter.position.x, this.bulleter.position.y, this.bulleter.position.z);
            cb(this._id, tank, this);
          }
        }
      }
      for (var towerKey in towers){
        var dx = Math.abs(towers[towerKey].model.position.x - this.bulleter.position.x);
        var dy = Math.abs(towers[towerKey].model.position.y - this.bulleter.position.y);
        var dz = Math.abs(towers[towerKey].model.position.z - this.bulleter.position.z);
        if(dx < towers[towerKey].collisionSize/1.9 && dy < towers[towerKey].collisionSize/1.9 && dz < towers[towerKey].collisionSize/1.9 && !this.hitTower){
          this.hitTower = true;
          // bulletExplosion(this.bulleter.position.x, this.bulleter.position.y, this.bulleter.position.z);
          cb(this._id, 'Tower', this);
        }
      }
    }
  }

  bullet.explosion = function(callback){
    var cubes = [];
    var cubeGeometry = new THREE.BoxGeometry( 0.025, 0.025, 0.025 )
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: "orange"
    });
    
    for (var i = 0; i < 50; i++){
      var cube = {};
      cube.spark = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.spark.position.x = this.bulleter.position.x;
      cube.spark.position.y = this.bulleter.position.y;
      cube.spark.position.z = this.bulleter.position.z;
      cube.move = function(intv,time, callback){
        var randomDirection = {
          dx : (2 * Math.random() - 1)/4,
          dy : (2 * Math.random() - 1)/4,
          dz : (2 * Math.random() - 1)/4
        }
        var ctx = this;
        var moving = setInterval(function(){
          ctx.spark.position.x += randomDirection.dx;
          ctx.spark.position.y += randomDirection.dy;
          ctx.spark.position.z += randomDirection.dz;
        },intv);

        setTimeout(function(){
          clearInterval(moving);
          callback(ctx);
        }, time)
      };

      callback(cube);

      cubes.push(cube);
    }
    return cubes;
  }

  return bullet;
}
