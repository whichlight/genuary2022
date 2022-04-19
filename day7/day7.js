/**
 * genuary day 7
 * Prompt: sol lewitt wall drawing
 * 
 * <3 whichlight 
 * 
 * ref: https://massmoca.org/event/walldrawing797/ 
 * 
 */

const numPoints = 200;
let initY = 20; 
let yamp = 10; 
let slline; 
let noiseScale=0.1;
let xoffset = 10; 

let lineWeight = 7; 
let offset = 10; 

let endpiece = false; 


function setup() {
    w = windowWidth;
    h = windowHeight;
    rectMode(CENTER);
    createCanvas(w, h);
    background(250);

    slline = new Line797();
   
   /*
   The first drafter has a black marker and makes an 
   irregular horizontal line near the top of the wall.
   */
    slline.initial();
    slline.render(0);


    /*
    Then the second drafter tries to copy it (without touching it) using a red marker. 
    The third drafter does the same, using a yellow marker. 
    The fourth drafter does the same using a blue marker. 
    Then the second drafter followed by the third and fourth copies 
    the last line drawn until the bottom of the wall is reached.
   */

   //create remaining lines 
  
    const colors = [color("red"), color("yellow"),color("blue")];
    let cindex = 0;
   while(!endpiece){
    slline.nextLine()
     slline.render(colors[cindex%colors.length]);
    cindex+=1;
   }

}

function draw() {
    noLoop();

}

class Line797 {
    constructor() {
        this.points = [];
        this.c = 0;
    }

    initial(){
        let p = createVector(0,initY);
        for(let i=0; i<numPoints; i++){
            slline.points.push(p.copy());
            let yval = 2*noise(p.x*noiseScale, p.y*noiseScale)-1; 
            p.add(w/numPoints,yval*yamp);
        }
        slline.points.push(p.copy());

        //adjust line 

        let minVal = 0; 
        slline.points.forEach(function(p){
            if (p.y < minVal){
                minVal = p.y; 
            }
        });
        minVal *= -1; 
        minVal += initY; 
    
        slline.points.forEach(function(p){
            p.y += minVal; 
        });
    }

    nextLine(){

        let newpoints = []; 

        //gradual smoothing across lines  
        let yoff = offset;
        slline.points.forEach(function(p, i, arr){
            let y;

            if(i==0){
                y = (arr[i].y + arr[i+1].y)/2.0;
            }
            if(i>0 && i < arr.length-1){
                y = (0.1*arr[i-1].y + 0.8*arr[i].y + 0.1*arr[i+1].y);
            }

            if(i==arr.length-1){
                y = (arr[i-1].y + arr[i].y)/2.0;
            }
            
            y+= yoff; 
            let q = createVector(p.x,y);
            newpoints.push(q);

            //note to finish
            if(p.y > (h - 2*yamp)){
                endpiece = true;
            }
        });

        slline.points = newpoints; 


    }

    render(c) {
        strokeWeight(lineWeight);
        stroke(c);
        noFill();
        beginShape();
        this.points.forEach(function(p){
            vertex(p.x, p.y);
        })
        endShape();

    }
}
