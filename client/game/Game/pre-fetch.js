// ===================== Pre-fetch Tower Texture =====================
var TowerTexture = [];

var objUrl = [
  './Model/Objects/castle-tower.scene/DRIFTWD.JPG', 
  './Model/Objects/castle-tower.scene/wall.JPG', 
  './Model/Objects/castle-tower.scene/PLATEOX2.JPG', 
  './Model/Objects/castle-tower.scene/STUCCO8.JPG', 
  './Model/Objects/castle-tower.scene/TUTSHNGL.JPG'
];

var OBJTexture = function(i){
  var texture = THREE.ImageUtils.loadTexture(objUrl[i]);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 0.5, 0.5 );

  return new THREE.MeshLambertMaterial({ 
    map: texture
  })
};

objUrl.forEach(function(url,i){
  TowerTexture[i] = OBJTexture(i);
});


// ===================== Pre fetch Map =====================
var mapTexture = function(url){
  var mapTexture = THREE.ImageUtils.loadTexture(url);

  return new THREE.MeshPhongMaterial({ 
    map: mapTexture
  })
};


var MapTexture = mapTexture('./Model/Map/DirtGroundCracks.jpg');

//pre fetch wall
var wallTexture = function(url){
  var mapTexture = THREE.ImageUtils.loadTexture(url);
      mapTexture.wrapS = THREE.RepeatWrapping;
      mapTexture.wrapT = THREE.RepeatWrapping;
      mapTexture.repeat.set( 61, 5 );

  return new THREE.MeshLambertMaterial({ 
    map: mapTexture
  })
};

var WallTexture = wallTexture('./Model/Map/newMapTexture.jpg');



// ===================== Pre-fetch Tower Texture =====================
var TankTexture = [];
var tankUrl = [
  './Model/German-Tank/Track.jpg', 
  './Model/German-Tank/Turret.jpg',
  './Model/German-Tank/Turret 2.jpg',
  './Model/German-Tank/Body 2.jpg',
  './Model/German-Tank/Body 1.jpg'
];

var tankTexture = function(i){
  return new THREE.MeshLambertMaterial({ 
    map: THREE.ImageUtils.loadTexture(tankUrl[i])
  })
}

tankUrl.forEach(function(url,i){
  TankTexture[i] = tankTexture(i);
})

// ===================== Pre-fetch Falcon Texture =====================
var FalconTexture = [];
var falconUrl = [
  './Model/Falcon/Cockpit2.jpg', 
  './Model/Falcon/Cockpit3.jpg',
  './Model/Falcon/CP_Front.jpg',
  './Model/Falcon/Dish01.jpg',
  './Model/Falcon/Dish02.jpg',
  './Model/Falcon/DishSide.jpg', 
  './Model/Falcon/DrivBack.jpg',
  './Model/Falcon/Engine01.jpg',
  './Model/Falcon/Engine02.jpg',
  './Model/Falcon/EscPod_L.jpg',
  './Model/Falcon/EscPod_U.jpg', 
  './Model/Falcon/FalcPlan.jpg',
  './Model/Falcon/FalcUndr.jpg',
  './Model/Falcon/Hatch.jpg',
  './Model/Falcon/M_Inside.jpg',
  './Model/Falcon/MandbEnd.jpg', 
  './Model/Falcon/PodSide1.jpg',
  './Model/Falcon/SidePort.jpg',
  './Model/Falcon/SideRe01.jpg',
  './Model/Falcon/SideRear.jpg',
  './Model/Falcon/Turret_L.jpg',
  './Model/Falcon/Turret_U.jpg',
  './Model/Falcon/Vent01.jpg'
];

var falconTexture = function(i){
  return new THREE.MeshLambertMaterial({ 
    map: THREE.ImageUtils.loadTexture(falconUrl[i])
  });
};

falconUrl.forEach(function(url,i){
  FalconTexture[i] = falconTexture(i);
});

// ===================== Pre-fetch sound =====================
var tankFire = [];
for(var j = 0; j<10; j++){
  tankFire.push(new buzz.sound('./Sound/tank-fire.mp3'));
};

var tfcounter = 0;
var playTankFire = function(proximity){
  proximity = proximity || 100;

  tankFire[tfcounter++].setVolume(proximity).play();
  if(tfcounter === 10){
    tfcounter = 0;
  }
}
// ===================== Pre-fetch Reload Sound =====================
var tankReload = new buzz.sound('./Sound/reload.mp3');

var playTankReload = function(){
  tankReload.play();
}

