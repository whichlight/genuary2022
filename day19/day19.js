/**
 * genuary day 19
 * Prompt: Use text/typography
 * 
 * <3 whichlight 
 * 
 */

let w, h = 0;
const mantra = "i love you. all of you. you are radiant, you are enough. ";
let index = 0; 


function setup() {
    w = windowWidth;
    h = windowHeight;
    frameRate(10);
    select('canvas').remove();
}

function draw() {
    frameRate(10);   

    let m = select('#mantra');

    let w = mantra[index]; 
    m.html(w, true);
    
    if(w=="." || w ==","){
        m.html("<br>", true);
        frameRate(1);

    }

    index++; 
    index%=mantra.length; 

    if(m.height > h){
        console.log(m.height);
        m.html('');
        index = 0; 

        let t = select('#title');
        t.html(" <3 ",true);

    }
    

}   

