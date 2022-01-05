/**
 * genuary day 5
 * Prompt: destroy a square
 * 
 * <3 whichlight 
 * 
 * 
 */

const numParticles = 500;
let particles = [];
let destroySquare = false; 
let rectSize; 

function setup() {
    w = windowWidth;
    h = windowHeight;
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    createCanvas(w, h);
    background(140, 100, 100);

    rectSize = 0.4*min(w,h); 
   
    drawSquare(0); 

    createParticles();

}

function draw() {
    background(140, 100, 100, 10);


    if(!destroySquare){
        let a = cos(frameCount/10)/10;
        drawSquare(a); 
    }

    // update  
    if (destroySquare) {
        particles.forEach(function (p) {
            p.update();
            p.render();
        })

        //remove dissapeared particles 
        particles.forEach(function (p) {
           if(!p.living){
            const index = particles.indexOf(p);
            if (index > -1) {
                particles.splice(index, 1);
              }
           }
        })

        if(particles.length==0){
            destroySquare = false; 
            createParticles();
        }


    }

    

}

function mousePressed(){
    let x = mouseX; 
    let y = mouseY; 

    if(destroySquare == false && x > (w/2 - rectSize/2) && x < (w/2 + rectSize/2) && y > (h/2 - rectSize/2) && y < (h/2 + rectSize/2)){
        destroySquare = true; 
    }

}


function drawSquare(a){
    push();
    translate(w/2, h/2);
    rotate(a); 
    stroke(300,100,100);
    fill(60,100,100);
    rect(0,0, rectSize);
    pop(); 
}

function createParticles(){
    for (let i = 0; i < numParticles; i++) {
        let pos = createVector(random(w/2-rectSize/2,w/2+rectSize/2), random(h/2-rectSize/2, h/2+rectSize/2));
       // let angle = random(-0.1, 0.1) * TWO_PI + 3*TWO_PI/4;
        let center = createVector(w/2, h/2);
        let diff = p5.Vector.sub(pos, center);
        let vel = diff.copy();
        vel.mult(0.05); 
        let acc = createVector(0,1);
        acc.mult(random(1,2));
        let size = random(10, 50);
        let c = random(50,70);
        particles.push(new Particle(pos, vel, acc, size, c));
    }
}

class Particle {
    constructor(_pos, _vel, _acc, _size, _c) {
        this.pos = _pos;
        this.vel = _vel;
        this.size = _size;
        this.acc = _acc;
        this.c = _c;
        this.living = true; 
    }

    update() {
  
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(5);
        this.pos.add(this.vel); //loc = loc + vel
        this.size -=0.1;
        if(this.size<=0){
            this.living=false; 
        }

        if(this.pos.x > w || this.pos.x < 0 || this.pos.y > h || this.pos.y < 0){
            this.living = false; 
        }
    }

    render() {
        fill(this.c, 100, 100);
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    }
}
