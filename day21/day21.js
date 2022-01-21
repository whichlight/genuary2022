/**
 * genuary day 21
 * Prompt: combine two (or more) of your pieces from previous days to make a new piece
 * 
 * combining: destroy a square, packing, sand
 * 
 * ref: collision and repulsion: https://editor.p5js.org/codingtrain/sketches/6WL2O4vq0
 * 
 * <3 whichlight 
 * 
 */

const numParticles = 150;
let particles = [];
let destroySquare = false;
let rectSize;

function setup() {
    w = windowWidth;
    h = windowHeight;
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    createCanvas(w, h);

    rectSize = 0.4 * min(w, h);

    drawSquare(0);

    createParticles();

}

function draw() {
    background(30, 100, 100);


    if (!destroySquare) {
        let a = cos(frameCount / 10) / 10;
        drawSquare(a);
    }

    // update  
    if (destroySquare) {
        particles.forEach(function (p) {

            if(p.living){
             p.update();
            }
            p.render();
        })

    

        if (particles.length == 0) {
            destroySquare = false;
            createParticles();
        }



        particles.forEach(function (p) {
            if(p.living){
                checkOverlap(p);
            }
        });

    }

}

function mousePressed() {
    let x = mouseX;
    let y = mouseY;

    if (destroySquare == false && x > (w / 2 - rectSize / 2) && x < (w / 2 + rectSize / 2) && y > (h / 2 - rectSize / 2) && y < (h / 2 + rectSize / 2)) {
        destroySquare = true;
    }

    if(destroySquare){
        let pos = createVector(mouseX, mouseY);
        vel = createVector(0,0);
        createSingleParticle(pos, vel);


    }

}


function drawSquare(a) {
    push();
    translate(w / 2, h / 2);
    rotate(a);
    noStroke();
    fill(80, 100, 100);
    rect(0, 0, rectSize);
    pop();
}

function createParticles() {
    for (let i = 0; i < numParticles; i++) {
       let pos = createVector(random(w / 2 - rectSize / 2, w / 2 + rectSize / 2), random(h / 2 - rectSize / 2, h / 2 + rectSize / 2));
       let center = createVector(w / 2, h / 2);
       let diff = p5.Vector.sub(pos, center);
       let vel = diff.copy();
       vel.mult(0.05);
        createSingleParticle(pos, vel);
    }
}

function createSingleParticle(_pos, _vel){
    let pos = _pos;
    // let angle = random(-0.1, 0.1) * TWO_PI + 3*TWO_PI/4;
    let vel = _vel;
    let acc = createVector(0, 0.05);
    //acc.mult(random(1,2));
    let size = random(10, 50);
    let c = random(80, 130);
    particles.push(new Particle(pos, vel, acc, size, c));
}

class Particle {
    constructor(_pos, _vel, _acc, _size, _c) {
        this.pos = _pos;
        this.vel = _vel;
        this.d = _size;
        this.acc = _acc;
        this.c = _c;
        this.living = true;
        this.collision = createVector(0,0);
    }

    update() {
        
        if(this.living){
        this.acc.add(this.collision);
        this.vel.add(this.acc);
        this.acc = createVector(0, 0.05);
        this.collision = createVector(0,0);
        this.vel.limit(5);
        this.pos.add(this.vel); 
        }
        
         

       
    }

    render() {
        fill(this.c, 100, 100);
        noStroke();
        circle(this.pos.x, this.pos.y, this.d);
    }
}




function checkOverlap(p) {
    let overlap = false;
    particles.forEach(function (q) {
        if (p != q) {
            let cd = p5.Vector.dist(p.pos, q.pos);
            let rd = (p.d + q.d) / 2;
            if (cd < rd) {
                //collission 

                if(!q.living){
                    p.living = false; 
               }

               if(q.living){
                let force = p5.Vector.sub(q.pos, p.pos);
                let d = force.mag();
                d = constrain(d, 1, 25);
                let G = 50;
                let strength = G / (d * d);
                force.setMag(strength);
                force.mult(-5);
                let col = p5.Vector.sub(q.vel, p.vel);
                p.collision.add(force);
                overlap = true;

               }
            }
        }
    })

    //borders
    if ((p.pos.x + p.d / 2) > w || (p.pos.x - p.d / 2) < 0 ) {
        overlap = true;
        p.vel.mult(createVector(-1,1));
    } 
    if((p.pos.y - p.d / 2) < 0 || (p.pos.y + p.d / 2) > h){
        overlap = true;
        p.vel.mult(createVector(1,-1));
    }

    if(p.pos.y + (p.d / 2) > h){
        p.vel.mult(0);
        p.collision.mult(0);
        p.acc.mult(0);
        p.living= false; 
    }
}
