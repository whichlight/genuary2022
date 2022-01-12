/**
 * genuary day 12
 * Prompt: packing
 * 
 * <3 whichlight 
 * 

 * 
 */


let circles = [];
let w, h=0; 
let growing = false;

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    background(255);
    colorMode(HSB,360,100,100);

}

function draw() {
    background(280,10,90);

    //add seed
    if(!growing){
        let c = {};
        c.x = random(w);
        c.y = random(h);
        c.r = 2; 

        if(!checkOverlap(c)){
            circles.push(c);
            growing = true; 
           
        } 

    }

    //growing
    if(growing){
        let c = circles[circles.length-1];
        while(!checkOverlap(c)){
            c.r++;  
        }
       
        growing=false;
        

    }


    //remove circles of r 0 
    circles.forEach(function(q,i){
        if(q.r ==1){
            circles.splice(i, 1);
            console.log('removed');
        }
    })

    render();
    
        
}


function checkOverlap(p){
    let overlap = false; 

    circles.forEach(function(q){
        if(p!=q){
        let cd = dist(p.x, p.y, q.x, q.y);
        let rd = p.r+q.r; 
        if(cd<rd){
            overlap = true;
            q.r--; 
        }
    }
    })

    //borders
    if( (p.x+p.r)>w || (p.y + p.r)> h || (p.x - p.r ) < 0 || (p.y - p.r ) < 0){
        overlap=true; 
    }
    return overlap; 
}

function render(){
    circles.forEach(function(p,i){
        fill(i%360,100-p.r,100);
        noStroke();
        ellipse(p.x,p.y,2*p.r,2*p.r);
    })
}



