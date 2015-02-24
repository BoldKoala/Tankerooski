function createOBJ(x, y, z) {
  var OBJ = {};

  var loader = new THREE.ObjectLoader();

  OBJ.model = loader.parse(CastleTower);
  OBJ.model.scale.set(0.02, 0.02, 0.02);
  OBJ.model.children[0].material  = TowerTexture[3];
  OBJ.model.children[1].material  = TowerTexture[3];
  OBJ.model.children[2].material  = TowerTexture[3];
  OBJ.model.children[3].material  = TowerTexture[3];
  OBJ.model.children[4].material  = TowerTexture[1];
  OBJ.model.children[5].material  = TowerTexture[0];
  OBJ.model.children[6].material  = TowerTexture[1];
  OBJ.model.children[7].material  = TowerTexture[3];
  OBJ.model.children[8].material  = TowerTexture[1];
  OBJ.model.children[9].material  = TowerTexture[2];
  OBJ.model.children[10].material = TowerTexture[4];
  OBJ.model.children[11].material = TowerTexture[3];
  OBJ.model.position.x = x;
  OBJ.model.position.y = y;
  OBJ.model.position.z = z;

  OBJ.model.castShadow = true;

  for(var i = 0; i<OBJ.model.children.length; i++){
    OBJ.model.children[i].castShadow = true;
  }
    
  // ======= Collison ========
  OBJ.collisionSize = 3;

  return OBJ;
}


















