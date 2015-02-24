function init(){

  //Global Variables
  var HEIGHT = window.innerHeight;
  var WIDTH = window.innerWidth;
  var POV = 'Birdeye';
  var LOCK = true;
  var INITIAL = true;

  //Instantiate Camera and Renderer
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
  var renderer = new THREE.WebGLRenderer({antialias: true});


  //Instantiate game assets
  var map = Map(60,60,1,0.5);
  var tanks = {};
  var bullets = [];

  //Add Multiplayer 
  var multiplayer = Multiplayer(map,tanks,bullets);
  var socket = multiplayer.socket;

  var testTower1 = createOBJ(0,0,0);
  var testTower2 = createOBJ(map.x/4, 0, map.y/4);
  var testTower3 = createOBJ(map.x/4, 0, -map.y/4);
  var testTower4 = createOBJ(-map.x/4, 0, map.y/4);
  var testTower5 = createOBJ(-map.x/4, 0, -map.y/4);
  var towers = {
    tower1: testTower1,
    tower2: testTower2,
    tower3: testTower3,
    tower4: testTower4,
    tower5: testTower5
  }
  for(var tower in towers){
    map.scene.add(towers[tower].model);
  }

  //Set renderer size
  renderer.setSize( WIDTH, HEIGHT );
  renderer.shadowMapEnabled = true;
  // renderer.shadowMapType = THREE.BasicShadowMap;
  // renderer.shadowMapSoft = true;

  //Initialize Camera
  camera.position.y = 40;
  camera.position.x = 0; 
  camera.position.z = 0;
  camera.lookAt({x:0, y:0, z:0});

  //Append canvas element to body;
  document.body.appendChild( renderer.domElement );

  //Add control handler
  window.onkeydown = function(d){
    //Tank Control
    if(tanks._id && tanks[tanks._id].tanker && tanks[tanks._id].hp > 0){
      if(tanks[tanks._id].hp > 0){
        keyDown(d, tanks);
      }
    }
    //POV Control
    //V key
    if (d.keyCode === 86){
      POV = POV === 'FPS' ? 'Birdeye' : 'FPS';
    } 
  };

  window.onkeyup = function(d){
    //Tank Control
    if(tanks._id && tanks[tanks._id].tanker  && tanks[tanks._id].hp > 0){
      if(tanks[tanks._id].hp > 0){
        keyUp(d,tanks);
      }
    }
  };

  document.getElementById('tank-color').addEventListener('click',function(){
      POV = POV === 'FPS' ? 'Birdeye' : 'FPS';
  })

  document.getElementsByTagName('canvas')[0].addEventListener('click',function(d){
    tanks[tanks._id].currentSpeed = tanks[tanks._id].currentSpeed ? 0 :-tanks[tanks._id].speed;
  })

  //Invoke Rendering function
  render();

  // ====================== Utility Functions =======================

  // Start of render and animation
  function render() {
    requestAnimationFrame(render);
    timer = Date.now()
    map.sky.rotation.z += 0.00025;
    if(tanks._id && tanks[tanks._id].tanker){
      //HP Bar
      if(INITIAL){ 
        document.getElementById('tank-color').style.backgroundColor = tanks[tanks._id].color;
        document.getElementById('tank-hp').innerHTML = tanks[tanks._id].hp;
        document.getElementById('loading').style.display = 'none'; 
        INITIAL = false;
      }
      if(tanks[tanks._id].tanker){
        updateBullets();
        updateTanks();
        updatePOV();
        playDriveSound();
        renderer.render(map.scene, camera);
        syncStates();
        updateBulletsFired();
      } 
    }
  };

  //Play sound of other tanks
  function playDriveSound(){
    for (var tankKey in tanks){
      if (tankKey !== "_id" && tankKey !== tanks._id){
        var dxdz = calculateCurrentDistance(tanks[tanks._id], tanks[tankKey]);

        tanks[tankKey].driveSound.setVolume(100-((dxdz/50)*100))
        if(tanks[tankKey].isDriving){
          tanks[tankKey].driveSound.loop().play();
        } else {
          tanks[tankKey].driveSound.pause();
        }
      }
    }
  };

  //Calculate Tank Collision
  function isTankCollide(){
    for (var tankKey in tanks){
      if (tankKey !== "_id" && tankKey !== tanks._id){
        if (calculateCurrentDistance(tanks[tanks._id], tanks[tankKey]) <= tanks[tanks._id].x * 5){
        } else if (calculateNextDistance(tanks[tanks._id], tanks[tankKey]) < tanks[tanks._id].x * 5.1 && tanks[tankKey].hp > 0){
          tanks[tanks._id].tanker.position.x -= Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed*1.1;
          tanks[tanks._id].tanker.position.z -= Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed*1.1;
        }
      }
    }
  };


  //Calculate Tower Collision
  function isTowerCollide () {
    var tankCollision = false;

    for (var towerKey in towers){
      if (calculateCurrentTowerDistance(tanks[tanks._id], towers[towerKey]) <= towers[towerKey].collisionSize - 0.17){
        tankCollision = false;
      } else if (calculateNextTowerDistance(tanks[tanks._id], towers[towerKey]) < towers[towerKey].collisionSize){
        tanks[tanks._id].tanker.position.x -= Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
        tanks[tanks._id].tanker.position.z -= Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
        tankCollision = towers[towerKey];
      }
    }
    if (tankCollision){
      if (Math.abs(tanks[tanks._id].tanker.position.x - tankCollision.model.position.x) <= Math.abs(tanks[tanks._id].tanker.position.z - tankCollision.model.position.z)) {
        if (Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2-tanks[tanks._id].x*5){
          tanks[tanks._id].tanker.position.x += Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
        }
        if (!tankCollision && Math.abs(tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.y/2-tanks[tanks._id].z*5){
          tanks[tanks._id].tanker.position.z += Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed
        }
      }
      if (Math.abs(tanks[tanks._id].tanker.position.x - tankCollision.model.position.x) >= Math.abs(tanks[tanks._id].tanker.position.z - tankCollision.model.position.z)){
        if (!tankCollision && Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2-tanks[tanks._id].x*5){
          tanks[tanks._id].tanker.position.x += Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
        }
        if (Math.abs(tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.y/2-tanks[tanks._id].z*5){
          tanks[tanks._id].tanker.position.z += Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed
        }
      }
    } else {
      if (Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2-tanks[tanks._id].x*5){
        tanks[tanks._id].tanker.position.x += Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
      }
      if (!tankCollision && Math.abs(tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.y/2-tanks[tanks._id].z*5){
        tanks[tanks._id].tanker.position.z += Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed
      }
    }
  };

  //Calculate bullets movement and collision
  function updateBullets() {
    for(var i = 0; i<bullets.length; i++){
      
      bullets[i].move();
      bullets[i].hit(tanks,towers,function(from, to, bullet){
        if(to === tanks._id){
          multiplayer.hit(from,to);
          tanks[tanks._id].hp--;
          if(tanks[tanks._id].hp === 0){
            tanks[tanks._id].flip();
            tanks[tanks._id].spin = 0;
            tanks[tanks._id].currentSpeed = 0;
            tanks[tanks._id].isFire = false;
            tanks[tanks._id].torretY = 0;
            tanks[tanks._id].torretX = 0;
            document.getElementById('tank-hp').innerHTML = tanks[tanks._id].hp;
            document.getElementById('dead').style.display = 'inline-block';          
            multiplayer.kill(tanks._id);
            setTimeout(function(){
              tanks[tanks._id].hp = 10;
              INITIAL = true;
              document.getElementById('dead').style.display = 'none';   
              tanks[tanks._id].restore();       
            },5000)
          } else if(to !== 'Tower'){
            console.log(from+" hit "+to);
            document.getElementById('tank-hp').innerHTML = tanks[tanks._id].hp;
          }
        }

        bullet.explosion(function(cube){
          map.scene.add(cube.spark);
          cube.move(10,150,function(movedCube){
            map.scene.remove(movedCube.spark);
          });
        });

        map.scene.remove(bullet.bulleter);
      })
    }
  };

  //Calculate tank movements
  function updateTanks() {
    if(tanks._id){
      //Calculate direcitons, rotations
      var dx = Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
      var dz = Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;

      tanks[tanks._id].direction += tanks[tanks._id].spin;
      tanks[tanks._id].torretDirection += tanks[tanks._id].torretY;
      tanks[tanks._id].cameraDirection += tanks[tanks._id].spin+tanks[tanks._id].torretY;

      if(tanks[tanks._id].currentSpeed !== 0){
        tanks[tanks._id].isDriving = true;
        tanks[tanks._id].driveSound.loop().play();
      } else {
        tanks[tanks._id].isDriving = false;
        tanks[tanks._id].driveSound.pause();
      }

      tanks[tanks._id].tanker.rotation.y = -tanks[tanks._id].direction;
      tanks[tanks._id].tanker.children[2].rotation.y = -tanks[tanks._id].torretDirection + Math.PI;

      //Position is updated in isTowerCollide
      isTowerCollide();

      //Bounce back if tank collide
      isTankCollide();
    }
  };

  //FPS
  function updatePOV() {
    if(tanks._id){
      if(POV === 'FPS'){ 
        var dxCam = Math.cos(tanks[tanks._id].cameraDirection)
        var dzCam = Math.sin(tanks[tanks._id].cameraDirection)

        var dx = (tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].cameraDirection)*5) - camera.position.x;
        var dy = (tanks[tanks._id].tanker.position.y + 2) - camera.position.y;
        var dz = (tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].cameraDirection)*5) - camera.position.z;
        var rx = 0 - camera.rotation.x;
        var ry = (Math.PI/2-tanks[tanks._id].cameraDirection) - camera.rotation.y;
        var rz = 0 - camera.rotation.z;

        if(LOCK){
          camera.position.x = tanks[tanks._id].tanker.position.x + dxCam*tanks[tanks._id].x*12;
          camera.position.y = tanks[tanks._id].tanker.position.y + tanks[tanks._id].y * 6;
          camera.position.z = tanks[tanks._id].tanker.position.z + dzCam*tanks[tanks._id].z*12;
          camera.rotation.x = 0;
          camera.rotation.y = Math.PI/2-tanks[tanks._id].cameraDirection;
          camera.rotation.z = 0;
        } else if(Math.abs(dx) < 1.2 && Math.abs(dy) < 1.2 && Math.abs(dz) < 1.2){
          LOCK = true;
        } else if(!LOCK){ 
          camera.position.y += dy/20;
          camera.position.x += dx/20; 
          camera.position.z += dz/20; 
          camera.rotation.x += rx/10;
          camera.rotation.y += ry/10;
          camera.rotation.z += rz/10;
        }
      } else if (POV === 'Birdeye') {
        var dx =  0 - camera.position.x;
        var dy =  40 - camera.position.y;
        var dz =  0 - camera.position.z;
        var rz = Math.PI/2 - camera.rotation.z;
        var rx = -Math.PI/2 - camera.rotation.x;
        var ry = 0 - camera.rotation.y;
        LOCK = false;
        if(Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(dz) < 0.05){
          camera.position.y = 40;
          camera.position.x = 0; 
          camera.position.z = 0;
          camera.lookAt({x:0, y:0, z:0});
        } else { 
          camera.position.y += dy/100;
          camera.position.x += dx/100; 
          camera.position.z += dz/100; 
          camera.rotation.y += ry/25;
          camera.rotation.x += rx/25;
          camera.rotation.z += rz/25;
        }
      }
    }
  };

  //Send tank position and rotation to other players
  function syncStates() {
    if(tanks._id){
      multiplayer.sync(
        {
          x: tanks[tanks._id].tanker.position.x,
          y: tanks[tanks._id].tanker.position.y,
          z: tanks[tanks._id].tanker.position.z,
          rx: tanks[tanks._id].tanker.rotation.x,
          ry: tanks[tanks._id].tanker.rotation.y,
          rz: tanks[tanks._id].tanker.rotation.z,
          color:tanks[tanks._id].color,
          id: tanks._id,
          isDriving: tanks[tanks._id].isDriving,
          torretY: tanks[tanks._id].tanker.children[2].rotation.y
        }
      );
    }
  };

  //Bullet logics
  function updateBulletsFired() {
    if(tanks._id){
      if(tanks[tanks._id].isFire && !tanks[tanks._id].noFire){
        tanks[tanks._id].noFire = true;
        var bullet = tanks[tanks._id].fire(tanks[tanks._id].cameraDirection);
        bullet._id = tanks._id;
        bullets.push(bullet);
        bullet.fireSound(100);
        map.scene.add(bullet.bulleter);
        multiplayer.fire({
          x: bullet.bulleter.position.x,
          y: bullet.bulleter.position.y,
          z: bullet.bulleter.position.z,
          direction: tanks[tanks._id].cameraDirection,
          id: bullet._id
        })
        setTimeout(function(){
          tanks[tanks._id].noFire = false;
        },2000)
        setTimeout(function(){
          map.scene.remove(bullets.shift().bulleter);
        },1000)
      }
    }
  };

  function calculateNextDistance(tank1, tank2){
    if(tank1.tanker && tank2.tanker){
      x1 = tank1.tanker.position.x + Math.cos(tank1.direction) * tank1.currentSpeed;
      x2 = tank2.tanker.position.x;
      z1 = tank1.tanker.position.z + Math.sin(tank1.direction) * tank1.currentSpeed;
      z2 = tank2.tanker.position.z;
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
    }
  };

  function calculateCurrentDistance(tank1, tank2){
    if(tank1.tanker && tank2.tanker){   
      x1 = tank1.tanker.position.x;
      x2 = tank2.tanker.position.x;
      z1 = tank1.tanker.position.z;
      z2 = tank2.tanker.position.z;
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
    }
  };

  function calculateNextTowerDistance(tank, tower){
    if(tank.tanker && tower.model){   
      x1 = tank.tanker.position.x + Math.cos(tank.direction) * tank.currentSpeed;
      x2 = tower.model.position.x;
      z1 = tank.tanker.position.z + Math.sin(tank.direction) * tank.currentSpeed;
      z2 = tower.model.position.z;
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
    }
  };

  function calculateCurrentTowerDistance(tank, tower){
    if(tank.tanker && tower.model){
      x1 = tank.tanker.position.x;
      x2 = tower.model.position.x;
      z1 = tank.tanker.position.z;
      z2 = tower.model.position.z;
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
    }
  };
  
};

init();
