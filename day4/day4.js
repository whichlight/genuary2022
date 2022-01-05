/**
 * genuary day 4 
 * Prompt: fidenza
 * 
 * <3 whichlight 
 * 
 * ref: 
 * https://editor.p5js.org/ada10086/sketches/r1gmVaE07
 * https://editor.p5js.org/codingtrain/sketches/6WL2O4vq0
 * 
 */

const numPaths = 20;
let noiseScale = 500;
let noiseStrength = 2;
let paths = [];
let w, h;

function setup() {
    w = windowWidth;
    h = windowHeight;
    colorMode(HSB, 360,100,100)

    createCanvas(w, h);
    background(60,100,100);

    //create paths 
    for (let i = 0; i < numPaths; i++) {
        let pos = createVector(random(w), random(h));
        let dir = createVector(cos(0), sin(0));
        let vel = createVector();
        let speed = 10;
        let size = random(10, 20);
        let acc = createVector();
        let c = random(340,340);
        paths.push(new Path(pos, dir, vel, speed, size, acc, c));
    }
}

function draw() {

    // update  
    paths.forEach(function (p) {
        p.update();
        p.render();
    })
    if (frameCount == 3) {
        //  noLoop(); 
    }

}

class Path {
    constructor(_pos, _dir, _vel, _speed, _size, _acc, _c) {
        this.pos = _pos;
        this.dir = _dir;
        this.vel = _vel;
        this.speed = _speed;
        this.size = _size;
        this.path = [];
        this.acc = _acc;
        this.display = true;
        this.c = _c; 
    }

    update() {
        //add to path 
        this.path.push(this.pos.copy());

        let angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * noiseStrength; //0-2PI
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        this.vel = this.dir.copy();
        this.vel.mult(this.speed); //vel = vel * (speed*d)
        this.display = true;
        // repulsion
        let that = this;
        paths.forEach(function (p) {
            if (that != p) {
                let psize = p.size; 
                p.path.forEach(function (pos) {
                    let force = p5.Vector.sub(pos, that.pos);
                    let d = force.mag();
                    d = constrain(d, 1, 25);
                    let max_dist = that.size + psize; 
                    if (d < max_dist/2) {
                        let G = 50;
                        let strength = G / (d * d);
                        force.setMag(strength);
                        force.mult(-10);
                        that.acc.add(force);
                        if (d < max_dist/3) {
                            that.pos = createVector(random(w), random(h));
                            that.display = false;
                        }
                    }

                })
            }
        })

        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(5);
        this.pos.add(this.vel); //loc = loc + vel
        this.checkEdges();

    }



    checkEdges() {
        if (this.pos.x > w) {
            this.pos.x -= w;
        }

        if (this.pos.x < 0) {
            this.pos.x += w;
        }

        if (this.pos.y < 0) {
            this.pos.y += h;
        }

        if (this.pos.y > h) {
            this.pos.y -= h;
        }
    }

    render() {
        if (this.display) {
            fill(this.c,100,100);
            stroke(60,100,100);
            circle(this.pos.x, this.pos.y, this.size);
        }
    }

}
