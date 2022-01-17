/**
 * genuary day 16
 * Prompt: color gradients gone wrong
 * 
 * <3 whichlight 
 * 
 * 
 * 
 * 
 */

let w, h = 0;
let c1, c2;
let side;
let interval = [];
let cols = [];

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    background(255);
    colorMode(HSB, 255, 255, 255);
    frameRate(20);

    step = w /floor(random(5,50));
    vstep = h/floor(random(1,20)); 

    for (let j = 0; j < h / vstep; j++) {
        c1 = new Col(random(255), random(255), random(255));
        c2 = new Col(random(255), random(255), random(255));
        let col = [];
        for (let i = 0; i < w / step; i++) {
            let r = map(i, 0, w / step, c1.r, c2.r);
            let g = map(i, 0, w / step, c1.g, c2.g);
            let b = map(i, 0, w / step, c1.b, c2.b);
            noStroke();
            fill(r, g, b)
            rect(i * step, j*vstep, step, vstep);
            col.push(new Col(r,g,b));
        }

        for(let i = col.length-1; i>=0; i--){
            let c = col[i];
            col.push(c);
        }
        cols.push(col)
    }


    for (let j = 0; j < h / vstep; j++){
        interval.push(floor(random(1,5)));
    }

    //shuffle
    for (let j = 0; j < h / vstep; j++) {
        let s = floor(random(cols[j].length));

        for(let i = 0; i<s; i++){
            let c = cols[j].shift();
            cols[j].push(c);
        }
        

    }



}

function draw() {

    //render 

    for (let j = 0; j < h / vstep; j++) {
        for (let i = 0; i < (2*w / step); i++) {
           
            noStroke();
            fill(cols[j][i].r, cols[j][i].g, cols[j][i].b)
            rect(i * step/2, j*vstep, step/2, vstep);
        }

    }

    //shift

    for (let j = 0; j < h / vstep; j++) {
        
        for(let i = 0; i<interval[j];i++){
            let c = cols[j].shift();
            cols[j].push(c);
        }
       

    }


}

class Col {
    constructor(_r, _g, _b) {
        this.r = _r;
        this.g = _g;
        this.b = _b;
    }

}
