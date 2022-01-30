/**
 * genuary day 30
 * Prompt: organic looking output using only rectangular shapes
 * 
 * <3 whichlight 
 * 
 */

//mobile disable default touch events so no scrolling or highlight etc 
touchStarted = () => false;

let w, h = 0;
let paths = [];
let res = 20;
const noiseScale = 400;
const noiseStrength = 0.05;
let posi; 
let posf; 
let gdir; 

setup = () => {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);

    for (let i = 0; i < w / res; i++) {
        for (let j = 0; j < h / res; j++) {
            paths.push(new Path(createVector(i * res, j * res)));
        }
    }

    posf = createVector(0,0); 
    gdir = createVector(0,0); 

}


draw = () => {
    background(60, 100, 100);

    for (p of paths) {
        p.update();
        p.render();
    }

}

function mouseDragged(){
    posi = posf.copy(); 
    posf = createVector(mouseX, mouseY); 
    gdir = p5.Vector.sub(posi, posf);
}


class Path {
    constructor(_pos) {
        this.pos = _pos;
        this.angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * PI * noiseStrength; //0-2PI
        this.dir = createVector(cos(this.angle), sin(this.angle));
        this.size = 50;
        this.c = random(60,120);
        this.b = random(50,100);
    }

    update() {
        let n = noise(this.pos.x / noiseScale, this.pos.y / noiseScale, frameCount * 0.005); 
        let val = map(n,0,1,-1*PI/4, PI/4);
        this.angle+=  val * noiseStrength;
        

        let m = createVector(mouseX, mouseY); 

        if(mouseIsPressed && gdir.mag()>5 && p5.Vector.dist(m, this.pos)<(res*2)){

           this.angle = gdir.heading() + PI/2; 
        }


    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        noStroke();
        fill(this.c, 100, this.b);
        rect(0, 0, 10, this.size)
        pop();

    }

}



