/**
 * genuary day 6
 * Prompt: trade styles with a friend
 * 
 * based on a moire circle by @cachefowe 
 * 
 * <3 whichlight 
 * 
 * ref: 
 * https://www.shadertoy.com/view/lsjBRD
 * https://itp-xstory.github.io/p5js-shaders/#/
 */


let theShader;
let cSize; 

function preload(){
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    w = windowWidth;
    h = windowHeight;
    cSize = 0.5*min(w,h);
    createCanvas(cSize, cSize, WEBGL);
    ellipseMode(CENTER);
}

function draw() {
    background(0,0,0);
 

    theShader.setUniform("u_resolution", [w, h]);
    theShader.setUniform("u_time", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    shader(theShader);  
    circle(0,0,cSize);

}


