/**
 * genuary day 20
 * Prompt: make a sea of shapes
 * 
 * <3 whichlight 
 * 
 */

let w, h = 0;
const mantra = "i love you. all of you. you are radiant, you are enough. ";
let index = 0; 
let wstep = 50;
let hstep = 50; 
ocean = []


function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w,h);
    colorMode(HSB, 360,100,100);

    frameRate(25);

    //build ocean 
    for(let j=0; j< (h/hstep); j++){

    for(let i=0; i< (w/wstep); i++){
            ocean.push(new Water(i*wstep, j*hstep, j, i));
        }
    }

}

function draw() {
    background(300,100,100);
    ocean.forEach(function(o){
        o.render(); 
        o.update();
    })    
}   

class Water {
    constructor(_x, _y, _phase, _phase2){
        this.x = _x; 
        this.y = _y; 
        this.phase = _phase % TWO_PI; 
        this.phase2 = _phase2 % TWO_PI; 
        this.d = 5;
        this.d2 = 1; 
        this.r = 50;  
        this.shape = floor(random(2,6));
        this.c = floor(random(180,240));
    }
    render(){
       

        push();
        translate(this.x,this.y);
        rotate(this.phase2);
        noStroke();
        fill(this.c, 100,100);

        if(this.shape!=2){
            polygon(0,0, this.r, this.shape)
        } else
        {
            ellipse(0,0, 2*this.r, 2*this.r);
        }
        pop();

    }

    update(){
        this.x += (this.d*cos(this.phase) + this.d2*cos(this.phase2));
        this.y += (this.d*sin(this.phase) + this.d2*sin(this.phase2)); 
        this.phase+=0.25;
        this.phase2+=0.1;
        this.phase%= TWO_PI;  
        this.phase2%= TWO_PI;  


    }
}


function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = cos(a) * radius;
      let sy = sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
