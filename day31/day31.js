/**
 * genuary day 31
 * Prompt: negative space 
 * 
 * <3 whichlight 
 * 
 */

//mobile disable default touch events so no scrolling or highlight etc 
touchStarted = () => false;

let w, h = 0;
let paths = [];
let cells = [];
let num = 20;
let size = 100; 
let bcolor = 60;
let col = 300; 

setup = () => {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
    rectMode(CENTER);
    createShapes(num);
}

draw = () => {
    background(bcolor, 100, 100);
    for (c of cells){
        c.update();
        c.render(); 
    }
}

function mouseClicked(){
    num+=1; num%=50;
    let c = floor(random(0,360));
    bcolor +=c; bcolor%=360;
    col += c; col%=360;
    createShapes(num);
}

function createShapes(n){
    cells = []
    for(let i = 0; i < n; i++){
        let angle = i*PI*2/n; 
        let d = 500; 
        let x = w/2 + d * cos(angle);
        let y = h/2 + d * sin(angle);
        cells.push(new Cell(x,y,size, angle));
    }
}

class Cell{
    constructor(_x,_y, _r, _a){
        this.x = _x;
        this.y = _y; 
        this.r = _r; 
        this.a = _a; 
        this.a+=(PI/2+0.04);
    }

    update(){
        this.a+=0.005
    }
    render(){
        push();
        translate(this.x, this.y);
        rotate(this.a);
        noStroke();
        fill(col,100,100);
        rect(0,0,this.r/2,50*this.r);
        pop(); 
    }
}


