/**
 * genuary day 3 
 * Prompt: Space
 * 
 * <3 whichlight 
 */

let w;
let h;
let planet; 
let planets = [];
let rsun; 
const numPlanets = 100; 


function setup() {
    colorMode(HSB, 360, 100, 100)
    angleMode(DEGREES);
    w = windowWidth;
    h = windowHeight; 
    createCanvas(w, h, WEBGL);

    rsun = 0.1*min(w,h);
    camera(w/h, w/3,h/4);

    for(let i=0; i<numPlanets; i++){
        let p = {};
        p.z = 0
        p.size = random(0.05, 0.1)*rsun; 
        p.dist = random(2,4)*rsun;
        p.angle = random(360);
        p.speed = random(0.5,2);
        planets.push(p);
        //planet = {z:0, size: 0.1*rsun, dist: 3*rsun, angle: 0, speed: 1}

    } 

}

function draw() {
    background(0,0,0);
    noStroke();
    fill(60,100,100);
   // sphere(rsun);

    //render 

    planets.forEach(function(p){
        push();
        translate(p.dist*cos(p.angle), p.dist*sin(p.angle), p.z);
        pointLight(60, 100, 100, 0, 0, 0);
        noStroke();
        fill(300,0,100);
        sphere(p.size)
        pop();
    
        //rotate
        p.angle += p.speed;

    })
  


}