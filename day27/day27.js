/**
 * genuary day 27
 * Prompt: #2E294E #541388 #F1E9DA #FFD400 #D90368
 * 
 * <3 whichlight 
 * 
 * ref: https://editor.p5js.org/kchung/sketches/B17wokMUX
 * 
 */

//mobile disable default touch events so no scrolling or highlight etc 
touchStarted = () => false;

let w, h = 0;
let side = 50; 
let p1,p2,p3,p4,p5; 
const cols = ["#2E294E", "#541388", "#F1E9DA", "#FFD400", "#D90368"];
let s1 =30; 
let s2 = s1+side; 
let pentas = [];


setup = () => {
    h = windowHeight;
    w = windowWidth;
    createCanvas(w, h, WEBGL);
    camera(0,0,500);
    frameRate(20);


  
   
   
    pentas.push(new Penta(0, 0));
 
    let num = 5; 
    for(i=0; i<num; i++){
        for(j=0; j<num; j++){
            let x = map(i, 0,num-1, -200, 200);
            let y = map(j, 0, num-1, -200, 200);
        pentas.push(new Penta(x, y));
        }

    }

     
}


draw = () => {
    background("#034");
    pentas.forEach((p)=>p.render());

}





class Penta{
    constructor(x,y){
        this.p1 = createVector(0, 0, random(side/2));
        this.p2 = createVector(random(s1,s2), 0, random(side/2));
        this.p3 = createVector(random(s1,s2), random(s1,s2), random(side/2));
        this.p4 = createVector(0, random(s1,s2), random(side/2));
        this.p5 = createVector(side/2, side/2, random(1,2)*side);
        this.x = x; 
        this.y = y; 
        this.z = 0;

        this.spinX = random(-0.05, 0.05);
        this.spinY = random(-0.05, 0.05);
        
    }

    render(){
        let alpha = 80;


        push();
        translate(this.x, this.y,this.z);

        rotateX(frameCount*this.spinX);
        rotateZ(frameCount*this.spinY);
        
    
        noStroke();
    
        fill(cols[0]);
        beginShape()
        vertex(this.p1.x, this.p1.y, this.p1.z);
        vertex(this.p2.x, this.p2.y, this.p2.z);
        vertex(this.p3.x, this.p3.y, this.p3.z);
        vertex(this.p4.x, this.p4.y, this.p4.z);
        endShape(CLOSE);
    
        fill(cols[1]);
        beginShape()
        vertex(this.p1.x, this.p1.y, this.p1.z);
        vertex(this.p2.x, this.p2.y, this.p2.z);
        vertex(this.p5.x, this.p5.y, this.p5.z);
        endShape(CLOSE);
    
        fill(cols[2]);
        beginShape()
        vertex(this.p2.x, this.p2.y, this.p2.z);
        vertex(this.p3.x, this.p3.y, this.p3.z);
        vertex(this.p5.x, this.p5.y, this.p5.z);
        endShape(CLOSE);
    
        fill(cols[3]);
        beginShape()
        vertex(this.p3.x, this.p3.y, this.p3.z);
        vertex(this.p4.x, this.p4.y, this.p4.z);
        vertex(this.p5.x, this.p5.y, this.p5.z);
        endShape(CLOSE);
    
        fill(cols[4]);
        beginShape()
        vertex(this.p1.x, this.p1.y, this.p1.z);
        vertex(this.p4.x, this.p4.y, this.p4.z);
        vertex(this.p5.x, this.p5.y, this.p5.z);
        endShape(CLOSE);
        pop();


    }
}


