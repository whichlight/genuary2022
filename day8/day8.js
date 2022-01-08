/*
day 8: single curve only    

*/

const MeshLine = require('meshline').MeshLine;
const MeshLineMaterial = require('meshline').MeshLineMaterial;
const MeshLineRaycast = require('meshline').MeshLineRaycast;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 300, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();

//light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.castShadow = true; 
directionalLight.position = new THREE.Vector3(0,-1,0);

scene.add( directionalLight );



//line

const points = [];
for (let j = 0; j < 20*Math.PI; j += (2 * Math.PI) / 100) {
  let r = 20*Math.PI - j; 
  points.push(r*Math.cos(j), r*Math.sin(j), j);
}

const line = new MeshLine();
line.setPoints(points, p => 2);

const material = new MeshLineMaterial({ color: 0xff00ff } );



const mesh = new THREE.Mesh(line, material);
mesh.raycast = THREE.MeshLineRaycast;
scene.add( mesh );


//aframe
AFRAME.registerComponent('spiraloo', {
    
  
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
      var data = this.data;
      var el = this.el;
  
      // Create geometry.
      //this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
      const points = [];
for (let j = 0; j < 20*Math.PI; j += (2 * Math.PI) / 100) {
  let r = 20*Math.PI - j; 
  points.push(r*Math.cos(j), j-10,r*Math.sin(j));
}

this.line = new MeshLine();
line.setPoints(points, p => 2);
  
      // Create material.
      //this.material = new THREE.MeshStandardMaterial({color: data.color});
      this.material = new MeshLineMaterial({ color: 0xff00ff } );


      // Create mesh.
      //this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh = new THREE.Mesh(line, material);

  
      // Set mesh on entity.
      el.setObject3D('mesh', this.mesh);
    }
  });




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}


window.onload = function(){
    document.body.appendChild( renderer.domElement );
    animate();
}

