/**
 * genuary day 28
 * Prompt: self portrait
 * 
 * <3 whichlight 
 * 
 * 
 */

//mobile disable default touch events so no scrolling or highlight etc 
touchStarted = () => false;

let w, h = 0;
let particles = [];



setup = () => {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
    ellipseMode(CENTER);
    rectMode(CENTER);

    createParticles(50);
}


draw = () => {

    if (mouseIsPressed) {
        particles.forEach(function (p) {
            p.update();
            p.render();
        })
    } else {
        background(60, 50, 100, 10);
        particles.forEach(function (p) {
            p.reset();
        })
    }

    //remove off screen 
    particles.forEach(function (p) {
        if (!p.living) {
            p.reset();
        }
    })

    drawFace();
}

drawFace = () => {

    drawHead();
    drawHair();
    drawBeard();
    drawGlasses();
    drawBrows();

    if (!mouseIsPressed) {
        drawOpenEyes();
        drawOpenSmile();
    } else {
        drawClosedEyes();
        drawMouthClosed();
    }

    drawHat();
}

function createParticles(numParticles) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.living = true;
        this.size = random(10, 50);
        this.pos = createVector(w / 2, h / 2);

        this.vel = createVector(cos(random(0, 2 * PI)), sin(random(0, 2 * PI)))
        this.vel.mult(2);
        this.acc = createVector(0, 0);

        this.c = random(360);
        this.sat = random(100);

    }

    update() {
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(10);
        this.pos.add(this.vel); //loc = loc + vel
       // this.size -= 0.1;
        this.sat += 1;
        this.sat %= 100;

        if (this.size <= 0) {
            this.living = false;
        }

        if (this.pos.x > w || this.pos.x < 0 || this.pos.y > h || this.pos.y < 0) {
            this.living = false;
        }
    }

    render() {
        fill(this.c, this.sat, 100);
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    }
}


function drawHead() {
    push();
    translate(w / 2, h / 2);
    noStroke();
    fill(30, 80, 70);
    ellipse(0, 0, 150, 180);
    pop();

}

function drawHair() {
    push();
    translate(w / 2, h / 2);
    noStroke();
    fill(20, 50, 10);

    ellipse(0, 0, 180, 200);
    fill(20, 50, 10);

    rect(0, 60, 180, 150, 10);

    noStroke();
    fill(20, 50, 10);
    arc(0, 0, 150, 180, -1 * PI, 0);
    noStroke();
    fill(30, 80, 70);
    arc(0, 0, 150, 120, -1 * PI, 0);

   

    pop();
}

function drawBeard() {
    push();
    translate(w / 2, h / 2);
    noStroke();
    fill(20, 50, 20);
    arc(0, 0, 150, 180, 0, -1 * PI);
    fill(30, 80, 70);
    arc(0, 0, 150, 80, 0, -1 * PI);

    strokeWeight(20);
    stroke(30, 80, 70);
    line(-70,0,70,0);
    pop();
}

function drawGlasses() {
    push();
    translate(w / 2, h / 2);
    noFill();
    strokeWeight(6);
    stroke(300, 100, 100);
    ellipse(-40, 0, 50, 50);
    ellipse(40, 0, 50, 50);
    line(-10, 0, 10, 0);
    pop();
}

function drawBrows() {
    push();
    translate(w / 2, h / 2);
    translate(-40, 0);
    noFill();
    stroke(20, 50, 30);
    strokeWeight(3);
    arc(0, -10, 30, 20, -1 * PI, 0);
    pop();

    push();
    translate(w / 2, h / 2);
    translate(40, 0);
    noFill();
    stroke(20, 50, 30);
    strokeWeight(3);
    arc(0, -10, 30, 20, -1 * PI, 0);
    pop();
}

function drawOpenEyes() {
    push();
    translate(w / 2, h / 2);
    translate(-40, 0);
    noStroke();
    fill(0, 0, 100);
    ellipse(0, 0, 30, 20);
    fill(20, 50, 10);
    ellipse(0, 0, 15, 15);
    pop()

    push();
    translate(w / 2, h / 2);
    translate(40, 0);
    noStroke();
    fill(0, 0, 100);
    ellipse(0, 0, 30, 20);

    fill(20, 50, 10);
    ellipse(0, 0, 15, 15);
    pop();

}

function drawOpenSmile() {
    push()
    translate(w / 2, h / 2);
    translate(0, 60);
    noStroke();
    fill(0, 50, 50);
    arc(0, -10, 30, 20, 0, -1 * PI);
    pop();

}

function drawHat() {
    push();
    translate(w / 2, h / 2);
    translate(5, -70);
    rotate(0.05 * PI);

    noStroke();
    fill(180, 100, 100);
    arc(0, 0, 125, 125, -1 * PI, 0);
    strokeWeight(10);
    stroke(180, 100, 100);
    line(125 / 2, 0, -125 * 0.75, 0);
    pop();

}

function drawClosedEyes() {
    push();
    translate(w / 2, h / 2);
    translate(-40, 0);
    noStroke();

    noFill();
    stroke(20, 50, 10);
    strokeWeight(3);
    arc(0, 0, 20, 15, 0, PI);
    pop()

    push();
    translate(w / 2, h / 2);
    translate(40, 0);
    noFill();
    stroke(20, 50, 10);
    strokeWeight(3);
    arc(0, 0, 20, 15, 0, PI);

    pop();

}

function drawMouthClosed() {
    push()
    translate(w / 2, h / 2);
    translate(0, 55);
    noFill();
    stroke(0, 50, 50);
    strokeWeight(3);
    line(-10, 0, 10, 0);
    pop();

}










