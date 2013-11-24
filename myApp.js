/*var scr = document.createElement('script');
scr.type="text/javascript";
scr.src="mapClass.js";
document.getElementsByTagName('head')[0].appendChild(scr);*/
//comment
var socket = new WebSocket("ws://localhost:8000/socket/server/startDaemon.php"); 


var map = new Map();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x000000, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// ray caster
//var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

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
// Set up socket onmessage event
socket.onmessage = function(msg){
		switch (msg.packetId)
		{
		case 0:
			map.setShipPos(msg.pos);
			break;
		case 1:
			map.addHazard(msg.id, msg.pos, msg.type);
			break;
		case 2:
			map.updateHazard(msg.id, msg.pos);
			break;
		case 3:
			map.deleteHazrad(msg.id);
			break;
		default:
			assert("Bad message received!");
		}
	}
var placeHere = new THREE.Vector3();
placeHere.y = 2;
placeHere.z = 2;
map.addHazard(0, placeHere, 1);


camera.position.z = 5;

// Events
//document.addEventListener( 'mousemove', onDocumentMouseDown, false );
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}
projector = new THREE.Projector();
function onDocumentMouseDown( event ) {
	
	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, camera );
	
	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	
	var intersects = raycaster.intersectObjects( scene.children );
	var pt = intersects[0].point;
	
	map.addHazard(0, pt, 2);
}
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
//document.addEventListener( 'resize', onWindowResize, false );

//document
var lastVector = new THREE.Vector3(0, 0, 0);
var curVector = new THREE.Vector3(0, 0, 0);
var rotation = new THREE.Vector3(0, 0, 0);
var idMatrix = new THREE.Matrix4();
var rateOfRotation = 8;
// Key press events
function checkKey(e) {
	rotation.x = 0;
	rotation.y = 0;
	rotation.z = 0;

    e = e || window.event;

    if (e.keyCode == '87') {
        // w
		rotation.x -= rateOfRotation;
		
    }
    else if (e.keyCode == '83') {
        // s
		rotation.x += rateOfRotation;
    }
	else if (e.keyCode == '65') {
		// a
		rotation.y -= rateOfRotation;
	}
	else if (e.keyCode == '68') {
		// d
		rotation.y += rateOfRotation;
	}//*/
	
	var rotMatX = new THREE.Matrix4();
	var rotMatY = new THREE.Matrix4();
	rotMatX.makeRotationX(rotation.x * (Math.PI/180));
	rotMatY.makeRotationY(rotation.y * (Math.PI/180));
	var projMat = camera.projectionMatrix;
	
	var perMat = new THREE.Matrix4();
	perMat.makePerspective(camera.fov, camera.aspect, camera.near, camera.far);
	
	// order of matrix math Scale*Rotation*Translation*view*proj
	var comboMat = new THREE.Matrix4();
	comboMat.multiply(rotMatY);
	comboMat.multiply(rotMatX);
	map.applyMatrix(comboMat);
}
document.onkeypress = checkKey;

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
socket.close();