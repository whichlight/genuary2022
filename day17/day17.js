/**
 * genuary day 17
 * Prompt: 3 colors
 * 
 * <3 whichlight 
 * 
 */

let w, h = 0;
let side;
let cells = []; 

let c1,c2,c3;
let cols = [];



function setup() {
    w = windowWidth;
    h = windowHeight;
    side = floor(min(w,h)/4);

    c1 = color(255,255,0);
    c2 = color(0,255,255);
    c3 = color(255,0,255);
    cols = [c1,c2,c3];
    rectMode(CENTER);
    frameRate(10);

    
    createCanvas(w, h);
    background(0);

    for(let i = 0; i < w/side; i++){
        for(let j = 0; j < h/side; j++){

        let p = new Cell(i*side,j*side,side);
        cells.push(p);

        }
    }
    
}

function draw() {
    cells.forEach(function(p){
        p.render();
    })

}   

class Cell{
    constructor(_x, _y, _side){
        this.side = _side; 
        this.x = _x; 
        this.y = _y; 
        this.num = random(10,20);
        this.s = floor(this.side/this.num);
        
        this.cols = [];
        for(let i = 0; i<this.num; i++){
            this.cols.push(cols[floor(random(cols.length))]);
        }

        this.r = 0; 


    }

    render(){
        push();
        translate(this.x+this.side/2, this.y + this.side/2);
        rotate(this.r);
        for(let i = 0; i<this.num ; i++){
            noStroke();
            fill(this.cols[i]);
            rect(0,0, this.side-(i*this.s), this.side-(i*this.s));            
           
        }
        this.r+=TWO_PI/100; 
       
       pop();
    }
}
