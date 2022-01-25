/**
 * genuary day 24
 * Prompt: create your own pseudo-random number generator and visually check the results 
 * 
 * <3 whichlight 
 * 
 */



 let w,h=0;
 let rands = [];
 let prands = [];
 let bin_size = 5; 

function setup() {
    h = windowHeight;
    w = windowWidth;
    colorMode(HSB, 360, 100, 100, 100);
    createCanvas(w, h);
   

    for(let i=0; i<(w/bin_size); i++){
        rands.push(0); 
        prands.push(0); 
    }

    background(280,100,100,100)


}

function draw() {

    noStroke(); 
    fill(280,100,100,100)
     rect(0, 0.25*h, w, h/2);

   //console.log(funRandom());
   let r = w*random(); 
   rands[floor(r/bin_size)]+=1; 
   plotrand(rands, 1, [300,100,100]);

   
   stroke(120,100,100);
   strokeWeight(3);
   point(frameCount%w, 0.75*h+r%(h/4));




   let p = w*funRandom();
   prands[floor(p/bin_size)]+=1; 
   plotrand(prands, -1, [180,100,100]);

   stroke(60,100,100)
   strokeWeight(3);
   point(frameCount%w, p%(h/4));

   
   



}

// pseudo-random generator - return something between 0 and 1 
function funRandom(){
    let c = TWO_PI % (millis()%2)+1; 
    let d = (frameCount)*(2*second()%100)+1;
    let a = (d/c)**(1/2);
    let f = (a+c*d)/(c); 
    c = f*(millis()%1);
    f%=1; 
    return f;

}

function plotrand(list, dir, col){
    list.forEach(function(p,i){
        noStroke();
        fill(col);
        let maxval = max(list);
        rect(i*bin_size, h/2, bin_size, dir*(h/4*list[i]/maxval));
    });
    
}
