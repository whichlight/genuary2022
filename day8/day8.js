/*
day 8: single curve only    
*/
const MeshLine = THREE.MeshLine;
const MeshLineMaterial = THREE.MeshLineMaterial;



//aframe
AFRAME.registerComponent('spiraloo', {

    init: function () {
        var data = this.data;
        var el = this.el;

        // Create geometry.
        const points = [];
        for (let j = 0; j < 50 * Math.PI; j += (2 * Math.PI) / 500) {
           // let r = 20 * Math.PI - j;
           let r =50 ; 
            points.push(r * Math.cos(j), (5*(j - 10))+10*Math.sin(20*j), r * Math.sin(j));
        }

        this.line = new MeshLine();
        this.line.setPoints(points, p => 2);

        // Create material.
        this.material = new MeshLineMaterial({ color: 0xff00ff });


        // Create mesh.
        this.mesh = new THREE.Mesh(this.line, this.material);


        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    }
});

/*
let video; 
window.onload = function(){
    //video
const constraints = {
    video: {
        facingMode: "environment",
      }
  };
  
   video = document.querySelector('video');
  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});
}

*/

