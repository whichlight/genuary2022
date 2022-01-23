/**
 * genuary day 23
 * Prompt: abstract vegetation 
 * 
 * <3 whichlight 
 * 
 */


 let w,h=0;
 let num_groundplants= 10; 
 let grasses = []; 
 let trees = []; 
 let basecol; 

function setup() {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
   
    num_groundplants = w*h/(10**2);
    num_trees = num_groundplants/100; 
    basecol = random(-60,10); 
    console.log(basecol);

    for(let i=0; i<num_groundplants; i++){
        grasses.push(new Grass());
    }

    for(let i=0; i<num_trees; i++){
        trees.push(new Tree());
    }


  

}

function draw() {
    background(60, 50, 100);

    trees.forEach(t => t.render());

    grasses.forEach(g => g.render());


}

class Grass{
    constructor(){
        this.color = basecol + floor(random(80,130)); 
        this.x = random(w); 
        this.y = random(0.8*h, h);
        this.size = random(10,30);
 
    }

    render(){
        noStroke();
        fill(this.color,100,100);
        ellipse(this.x, this.y, this.size);
    }

}

class Tree{
    constructor(){
        this.color = basecol + floor(random(60,140)); 
        this.bark = floor(random(0,60));
        this.x = random(w); 
        this.y = random(0, 0.5*h);
        this.size = random(100,200);
 
    }

    render(){

        let side = this.size/10; 
        noStroke();
        fill(this.bark,50,50);
        rect(this.x-side/2, this.y, side, h-this.y);


        noStroke();
        fill(this.color,100,100);
        ellipse(this.x, this.y, this.size);
        

    }

}


