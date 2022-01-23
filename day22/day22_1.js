/**
 * genuary day 22
 * Prompt: make something that will look completely different in a year
 * 
 * <3 whichlight 
 * 
 */


 let scale; 
 const days_old = 19015.20730428241; 
 const days_new = Date.now()/(1000*60*60*24); 

 let passage = 0;  

function setup() {
    w = windowWidth;
    h = windowHeight;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
    scale = max(w,h)/60;

    passage = map(days_new - days_old, 0, 367, 0, 1); 

}

function draw() {
    background(180, 0, 20);


    let ypos = 0; 
    ypos += 60;

    renderTime(minute(), 60, ypos, 60,5);
    ypos+=60;

    renderTime(hour(), 120, ypos, 24,3);
    ypos+=24;

    renderTime(day(), 180, ypos, 31,4);
    ypos+=31;

  
    renderTime(month(), 240, ypos, 12,5);
    ypos+=12;
    
    renderTime(year()-2000, 300, ypos,6);


    //
    renderTime

     ypos = 0; 

    renderTime(second(), 0, ypos, 60,20);

    //lines
    for(let i=0; i<(passage*h); i+=scale){
        stroke(0,0,0);
        line(0,i,w,i);
    }

   
}


function renderTime(_length, _color, _ypos, offs){
    for(let i = 0; i< _length; i++){
       // noStroke();
       noFill();
        stroke(_color,100,100);
        let r = scale*i+(offs); 
        ellipse(w/2, (h/4)+_ypos, r,r)
    }

}


/**
 * r 
 * 0-60 sec
 * 60-120 min 
 * 120-144 hr 
 * 144-171 = day
 * 
 * 
 * 
 * 
 */



 function renderTimeRect(_length, _color, _ypos, _side){
    console.log(_length); 
    for(let i = 0; i<_length; i++){
        noStroke();
        fill(_color,100,100);
        rect(i*_side, _ypos, _side-1, _side-1)
    }

}