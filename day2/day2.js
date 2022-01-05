/**
 * genuary day 2 
 * Prompt: Dithering
 * 
 * <3 whichlight 
 */

let paths = []
let c1;
let c2;


function setup() {
    background(1);
    c1 = 300;
    c2 = 240;

    colorMode(HSB, 360, 100, 100)
    createCanvas(windowWidth, windowHeight);

    for (let j = 0; j < windowHeight; j++) {
        for (let i = 0; i < j/2; i++) {
            stroke(c1, 100,100);
            point(random(windowWidth), j)
           
            stroke(c2, 100,100);
            point(random(windowWidth), windowHeight-j)
        }
    }

}

function draw() {

}