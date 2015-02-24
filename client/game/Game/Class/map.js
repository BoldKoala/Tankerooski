function Map(x, y, step, brightness) {
	
	var map = {};

	map.scene      = new THREE.Scene();
	map.x          = x;
	map.y          = y;
	map.step       = step;
	map.brightness = brightness;

	// ====== Materials =======
	map.material = {
		sky : new THREE.MeshBasicMaterial({ 
			map: THREE.ImageUtils.loadTexture('./Model/Map/sky.jpg')
		}),
		floor : MapTexture,
		wall : WallTexture,
		line  : new THREE.LineBasicMaterial({color: 'green'}),
		tank  : new THREE.MeshLambertMaterial({color:'blue'})
	};

	// ====== Floor building ========
	map.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(map.x,map.y), map.material.floor);
	map.floor.rotation.x = -Math.PI/2;
	map.floor.receiveShadow = true;
	map.scene.add(map.floor);

	// ====== Wall building ========
	map.walls = [
	{x:1,y:5,z:61, positionX: map.x/2, positionZ: 0},
	{x:1,y:5,z:61, positionX: -map.x/2, positionZ: 0},
	{x:61,y:5,z:1, positionX: 0, positionZ: map.y/2},
	{x:61,y:5,z:1, positionX: 0, positionZ: -map.y/2}]

	for(var i = 0; i<map.walls.length; i++){
		var wall = new THREE.Mesh(new THREE.BoxGeometry(map.walls[i].x,map.walls[i].y,map.walls[i].z), map.material.wall);
		wall.receiveShadow = true;
		wall.castShadow = true;
		wall.position.x = map.walls[i].positionX;
		wall.position.z = map.walls[i].positionZ;
		wall.position.y = 0.5;
		map.scene.add(wall);
	}

	// ====== Sky building ========
	map.sky = new THREE.Mesh(new THREE.SphereGeometry(100,32,32), map.material.sky);
	map.sky.material.side = THREE.DoubleSide;
	map.sky.rotation.x = 14.12;
	map.sky.position.y = -8;
	map.scene.add(map.sky);

	// ======>> Add light source
	map.light  = new THREE.SpotLight(0xffffff,map.brightness);
	map.light.position.set(60,60,0);
	map.light.castShadow = true;
	// map.light.shadowCameraVisible = true;
	map.light.shadowDarkness = 0.35;
	map.light.shadowCameraFar = 1000;
	// map.light.shadowCameraNear = 0.1;

	map.scene.add(map.light);
	map.scene.add(new THREE.AmbientLight(0x666666));

	return map;
}




