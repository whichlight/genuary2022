/**
 * genuary day 13
 * Prompt: 800x80
 * 
 * <3 whichlight 
 * 
 * ref: https://p5js.org/examples/simulate-particle-system.html
 * 
 */


let w, h = 0;
let system;
let initlife = 100; 
let saving=false; 


function setup() {
    w = 800;
    h = 80;
    createCanvas(w, h);
    background(255);
    colorMode(HSB, 360, 100, 100,100);
    system = new ParticleSystem();


}

function draw() {
    background(180,100,100,1);
    for(let i=0; i<2;i++){
     system.addParticle();
    }
    system.run();

    if(mouseIsPressed && saving){
        if(frameCount%5==0){
          saveCanvas('frame_'+paddy(frameCount,4)+'.png');
        }
      }

}

function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
  }


class Particle {
    constructor() {
        this.acceleration = createVector(0,-0.05);
        this.velocity = createVector(random(0, 0), 1*random(0,1));
        this.position = createVector(random(w), h);
        this.life = 2;
    }


    run() {
        this.update();
        this.display();
    };


    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.life += 0.2;
    };

    display() {
        noStroke();
        fill(300,this.life+10,100);
        let s = this.life;
        ellipse(this.position.x, this.position.y, s, s);
    };

    isDead() {
        return (this.position.y < 0);
    };

}




class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle());
    };

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    };

};



