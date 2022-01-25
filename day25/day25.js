/**
 * genuary day 25
 * Prompt: perspective
 * 
 * <3 whichlight 
 * 
 */

 let w,h=0;
 let side = 100;
 let boxes = [];
 let level =0; 
 let gcol = 300; 



function setup() {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h, WEBGL);
    frameRate(20);
}

function draw() {
    background(300,100,100,100)

    camera(0,0,level*side+500);
    render({x: mouseX-w/2, y: mouseY-h/2, c: 300}, level*side); 

    boxes.forEach(function(p){
        render({x: p.x, y:p.y, c: p.c}, side*p.z);
    })

    if(!mouseIsPressed && level>0){
        //boxes.pop(); 
        level--; 
        gcol = random(360);


    }

    

}



function mouseDragged(){

    let b = {x: mouseX-w/2, y: mouseY-h/2, c: gcol, z: level};

    boxes.push(b)
    level++; 

   

    /*

    // this section will limit adding a box if it wasn't in a new bin 
     if(boxes.length==0){
        boxes.push(b)
    } 

    else {
        let xval = floor((mouseX-w/2)/side);
        let yval = floor((mouseY-h/2)/side);
        let xold = floor((boxes[boxes.length-1].x)/side);
        let yold = floor((boxes[boxes.length-1].y)/side);

        if(xval!=xold || yval!=yold){
            boxes.push(b);
 
        }
    }
    */

}

function render(p,i){
    push();
    translate(p.x, p.y ,i);
    strokeWeight(5);
    stroke(60,100,100);
    fill(p.c,100,100, 50);
    box(side);
    pop();
}
