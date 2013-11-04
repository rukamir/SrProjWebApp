// Ship class
function Ship(){
    this.geometry = new THREE.SphereGeometry(0.3,16,6);
    this.materials = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.mesh = new THREE.Mesh( this.geometry, this.materials );
    this.offsetPos = this.mesh.position;// = new THREE.Vector3();
    
    // Assign ship position
    this.offsetPos.x = -2;
    
    // Functions
    /*this.setPosition = function(x, y, z){
        this.offsetPos.x = x;
        this.offsetPos.y = y;
        this.offsetPos.z = z;
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }*/
}

// Hazard class
function Hazard(type, pos){
    this.type = type;
    this.geometry;// = new THREE.SphereGeometry(0.3,16,6);
    this.materials;// = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    
    // Constructs correct color and graphics for hazard type
    switch(type){
        case 0:
            this.geometry = new THREE.SphereGeometry(0.1,16,6);
            this.materials = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            break;
        case 1:
            this.geometry = new THREE.SphereGeometry(0.1,16,6);
            this.materials = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            break;
        case 2:
            this.geometry = new THREE.SphereGeometry(0.1,16,6);
            this.materials = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            break;
        case 3:
            this.geometry = new THREE.SphereGeometry(0.1,16,6);
            this.materials = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            break;
        default:
            assert("Hazard type invalid!");
    }
    this.mesh = new THREE.Mesh( this.geometry, this.materials );
    this.offsetPos = this.mesh.position;// = new THREE.Vector3();
    this.offsetPos = pos;
}

// Map class
function Map(){
    
    this.hazardList = new Array();
    // Map graphics
    this.geometry = new THREE.CubeGeometry(3.5, 3.5, 3.5);
    this.materials = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5  } );
    this.mesh = new THREE.Mesh( this.geometry, this.materials );
    this.position = this.mesh.position;//new THREE.Vector3();
    
    // Ship
    this.ship = new Ship();
    
    // Functions
    this.createMesh = function(){mesh = new THREE.Mesh( geometry, materials );}
    this.setShipPos = function(pos){ship.position = pos;}
    this.addHazard = function(type, pos){
        var haz = new Hazard(type, pos);
        hazardList[ hazardList.length ] = haz;
        }
    this.addToScene = function(scene){
            scene.add(this.mesh);
            scene.add(this.ship.mesh);
        }
    this.applyMatrix = function( matrix ){
            //
            //this.ship.mesh.matrix.getInverse(this.ship.mesh.matrix);
            //this.mesh.matrix.getInverse(this.mesh.matrix);
            //
            
            // Assign ship position
            this.ship.position;// = -2;
        
            var translation = new THREE.Matrix4();
            //translation.makeTranslation(this.ship.offsetPos.x, this.ship.offsetPos.y, this.ship.offsetPos.z);
            //this.ship.offsetPos.applyMatrix4(translation);
            this.ship.offsetPos.applyMatrix4( matrix );
            this.mesh.applyMatrix( matrix );
            this.ship.mesh.applyMatrix( matrix.multiply(translation) );
        }
//*/
}