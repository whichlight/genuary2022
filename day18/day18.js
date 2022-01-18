/**
 * genuary day 18
 * Prompt: VHS
 * 
 * <3 whichlight 
 * 
 * 
 * ref: 
 * https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/interactivity
 * https://www.shadertoy.com/view/Ms3XWH
 * 
 */

let w, h = 0;
let side;
let cam;


let theShader;
function preload(){
    theShader = loadShader('shader.vert', 'shader.frag');
  }
  


function setup() {
    w = windowWidth;
    h = windowHeight;
    frameRate(10);
    createCanvas(w, h, WEBGL);
    background(0);
    rectMode(CENTER);

    cam = createCapture(VIDEO);
    cam.size(windowWidth, windowHeight);
    
    cam.hide();

 
    
}

function draw() {

    shader(theShader);  

    theShader.setUniform('tex0', cam);
    theShader.setUniform("u_time", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    theShader.setUniform("u_resolution", [w, h]);

    rect(0,0,w,h);
    


}   

