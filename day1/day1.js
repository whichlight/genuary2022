/**
 * genuary day 1 
 * Prompt: Draw 10,000 of something
 * 
 * <3 whichlight 
 */

let paths = [] 


function setup(){
    colorMode(HSB,100,100,100)
    createCanvas(windowWidth, windowHeight);
    for(i=0; i<10000; i++){
        let p = {x:random(0,windowWidth), y:random(0,windowHeight)};
        paths.push(p);
    }

}

function draw(){
  
    paths.forEach(function(p,index){
        stroke(index/100, 100,100);
        strokeWeight(1);
        let pi = {x:p.x, y:p.y};
        p.x+=random(-2,2);
        p.y+=random(-2,2);
        line(pi.x,pi.y, p.x, p.y);
    })
}