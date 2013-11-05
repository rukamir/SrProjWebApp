/*var scr = document.createElement('script');
scr.type="text/javascript";
scr.src="mapClass.js";
document.getElementsByTagName('head')[0].appendChild(scr);*/
//comment

var map = new Map();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.CubeGeometry(2,2,2);

for ( var i = 0; i < 7; i ++ ) {

	var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, transparent: true, opacity: 0.5 } ) );
	object.position.x = Math.random() * 40 - 20;
	object.position.y = Math.random() * 40 - 20;
	object.position.z = -13;
	object.scale.x = Math.random() * 2 + 1;
	object.scale.y = Math.random() * 2 + 1;
	object.scale.z = Math.random() * 2 + 1;
	object.rotation.x = Math.random() * 2 * Math.PI;
	object.rotation.y = Math.random() * 2 * Math.PI;
	object.rotation.z = Math.random() * 2 * Math.PI;
	scene.add( object );
}

map.addToScene(scene);
var placeHere = new THREE.Vector3();
placeHere.y = 2;
placeHere.z = 2;
map.addHazard(1, placeHere);


camera.position.z = 5;

//document
var lastVector = new THREE.Vector3(0, 0, 0);
var curVector = new THREE.Vector3(0, 0, 0);
var rotation = new THREE.Vector3(0, 0, 0);
var idMatrix = new THREE.Matrix4();
function onDocumentMouseDown( event ){
	curVector.x = event.clientX;
	curVector.y = event.clientY;
	//rotation.addScalar(0);
	rotation.x = 0;
	rotation.y = 0;
	rotation.z = 0;
	
	// Apply identity to sphere and map objects
	//cube.applyMatrix( new idMatrix );
	
	var rateOfRotation = 5;

	if (curVector.x > lastVector.x){
		rotation.y += rateOfRotation;
	} else if (curVector.x < lastVector.x){
		rotation.y -= rateOfRotation;
	}
	
	if (curVector.y > lastVector.y){
		rotation.x += rateOfRotation;
	} else if (curVector.y < lastVector.y){
		rotation.x -= rateOfRotation;
	}
	
	var rotMatX = new THREE.Matrix4();
	var rotMatY = new THREE.Matrix4();
	rotMatX.makeRotationX(rotation.x * (Math.PI/180));
	rotMatY.makeRotationY(rotation.y * (Math.PI/180));
	var projMat = camera.projectionMatrix;
	
	var perMat = new THREE.Matrix4();
	perMat.makePerspective(camera.fov, camera.aspect, camera.near, camera.far);
	
	// order of matrix math Scale*Rotation*Translation*view*proj
	var comboMat = new THREE.Matrix4();
	//comboMat.multiply(projMat);
	//comboMat.multiply(perMat);
	comboMat.multiply(rotMatY);
	comboMat.multiply(rotMatX);
	//cube.applyMatrix(comboMat);//*/
	//sphere.applyMatrix(comboMat);
	map.applyMatrix(comboMat);
	
	// Assign this frames mouse pos to global vector var
	lastVector = new THREE.Vector3(curVector.x, curVector.y, curVector.z);
}

// Events
document.addEventListener( 'mousemove', onDocumentMouseDown, false );
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
