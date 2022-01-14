/**
 * genuary day 14
 * Prompt: Something you'd never make.
 * 
 * <3 whichlight 
 * 
 */


let w, h = 0;
let initlife = 100; 
let saving=false; 
let diamonds = [];
let dollars = [];

window.alert("⚠️the #genuary day 14 prompt is: 'Something you’d never make.' this is my piece for day 14. i had to put this warning because it is so cringe for me.");

function setup() {
    w = windowWidth; 
    h = windowHeight; 
    createCanvas(w, h);
    background(255);
    colorMode(HSB, 360, 100, 100,100);

    let diamondimg= loadImage('diamond.gif'); 
    for(let i =0; i<50;i++){
        let diamond = new ImgRandom(diamondimg, 0.1, 0.5);
        diamonds.push(diamond);
    }
    
    let dollarsimg = loadImage('dollars.gif');
    for(let i =0; i<10;i++){
        let dollar = new ImgRandom(dollarsimg, 1, 2);
        dollars.push(dollar);
    }


}

function draw() {
    background(60,100,100);
    diamonds.forEach(function(p){
        p.update();
        p.display();
    })

    dollars.forEach(function(p){
        p.update();
        p.display();
    }) 

}

class ImgRandom{
    constructor(_img, s1, s2){
        this.img = _img;
        this.s1 = s1; 
        this.s2 = s2;
        this.x = random(0, w);
        this.y = random(0, h); 
        this.life = random(10,200);
        this.size = random(this.s1,this.s2); 
    }

    update(){
        this.life--; 
        if(this.life<0){
            this.x = random(0, w);
            this.y = random(0, h); 
            this.life = random(10,200);
            this.size = random(this.s1,this.s2); 
        }
    }

    display(){
        image(this.img, this.x, this.y, this.img.width*this.size, this.img.height*this.size);
    }

}